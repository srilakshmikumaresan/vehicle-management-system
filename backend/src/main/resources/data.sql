-- Initial Seed Data for Vehicle Management System

-- Users (Pass: password123 hashed via BCrypt)
INSERT INTO users (id, name, email, password, role, phone) VALUES
(1, 'System Administrator', 'admin@fleet.com', '$2a$10$e7a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z', 'ROLE_ADMIN', '+1 (555) 019-2834'),
(2, 'Robert Johnson', 'robert.j@fleet.com', '$2a$10$e7a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z', 'ROLE_DRIVER', '+1 (555) 382-9102'),
(3, 'Sarah Connor', 'sarah.c@fleet.com', '$2a$10$e7a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z', 'ROLE_DRIVER', '+1 (555) 492-1049');

-- Drivers
INSERT INTO drivers (id, user_id, driver_code, name, email, phone, address, license_number, license_expiry, experience_years, status, rating, completed_trips) VALUES
(1, 2, 'DRV-1001', 'Robert Johnson', 'robert.j@fleet.com', '+1 (555) 382-9102', '742 Evergreen Terrace, Springfield', 'DL-98234109', '2027-11-15', 7, 'DRIVING', 4.9, 142),
(2, 3, 'DRV-1002', 'Sarah Connor', 'sarah.c@fleet.com', '+1 (555) 492-1049', '100 Industrial Parkway, Cyberdyne', 'DL-55421098', '2026-08-10', 9, 'AVAILABLE', 4.8, 215),
(3, NULL, 'DRV-1003', 'Michael Scott', 'michael.s@fleet.com', '+1 (555) 902-1122', '1725 Slough Avenue, Scranton', 'DL-33491029', '2026-08-05', 4, 'AVAILABLE', 4.6, 88),
(4, NULL, 'DRV-1004', 'Elena Rostova', 'elena.r@fleet.com', '+1 (555) 671-8833', '458 Metro Plaza, New York', 'DL-77120934', '2028-03-22', 6, 'ON_LEAVE', 4.9, 176);

-- Vehicles
INSERT INTO vehicles (id, vehicle_number, brand, model, vehicle_type, manufacturing_year, purchase_date, fuel_type, mileage_km, registration_number, rc_number, insurance_number, insurance_expiry, pollution_certificate, pollution_expiry, status, health_score, assigned_driver_id, current_latitude, current_longitude) VALUES
(1, 'V-101', 'Ford', 'Transit Van 350', 'Van', 2022, '2022-03-15', 'Diesel', 45200.5, 'REG-FLT-101', 'RC-9901823', 'INS-POL-88102', '2026-08-12', 'PUC-9021', '2026-09-30', 'ON_TRIP', 92, 1, 12.9716, 77.5946),
(2, 'V-102', 'Volvo', 'FH16 Heavy Hauler', 'Truck', 2021, '2021-06-20', 'Diesel', 112400.0, 'REG-FLT-102', 'RC-9901824', 'INS-POL-88103', '2026-08-05', 'PUC-9022', '2026-08-20', 'AVAILABLE', 78, 2, 12.9352, 77.6245),
(3, 'V-103', 'Toyota', 'RAV4 Hybrid Enterprise', 'SUV', 2023, '2023-01-10', 'Hybrid', 22100.8, 'REG-FLT-103', 'RC-9901825', 'INS-POL-88104', '2027-01-10', 'PUC-9023', '2027-01-10', 'AVAILABLE', 98, NULL, 12.9810, 77.6100),
(4, 'V-104', 'Mercedes-Benz', 'Sprinter Cargo', 'Van', 2020, '2020-09-05', 'Diesel', 89300.2, 'REG-FLT-104', 'RC-9901826', 'INS-POL-88105', '2026-07-28', 'PUC-9024', '2026-08-01', 'MAINTENANCE', 64, NULL, 12.9600, 77.5800),
(5, 'V-105', 'Tesla', 'Model Y Fleet', 'Electric', 2024, '2024-02-01', 'Electric', 12400.0, 'REG-FLT-105', 'RC-9901827', 'INS-POL-88106', '2028-02-01', 'PUC-EXEMPT', '2028-02-01', 'ASSIGNED', 100, 3, 12.9200, 77.6800);

-- Trips
INSERT INTO trips (id, trip_code, vehicle_id, driver_id, source, destination, purpose, distance_km, start_time, end_time, fuel_consumed_liters, status) VALUES
(1, 'TRP-8801', 1, 1, 'Central Depot - Bay 4', 'Northside Distribution Center', 'Cargo Express Delivery', 84.5, '2026-07-30 07:30:00', NULL, 8.2, 'IN_PROGRESS'),
(2, 'TRP-8802', 2, 2, 'South Port Terminal', 'Eastgate Logistics Hub', 'Container Freight Transport', 190.0, '2026-07-29 08:00:00', '2026-07-29 13:45:00', 32.5, 'COMPLETED'),
(3, 'TRP-8803', 3, 3, 'Headquarters', 'Regional Executive Summit', 'Executive Transport', 45.0, '2026-07-31 09:00:00', NULL, 0, 'SCHEDULED');

-- Fuel Logs
INSERT INTO fuel_logs (id, vehicle_id, fuel_quantity_liters, fuel_type, cost_total, mileage_at_fill, fuel_station, log_date) VALUES
(1, 1, 50.0, 'Diesel', 85.50, 45100.0, 'Shell Express Bay #2', '2026-07-28'),
(2, 2, 120.0, 'Diesel', 204.00, 112200.0, 'BP Mega Fuel Depot', '2026-07-26'),
(3, 3, 35.0, 'Petrol', 63.00, 22000.0, 'Chevron Green Station', '2026-07-25');

-- Maintenance Logs
INSERT INTO maintenance_logs (id, vehicle_id, service_date, service_type, cost, workshop_name, description, next_service_due) VALUES
(1, 4, '2026-07-29', 'Brake overhaul & Transmission fluid', 650.00, 'Precision Auto Care Workshop', 'Replaced front brake pads and flushed transmission fluid after warning diagnostic.', '2027-01-29'),
(2, 2, '2026-05-15', 'Full Engine Service & Oil Replacement', 890.00, 'Volvo Commercial Service Center', 'Scheduled 100k km comprehensive engine checkup.', '2026-11-15');

-- Breakdown Reports
INSERT INTO breakdown_reports (id, vehicle_id, driver_id, location, latitude, longitude, description, report_time, status) VALUES
(1, 4, 1, 'Highway 101 KM 42 Near Exit 8', 12.9600, 77.5800, 'Engine overheat notification triggered with steam from radiator manifold.', '2026-07-29 14:20:00', 'IN_PROGRESS');
