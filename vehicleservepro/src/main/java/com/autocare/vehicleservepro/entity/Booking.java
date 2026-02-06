package com.autocare.vehicleservepro.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "bookings")
public class Booking {

    @Column(name = "status",nullable = false)
    private String status;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customer_name", nullable = false)
    private String name;

    @Column(name = "car_number", nullable = false)
    private String carNumber;

    @Column(name = "chassis_number", nullable = false)
    private String chassisNumber;

    @Column(name = "service_type")
    private String serviceType;

    @Column(name = "oil_health") 
    private Integer oilHealth;

    @Column(name = "tire_health")
    private Integer tireHealth;

    @Column(name = "battery_health")
    private Integer batteryHealth;

   

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCarNumber() {
        return carNumber;
    }

    public void setCarNumber(String carNumber) {
        this.carNumber = carNumber;
    }

    public String getChassisNumber() {
        return chassisNumber;
    }

    public void setChassisNumber(String chassisNumber) {
        this.chassisNumber = chassisNumber;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getOilHealth() { return oilHealth; }
    public void setOilHealth(Integer oilHealth) { this.oilHealth = oilHealth; }

    public Integer getTireHealth() { return tireHealth; }
    public void setTireHealth(Integer tireHealth) { this.tireHealth = tireHealth; }

    public Integer getBatteryHealth() { return batteryHealth; }
    public void setBatteryHealth(Integer batteryHealth) { this.batteryHealth = batteryHealth; }


}
