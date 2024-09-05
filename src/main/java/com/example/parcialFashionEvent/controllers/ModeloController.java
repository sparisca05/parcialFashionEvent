package com.example.parcialFashionEvent.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/modelo")
@PreAuthorize("hasRole('MODELO')")
public class ModeloController {

    @GetMapping
    public String get() {
        return "GET: Modelo";
    }
    @PostMapping
    public String post() {
        return "POST: Modelo";
    }
    @PutMapping
    public String put() {
        return "PUT: Modelo";
    }
    @DeleteMapping
    public String delete() {
        return "DELETE: Modelo";
    }
}
