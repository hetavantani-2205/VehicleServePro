package com.autocare.vehicleservepro.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.autocare.vehicleservepro.entity.ServiceCenter;

import java.util.List;

public interface ServiceCenterRepository extends JpaRepository<ServiceCenter, Long> {
    
    List<ServiceCenter> findByCityName(String cityName);
}