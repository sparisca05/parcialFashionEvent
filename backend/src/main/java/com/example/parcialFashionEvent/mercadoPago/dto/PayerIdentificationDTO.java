package com.example.parcialFashionEvent.mercadoPago.dto;

import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

@Data
public class PayerIdentificationDTO {
    @NotNull
    private String type;

    @NotNull
    private String number;
}
