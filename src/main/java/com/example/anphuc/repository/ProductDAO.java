package com.example.anphuc.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.anphuc.model.Product;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProductDAO extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product> {
    @EntityGraph("graph.product")
    List<Product> findAll();
    @EntityGraph("graph.product")
    Page<Product> findAll(Specification<Product> spec, Pageable pageable);

    @EntityGraph("graph.product")
    List<Product> findAllByCategory_Id(Integer id);

    @EntityGraph("graph.product")
    List<Product> findByPriceBetween(Integer minPrice, Integer maxPrice);

}
