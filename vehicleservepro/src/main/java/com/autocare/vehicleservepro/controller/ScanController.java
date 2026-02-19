package com.autocare.vehicleservepro.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "https://vehicle-serve-pro.vercel.app")
public class ScanController {

    @PostMapping("/scan")
    public ResponseEntity<Object> handleScan(@RequestBody Map<String, String> payload) {
        String imageBase64 = payload.get("imageBase64");
        String apiKey = System.getenv("GEMINI_API_KEY");

     
       String geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=" + apiKey;

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        
        Map<String, Object> body = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(
                    Map.of("text", "Identify any car damage in this image. List only the damaged parts and a confidence percentage from 0 to 1 for each. Format as a list of concepts."),
                    Map.of("inline_data", Map.of(
                        "mime_type", "image/png",
                        "data", imageBase64
                    ))
                ))
            )
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Object> response = restTemplate.postForEntity(geminiUrl, entity, Object.class);
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Gemini API Error: " + e.getMessage()));
        }
    }
}