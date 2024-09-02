package com.example.parcialFashionEvent.demo;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/admin")
public class AdminController {

    @GetMapping
    public String get() {
        return "GET: Admin";
    }
    @PostMapping
    public String post() {
        return "POST: Admin";
    }
    @PutMapping
    public String put() {
        return "PUT: Admin";
    }
    @DeleteMapping
    public String delete() {
        return "DELETE: Admin";
    }

}
