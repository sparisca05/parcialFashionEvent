package com.example.parcialFashionEvent.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public enum Role {
    ADMIN(
            Set.of(
                    Permission.ADMIN_READ,
                    Permission.ADMIN_WRITE,
                    Permission.ADMIN_UPDATE,
                    Permission.ADMIN_DELETE,
                    Permission.ORGANIZADOR_READ,
                    Permission.ORGANIZADOR_WRITE,
                    Permission.ORGANIZADOR_UPDATE,
                    Permission.ORGANIZADOR_DELETE
            )
    ),
    ORGANIZADOR(
            Set.of(
                    Permission.ORGANIZADOR_READ,
                    Permission.ORGANIZADOR_WRITE,
                    Permission.ORGANIZADOR_UPDATE,
                    Permission.ORGANIZADOR_DELETE
            )
    ),
    MODELO(Collections.emptySet()),
    INVITADO(Collections.emptySet());

    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}