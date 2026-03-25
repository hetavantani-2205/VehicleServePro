package com.autocare.vehicleservepro.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import reactor.netty.http.client.HttpClient;
import reactor.netty.resources.ConnectionProvider;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

@Service
public class NewsService {

    @Value("${NEWS_API_KEY:}")
    private String apiKey;

    public List<Map<String, Object>> getVehicleNews() {
        try {
            // Validate API key exists
            if (apiKey == null || apiKey.trim().isEmpty()) {
                System.err.println("WARNING: NEWS_API_KEY environment variable is not set! Using default news.");
                return getDefaultNews();
            }

            // Configure WebClient with timeout
            ConnectionProvider connectionProvider = ConnectionProvider.builder("custom")
                    .maxConnections(50)
                    .maxIdleTime(java.time.Duration.ofSeconds(20))
                    .build();

            HttpClient httpClient = HttpClient.create(connectionProvider)
                    .responseTimeout(java.time.Duration.ofSeconds(10))
                    .doOnConnected(conn -> conn
                            .addHandlerLast(new ReadTimeoutHandler(10, TimeUnit.SECONDS))
                            .addHandlerLast(new WriteTimeoutHandler(10, TimeUnit.SECONDS))
                    );

            WebClient webClient = WebClient.builder()
                    .clientConnector(new ReactorClientHttpConnector(httpClient))
                    .build();

            Map response = webClient.get()
                    .uri("https://newsapi.org/v2/everything?q=vehicle repair OR car maintenance&apiKey=" + apiKey + "&sortBy=publishedAt&language=en&pageSize=20")
                    .retrieve()
                    .bodyToMono(Map.class)
                    .timeout(java.time.Duration.ofSeconds(12))
                    .block();

            // Check if response is valid
            if (response == null || response.isEmpty()) {
                System.err.println("NEWS API returned empty response. Using default news.");
                return getDefaultNews();
            }

            // Check API response status
            String status = (String) response.get("status");
            if (!"ok".equals(status)) {
                String message = (String) response.get("message");
                System.err.println("NEWS API Error: " + message + ". Using default news.");
                return getDefaultNews();
            }

            List<Map<String, Object>> articles = (List<Map<String, Object>>) response.get("articles");
            if (articles == null || articles.isEmpty()) {
                System.err.println("No articles found in NEWS API response. Using default news.");
                return getDefaultNews();
            }

            System.out.println("Successfully fetched " + articles.size() + " articles from NEWS API");
            return articles;

        } catch (WebClientRequestException e) {
            System.err.println("Connection error fetching news from newsapi.org: " + e.getMessage());
            System.err.println("This is likely due to network connectivity or firewall restrictions.");
            System.err.println("Using default news instead.");
            return getDefaultNews();
        } catch (WebClientResponseException e) {
            System.err.println("WebClient HTTP error fetching news: " + e.getMessage());
            System.err.println("Status code: " + e.getStatusCode());
            System.err.println("Using default news instead.");
            return getDefaultNews();
        } catch (Exception e) {
            System.err.println("Unexpected error fetching vehicle news: " + e.getClass().getName() + " - " + e.getMessage());
            e.printStackTrace();
            System.err.println("Using default news instead.");
            return getDefaultNews();
        }
    }

    // Fallback method with default news if API fails
    private List<Map<String, Object>> getDefaultNews() {
        List<Map<String, Object>> defaultNews = new ArrayList<>();

        Map<String, Object> article1 = new HashMap<>();
        article1.put("title", "Vehicle Maintenance Tips for 2026");
        article1.put("description", "Learn the essential maintenance tips to keep your vehicle in top condition throughout 2026");
        article1.put("urlToImage", "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400");
        article1.put("content", "Regular maintenance is the key to vehicle longevity. Check your oil regularly, rotate tires, and keep your brakes in good condition.");
        article1.put("url", "#");
        article1.put("author", "Auto Care Team");
        article1.put("publishedAt", LocalDateTime.now().toString());
        article1.put("source", new HashMap<String, Object>() {{ put("name", "VehicleServePro"); }});
        defaultNews.add(article1);

        Map<String, Object> article2 = new HashMap<>();
        article2.put("title", "Electric Vehicles: The Future of Transportation");
        article2.put("description", "Explore the rapid growth of electric vehicles and their impact on the automotive industry");
        article2.put("urlToImage", "https://images.unsplash.com/photo-1560958089-b8a63c60c37e?w=400");
        article2.put("content", "Electric vehicles are revolutionizing the way we think about transportation with zero emissions and lower maintenance costs.");
        article2.put("url", "#");
        article2.put("author", "Auto Care Team");
        article2.put("publishedAt", LocalDateTime.now().toString());
        article2.put("source", new HashMap<String, Object>() {{ put("name", "VehicleServePro"); }});
        defaultNews.add(article2);

        return defaultNews;
    }
}