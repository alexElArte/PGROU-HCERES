package org.centrale.hceres;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication(scanBasePackages = {"org.centrale.hceres.*"})
@Configuration
public class HceresApplication {

	public static void main(String[] args) {
		SpringApplication.run(HceresApplication.class, args);
	}
}

