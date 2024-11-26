package com.example.parcialFashionEvent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class ParcialFashionEventApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().load();
		System.setProperty("DB_URL", dotenv.get("DB_URL"));
		System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
		System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
		System.setProperty("FRONT_URL", dotenv.get("FRONT_URL"));
		System.setProperty("CODIGO_MERCADOPAGO", dotenv.get("CODIGO_MERCADOPAGO"));

		SpringApplication.run(ParcialFashionEventApplication.class, args);
	}

}
