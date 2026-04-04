package com.autocare.vehicleservepro.controller;

import com.autocare.vehicleservepro.entity.Booking;
import com.autocare.vehicleservepro.repository.BookingRepository;
import com.autocare.vehicleservepro.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "https://vehicle-serve-pro.vercel.app")
public class AdminReportController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {

        List<Booking> bookings = bookingRepository.findAll();

        int totalBookings = bookings.size();

        double totalRevenue = bookings.stream()
                .mapToDouble(b -> b.getPrice() != null ? b.getPrice() : 0)
                .sum();

        long completed = bookings.stream()
                .filter(b -> "COMPLETED".equalsIgnoreCase(b.getStatus()))
                .count();

        long inProgress = bookings.stream()
                .filter(b -> "IN PROGRESS".equalsIgnoreCase(b.getStatus()))
                .count();

        long pending = bookings.stream()
                .filter(b -> "PENDING".equalsIgnoreCase(b.getStatus()))
                .count();

        long totalUsers = userRepository.count();

        Map<String, Object> data = new HashMap<>();
        data.put("totalUsers", totalUsers);
        data.put("totalBookings", totalBookings);
        data.put("totalRevenue", totalRevenue);
        data.put("completed", completed);
        data.put("inProgress", inProgress);
        data.put("pending", pending);

        return data;
    }
}