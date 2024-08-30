package com.example.parcialFashionEvent.auth;

import com.example.parcialFashionEvent.config.JwtService;
import com.example.parcialFashionEvent.entity.Usuario;
import com.example.parcialFashionEvent.repositories.IUsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final IUsuarioRepository userRepository;
    private final JwtService jwtService;

    public AuthResponse login(LoginRequest request) {
        return null;
    }

    public AuthResponse register(RegisterRequest request) {
        Usuario user = Usuario.builder()
                .correo(request.getCorreo())
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .username(request.getUsername())
                .password(request.getPassword())
                .rol(Usuario.Role.INVITADO)
                .build();

        userRepository.save(user);

        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }

}
