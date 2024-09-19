package com.example.parcialFashionEvent.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "portafolio")
public class Portafolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonBackReference
    private Usuario usuario;

    @OneToMany(mappedBy = "portafolio", cascade = CascadeType.ALL)
    @JsonIgnore
    @JsonManagedReference
    private List<Medio> medios;

    @Column(name = "biografía")
    private String biografia;

    @ManyToMany
    @JoinTable(
            name = "portafolio_evento",
            joinColumns = @JoinColumn(name = "portafolio_id"),
            inverseJoinColumns = @JoinColumn(name = "evento_id")
    )
    private List<Evento> eventosPrevios;

}