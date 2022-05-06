package com.plantwebshop.plantshop.service;

import com.plantwebshop.plantshop.dto.PaymentInfo;
import com.plantwebshop.plantshop.dto.Purchase;
import com.plantwebshop.plantshop.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
