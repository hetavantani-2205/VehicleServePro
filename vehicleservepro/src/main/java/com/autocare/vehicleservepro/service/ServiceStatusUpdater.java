package com.autocare.vehicleservepro.service;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.autocare.vehicleservepro.entity.Booking;
import com.autocare.vehicleservepro.repository.BookingRepository;

@Service
public class ServiceStatusUpdater {

    private final BookingRepository repo;

    private final String[] flow = {
        "PENDING", "RECEIVED", "SERVICING", "WASHING", "READY", "COMPLETED"
    };

    public ServiceStatusUpdater(BookingRepository repo) {
        this.repo = repo;
    }

    @Scheduled(fixedRate = 60000) // every 1 minute
    public void updateStatuses() {
        List<Booking> bookings = repo.findAll();

        for (Booking b : bookings) {
            for (int i = 0; i < flow.length - 1; i++) {
                if (b.getStatus().equals(flow[i])) {
                    b.setStatus(flow[i + 1]);
                    repo.save(b);
                    break;
                }
            }
        }
    }
}
