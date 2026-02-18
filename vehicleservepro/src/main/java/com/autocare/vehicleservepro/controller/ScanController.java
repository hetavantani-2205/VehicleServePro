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
    public ResponseEntity<?> handleScan(@RequestBody Map<String, String> payload) {

        try {

            String imageBase64 = payload.get("imageBase64");

            if (imageBase64 == null || imageBase64.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Image data missing"));
            }

            String clarifaiUrl =
                    "https://api.clarifai.com/v2/models/general-image-detection/outputs";

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Key " + apiKey);

            Map<String, Object> body = Map.of(
                    "inputs", List.of(
                            Map.of("data",
                                    Map.of("image",
                                            Map.of("base64", imageBase64)
                                    )
                            )
                    )
            );

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(body, headers);

            ResponseEntity<Object> response =
                    restTemplate.exchange(
                            clarifaiUrl,
                            HttpMethod.POST,
                            entity,
                            Object.class
                    );

            if (!response.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.status(response.getStatusCode())
                        .body(Map.of("error", "Clarifai API error"));
            }

            return ResponseEntity.ok(response.getBody());

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}