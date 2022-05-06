package com.plantwebshop.plantshop.dto;

import com.plantwebshop.plantshop.model.Address;
import com.plantwebshop.plantshop.model.Customer;
import com.plantwebshop.plantshop.model.Order;
import com.plantwebshop.plantshop.model.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
