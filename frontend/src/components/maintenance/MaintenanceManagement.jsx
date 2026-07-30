import React, { useState } from 'react';
import { Wrench, Plus, DollarSign, Calendar, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useFleet } from '../../context/FleetContext';

export const MaintenanceManagement = () => {
  const { maintenance, vehicles, addMaintenanceLog } = useFleet();
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    vehicleId: '',
    serviceDate: '2026-07-30',
    serviceType: 'Routine Oil & Filter Change',
    cost: 250,
    workshopName: 'Precision Commercial Garage',
    description: 'Scheduled preventive service maintenance.',
    nextServiceDue: '2027-01-30'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = vehicles.find(item => item.id === Number(formData.vehicleId));
    addMaintenanceLog({
      ...formData,
      vehicleNumber: v ? v.vehicleNumber : 'V-101'
    });
    setShowModal(false);
  };

  const totalCost = maintenance.reduce((acc, m) => acc + m.cost, 0);

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>Fleet Maintenance & Service Logs ({maintenance.length})</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Complete servicing history, workshop receipts, and next inspection dates</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Record Workshop Service
        </button>
      </div>

      {/* Top Banner Metric */}
      <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Total Maintenance Investment</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--status-red)', marginTop: '0.2rem' }}>
            ${totalCost.toLocaleString()}
          </div>
        </div>
        <div style={{ background: 'var(--status-amber-bg)', padding: '0.75rem 1rem', borderRadius: '12px', color: 'var(--status-amber)', fontSize: '0.85rem', fontWeight: 700 }}>
          Preventive maintenance keeps health score above 85%
        </div>
      </div>

      {/* Maintenance History List Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {maintenance.map(m => (
          <div key={m.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ background: 'var(--status-red-bg)', padding: '0.75rem', borderRadius: '12px', color: 'var(--status-red)' }}>
                <Wrench size={24} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>{m.serviceType}</h3>
                  <span className="badge badge-purple">{m.vehicleNumber}</span>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-primary)', marginTop: '0.2rem' }}>
                  Workshop: {m.workshopName}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  {m.description}
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.6rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Service Date: <strong>{m.serviceDate}</strong></span>
                  <span>Next Due: <strong style={{ color: 'var(--status-amber)' }}>{m.nextServiceDue}</strong></span>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-main)' }}>
              ${m.cost.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>Log Maintenance / Service</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>×</button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Select Vehicle</label>
                <select required value={formData.vehicleId} onChange={e => setFormData({ ...formData, vehicleId: e.target.value })} style={inputStyle}>
                  <option value="">-- Select Vehicle --</option>
                  {vehicles.map(v => <option key={v.id} value={v.id}>{v.vehicleNumber} ({v.brand})</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Service Category / Repair Type</label>
                <input type="text" required placeholder="Engine overhaul, brake service..." value={formData.serviceType} onChange={e => setFormData({ ...formData, serviceType: e.target.value })} style={inputStyle} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Service Cost ($)</label>
                  <input type="number" required value={formData.cost} onChange={e => setFormData({ ...formData, cost: Number(e.target.value) })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Workshop Name</label>
                  <input type="text" required value={formData.workshopName} onChange={e => setFormData({ ...formData, workshopName: e.target.value })} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Service Date</label>
                  <input type="date" required value={formData.serviceDate} onChange={e => setFormData({ ...formData, serviceDate: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Next Service Due Date</label>
                  <input type="date" required value={formData.nextServiceDue} onChange={e => setFormData({ ...formData, nextServiceDue: e.target.value })} style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Work Description & Notes</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={{ ...inputStyle, resize: 'none' }}></textarea>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Maintenance Log</button>
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
