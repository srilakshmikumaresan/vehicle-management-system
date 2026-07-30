import React, { useState } from 'react';
import { UserCheck, Truck, Users, Calendar, CheckCircle2, ShieldAlert, XCircle, ArrowRight } from 'lucide-react';
import { useFleet } from '../../context/FleetContext';

export const AllocationView = () => {
  const { vehicles, drivers, allocateVehicle, deallocateVehicle } = useFleet();
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [selectedDriverId, setSelectedDriverId] = useState('');

  // Available vehicles for allocation
  const availableVehicles = vehicles.filter(v => v.status === 'Available');

  // Unassigned drivers (status Available and no assigned vehicle)
  const availableDrivers = drivers.filter(d =>
    d.status === 'Available' && (!d.assignedVehicleId || d.assignedVehicleNum === 'None')
  );

  const handleAllocate = (e) => {
    e.preventDefault();
    if (!selectedVehicleId || !selectedDriverId) return;
    allocateVehicle(selectedVehicleId, selectedDriverId);
    setSelectedVehicleId('');
    setSelectedDriverId('');
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>Vehicle & Driver Allocation Hub</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Pair available vehicles with unassigned drivers. Assigning automatically updates driver status to 'Assigned'.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Allocation Form Box */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserCheck size={20} color="var(--accent-primary)" /> Assign Vehicle to Driver
            </h3>
            <span className="badge badge-blue">
              {availableDrivers.length} Drivers Ready
            </span>
          </div>

          <form onSubmit={handleAllocate} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Select Available Vehicle ({availableVehicles.length} Available)
              </label>
              <select
                required
                value={selectedVehicleId}
                onChange={e => setSelectedVehicleId(e.target.value)}
                style={selectStyle}
              >
                <option value="">-- Choose Vehicle --</option>
                {availableVehicles.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.vehicleNumber} - {v.brand} {v.model} ({v.vehicleType})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Choose Driver ({availableDrivers.length} Unassigned Drivers Available)
              </label>
              <select
                required
                value={selectedDriverId}
                onChange={e => setSelectedDriverId(e.target.value)}
                style={selectStyle}
              >
                <option value="">-- Choose Driver --</option>
                {availableDrivers.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.driverCode} - {d.name} (Lic: {d.licenseNumber} • {d.experienceYears} Yrs Exp)
                  </option>
                ))}
              </select>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid var(--glass-border)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              <ShieldAlert size={16} color="var(--accent-primary)" style={{ marginBottom: '0.2rem' }} />
              <strong>Automated Status Sync:</strong> Confirming allocation updates the selected vehicle to <span style={{ color: 'var(--status-blue)', fontWeight: 700 }}>Assigned</span> and driver status to <span style={{ color: 'var(--status-blue)', fontWeight: 700 }}>Assigned</span>.
            </div>

            <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '0.75rem' }}>
              Confirm & Pair Vehicle
            </button>
          </form>

          {/* Quick Roster Preview of Available Drivers */}
          <div style={{ marginTop: '0.5rem' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
              Unassigned Driver Pool ({availableDrivers.length})
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '160px', overflowY: 'auto' }}>
              {availableDrivers.length === 0 ? (
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  All registered drivers are currently assigned.
                </div>
              ) : (
                availableDrivers.map(d => (
                  <div key={d.id} style={{
                    fontSize: '0.75rem',
                    padding: '0.4rem 0.65rem',
                    background: 'var(--bg-surface-solid)',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <strong style={{ color: 'var(--text-main)' }}>{d.name}</strong> ({d.driverCode})
                    </div>
                    <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>
                      Available
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Active Allocations List & Deallocate Controls */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Active Fleet Allocations Log ({vehicles.filter(v => v.assignedDriverId).length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, overflowY: 'auto' }}>
            {vehicles.filter(v => v.assignedDriverId).length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No active vehicle allocations. Select a vehicle and driver to create a pair.
              </div>
            ) : (
              vehicles.filter(v => v.assignedDriverId).map(v => {
                const driver = drivers.find(d => d.id === v.assignedDriverId);
                return (
                  <div key={v.id} style={{
                    background: 'var(--bg-surface-solid)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{ background: 'var(--accent-light)', padding: '0.6rem', borderRadius: '10px', color: 'var(--accent-primary)' }}>
                        <Truck size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>
                          {v.vehicleNumber} ({v.brand} {v.model})
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                          <span>Assigned Driver:</span>
                          <strong style={{ color: 'var(--accent-primary)' }}>{driver ? driver.name : v.assignedDriverName}</strong>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          Driver Code: {driver ? driver.driverCode : 'DRV-N/A'} • Status: Assigned
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn-secondary"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', color: 'var(--status-red)', borderColor: 'rgba(239,68,68,0.3)' }}
                      onClick={() => deallocateVehicle(v.id)}
                      title="Unassign Vehicle and release Driver back to Available pool"
                    >
                      <XCircle size={14} /> Unassign
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const selectStyle = {
  width: '100%',
  background: 'var(--bg-card)',
  border: '1px solid var(--glass-border)',
  borderRadius: '10px',
  padding: '0.65rem 0.85rem',
  fontSize: '0.85rem',
  color: 'var(--text-main)',
  outline: 'none'
};
