package com.autocare.vehicleservepro.controller;

import java.util.List;
import java.util.Map;


import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "https://vehicle-serve-pro.vercel.app")
public class AIController {

    @PostMapping("/diagnose")
    public ResponseEntity<?> diagnose(@RequestBody Map<String, String> payload) {
        try {
            String symptom = payload.get("symptom");
            String apiKey = System.getenv("GEMINI_API_KEY");

         
            if (apiKey == null || apiKey.isEmpty()) {
                return ResponseEntity.status(500).body(Map.of("error", "API Key not found in Environment Variables"));
            }

            String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;

            RestTemplate restTemplate = new RestTemplate();

 
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String prompt = "You are a professional senior car mechanic. A customer says: \""
                    + symptom + "\". Briefly explain what might be wrong. Suggest 2-3 maintenance checks. End with: Would you like to book an inspection?";

            
            Map<String, Object> body = Map.of(
                "contents", List.of(
                    Map.of("parts", List.of(
                        Map.of("text", prompt)
                    ))
                )
            );

      
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

            Map responseBody = response.getBody();


List candidates = (List) responseBody.get("candidates");
Map firstCandidate = (Map) candidates.get(0);
Map content = (Map) firstCandidate.get("content");
List parts = (List) content.get("parts");
Map firstPart = (Map) parts.get(0);

String aiText = (String) firstPart.get("text");


return ResponseEntity.ok(Map.of("advice", aiText));

          
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}