package com.vms.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "vehicles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String vehicleNumber;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private String vehicleType;

    private Integer manufacturingYear;

    private LocalDate purchaseDate;

    @Column(nullable = false)
    private String fuelType;

    private Double mileageKm;

    @Column(unique = true, nullable = false)
    private String registrationNumber;

    private String rcNumber;

    private String insuranceNumber;

    private LocalDate insuranceExpiry;

    private String pollutionCertificate;

    private LocalDate pollutionExpiry;

    @Column(nullable = false)
    private String status; // AVAILABLE, ASSIGNED, ON_TRIP, MAINTENANCE, INACTIVE

    private Integer healthScore;

    private Long assignedDriverId;

    private Double currentLatitude;

    private Double currentLongitude;

    private String imageUrl;
}
