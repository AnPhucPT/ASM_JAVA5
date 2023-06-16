package com.example.anphuc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/cart")
public class CartItemController {
    @GetMapping("")
    public String getCartPage() {
        return "site/cart";
    }
}
