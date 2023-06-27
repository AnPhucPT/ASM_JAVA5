package com.example.anphuc.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.anphuc.model.Product;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product> {
    @EntityGraph("graph.product")
    Page<Product> findAll(Specification<Product> spec, Pageable pageable);

    @Query("SELECT MIN(p.price) FROM Product p")
    Integer findMinPrice();

    @Query("SELECT MAX(p.price) FROM Product p")
    Integer findMaxPrice();

}
