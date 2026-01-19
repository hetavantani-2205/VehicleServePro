package com.autocare.vehicleservepro.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.autocare.vehicleservepro.entity.User;
import com.autocare.vehicleservepro.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
            
    }

     public List<User> getAllUsers() {
        return userRepository.findAll();
     }

      public void deleteUser(Long id) {
        userRepository.deleteById(id);
      }
    
}
