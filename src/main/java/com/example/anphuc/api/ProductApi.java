package com.example.anphuc.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.anphuc.payload.response.APIResponse;
import com.example.anphuc.repository.ProductDAO;
import com.example.anphuc.utils.ImageService;

@RestController
@RequestMapping("/api/public/products")
public class ProductApi {
    @Autowired
    ProductDAO productDAO;

    @Autowired
    ImageService imageService;

    @GetMapping("")
    public ResponseEntity<?> getProducts() {
        return ResponseEntity.ok(productDAO.findAll());
    }

    @GetMapping("/category-{id}")
    public ResponseEntity<?> getProductsByCategory(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(productDAO.findAllByCategory_Id(id));
    }

    @GetMapping("/search")
    public ResponseEntity<?> productsByPrice(@RequestParam("min") Integer min, @RequestParam("max") Integer max) {
        return ResponseEntity.ok(productDAO.findByPriceBetween(min, max));
    }

    @PostMapping("")
    public ResponseEntity<?> setProduct(@RequestParam("file") MultipartFile file) {
        imageService.save(file, "imgProduct");
        return ResponseEntity.ok(new APIResponse());
    }

}
