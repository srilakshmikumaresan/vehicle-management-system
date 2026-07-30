import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, QrCode, Shield, Wrench, User, Truck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useFleet } from '../../context/FleetContext';

export const QRModal = ({ vehicle, onClose }) => {
  const { drivers, maintenance } = useFleet();

  if (!vehicle) return null;

  const assignedDriver = drivers.find(d => d.id === vehicle.assignedDriverId);
  const vehicleMaintenance = maintenance.filter(m => m.vehicleId === vehicle.id);

  // Generate payload URL or JSON string
  const qrData = JSON.stringify({
    vehicleNumber: vehicle.vehicleNumber,
    registrationNumber: vehicle.registrationNumber,
    brandModel: `${vehicle.brand} ${vehicle.model}`,
    insuranceExpiry: vehicle.insuranceExpiry,
    driver: assignedDriver ? assignedDriver.name : 'Unassigned',
    healthScore: vehicle.healthScore
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-surface)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <QrCode size={22} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Vehicle Digital Identity & QR Tag
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Top QR & Specs Box */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
            background: 'var(--bg-card)',
            padding: '1.25rem',
            borderRadius: '16px',
            border: '1px solid var(--glass-border)'
          }}>
            <div style={{
              background: 'white',
              padding: '0.85rem',
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <QRCodeSVG value={qrData} size={140} level="H" includeMargin={true} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
                {vehicle.vehicleType} Fleet Tag
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0' }}>
                {vehicle.brand} {vehicle.model}
              </h2>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                {vehicle.vehicleNumber} ({vehicle.registrationNumber})
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                <span className={`badge ${vehicle.status === 'Available' ? 'badge-green' : vehicle.status === 'On Trip' ? 'badge-blue' : 'badge-amber'}`}>
                  {vehicle.status}
                </span>
                <span className="badge badge-purple">
                  Health Score: {vehicle.healthScore}/100
                </span>
              </div>
            </div>
          </div>

          {/* Details Tabs Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {/* Driver Specs */}
            <div style={{
              background: 'var(--bg-card)',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid var(--glass-border)'
            }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
                <User size={16} color="var(--accent-primary)" />
                Assigned Driver
              </h4>
              {assignedDriver ? (
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>{assignedDriver.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{assignedDriver.phone}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lic: {assignedDriver.licenseNumber}</div>
                </div>
              ) : (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  No driver currently assigned.
                </div>
              )}
            </div>

            {/* Insurance Status */}
            <div style={{
              background: 'var(--bg-card)',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid var(--glass-border)'
            }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
                <Shield size={16} color="var(--status-green)" />
                Insurance & Compliance
              </h4>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-main)' }}>
                Policy: <strong>{vehicle.insuranceNumber}</strong>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Expiry Date: <span style={{ fontWeight: 700, color: 'var(--status-amber)' }}>{vehicle.insuranceExpiry}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Pollution Cert: {vehicle.pollutionCertificate} ({vehicle.pollutionExpiry})
              </div>
            </div>
          </div>

          {/* Maintenance History */}
          <div style={{
            background: 'var(--bg-card)',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid var(--glass-border)'
          }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
              <Wrench size={16} color="var(--accent-cyan)" />
              Recent Service & Maintenance Logs ({vehicleMaintenance.length})
            </h4>
            {vehicleMaintenance.length === 0 ? (
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No service history recorded.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {vehicleMaintenance.map(m => (
                  <div key={m.id} style={{
                    fontSize: '0.75rem',
                    padding: '0.5rem 0.75rem',
                    background: 'var(--bg-surface-solid)',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{m.serviceType}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{m.workshopName} • {m.serviceDate}</div>
                    </div>
                    <div style={{ fontWeight: 800, color: 'var(--accent-primary)' }}>
                      ${m.cost}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer button */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid var(--glass-border)',
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'var(--bg-surface)'
        }}>
          <button className="btn-secondary" onClick={onClose}>Close Profile</button>
        </div>
      </div>
    </div>
  );
};
