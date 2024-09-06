package com.example.parcialFashionEvent.controllers;

import com.example.parcialFashionEvent.entity.Role;
import com.example.parcialFashionEvent.entity.Usuario;
import com.example.parcialFashionEvent.repositories.IUsuarioRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private IUsuarioRepository userRepository;

    // Panel de administrador
    @GetMapping
    @PreAuthorize("hasAuthority('admin:read')")
    public String get() {
        return "GET: Admin";
    }

    @PostMapping
    @PreAuthorize("hasAuthority('admin:write')")
    public String post() {
        return "POST: Admin";
    }

    @PutMapping("/asignar-rol")
    @PreAuthorize("hasAuthority('admin:update')")
    public ResponseEntity<String> assignRoleToUser(@RequestBody AsignarRolRequest request) {
        Usuario user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        user.setRol(Role.valueOf(request.getRol()));

        userRepository.save(user);
        return ResponseEntity.ok("Rol asignado correctamente");
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('admin:delete')")
    public String delete() {
        return "DELETE: Admin";
    }

}

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
class AsignarRolRequest{
    private String username;
    private String rol;
}