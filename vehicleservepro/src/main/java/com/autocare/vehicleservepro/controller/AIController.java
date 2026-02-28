package com.autocare.vehicleservepro.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
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

            if (symptom == null || symptom.isBlank()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Symptom is required"));
            }

            String apiKey = System.getenv("GEMINI_API_KEY");

            if (apiKey == null || apiKey.isBlank()) {
                return ResponseEntity.status(500)
                        .body(Map.of("error", "GEMINI_API_KEY not found in environment"));
            }

          String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String prompt = """
            You are an expert automobile mechanic.

            If the user mentions a car brand or model, tailor your advice specifically to that vehicle.
            If no car model is mentioned, give general advice.

           Give a short and practical answer (maximum 8 lines).
           Avoid long explanations.

           User Problem:
           """ + symptom;

            Map<String, Object> body = Map.of(
                    "contents", List.of(
                            Map.of("parts", List.of(
                                    Map.of("text", prompt)
                            ))
                    )
            );

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response =
                    restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

            Map responseBody = response.getBody();

            if (responseBody == null || !responseBody.containsKey("candidates")) {
                return ResponseEntity.status(500)
                        .body(Map.of("error", "Invalid AI response", "raw", responseBody));
            }

            List candidates = (List) responseBody.get("candidates");

            if (candidates.isEmpty()) {
                return ResponseEntity.status(500)
                        .body(Map.of("error", "No AI candidates returned"));
            }

            Map firstCandidate = (Map) candidates.get(0);
            Map content = (Map) firstCandidate.get("content");
            List parts = (List) content.get("parts");
            Map firstPart = (Map) parts.get(0);

            String aiText = (String) firstPart.get("text");

            return ResponseEntity.ok(Map.of("advice", aiText));

        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}