package com.example.parcialFashionEvent.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    String token;
    /*
    public AuthResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
    */

}
