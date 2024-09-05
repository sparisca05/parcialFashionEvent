package com.example.parcialFashionEvent.entity;

import lombok.Data;

@Data
public class UsuarioInfo {
    private String nombre;
    private String apellido;
    private String username;
    private Portafolio portafolio;
}
