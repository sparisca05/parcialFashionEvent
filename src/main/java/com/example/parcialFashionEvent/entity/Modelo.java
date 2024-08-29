package com.example.parcialFashionEvent.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "modelo")
public class Modelo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;

}
