package com.autocare.vehicleservepro.controller;

import com.autocare.vehicleservepro.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminReportController {

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/dashboard-stats")
    public Map<String, Object> getStats() {
        Map<String, Object> response = new HashMap<>();
        
        response.put("totalBookings", bookingRepository.count());
        response.put("totalRevenue", bookingRepository.getTotalRevenue());
        response.put("serviceBreakdown", bookingRepository.getServiceStats());
        response.put("cityBreakdown", bookingRepository.getCityStats());
        
        return response;
    }
}