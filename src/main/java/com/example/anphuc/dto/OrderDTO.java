package com.example.anphuc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private int shipFee;
    List<OrderItemDTO> orderItemDTOS;
    private String address;
}
