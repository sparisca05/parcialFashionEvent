package com.example.parcialFashionEvent.controllers;

import com.example.parcialFashionEvent.entity.Evento;
import com.example.parcialFashionEvent.services.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/eventos")
@CrossOrigin(origins = "http://localhost:5173")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    // Ver todos los eventos
    @GetMapping
    public ResponseEntity<List<Evento>> getEventos() {
        List<Evento> eventos = eventoService.getAllEventos();
        return ResponseEntity.ok(eventos);
    }

    // Ver un evento por su id
    @GetMapping("/{id}")
    public Evento getEventoById(@PathVariable Long id) {
        return eventoService.getEventoById(id);
    }

    // Comprar un ticket para un evento con el usuario actual
    @PutMapping("/{id}/comprar-ticket")
    public String addInvitado(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return eventoService.addInvitado(username, id);
    }

    // Inscribirse a un evento como modelo
    @PutMapping("/{id}/inscribirse")
    @PreAuthorize("hasRole('MODELO')")
    public String addParticipante(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return eventoService.addParticipante(username, id);
    }

    // Crear un nuevo evento
    @PostMapping("/nuevo-evento")
    @PreAuthorize("hasAnyAuthority('admin:write', 'organizador:write')")
    public Evento postEvento(@RequestBody Evento evento) {
        return eventoService.saveEvento(evento);
    }

    // Modificar un evento
    @PutMapping("/{id}/modificar-evento")
    @PreAuthorize("hasAnyAuthority('admin:update', 'organizador:update')")
    public Evento updateEvento(@RequestBody Evento evento, @PathVariable Long id) {
        return eventoService.updateEventoById(evento, id);
    }

    // Eliminar un evento
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('admin:delete', 'organizador:delete')")
    public String deleteEvento(@PathVariable Long id) {
        return eventoService.deleteEvento(id);
    }
}
