package com.example.anphuc.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EntityNotFoundException extends RuntimeException {
    String message;

    public EntityNotFoundException(String message) {
        this.message = message;
    }
}
