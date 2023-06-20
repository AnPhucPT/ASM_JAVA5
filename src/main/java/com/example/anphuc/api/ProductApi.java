package com.example.anphuc.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.anphuc.model.Product;
import com.example.anphuc.payload.response.APIResponse;
import com.example.anphuc.repository.CategoryDAO;
import com.example.anphuc.repository.ProductDAO;
import com.example.anphuc.utils.ImageService;

@RestController
@RequestMapping("/api/public/products")
public class ProductApi {
    @Autowired
    ProductDAO productDAO;

    @Autowired
    CategoryDAO categoryDAO;

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
    public ResponseEntity<?> setProduct(
            @RequestParam("name") String name,
            @RequestParam("price") Integer price,
            @RequestParam("file") MultipartFile file,
            @RequestParam("categoryId") Integer id) {
        Product product = new Product(name, file.getOriginalFilename(), price, categoryDAO.findById(id).get());
        System.out.println(product.getCreateDate());
        imageService.save(file, "product");
        return ResponseEntity.ok(productDAO.save(product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        productDAO.deleteById(id);
        return ResponseEntity.ok(new APIResponse("Delete Successfull"));
    }

    @PutMapping("")
    public ResponseEntity<?> updateProduct(
            @RequestParam("id") Integer id,
            @RequestParam("name") String name,
            @RequestParam("price") Integer price,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam("categoryId") Integer categoryId) {
        Product product = productDAO.findById(id).get();
        product.setName(name);
        product.setPrice(price);
        product.setCategory(categoryDAO.findById(categoryId).get());
        if (file != null && !file.isEmpty()) {
            product.setImage(file.getOriginalFilename());
            imageService.save(file, "product");
        }
        productDAO.saveAndFlush(product);
        return ResponseEntity.ok(productDAO.findAll());
    }

}
