package com.example.parcialFashionEvent.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/management")
public class OrganizadorController {

    @GetMapping
    public String get() {
        return "GET: Organizador";
    }
    @PostMapping
    public String post() {
        return "POST: Organizador";
    }
    @PutMapping
    public String put() {
        return "PUT: Organizador";
    }
    @DeleteMapping
    public String delete() {
        return "DELETE: Organizador";
    }

}
