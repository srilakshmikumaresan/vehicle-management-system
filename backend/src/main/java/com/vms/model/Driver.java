package com.vms.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "drivers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @Column(unique = true, nullable = false)
    private String driverCode;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

    private String address;

    @Column(unique = true, nullable = false)
    private String licenseNumber;

    @Column(nullable = false)
    private LocalDate licenseExpiry;

    private Integer experienceYears;

    private String photoUrl;

    @Column(nullable = false)
    private String status; // AVAILABLE, DRIVING, ON_LEAVE

    private Long assignedVehicleId;

    private Double rating;

    private Integer completedTrips;
}
