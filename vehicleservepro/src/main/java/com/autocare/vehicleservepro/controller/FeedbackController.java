package com.autocare.vehicleservepro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.autocare.vehicleservepro.entity.Feedback;
import com.autocare.vehicleservepro.repository.FeedbackRepository;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "https://vehicle-serve-pro.vercel.app") 
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @PostMapping
    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
        Feedback savedFeedback = feedbackRepository.save(feedback);
        return ResponseEntity.ok(savedFeedback);
    }

   
    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        return ResponseEntity.ok(feedbackRepository.findAll());
    }

    
    @GetMapping("/public")
    public ResponseEntity<List<Feedback>> getFeedbackPublic() {

        List<Feedback> feedbacks =
                feedbackRepository.findTop5ByOrderByRatingDesc();

        return ResponseEntity.ok(feedbacks);
    }
}