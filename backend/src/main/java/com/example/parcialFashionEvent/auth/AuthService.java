package com.example.parcialFashionEvent.auth;

import com.example.parcialFashionEvent.config.JwtService;
import com.example.parcialFashionEvent.entity.Role;
import com.example.parcialFashionEvent.entity.Usuario;
import com.example.parcialFashionEvent.repositories.IUsuarioRepository;
import com.example.parcialFashionEvent.services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final IUsuarioRepository userRepository;
    private final UsuarioService usuarioService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) throws RuntimeException {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse register(RegisterRequest request) {
        Usuario user;
        if (request.isModelo()){
            user = Usuario.builder()
                    .correo(request.getCorreo())
                    .nombre(request.getNombre())
                    .apellido(request.getApellido())
                    .username(request.getUsername())
                    .password(request.getPassword())
                    .rol(Role.MODELO)
                    .build();
        } else {
            user = Usuario.builder()
                    .correo(request.getCorreo())
                    .nombre(request.getNombre())
                    .apellido(request.getApellido())
                    .username(request.getUsername())
                    .password(request.getPassword())
                    .rol(Role.INVITADO)
                    .build();
        }
        usuarioService.saveUser(user);

        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }

}
