package com.example.parcialFashionEvent.mercadoPago.dto;

import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

@Data
public class PayerDTO {
    @NotNull
    private String email;

    @NotNull
    private PayerIdentificationDTO identification;

}
