import React, { useState } from 'react';
import { Navigation, Plus, MapPin, Clock, Truck, User, Fuel, CheckCircle2, Play, AlertCircle } from 'lucide-react';
import { useFleet } from '../../context/FleetContext';

export const TripManagement = () => {
  const { trips, vehicles, drivers, addTrip, updateTripStatus } = useFleet();
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    vehicleId: '',
    driverId: '',
    source: '',
    destination: '',
    purpose: '',
    distanceKm: 50,
    startTime: '2026-07-30 10:00'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = vehicles.find(item => item.id === Number(formData.vehicleId));
    const d = drivers.find(item => item.id === Number(formData.driverId));

    addTrip({
      ...formData,
      vehicleNumber: v ? `${v.vehicleNumber} (${v.brand})` : 'Vehicle',
      driverName: d ? d.name : 'Driver'
    });
    setShowModal(false);
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>Fleet Trip Manifest ({trips.length})</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dispatch, track route progress, and monitor trip telemetry</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Schedule New Trip
        </button>
      </div>

      {/* Trips Table */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '1rem' }}>Trip ID</th>
              <th style={{ padding: '1rem' }}>Vehicle & Driver</th>
              <th style={{ padding: '1rem' }}>Route Details</th>
              <th style={{ padding: '1rem' }}>Distance</th>
              <th style={{ padding: '1rem' }}>Start / End Time</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trips.map(t => (
              <tr key={t.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                  {t.tripCode}
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{t.vehicleNumber}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Driver: {t.driverName}</div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)' }}>
                    <MapPin size={14} color="var(--status-green)" /> {t.source}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                    <MapPin size={14} color="var(--status-red)" /> {t.destination}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.2rem' }}>
                    Purpose: {t.purpose}
                  </div>
                </td>
                <td style={{ padding: '1rem', fontWeight: 700 }}>
                  {t.distanceKm} km
                </td>
                <td style={{ padding: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <div>Start: {t.startTime}</div>
                  <div>End: {t.endTime}</div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span className={`badge ${t.status === 'Completed' ? 'badge-green' : t.status === 'In Progress' ? 'badge-blue' : t.status === 'Breakdown' ? 'badge-red' : 'badge-amber'}`}>
                    {t.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  {t.status === 'Scheduled' && (
                    <button className="btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }} onClick={() => updateTripStatus(t.id, 'In Progress')}>
                      <Play size={12} /> Start
                    </button>
                  )}
                  {t.status === 'In Progress' && (
                    <button className="btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', color: 'var(--status-green)' }} onClick={() => updateTripStatus(t.id, 'Completed')}>
                      <CheckCircle2 size={12} /> Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Trip Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '560px' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>Schedule New Trip Manifest</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>×</button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Select Vehicle</label>
                  <select required value={formData.vehicleId} onChange={e => setFormData({ ...formData, vehicleId: e.target.value })} style={inputStyle}>
                    <option value="">-- Choose Vehicle --</option>
                    {vehicles.map(v => <option key={v.id} value={v.id}>{v.vehicleNumber} ({v.brand})</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Select Driver</label>
                  <select required value={formData.driverId} onChange={e => setFormData({ ...formData, driverId: e.target.value })} style={inputStyle}>
                    <option value="">-- Choose Driver --</option>
                    {drivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Source / Starting Point</label>
                <input type="text" required placeholder="Depot, Warehouse..." value={formData.source} onChange={e => setFormData({ ...formData, source: e.target.value })} style={inputStyle} />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Destination</label>
                <input type="text" required placeholder="Distribution Center..." value={formData.destination} onChange={e => setFormData({ ...formData, destination: e.target.value })} style={inputStyle} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Estimated Distance (km)</label>
                  <input type="number" required value={formData.distanceKm} onChange={e => setFormData({ ...formData, distanceKm: Number(e.target.value) })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Trip Purpose</label>
                  <input type="text" placeholder="Cargo delivery, Client meeting..." value={formData.purpose} onChange={e => setFormData({ ...formData, purpose: e.target.value })} style={inputStyle} />
                </div>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Schedule Trip</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  width: '100%',
  background: 'var(--bg-card)',
  border: '1px solid var(--glass-border)',
  borderRadius: '8px',
  padding: '0.5rem 0.75rem',
  fontSize: '0.85rem',
  color: 'var(--text-main)',
  outline: 'none',
  marginTop: '0.25rem'
};
