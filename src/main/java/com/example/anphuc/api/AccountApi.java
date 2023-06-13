package com.example.anphuc.api;

import com.example.anphuc.dto.AccountDTO;
import com.example.anphuc.exception.EntityNotFoundException;
import com.example.anphuc.model.Account;
import com.example.anphuc.payload.response.APIResponse;
import com.example.anphuc.repository.AccountDAO;
import com.example.anphuc.utils.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AccountApi {
    @Autowired
    AccountDAO accountDAO;
    @Autowired
    TokenProvider tokenProvider;

    @Autowired
    HttpServletRequest request;

    @PostMapping("/public/accounts")
    public ResponseEntity<?> login(@RequestBody AccountDTO dto) {
        Account acc = accountDAO.findByEmail(dto.getEmail()).orElseThrow(() -> {
            throw new EntityNotFoundException("Email is not registered!");
        });
        if (!acc.getPassword().equals(dto.getPassword())) {
            return ResponseEntity.ok(new APIResponse("Password incorrect", false, null));
        }
        String token = tokenProvider.generateToken(acc);
        return ResponseEntity.ok(new APIResponse(token, true, acc));
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        Account acc = (Account)  request.getAttribute("user");
        return ResponseEntity.ok(new APIResponse(acc));
    }
}
