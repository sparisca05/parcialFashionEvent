package com.example.parcialFashionEvent.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String correo;
    private String nombre;
    private String apellido;
    private String username;
    private String password;

}
