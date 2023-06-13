package com.example.anphuc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.anphuc.model.Order;

public interface OrderDAO extends JpaRepository<Order, Integer> {
}
