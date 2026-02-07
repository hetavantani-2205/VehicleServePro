package com.autocare.vehicleservepro.controller;

import com.autocare.vehicleservepro.entity.ServiceCenter;
import com.autocare.vehicleservepro.repository.ServiceCenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/centers")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceCenterController {

    @Autowired
    private ServiceCenterRepository serviceCenterRepository;

    @GetMapping
    public List<ServiceCenter> getCentersByCity(@RequestParam("city") String cityName) {
       
        return serviceCenterRepository.findByCityName(cityName);
    }
}