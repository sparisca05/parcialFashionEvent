package com.example.parcialFashionEvent.mercadoPago.controller;

import com.example.parcialFashionEvent.mercadoPago.dto.CardPaymentDTO;
import com.example.parcialFashionEvent.mercadoPago.dto.PaymentResponseDTO;
import com.example.parcialFashionEvent.mercadoPago.service.CardPaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/process_payment")
public class MercadoPagoController {

    private final CardPaymentService cardPaymentService;

    @Autowired
    public MercadoPagoController(CardPaymentService cardPaymentService) {
        this.cardPaymentService = cardPaymentService;
    }

    @GetMapping
    public String getHello() {
        return "Hello from MercadoPagoController";
    }

    @PostMapping
    public ResponseEntity<PaymentResponseDTO> processPayment(@RequestBody @Valid CardPaymentDTO cardPaymentDTO) {
        PaymentResponseDTO payment = cardPaymentService.processPayment(cardPaymentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(payment);
    }
}