package com.example.anphuc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.anphuc.model.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    List<OrderDetail> findAllByOrders_Id(Integer id);
}
