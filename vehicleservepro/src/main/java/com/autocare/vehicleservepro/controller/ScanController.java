package com.autocare.vehicleservepro.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.springframework.beans.factory.annotation.Value;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api")  
public class ScanController {

    @Value("${clarifai.api.key}")
    private String apiKey;
 

    @PostMapping("/scan")
public ResponseEntity<Object> handleScan(@RequestBody Map<String, String> payload) {

    String imageBase64 = payload.get("imageBase64");

        String clarifaiUrl =
    "https://api.clarifai.com/v2/models/vehicle-recognition/outputs";

    String apiKey = System.getenv("CLARIFAI_API_KEY");

    RestTemplate restTemplate = new RestTemplate();

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.set("Authorization", "Key " + apiKey);

    Map<String, Object> body = Map.of(
        "inputs", List.of(
            Map.of("data", Map.of("image", Map.of("base64", imageBase64)))
        )
    );

    HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

    try {
        ResponseEntity<Object> response =
                restTemplate.postForEntity(clarifaiUrl, entity, Object.class);

        return ResponseEntity.ok(response.getBody());

    } catch (Exception e) {
        return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
    }
}

}