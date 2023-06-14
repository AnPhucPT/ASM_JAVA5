package com.example.anphuc.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class adminHomeController {
    @GetMapping("")
    public String home() {
        return "admin/home";
    }
}
