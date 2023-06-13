package com.example.anphuc.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String password;
    private String fullName;
    private String email;
    private String photo;
    private Boolean activated;
    private Boolean admin;

    @JsonBackReference
    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY)
    private List<Order> orderList;

}
