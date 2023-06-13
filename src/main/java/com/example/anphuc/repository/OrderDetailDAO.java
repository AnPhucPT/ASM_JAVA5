package com.example.anphuc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.anphuc.model.OrderDetail;

public interface OrderDetailDAO extends JpaRepository<OrderDetail, Integer> {
}
