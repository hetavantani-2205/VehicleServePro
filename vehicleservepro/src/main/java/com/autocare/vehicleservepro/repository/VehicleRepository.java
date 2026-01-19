package com.autocare.vehicleservepro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.autocare.vehicleservepro.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}
