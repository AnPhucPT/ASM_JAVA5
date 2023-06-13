package com.example.anphuc.payload.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class APIResponse {
    String message = "success";
    boolean success = true;
    Object data = null;

    public APIResponse(String message) {
        this.message = message;
    }

    public APIResponse(Object data) {
        this.data = data;
    }
}
