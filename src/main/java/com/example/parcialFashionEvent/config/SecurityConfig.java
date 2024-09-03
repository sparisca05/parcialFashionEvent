package com.example.parcialFashionEvent.config;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.example.parcialFashionEvent.entity.Permission.*;
import static com.example.parcialFashionEvent.entity.Role.*;
import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    private final AuthenticationProvider authProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable) // Deshabilitar CSRF para APIs sin estado
                .authorizeHttpRequests(authRequest ->
                        authRequest
                                .requestMatchers("/auth/**").permitAll() // Permitir acceso sin autenticación

                                .requestMatchers("/api/v1/organizador/**").hasAnyRole(ADMIN.name(), ORGANIZADOR.name())
                                .requestMatchers(GET, "/api/v1/organizador/**").hasAnyAuthority(ADMIN_READ.name(), ORGANIZADOR_READ.name())
                                .requestMatchers(POST, "/api/v1/organizador/**").hasAnyAuthority(ADMIN_WRITE.name(), ORGANIZADOR_WRITE.name())
                                .requestMatchers(PUT, "/api/v1/organizador/**").hasAnyAuthority(ADMIN_UPDATE.name(), ORGANIZADOR_UPDATE.name())
                                .requestMatchers(DELETE, "/api/v1/organizador/**").hasAnyAuthority(ADMIN_DELETE.name(), ORGANIZADOR_DELETE.name())

                                .requestMatchers("/api/v1/modelo/**").hasRole(MODELO.name())

                                .anyRequest().authenticated()
                )
                .sessionManagement(sessionManager ->
                        sessionManager
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Deshabilitar manejo de sesiones
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}
