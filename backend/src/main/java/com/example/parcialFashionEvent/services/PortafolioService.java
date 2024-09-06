package com.example.parcialFashionEvent.services;

import com.example.parcialFashionEvent.repositories.IPortafolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PortafolioService {

    @Autowired
    private IPortafolioRepository portafolioRepository;


}
