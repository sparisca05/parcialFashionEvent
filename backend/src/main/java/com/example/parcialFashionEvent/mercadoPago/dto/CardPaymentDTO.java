package com.example.parcialFashionEvent.mercadoPago.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

import java.math.BigDecimal;

@Data
public class CardPaymentDTO {
    @NotNull
    private String token;

    private String issuerId;

    @NotNull
    private String paymentMethodId;

    @NotNull
    private BigDecimal transactionAmount;

    @NotNull
    private Integer installments;

    @NotNull
    @JsonProperty("description")
    private String productDescription;

    @NotNull
    private PayerDTO payer;
}
