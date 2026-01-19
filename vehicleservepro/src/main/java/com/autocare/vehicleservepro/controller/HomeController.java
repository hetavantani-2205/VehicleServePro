package com.autocare.vehicleservepro.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "VehicleServePro 360 backend is running successfully";
    }
}

