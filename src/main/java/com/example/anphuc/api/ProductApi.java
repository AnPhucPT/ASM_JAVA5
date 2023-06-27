package com.example.anphuc.api;

import com.example.anphuc.payload.request.ProductQueryParam;
import com.example.anphuc.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class ProductApi {

    @Autowired
    ProductService productService;

    @GetMapping("/public/products/filter")
    public ResponseEntity<?> filterProduct(ProductQueryParam productQueryParam) {
        return ResponseEntity.ok(productService.filterProduct(productQueryParam));
    }

    @GetMapping("/public/product/min-max")
    public ResponseEntity<?> getMinMax() {
        return ResponseEntity.ok(productService.getMinMax());
    }

    @PostMapping("/products")
    public ResponseEntity<?> setProduct(
            @RequestParam("name") String name,
            @RequestParam("price") Integer price,
            @RequestParam("file") MultipartFile file,
            @RequestParam("categoryId") Integer CategoryId) {
        return ResponseEntity.ok(productService.save(name, price, file, CategoryId));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(productService.delete(id));
    }

    @PutMapping("/products")
    public ResponseEntity<?> updateProduct(
            @RequestParam("id") Integer id,
            @RequestParam("name") String name,
            @RequestParam("price") Integer price,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam("categoryId") Integer categoryId) {
        return ResponseEntity.ok(productService.update(id, name, price, file, categoryId));
    }

}
