package com.example.parcialFashionEvent.repositories;

import com.example.parcialFashionEvent.entity.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IEventoRepository extends JpaRepository<Evento, Long> {

}
