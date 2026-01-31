package com.autocare.vehicleservepro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@EnableScheduling
@SpringBootApplication
public class VehicleserveproApplication {

	public static void main(String[] args) {
		SpringApplication.run(VehicleserveproApplication.class, args);
	}

}
