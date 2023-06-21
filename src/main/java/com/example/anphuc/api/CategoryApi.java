package com.example.anphuc.api;

import com.example.anphuc.model.Category;
import com.example.anphuc.payload.response.APIResponse;
import com.example.anphuc.repository.CategoryDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/categories")
public class CategoryApi {
    @Autowired
    CategoryDAO categoryDAO;

    @GetMapping("")
    public ResponseEntity<?> getCategories() {
        return ResponseEntity.ok(categoryDAO.findAll());
    }

    @GetMapping("/exist")
    public ResponseEntity<?> getExistCategories() {
        return ResponseEntity.ok(categoryDAO.getExistCategory());
    }

    @PostMapping("")
    public ResponseEntity<?> save(@RequestBody Category category) {
        return ResponseEntity.ok(categoryDAO.save(category));
    }

    @PutMapping("")
    public ResponseEntity<?> update(@RequestBody Category category) {
        categoryDAO.saveAndFlush(category);
        return ResponseEntity.ok(categoryDAO.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        categoryDAO.deleteById(id);
        return ResponseEntity.ok(new APIResponse("Delete successfully"));
    }
}
