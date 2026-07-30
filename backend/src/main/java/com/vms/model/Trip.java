package com.vms.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "trips")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String tripCode;

    @Column(nullable = false)
    private Long vehicleId;

    @Column(nullable = false)
    private Long driverId;

    @Column(nullable = false)
    private String source;

    @Column(nullable = false)
    private String destination;

    private String purpose;

    @Column(nullable = false)
    private Double distanceKm;

    @Column(nullable = false)
    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private Double fuelConsumedLiters;

    @Column(nullable = false)
    private String status; // SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED, BREAKDOWN
}
