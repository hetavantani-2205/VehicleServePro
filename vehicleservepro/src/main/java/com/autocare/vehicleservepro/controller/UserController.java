package com.autocare.vehicleservepro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.autocare.vehicleservepro.entity.User;
import com.autocare.vehicleservepro.service.UserService;



@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "https://vehicle-serve-pro.vercel.app")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public User createUser(@RequestBody User user)
    {

         return userService.saveUser(user);
    }
  
    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

     @DeleteMapping("/{id}")
     public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted";
     }
    
    
}
