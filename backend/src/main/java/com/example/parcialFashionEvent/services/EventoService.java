package com.example.parcialFashionEvent.services;

import com.example.parcialFashionEvent.entity.Evento;
import com.example.parcialFashionEvent.entity.Usuario;
import com.example.parcialFashionEvent.repositories.IEventoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventoService {

    @Autowired
    private final IEventoRepository eventoRepository;
    private final UsuarioService usuarioService;

    public Evento saveEvento(Evento evento){
        return eventoRepository.save(evento);
    }

    public Evento getEventoById(Long eventoId){
        return eventoRepository.findById(eventoId)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));
    }

    public List<Evento> getAllEventos(){
        return eventoRepository.findAll();
    }

    public Evento updateEventoById(Evento request, Long eventoId){
        Evento evento = eventoRepository.findById(eventoId).get();

        evento.setNombre(request.getNombre());
        evento.setFecha(request.getFecha());
        evento.setPrecio(request.getPrecio());
        saveEvento(evento);

        return evento;
    }

    public String deleteEvento(Long eventoId) {
        try {
            eventoRepository.deleteById(eventoId);
            return "Evento eliminado";
        } catch (Exception e) {
            return "Error al eliminar evento";
        }
    }

    @Transactional
    public String addInvitado(String username, Long eventoId) throws RuntimeException {
        Evento evento = getEventoById(eventoId);
        Usuario usuario = usuarioService.getUserByUsername(username);
        if (!evento.getInvitados().contains(username)){
            evento.addInvitado(usuario);
            eventoRepository.save(evento);
            return username + " se agregó con éxito al evento: " + evento.getNombre();
        } else {
            throw new RuntimeException("Usuario ya agregado al evento");
        }
    }
    public String removeInvitado(String username, Long eventoId) throws RuntimeException {
        Evento evento = getEventoById(eventoId);
        Usuario usuario = usuarioService.getUserByUsername(username);
        if (evento.getInvitados().contains(username)){
            evento.removeInvitado(usuario);
            eventoRepository.save(evento);
            return username + " se eliminó con éxito del evento: " + evento.getNombre();
        } else {
            throw new RuntimeException("Usuario no encontrado en el evento");
        }
    }

    @Transactional
    public String addParticipante(String username, Long eventoId) throws RuntimeException {
        Evento evento = getEventoById(eventoId);
        Usuario usuario = usuarioService.getUserByUsername(username);
        if (!evento.getParticipantes().contains(username)){
            evento.addParticipante(usuario);
            eventoRepository.save(evento);
        } else {
            throw new RuntimeException("Participante ya se inscribió al evento");
        }
        return "Participante " + username + " se inscribió al evento " + evento.getNombre();
    }

    public String removeParticipante(String username, Long eventoId) throws RuntimeException {
        Evento evento = getEventoById(eventoId);
        Usuario usuario = usuarioService.getUserByUsername(username);
        if (evento.getParticipantes().contains(username)){
            evento.removeParticipante(usuario);
            eventoRepository.save(evento);
            return username + " se eliminó con éxito del evento: " + evento.getNombre();
        } else {
            throw new RuntimeException("Usuario no encontrado en el evento");
        }
    }
}
