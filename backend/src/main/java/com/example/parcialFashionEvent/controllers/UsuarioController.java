package com.example.parcialFashionEvent.controllers;

import com.example.parcialFashionEvent.entity.Evento;
import com.example.parcialFashionEvent.entity.Portafolio;
import com.example.parcialFashionEvent.entity.Usuario;
import com.example.parcialFashionEvent.entity.UsuarioInfo;
import com.example.parcialFashionEvent.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Información de usuario
    @GetMapping("/{id}")
    public UsuarioInfo getUserInfo(@PathVariable Long id) {
        return usuarioService.getUserInfoById(id);
    }
    // Información de perfil propio
    @GetMapping("/perfil")
    public Usuario getUserProfile() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName(); // Obtener el username del usuario autenticado
        return usuarioService.getUserByUsername(username);
    }
    // Eventos de usuario
    @GetMapping("/mis-eventos")
    public ResponseEntity<List<Evento>> getEventosByUsuario() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName(); // Obtener el username del usuario autenticado
        Long id = usuarioService.getUserByUsername(username).getId();
        List<Evento> eventos = usuarioService.getMyEvents(id);
        return ResponseEntity.ok(eventos);
    }

    // Ver portafolio (solo modelos)
    @GetMapping("/perfil/portafolio")
    @PreAuthorize("hasRole('MODELO')")
    public Portafolio getPortafolio() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName(); // Obtener el username del usuario autenticado
        Usuario usuario = usuarioService.getUserByUsername(username);
        return usuario.getPortafolio();
    }
    // Crear portafolio (solo modelos)
    @PostMapping("/perfil/portafolio")
    @PreAuthorize("hasRole('MODELO')")
    public Portafolio post(@RequestBody Portafolio portafolio) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName(); // Obtener el username del usuario autenticado
        usuarioService.updatePortafolioByUserId(portafolio, usuarioService.getUserByUsername(username).getId());
        return portafolio;
    }

    // Editar perfil
    @PutMapping("/perfil")
    public Usuario updateUserProfile(@RequestBody Usuario request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName(); // Obtener el username del usuario autenticado
        Long id = usuarioService.getUserByUsername(username).getId();
        return usuarioService.updateUserById(request, id);
    }
    // Editar portafolio (solo modelos)
    @PutMapping("/perfil/portafolio")
    @PreAuthorize("hasRole('MODELO')")
    public Portafolio updatePortafolio(@RequestBody Portafolio portafolio) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName(); // Obtener el username del usuario autenticado
        usuarioService.updatePortafolioByUserId(portafolio, usuarioService.getUserByUsername(username).getId());
        return portafolio;
    }

    // Eliminar perfil
    @DeleteMapping("/perfil")
    public String deleteUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName(); // Obtener el username del usuario autenticado
        return usuarioService.deleteUser(usuarioService.getUserByUsername(username).getId());
    }
}
