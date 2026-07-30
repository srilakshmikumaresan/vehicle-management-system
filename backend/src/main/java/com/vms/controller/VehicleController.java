package com.vms.controller;

import com.vms.model.Vehicle;
import com.vms.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicles")
@CrossOrigin(origins = "*")
public class VehicleController {

    @Autowired
    private VehicleRepository vehicleRepository;

    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
        return vehicleRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Vehicle createVehicle(@RequestBody Vehicle vehicle) {
        if (vehicle.getHealthScore() == null) {
            vehicle.setHealthScore(95);
        }
        return vehicleRepository.save(vehicle);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @RequestBody Vehicle details) {
        return vehicleRepository.findById(id).map(vehicle -> {
            vehicle.setBrand(details.getBrand());
            vehicle.setModel(details.getModel());
            vehicle.setVehicleType(details.getVehicleType());
            vehicle.setManufacturingYear(details.getManufacturingYear());
            vehicle.setFuelType(details.getFuelType());
            vehicle.setMileageKm(details.getMileageKm());
            vehicle.setRegistrationNumber(details.getRegistrationNumber());
            vehicle.setInsuranceNumber(details.getInsuranceNumber());
            vehicle.setInsuranceExpiry(details.getInsuranceExpiry());
            vehicle.setStatus(details.getStatus());
            vehicle.setHealthScore(details.getHealthScore());
            return ResponseEntity.ok(vehicleRepository.save(vehicle));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        if (vehicleRepository.existsById(id)) {
            vehicleRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
