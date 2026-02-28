package com.autocare.vehicleservepro.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.autocare.vehicleservepro.entity.User;
import com.autocare.vehicleservepro.repository.UserRepository;

import java.util.Collections;
import java.util.Map;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;




@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository repo;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        repo.save(user);
        return "User registered";
    }
    @PostMapping("/login")
public Map<String,Object> login(@RequestBody User user) {

    User u = repo.findByEmail(user.getEmail()).orElse(null);

    if (u != null && u.getPassword().equals(user.getPassword())) {
        return Map.of(
            "status","success",
             "name",u.getName(),
            "email" , u.getEmail(),
            "role" ,u.getRole() == null ? "CUSTOMER" : u.getRole()
            
        );
    }
    return Map.of("status","failed");
}
@PostMapping("/google")
public Map<String, Object> googleLogin(@RequestBody Map<String, String> data) {

    try {
        String token = data.get("token");

        GoogleIdTokenVerifier verifier =
                new GoogleIdTokenVerifier.Builder(
                        new NetHttpTransport(),
                        GsonFactory.getDefaultInstance()
                )
                .setAudience(Collections.singletonList(
                        "645510715190-tbj3q0l1p4nqmg4055nbk0rlf6os0bm4.apps.googleusercontent.com"
                ))
                .build();

        GoogleIdToken idToken = verifier.verify(token);

        if (idToken == null)
            return Map.of("status", "failed");

        GoogleIdToken.Payload payload = idToken.getPayload();

        String email = payload.getEmail();
        String name = (String) payload.get("name");

        User user = repo.findByEmail(email).orElse(null);

        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setName(name);
            user.setPassword("GOOGLE_USER");
            user.setRole("CUSTOMER");
            repo.save(user);
        }

        return Map.of(
                "status", "success",
                "name", user.getName(),
                "email", user.getEmail(),
                "role", user.getRole() == null ? "CUSTOMER" : user.getRole()
        );

    } catch (Exception e) {
        e.printStackTrace();
        return Map.of("status", "failed");
    }
}

}





    


    

