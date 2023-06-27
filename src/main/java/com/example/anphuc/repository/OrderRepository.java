package com.example.anphuc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.anphuc.model.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findAllByAccount_Id(Integer id);
}
