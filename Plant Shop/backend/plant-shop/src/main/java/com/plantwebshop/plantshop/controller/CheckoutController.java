package com.plantwebshop.plantshop.controller;

import com.plantwebshop.plantshop.dto.PaymentInfo;
import com.plantwebshop.plantshop.dto.Purchase;
import com.plantwebshop.plantshop.dto.PurchaseResponse;
import com.plantwebshop.plantshop.service.CheckoutService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService=checkoutService;
    }

    @PostMapping({"/purchase"})
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse=checkoutService.placeOrder(purchase);
        return purchaseResponse;
    }

    @PostMapping({"/payment"})
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfo paymentInfo) throws StripeException{
        PaymentIntent paymentIntent= checkoutService.createPaymentIntent(paymentInfo);
        String paymentString=paymentIntent.toJson();
        return new ResponseEntity<>(paymentString, HttpStatus.OK);
    }
}
