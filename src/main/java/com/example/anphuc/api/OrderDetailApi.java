package com.example.anphuc.api;

import com.example.anphuc.dto.OrderDTO;
import com.example.anphuc.dto.OrderItemDTO;
import com.example.anphuc.model.Account;
import com.example.anphuc.model.Order;
import com.example.anphuc.model.OrderDetail;
import com.example.anphuc.payload.response.APIResponse;
import com.example.anphuc.repository.AccountDAO;
import com.example.anphuc.repository.OrderDAO;
import com.example.anphuc.repository.OrderDetailDAO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderDetailApi {
    @Autowired
    OrderDetailDAO orderDetailDAO;
    @Autowired
    OrderDAO orderDAO;
    @Autowired
    AccountDAO accountDAO;
    @Autowired
    HttpServletRequest request;

    @PostMapping("")
    public ResponseEntity<?> createOderDetail(@RequestBody OrderDTO dto) {
        Account acc = (Account)  request.getAttribute("user");
        Order order = new Order();
        double total = 0;
        List<OrderDetail> orderDetailList = new ArrayList<>();
        for (OrderItemDTO orderItemDTO : dto.getOrderItemDTOS()) {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setProduct(orderItemDTO.getProduct());
            orderDetail.setQuantity(orderItemDTO.getQuantity());
            total += orderItemDTO.getProduct().getPrice()*orderItemDTO.getQuantity();
            orderDetail.setOrders(order);
            orderDetailList.add(orderDetail);
        }
        total += dto.getShipFee();
        order.setOrderDetailList(orderDetailList);
        order.setTotal(total);
        order.setAddress(dto.getAddress());
        order.setAccount(acc);
        orderDAO.save(order);
        return ResponseEntity.ok(new APIResponse(null));
    }

}
