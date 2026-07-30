import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialVehicles,
  initialDrivers,
  initialTrips,
  initialFuelLogs,
  initialMaintenance,
  initialBreakdowns
} from '../mock/initialData';

const FleetContext = createContext();

export const FleetProvider = ({ children }) => {
  const [role, setRole] = useState('ADMIN'); // 'ADMIN' | 'DRIVER'
  const [darkMode, setDarkMode] = useState(true);
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [drivers, setDrivers] = useState(initialDrivers);
  const [trips, setTrips] = useState(initialTrips);
  const [fuelLogs, setFuelLogs] = useState(initialFuelLogs);
  const [maintenance, setMaintenance] = useState(initialMaintenance);
  const [breakdowns, setBreakdowns] = useState(initialBreakdowns);

  const [toasts, setToasts] = useState([
    { id: 1, type: 'warning', title: 'Insurance Expiry Alert', message: 'Vehicle V-104 insurance expired on 2026-07-28' },
    { id: 2, type: 'info', title: 'License Renewal Warning', message: 'Driver Sarah Connor license expires in 11 days' }
  ]);

  // Sync dark mode class on html/body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addToast = (type, title, message) => {
    const id = Date.now();
    setToasts(prev => [ { id, type, title, message }, ...prev ]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // CRUD Operations
  const addVehicle = (vehicle) => {
    const newV = {
      ...vehicle,
      id: Date.now(),
      healthScore: 95,
      status: vehicle.status || 'Available',
      currentLatitude: 12.9716 + (Math.random() * 0.05 - 0.025),
      currentLongitude: 77.5946 + (Math.random() * 0.05 - 0.025),
      imageUrl: vehicle.imageUrl || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80'
    };
    setVehicles(prev => [newV, ...prev]);
    addToast('success', 'Vehicle Added', `Vehicle ${newV.vehicleNumber} successfully added to fleet.`);
  };

  const updateVehicle = (id, updatedFields) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, ...updatedFields } : v));
    addToast('info', 'Vehicle Updated', 'Vehicle details updated successfully.');
  };

  const deleteVehicle = (id) => {
    const v = vehicles.find(item => item.id === id);
    setVehicles(prev => prev.filter(item => item.id !== id));
    addToast('warning', 'Vehicle Deleted', `Vehicle ${v?.vehicleNumber || ''} removed from system.`);
  };

  const addDriver = (driver) => {
    const newD = {
      ...driver,
      id: Date.now(),
      driverCode: `DRV-${Math.floor(1000 + Math.random() * 9000)}`,
      rating: 5.0,
      completedTrips: 0,
      status: 'Available',
      assignedVehicleId: null,
      assignedVehicleNum: 'None',
      photoUrl: driver.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
    setDrivers(prev => [newD, ...prev]);
    addToast('success', 'Driver Enrolled', `Driver ${newD.name} enrolled with ID ${newD.driverCode}.`);
  };

  const updateDriver = (id, updatedFields) => {
    setDrivers(prev => prev.map(d => d.id === id ? { ...d, ...updatedFields } : d));
    addToast('info', 'Driver Profile Updated', 'Driver record updated.');
  };

  const deleteDriver = (id) => {
    setDrivers(prev => prev.filter(d => d.id !== id));
    addToast('warning', 'Driver Removed', 'Driver deleted from records.');
  };

  // Allocation Logic
  const allocateVehicle = (vehicleId, driverId) => {
    const driver = drivers.find(d => d.id === Number(driverId));
    const vehicle = vehicles.find(v => v.id === Number(vehicleId));

    if (!driver || !vehicle) return;

    // Update vehicle: set status to Assigned
    setVehicles(prev => prev.map(v => v.id === vehicle.id ? {
      ...v,
      status: 'Assigned',
      assignedDriverId: driver.id,
      assignedDriverName: driver.name
    } : v));

    // Update driver: set status to Assigned and link vehicle
    setDrivers(prev => prev.map(d => d.id === driver.id ? {
      ...d,
      status: 'Assigned',
      assignedVehicleId: vehicle.id,
      assignedVehicleNum: vehicle.vehicleNumber
    } : d));

    addToast('success', 'Allocation Successful', `${vehicle.vehicleNumber} assigned to driver ${driver.name} (Status updated to Assigned).`);
  };

  const deallocateVehicle = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === Number(vehicleId));
    if (!vehicle) return;

    const driverId = vehicle.assignedDriverId;

    // Reset vehicle to Available
    setVehicles(prev => prev.map(v => v.id === vehicle.id ? {
      ...v,
      status: 'Available',
      assignedDriverId: null,
      assignedDriverName: 'Unassigned'
    } : v));

    // Reset driver to Available
    if (driverId) {
      setDrivers(prev => prev.map(d => d.id === driverId ? {
        ...d,
        status: 'Available',
        assignedVehicleId: null,
        assignedVehicleNum: 'None'
      } : d));
    }

    addToast('info', 'Deallocation Successful', `Vehicle ${vehicle.vehicleNumber} unassigned and status set to Available.`);
  };

  const addTrip = (trip) => {
    const newT = {
      ...trip,
      id: Date.now(),
      tripCode: `TRP-${Math.floor(8000 + Math.random() * 1000)}`,
      fuelConsumedLiters: Number(trip.fuelConsumedLiters) || 0,
      status: 'Scheduled'
    };
    setTrips(prev => [newT, ...prev]);
    addToast('success', 'Trip Scheduled', `New trip ${newT.tripCode} created.`);
  };

  const updateTripStatus = (tripId, newStatus) => {
    setTrips(prev => prev.map(t => t.id === tripId ? { ...t, status: newStatus } : t));
    addToast('info', 'Trip Status Updated', `Trip status changed to ${newStatus}.`);
  };

  const addFuelLog = (log) => {
    const newF = {
      ...log,
      id: Date.now(),
      fuelQuantityLiters: Number(log.fuelQuantityLiters),
      costTotal: Number(log.costTotal),
      mileageAtFill: Number(log.mileageAtFill)
    };
    setFuelLogs(prev => [newF, ...prev]);
    addToast('success', 'Fuel Transaction Logged', `$${newF.costTotal} fuel log added.`);
  };

  const addMaintenanceLog = (log) => {
    const newM = {
      ...log,
      id: Date.now(),
      cost: Number(log.cost)
    };
    setMaintenance(prev => [newM, ...prev]);

    setVehicles(prev => prev.map(v => v.id === Number(log.vehicleId) ? {
      ...v,
      status: 'Maintenance',
      healthScore: Math.min(100, v.healthScore + 15)
    } : v));

    addToast('success', 'Service Record Logged', `Maintenance logged for vehicle.`);
  };

  const reportBreakdown = (breakdown) => {
    const newB = {
      ...breakdown,
      id: Date.now(),
      reportTime: new Date().toLocaleString(),
      status: 'Reported'
    };
    setBreakdowns(prev => [newB, ...prev]);
    addToast('alert', 'CRITICAL: Breakdown Reported', `Vehicle breakdown reported at ${newB.location}!`);
  };

  // Rule-based AI Maintenance Recommendations Engine
  const getAiRecommendations = () => {
    const recs = [];
    vehicles.forEach(v => {
      if (v.mileageKm > 80000) {
        recs.push({
          id: `ai-oil-${v.id}`,
          vehicleNumber: v.vehicleNumber,
          type: 'High Mileage Check',
          title: 'Full Transmission & Engine Oil Change Suggested',
          severity: 'High',
          reason: `Mileage of ${v.mileageKm.toLocaleString()} km exceeds 80,000 km threshold.`
        });
      }
      if (v.healthScore < 65) {
        recs.push({
          id: `ai-health-${v.id}`,
          vehicleNumber: v.vehicleNumber,
          type: 'Brake & Battery Inspection',
          title: 'Critical Health Score Alert - Comprehensive Service Required',
          severity: 'Critical',
          reason: `Health score dropped to ${v.healthScore}/100.`
        });
      }
      const expDate = new Date(v.insuranceExpiry);
      const today = new Date('2026-07-30');
      const diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
      if (diffDays <= 15) {
        recs.push({
          id: `ai-ins-${v.id}`,
          vehicleNumber: v.vehicleNumber,
          type: 'Insurance Renewal',
          title: 'Policy Renewal Urgent Notice',
          severity: diffDays <= 0 ? 'Critical' : 'Medium',
          reason: diffDays <= 0 ? `Policy EXPIRED on ${v.insuranceExpiry}` : `Policy expires in ${diffDays} days (${v.insuranceExpiry}).`
        });
      }
    });
    return recs;
  };

  return (
    <FleetContext.Provider value={{
      role, setRole,
      darkMode, setDarkMode,
      vehicles, addVehicle, updateVehicle, deleteVehicle, allocateVehicle, deallocateVehicle,
      drivers, addDriver, updateDriver, deleteDriver,
      trips, addTrip, updateTripStatus,
      fuelLogs, addFuelLog,
      maintenance, addMaintenanceLog,
      breakdowns, reportBreakdown,
      toasts, addToast, removeToast,
      getAiRecommendations
    }}>
      {children}
    </FleetContext.Provider>
  );
};

export const useFleet = () => useContext(FleetContext);
