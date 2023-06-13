package com.example.anphuc.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenException extends RuntimeException {
    String message;

    public TokenException(String message) {
        this.message = message;
    }
}
