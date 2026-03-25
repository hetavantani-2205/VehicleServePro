package com.autocare.vehicleservepro.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class NewsService {

    @Value("${NEWS_API_KEY}")
    private String apiKey;

    public List<Map<String, Object>> getVehicleNews() {

        WebClient webClient = WebClient.create();

        Map response = webClient.get()
                .uri("https://newsapi.org/v2/everything?q=vehicle repair OR car maintenance&apiKey=" + apiKey)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        return (List<Map<String, Object>>) response.get("articles");
    }
}