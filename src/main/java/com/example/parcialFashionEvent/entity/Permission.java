package com.example.parcialFashionEvent.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {

    ADMIN_READ("admin:read"),
    ADMIN_WRITE("admin:write"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_DELETE("admin:delete"),
    ORGANIZADOR_READ("organizador:read"),
    ORGANIZADOR_WRITE("organizador:write"),
    ORGANIZADOR_UPDATE("organizador:update"),
    ORGANIZADOR_DELETE("organizador:delete");

    @Getter
    private final String permission;
}
