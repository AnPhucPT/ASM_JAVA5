package com.example.anphuc.api;

import com.example.anphuc.repository.CategoryDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/categories")
public class CategoryApi {
    @Autowired
    CategoryDAO categoryDAO;

    @GetMapping("")
    public ResponseEntity<?> getCategories(){
        return ResponseEntity.ok(categoryDAO.findAll());
    }

    @GetMapping("/exist")
    public ResponseEntity<?> getExistCategories(){
        return ResponseEntity.ok(categoryDAO.getExistCategory());
    }
}
