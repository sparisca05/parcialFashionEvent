package com.example.parcialFashionEvent.demo;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

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

    @PutMapping
    @PreAuthorize("hasAuthority('admin:update')")
    public String put() {
        return "PUT: Admin";
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('admin:delete')")
    public String delete() {
        return "DELETE: Admin";
    }

}
