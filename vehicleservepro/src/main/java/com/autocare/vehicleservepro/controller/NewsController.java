package com.autocare.vehicleservepro.controller;

import org.springframework.web.bind.annotation.*;

import com.autocare.vehicleservepro.service.NewsService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "https://vehicle-serve-pro.vercel.app")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping("/vehicle")
    public List<Map<String, Object>> getVehicleNews() {
        return newsService.getVehicleNews();

    }
}