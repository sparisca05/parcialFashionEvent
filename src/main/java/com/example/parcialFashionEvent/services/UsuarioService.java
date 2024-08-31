package com.example.parcialFashionEvent.services;

import com.example.parcialFashionEvent.entity.Usuario;
import com.example.parcialFashionEvent.repositories.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService implements UserDetailsService {

    @Autowired
    private IUsuarioRepository userRepository;

    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Usuario> userDetail = userRepository.findByUsername(username);

        return userDetail.map(user ->
                new org.springframework.security.core.userdetails.User(
                        user.getCorreo(),
                        user.getPassword(),
                        user.getAuthorities()
                )).orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    public String saveUser(Usuario user) {
        // Encripta la contraseña antes de guardarla
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Guarda el usuario en la base de datos
        userRepository.save(user);
        return "Usuario guardado con éxito";
    }
}
