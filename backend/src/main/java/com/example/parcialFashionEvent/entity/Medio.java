package com.example.parcialFashionEvent.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@RequiredArgsConstructor
public class Medio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String url;

    @ManyToOne
    @JoinColumn(name = "portafolio_id")
    @JsonBackReference
    private Portafolio portafolio;
}
