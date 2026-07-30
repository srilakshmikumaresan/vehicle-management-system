import React, { useState } from 'react';
import { AlertTriangle, MapPin, Camera, ShieldAlert, Send } from 'lucide-react';
import { useFleet } from '../../context/FleetContext';

export const BreakdownAlertModal = () => {
  const { vehicles, breakdowns, reportBreakdown } = useFleet();

  const [formData, setFormData] = useState({
    vehicleId: '',
    location: 'Highway 101 KM 42 Near Exit 8',
    description: '',
    latitude: 12.9600,
    longitude: 77.5800
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = vehicles.find(item => item.id === Number(formData.vehicleId));
    reportBreakdown({
      ...formData,
      vehicleNumber: v ? v.vehicleNumber : 'V-101',
      driverName: 'Robert Johnson'
    });
    setFormData({ ...formData, description: '' });
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--status-red)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <AlertTriangle size={24} /> Emergency Breakdown & SOS Dispatch Center
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Drivers submit high-priority roadside assistance requests with real-time GPS telemetry</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Breakdown Submission Form */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
            Report Breakdown SOS
          </h3>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Select Vehicle experiencing failure</label>
              <select required value={formData.vehicleId} onChange={e => setFormData({ ...formData, vehicleId: e.target.value })} style={inputStyle}>
                <option value="">-- Choose Vehicle --</option>
                {vehicles.map(v => <option key={v.id} value={v.id}>{v.vehicleNumber} ({v.brand})</option>)}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Current Location / Landmark</label>
              <input type="text" required value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} style={inputStyle} />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Issue Description & Telematics Diagnostic Warning</label>
              <textarea
                required
                rows={4}
                placeholder="Engine overheating, tyre puncture, transmission lockup..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                style={{ ...inputStyle, resize: 'none' }}
              ></textarea>
            </div>

            <button type="submit" className="btn-primary" style={{ background: 'var(--status-red)', justifyContent: 'center', padding: '0.75rem' }}>
              <Send size={16} /> Dispatch SOS Emergency Alert
            </button>
          </form>
        </div>

        {/* Breakdown Active Alerts Log */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
            Active Breakdown Incidents ({breakdowns.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {breakdowns.map(b => (
              <div key={b.id} style={{
                background: 'var(--status-red-bg)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '12px',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--status-red)' }}>
                    {b.vehicleNumber} Breakdown Alert
                  </span>
                  <span className="badge badge-red">{b.status}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginTop: '0.4rem', fontWeight: 600 }}>
                  "{b.description}"
                </p>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={14} color="var(--status-red)" /> {b.location} • Reported: {b.reportTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
