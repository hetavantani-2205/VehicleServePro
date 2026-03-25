package com.autocare.vehicleservepro.entity;

public class NewsArticle {

    private String title;
    private String description;
    private String urlToImage;
    private String content;
    private String url;
    private String author;
    private String publishedAt;
    private String sourceName;


    public NewsArticle() {
    }

    public NewsArticle(String title, String description, String urlToImage,
                       String content, String url, String author,
                       String publishedAt, String sourceName) {
        this.title = title;
        this.description = description;
        this.urlToImage = urlToImage;
        this.content = content;
        this.url = url;
        this.author = author;
        this.publishedAt = publishedAt;
        this.sourceName = sourceName;
    }

    // ===== Getters and Setters =====

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrlToImage() {
        return urlToImage;
    }

    public void setUrlToImage(String urlToImage) {
        this.urlToImage = urlToImage;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublishedAt() {
        return publishedAt;
    }

    public void setPublishedAt(String publishedAt) {
        this.publishedAt = publishedAt;
    }

    public String getSourceName() {
        return sourceName;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }
}