package com.example.parcialFashionEvent.repositories;

import com.example.parcialFashionEvent.entity.Portafolio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPortafolioRepository extends JpaRepository<Portafolio, Long> {
}
