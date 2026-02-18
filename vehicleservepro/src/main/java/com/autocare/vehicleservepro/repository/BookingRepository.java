package com.autocare.vehicleservepro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.autocare.vehicleservepro.entity.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {


   
    @Query("SELECT SUM(b.price) FROM Booking b")
    Double getTotalRevenue();

    @Query("SELECT b.serviceType, COUNT(b), SUM(b.price) FROM Booking b GROUP BY b.serviceType")
    List<Object[]> getServiceStats();

   
    @Query("SELECT b.city, COUNT(b) FROM Booking b GROUP BY b.city")
    List<Object[]> getCityStats();
    
  
   
}