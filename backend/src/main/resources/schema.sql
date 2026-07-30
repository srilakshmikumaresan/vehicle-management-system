-- Vehicle Management System Database Schema
CREATE DATABASE IF NOT EXISTS vms_db;
USE vms_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'ROLE_DRIVER',
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drivers Table
CREATE TABLE IF NOT EXISTS drivers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNIQUE,
    driver_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    license_expiry DATE NOT NULL,
    experience_years INT DEFAULT 0,
    photo_url VARCHAR(255),
    status VARCHAR(20) DEFAULT 'AVAILABLE', -- AVAILABLE, DRIVING, ON_LEAVE
    assigned_vehicle_id BIGINT,
    rating DECIMAL(3,2) DEFAULT 4.5,
    completed_trips INT DEFAULT 0
);

-- Vehicles Table
CREATE TABLE IF NOT EXISTS vehicles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    vehicle_number VARCHAR(20) UNIQUE NOT NULL,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    vehicle_type VARCHAR(30) NOT NULL, -- SUV, Sedan, Truck, Van, Bus
    manufacturing_year INT NOT NULL,
    purchase_date DATE,
    fuel_type VARCHAR(20) NOT NULL, -- Diesel, Petrol, Electric, Hybrid
    mileage_km DOUBLE DEFAULT 0,
    registration_number VARCHAR(50) UNIQUE NOT NULL,
    rc_number VARCHAR(50) NOT NULL,
    insurance_number VARCHAR(50) NOT NULL,
    insurance_expiry DATE NOT NULL,
    pollution_certificate VARCHAR(50),
    pollution_expiry DATE,
    status VARCHAR(20) DEFAULT 'AVAILABLE', -- AVAILABLE, ASSIGNED, ON_TRIP, MAINTENANCE, INACTIVE
    health_score INT DEFAULT 95,
    assigned_driver_id BIGINT,
    current_latitude DOUBLE DEFAULT 12.9716,
    current_longitude DOUBLE DEFAULT 77.5946,
    image_url VARCHAR(255)
);

-- Allocations Table
CREATE TABLE IF NOT EXISTS vehicle_allocations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id BIGINT NOT NULL,
    driver_id BIGINT NOT NULL,
    assignment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    return_date TIMESTAMP NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, RETURNED, CANCELLED
    notes TEXT,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE
);

-- Trips Table
CREATE TABLE IF NOT EXISTS trips (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    trip_code VARCHAR(20) UNIQUE NOT NULL,
    vehicle_id BIGINT NOT NULL,
    driver_id BIGINT NOT NULL,
    source VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    purpose VARCHAR(255),
    distance_km DOUBLE NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME,
    fuel_consumed_liters DOUBLE DEFAULT 0,
    status VARCHAR(20) DEFAULT 'SCHEDULED', -- SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED, BREAKDOWN
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    FOREIGN KEY (driver_id) REFERENCES drivers(id)
);

-- Fuel Logs Table
CREATE TABLE IF NOT EXISTS fuel_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id BIGINT NOT NULL,
    fuel_quantity_liters DOUBLE NOT NULL,
    fuel_type VARCHAR(20) NOT NULL,
    cost_total DOUBLE NOT NULL,
    mileage_at_fill DOUBLE NOT NULL,
    fuel_station VARCHAR(100),
    log_date DATE NOT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

-- Maintenance Logs Table
CREATE TABLE IF NOT EXISTS maintenance_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id BIGINT NOT NULL,
    service_date DATE NOT NULL,
    service_type VARCHAR(50) NOT NULL, -- Routine, Engine repair, Tyre replacement, Brake overhaul, Insurance inspection
    cost DOUBLE NOT NULL,
    workshop_name VARCHAR(100) NOT NULL,
    description TEXT,
    next_service_due DATE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

-- Emergency Breakdowns Table
CREATE TABLE IF NOT EXISTS breakdown_reports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id BIGINT NOT NULL,
    driver_id BIGINT NOT NULL,
    location VARCHAR(255) NOT NULL,
    latitude DOUBLE,
    longitude DOUBLE,
    description TEXT NOT NULL,
    image_url VARCHAR(255),
    report_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'REPORTED', -- REPORTED, IN_PROGRESS, RESOLVED
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    FOREIGN KEY (driver_id) REFERENCES drivers(id)
);
