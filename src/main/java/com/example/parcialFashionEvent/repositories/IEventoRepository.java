package com.example.parcialFashionEvent.repositories;

import com.example.parcialFashionEvent.entity.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IEventoRepository extends JpaRepository<Evento, Long> {

}
