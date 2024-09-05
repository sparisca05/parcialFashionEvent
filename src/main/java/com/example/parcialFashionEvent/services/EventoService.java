package com.example.parcialFashionEvent.services;

import com.example.parcialFashionEvent.entity.Evento;
import com.example.parcialFashionEvent.entity.Usuario;
import com.example.parcialFashionEvent.repositories.IEventoRepository;
import com.example.parcialFashionEvent.repositories.IUsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        if (!evento.getInvitados().contains(usuario)){
            evento.addInvitado(usuario);
            eventoRepository.save(evento);
        } else {
            throw new RuntimeException("Usuario ya agregado al evento");
        }
        return "Usuario " + username + " se agregó al evento " + evento.getNombre();
    }

    @Transactional
    public String addParticipante(String username, Long eventoId) throws RuntimeException {
        Evento evento = getEventoById(eventoId);
        Usuario usuario = usuarioService.getUserByUsername(username);
        if (!evento.getParticipantes().contains(usuario)){
            evento.addParticipante(usuario);
            eventoRepository.save(evento);
        } else {
            throw new RuntimeException("Participante ya se inscribió al evento");
        }
        return "Participante " + username + " se inscribió al evento " + evento.getNombre();
    }
}
