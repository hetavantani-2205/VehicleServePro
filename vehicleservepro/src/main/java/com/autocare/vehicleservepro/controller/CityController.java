package com.autocare.vehicleservepro.controller;

import com.autocare.vehicleservepro.entity.City;
import com.autocare.vehicleservepro.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cities")
@CrossOrigin(origins = "http://localhost:5173")
public class CityController {

    @Autowired
    private CityRepository cityRepository;

    @GetMapping
    public List<City> getAllCities() {
       
        return cityRepository.findAll();
    }
}