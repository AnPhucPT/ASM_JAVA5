package com.example.anphuc.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.anphuc.repository.OrderRepository;
import com.example.anphuc.repository.OrderDetailRepository;

@Controller
@RequestMapping("/admin")
public class adminHomeController {
    @Autowired
    OrderDetailRepository orderDetailRepository;

    @Autowired
    OrderRepository orderRepository;

    @GetMapping("")
    public String home() {
        return "admin/home";
    }

    @GetMapping("/order-manager")
    public String order() {
        return "admin/order_mangaer";
    }

    @GetMapping("/category-manager")
    public String category() {
        return "admin/category_manager";
    }

    @GetMapping("/order-detail-manager/{id}")
    public String orderDetail(Model model, @PathVariable Integer id) {
        model.addAttribute("orderDetails", orderDetailRepository.findAllByOrders_Id(id));
        model.addAttribute("address", orderRepository.findById(id).get().getAddress());
        return "admin/orderDetail_manager";
    }

    @GetMapping("/product-manager")
    public String product() {
        return "admin/product_manager";
    }
}
