package com.vms.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "fuel_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FuelLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long vehicleId;

    @Column(nullable = false)
    private Double fuelQuantityLiters;

    @Column(nullable = false)
    private String fuelType;

    @Column(nullable = false)
    private Double costTotal;

    @Column(nullable = false)
    private Double mileageAtFill;

    private String fuelStation;

    @Column(nullable = false)
    private LocalDate logDate;
}
