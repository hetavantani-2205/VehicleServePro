package com.autocare.vehicleservepro.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "service_centers")
public class ServiceCenter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

  
    public ServiceCenter() {}

   
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public City getCity() { return city; }
    public void setCity(City city) { this.city = city; }
}