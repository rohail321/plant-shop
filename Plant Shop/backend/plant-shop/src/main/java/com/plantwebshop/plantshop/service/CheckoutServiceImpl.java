package com.plantwebshop.plantshop.service;

import com.plantwebshop.plantshop.dao.CustomerRepository;
import com.plantwebshop.plantshop.dto.PaymentInfo;
import com.plantwebshop.plantshop.dto.Purchase;
import com.plantwebshop.plantshop.dto.PurchaseResponse;
import com.plantwebshop.plantshop.model.Customer;
import com.plantwebshop.plantshop.model.Order;
import com.plantwebshop.plantshop.model.OrderItem;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class CheckoutServiceImpl implements CheckoutService {
    private CustomerRepository customerRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository, @Value("${stripe.key.secret}") String secretKey ){
        this.customerRepository=customerRepository;

        Stripe.apiKey=secretKey;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        Order order = purchase.getOrder();

        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        Customer customer = purchase.getCustomer();
        customer.add(order);

        customerRepository.save(customer);

        return new PurchaseResponse(orderTrackingNumber);
    }

    @Override
    public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException {
        List<String> paymentMethodType=new ArrayList<>();
        paymentMethodType.add("card");
        Map<String,Object> params=new HashMap<>();
        params.put("amount",paymentInfo.getAmount());
        params.put("currency",paymentInfo.getCurrency());
        params.put("payment_method_types",paymentMethodType);

        return PaymentIntent.create(params);
    }

    private String generateOrderTrackingNumber() {


        return UUID.randomUUID().toString();
    }
}
