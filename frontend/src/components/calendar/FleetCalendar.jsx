import React from 'react';
import { Calendar, Wrench, Shield, AlertTriangle, Navigation } from 'lucide-react';
import { useFleet } from '../../context/FleetContext';

export const FleetCalendar = () => {
  const { vehicles, drivers, maintenance, trips } = useFleet();

  const events = [
    ...vehicles.map(v => ({ date: v.insuranceExpiry, title: `${v.vehicleNumber} Insurance Renewal Due`, type: 'insurance' })),
    ...maintenance.map(m => ({ date: m.nextServiceDue, title: `${m.vehicleNumber} Scheduled Workshop Service`, type: 'maintenance' })),
    ...drivers.map(d => ({ date: d.licenseExpiry, title: `Driver ${d.name} License Expiry`, type: 'license' }))
  ];

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={22} color="var(--accent-primary)" /> Fleet Operations & Compliance Calendar
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Upcoming servicing, insurance renewals, driver license expiries, and scheduled trips</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {events.map((evt, index) => (
          <div key={index} className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              background: evt.type === 'insurance' ? 'var(--status-amber-bg)' : evt.type === 'maintenance' ? 'var(--status-red-bg)' : 'var(--status-purple-bg)',
              padding: '0.75rem',
              borderRadius: '12px',
              color: evt.type === 'insurance' ? 'var(--status-amber)' : evt.type === 'maintenance' ? 'var(--status-red)' : 'var(--status-purple)'
            }}>
              {evt.type === 'insurance' ? <Shield size={22} /> : evt.type === 'maintenance' ? <Wrench size={22} /> : <AlertTriangle size={22} />}
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>{evt.title}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Date: <strong>{evt.date}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
