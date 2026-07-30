package com.vms.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "maintenance_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaintenanceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long vehicleId;

    @Column(nullable = false)
    private LocalDate serviceDate;

    @Column(nullable = false)
    private String serviceType;

    @Column(nullable = false)
    private Double cost;

    @Column(nullable = false)
    private String workshopName;

    private String description;

    private LocalDate nextServiceDue;
}
