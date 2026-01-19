package com.autocare.vehicleservepro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.autocare.vehicleservepro.entity.Vehicle;
import com.autocare.vehicleservepro.service.VehicleService;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "http://localhost:5173")
public class VehicleController {

    @Autowired
    private VehicleService service;

    @GetMapping
    public List<Vehicle> getVehicles() {
        return service.getAllVehicles();
    }

    @PostMapping
    public Vehicle addVehicle(@RequestBody Vehicle vehicle) {
        return service.saveVehicle(vehicle);
    }

    @DeleteMapping("/{id}")
    public String deleteVehicle(@PathVariable Long id) {
        service.deleteVehicle(id);
        return "Vehicle deleted";
    }
   
    @PutMapping("/{id}")
    public Vehicle updateVehicle(
        @PathVariable Long id,
        @RequestBody Vehicle vehicle) {
    return service.updateVehicle(id, vehicle);
}

}


