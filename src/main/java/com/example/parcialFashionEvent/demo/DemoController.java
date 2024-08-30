package com.example.parcialFashionEvent.demo;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class DemoController {

    @PostMapping(value = "demo")
    public String demo() {
        return "Welcome to Parcial Fashion Event Demo";
    }
}
