package com.autocare.vehicleservepro.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import com.autocare.vehicleservepro.entity.Booking;
import com.autocare.vehicleservepro.repository.BookingRepository;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "https://vehicle-serve-pro.vercel.app")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

  


    @PostMapping("/add")
public ResponseEntity<Booking> saveBooking(@RequestBody Booking booking) {
    try {

        booking.setStatus("PENDING");

        double total = 0;

        if (booking.getServiceType() != null) {

            String[] services = booking.getServiceType().split(",");

            for (String service : services) {
                switch (service.trim()) {

                    case "Oil Change":
                        total += 1200;
                        break;

                    case "Brake Inspection":
                        total += 800;
                        break;

                    case "Wheel Alignment":
                        total += 1500;
                        break;

                    case "Battery Check":
                        total += 500;
                        break;
                }
            }
        }

        booking.setPrice(total);

        Booking saved = bookingRepository.save(booking);

        return ResponseEntity.ok(saved);

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).build();
    }
}

   @GetMapping
public List<Booking> getBookings(@RequestParam(value = "email", required = false) String email) {
    if (email != null && !email.isEmpty()) {
       
        return bookingRepository.findByEmail(email);
    }
    return bookingRepository.findAll();
}

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBooking(@PathVariable Long id) {
        return bookingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    
    @PutMapping("/update-status/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> data) {

        if (!data.containsKey("status")) {
            return ResponseEntity.badRequest().body("Missing status");
        }

        return bookingRepository.findById(id)
                .map(booking -> {
                    String newStatus = data.get("status").trim().toUpperCase();
                    booking.setStatus(newStatus);

                    Booking updated = bookingRepository.save(booking);

                   

                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}