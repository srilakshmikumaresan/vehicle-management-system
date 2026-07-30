import React, { useState } from 'react';
import { Truck, Plus, Search, Filter, QrCode, Edit2, Trash2, ShieldCheck, Wrench, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { useFleet } from '../../context/FleetContext';

export const VehicleManagement = ({ onSelectVehicleQr }) => {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle } = useFleet();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    brand: '',
    model: '',
    vehicleType: 'Van',
    manufacturingYear: 2023,
    purchaseDate: '2023-01-15',
    fuelType: 'Diesel',
    mileageKm: 15000,
    registrationNumber: '',
    rcNumber: '',
    insuranceNumber: '',
    insuranceExpiry: '2027-01-15',
    pollutionCertificate: 'PUC-8812',
    pollutionExpiry: '2027-01-15',
    status: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80'
  });

  const handleOpenModal = (vehicle = null) => {
    if (vehicle) {
      setEditingVehicle(vehicle);
      setFormData(vehicle);
    } else {
      setEditingVehicle(null);
      setFormData({
        vehicleNumber: `V-${Math.floor(100 + Math.random() * 900)}`,
        brand: '',
        model: '',
        vehicleType: 'Van',
        manufacturingYear: 2023,
        purchaseDate: '2023-01-15',
        fuelType: 'Diesel',
        mileageKm: 15000,
        registrationNumber: `REG-FLT-${Math.floor(100 + Math.random() * 900)}`,
        rcNumber: `RC-${Math.floor(1000000 + Math.random() * 9000000)}`,
        insuranceNumber: `INS-POL-${Math.floor(10000 + Math.random() * 90000)}`,
        insuranceExpiry: '2027-06-30',
        pollutionCertificate: `PUC-${Math.floor(1000 + Math.random() * 9000)}`,
        pollutionExpiry: '2027-06-30',
        status: 'Available',
        imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80'
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingVehicle) {
      updateVehicle(editingVehicle.id, formData);
    } else {
      addVehicle(formData);
    }
    setShowModal(false);
  };

  // Filtering
  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || v.status === statusFilter;
    const matchesType = typeFilter === 'ALL' || v.vehicleType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Controls Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>Fleet Vehicle Inventory ({filteredVehicles.length})</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Manage specs, registration details, insurance, and dynamic health scores</p>
        </div>

        <button className="btn-primary" onClick={() => handleOpenModal(null)}>
          <Plus size={18} /> Add New Vehicle
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search by vehicle number, brand, model, registration..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              background: 'var(--bg-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: '10px',
              padding: '0.5rem 1rem 0.5rem 2.2rem',
              fontSize: '0.85rem',
              color: 'var(--text-main)',
              outline: 'none'
            }}
          />
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} color="var(--text-muted)" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: '10px',
              padding: '0.5rem 0.85rem',
              fontSize: '0.85rem',
              color: 'var(--text-main)',
              outline: 'none'
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Assigned">Assigned</option>
            <option value="On Trip">On Trip</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        {/* Type Filter */}
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--glass-border)',
            borderRadius: '10px',
            padding: '0.5rem 0.85rem',
            fontSize: '0.85rem',
            color: 'var(--text-main)',
            outline: 'none'
          }}
        >
          <option value="ALL">All Types</option>
          <option value="Van">Van</option>
          <option value="Truck">Truck</option>
          <option value="SUV">SUV</option>
          <option value="Electric">Electric</option>
        </select>
      </div>

      {/* Vehicle Grid Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredVehicles.map(v => (
          <div key={v.id} className="glass-card glass-card-hover" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Image & Overlay Status */}
            <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
              <img src={v.imageUrl} alt={v.vehicleNumber} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                display: 'flex',
                gap: '0.5rem'
              }}>
                <span className={`badge ${v.status === 'Available' ? 'badge-green' : v.status === 'On Trip' ? 'badge-blue' : v.status === 'Maintenance' ? 'badge-red' : 'badge-amber'}`}>
                  {v.status}
                </span>
              </div>
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                background: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(8px)',
                padding: '0.35rem 0.75rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 800,
                color: 'white'
              }}>
                {v.vehicleNumber}
              </div>
            </div>

            {/* Card Content */}
            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>{v.brand} {v.model}</h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Reg: {v.registrationNumber} • {v.vehicleType}</div>
                </div>
                {/* Health Score Pill */}
                <div style={{
                  background: v.healthScore >= 80 ? 'var(--status-green-bg)' : v.healthScore >= 60 ? 'var(--status-amber-bg)' : 'var(--status-red-bg)',
                  border: `1px solid ${v.healthScore >= 80 ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                  padding: '0.25rem 0.6rem',
                  borderRadius: '10px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: v.healthScore >= 80 ? 'var(--status-green)' : v.healthScore >= 60 ? 'var(--status-amber)' : 'var(--status-red)'
                }}>
                  Health {v.healthScore}%
                </div>
              </div>

              {/* Vehicle Specs Table */}
              <div style={{
                background: 'var(--bg-card)',
                padding: '0.75rem',
                borderRadius: '10px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                fontSize: '0.75rem'
              }}>
                <div><span style={{ color: 'var(--text-muted)' }}>Fuel:</span> <strong>{v.fuelType}</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Mileage:</span> <strong>{v.mileageKm.toLocaleString()} km</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Driver:</span> <strong>{v.assignedDriverName || 'Unassigned'}</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Ins. Exp:</span> <strong>{v.insuranceExpiry}</strong></div>
              </div>

              {/* Actions Toolbar */}
              <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn-secondary"
                  style={{ flex: 1, padding: '0.45rem', fontSize: '0.75rem', justifyContent: 'center' }}
                  onClick={() => onSelectVehicleQr(v)}
                >
                  <QrCode size={14} /> QR Tag
                </button>
                <button
                  className="btn-secondary"
                  style={{ padding: '0.45rem', fontSize: '0.75rem' }}
                  onClick={() => handleOpenModal(v)}
                >
                  <Edit2 size={14} />
                </button>
                <button
                  className="btn-secondary"
                  style={{ padding: '0.45rem', fontSize: '0.75rem', color: 'var(--status-red)' }}
                  onClick={() => deleteVehicle(v.id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Vehicle Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '650px' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {editingVehicle ? 'Edit Vehicle Specifications' : 'Add New Vehicle to Fleet'}
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>×</button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Vehicle Tag Number</label>
                  <input type="text" required value={formData.vehicleNumber} onChange={e => setFormData({ ...formData, vehicleNumber: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Brand / Manufacturer</label>
                  <input type="text" required placeholder="Ford, Volvo, Toyota..." value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Model</label>
                  <input type="text" required placeholder="Transit 350, Model Y..." value={formData.model} onChange={e => setFormData({ ...formData, model: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Vehicle Type</label>
                  <select value={formData.vehicleType} onChange={e => setFormData({ ...formData, vehicleType: e.target.value })} style={inputStyle}>
                    <option value="Van">Van</option>
                    <option value="Truck">Truck</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Fuel Type</label>
                  <select value={formData.fuelType} onChange={e => setFormData({ ...formData, fuelType: e.target.value })} style={inputStyle}>
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Registration Number</label>
                  <input type="text" required value={formData.registrationNumber} onChange={e => setFormData({ ...formData, registrationNumber: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Insurance Policy Number</label>
                  <input type="text" required value={formData.insuranceNumber} onChange={e => setFormData({ ...formData, insuranceNumber: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Insurance Expiry Date</label>
                  <input type="date" required value={formData.insuranceExpiry} onChange={e => setFormData({ ...formData, insuranceExpiry: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Status</label>
                  <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} style={inputStyle}>
                    <option value="Available">Available</option>
                    <option value="Assigned">Assigned</option>
                    <option value="On Trip">On Trip</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Current Odometer Mileage (km)</label>
                  <input type="number" required value={formData.mileageKm} onChange={e => setFormData({ ...formData, mileageKm: Number(e.target.value) })} style={inputStyle} />
                </div>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Vehicle</button>
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
