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

    String correo;
    String nombre;
    String apellido;
    String username;
    String password;

}
