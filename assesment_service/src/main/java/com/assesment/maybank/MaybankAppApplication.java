package com.assesment.maybank;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class MaybankAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(MaybankAppApplication.class, args);
	}

}
