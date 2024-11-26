package com.example.parcialFashionEvent.mercadoPago.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class PaymentResponseDTO {
    private Long id;
    private String status;
    private String detail;

    public PaymentResponseDTO(Long id, String status, String detail) {
        this.id = id;
        this.status = status;
        this.detail = detail;
    }
}
