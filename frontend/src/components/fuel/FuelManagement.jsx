import React, { useState } from 'react';
import { Fuel, Plus, DollarSign, Gauge, TrendingUp, Calendar } from 'lucide-react';
import { useFleet } from '../../context/FleetContext';

export const FuelManagement = () => {
  const { fuelLogs, vehicles, addFuelLog } = useFleet();
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    vehicleId: '',
    fuelQuantityLiters: 40,
    fuelType: 'Diesel',
    costTotal: 70,
    mileageAtFill: 45000,
    fuelStation: 'Shell Express Station',
    logDate: '2026-07-30'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = vehicles.find(item => item.id === Number(formData.vehicleId));
    addFuelLog({
      ...formData,
      vehicleNumber: v ? v.vehicleNumber : 'V-101'
    });
    setShowModal(false);
  };

  const totalFuelQuantity = fuelLogs.reduce((acc, f) => acc + f.fuelQuantityLiters, 0);
  const totalFuelCost = fuelLogs.reduce((acc, f) => acc + f.costTotal, 0);

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>Fuel Management & Telematics Efficiency</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Track fill-up transactions, station logs, and cost per kilometer</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Log Fuel Transaction
        </button>
      </div>

      {/* Top Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Total Fuel Consumption</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.4rem 0' }}>
            {totalFuelQuantity} Liters
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--status-green)' }}>Across fleet fill-ups</span>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Total Fuel Expenditure</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.4rem 0' }}>
            ${totalFuelCost.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--status-blue)' }}>Avg ${(totalFuelCost / (totalFuelQuantity || 1)).toFixed(2)} / Liter</span>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Fleet Average Mileage</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.4rem 0' }}>
            4.85 km / L
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--status-amber)' }}>Optimal fuel efficiency range</span>
        </div>
      </div>

      {/* Fuel Logs Table */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '1rem' }}>Vehicle</th>
              <th style={{ padding: '1rem' }}>Fuel Quantity</th>
              <th style={{ padding: '1rem' }}>Total Cost ($)</th>
              <th style={{ padding: '1rem' }}>Mileage @ Fill</th>
              <th style={{ padding: '1rem' }}>Fuel Station</th>
              <th style={{ padding: '1rem' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {fuelLogs.map(f => (
              <tr key={f.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {f.vehicleNumber}
                </td>
                <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                  {f.fuelQuantityLiters} L ({f.fuelType})
                </td>
                <td style={{ padding: '1rem', fontWeight: 800, color: 'var(--status-green)' }}>
                  ${f.costTotal.toFixed(2)}
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                  {f.mileageAtFill.toLocaleString()} km
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                  {f.fuelStation}
                </td>
                <td style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {f.logDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>Log Fuel Transaction</h3>
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Fuel Quantity (Liters)</label>
                  <input type="number" required value={formData.fuelQuantityLiters} onChange={e => setFormData({ ...formData, fuelQuantityLiters: Number(e.target.value) })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Total Cost ($)</label>
                  <input type="number" required value={formData.costTotal} onChange={e => setFormData({ ...formData, costTotal: Number(e.target.value) })} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Odometer Mileage @ Fill</label>
                  <input type="number" required value={formData.mileageAtFill} onChange={e => setFormData({ ...formData, mileageAtFill: Number(e.target.value) })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Fuel Station</label>
                  <input type="text" placeholder="Shell, Chevron..." value={formData.fuelStation} onChange={e => setFormData({ ...formData, fuelStation: e.target.value })} style={inputStyle} />
                </div>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Fuel Record</button>
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
