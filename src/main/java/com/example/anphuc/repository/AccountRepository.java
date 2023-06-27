package com.example.anphuc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.anphuc.model.Account;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    Account findByPassword(String password);

    Optional<Account> findByEmail(String email);
}
