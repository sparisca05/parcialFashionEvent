package com.example.parcialFashionEvent.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "portafolio")
public class Portafolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String fileType;
    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Usuario user;

}