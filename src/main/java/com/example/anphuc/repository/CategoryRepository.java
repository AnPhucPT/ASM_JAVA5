package com.example.anphuc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.anphuc.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query(nativeQuery = true, value = "select * from categories where id in (select c.id from categories c join products p on c.id = p.category_id group by c.id)")
    List<Category> getExistCategory();
}
