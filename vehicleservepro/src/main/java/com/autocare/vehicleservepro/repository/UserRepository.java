package com.autocare.vehicleservepro.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.autocare.vehicleservepro.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
