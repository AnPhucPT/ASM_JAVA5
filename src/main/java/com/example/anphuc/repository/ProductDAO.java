package com.example.anphuc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.anphuc.model.Product;

public interface ProductDAO extends JpaRepository<Product, Integer> {
    @EntityGraph("graph.product")
    List<Product> findAll();

    @EntityGraph("graph.product")
    List<Product> findAllByCategory_Id(Integer id);

    @EntityGraph("graph.product")
    List<Product> findByPriceBetween(Integer minPrice, Integer maxPrice);

}
