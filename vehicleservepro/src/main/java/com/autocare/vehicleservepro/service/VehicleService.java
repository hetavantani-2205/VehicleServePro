package com.autocare.vehicleservepro.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.autocare.vehicleservepro.entity.Vehicle;
import com.autocare.vehicleservepro.repository.VehicleRepository;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository repo;

    public Vehicle saveVehicle(Vehicle v) {
        return repo.save(v);
    }

    public List<Vehicle> getAllVehicles() {
        return repo.findAll();
    }

    public void deleteVehicle(Long id) {
        repo.deleteById(id);
    }

    public Vehicle updateVehicle(Long id, Vehicle updatedVehicle) {
    Vehicle v = repo.findById(id).orElseThrow();
    v.setOwnerName(updatedVehicle.getOwnerName());
    v.setVehicleModel(updatedVehicle.getVehicleModel());
    v.setVehicleNumber(updatedVehicle.getVehicleNumber());
    return repo.save(v);
}

}
