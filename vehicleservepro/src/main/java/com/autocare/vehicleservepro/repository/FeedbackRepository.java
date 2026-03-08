package com.autocare.vehicleservepro.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.autocare.vehicleservepro.entity.Feedback;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    List<Feedback> findTop5ByOrderByRatingDesc();
    
}