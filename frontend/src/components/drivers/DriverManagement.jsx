import React, { useState } from 'react';
import { Users, Plus, Search, Star, Phone, Mail, Award, AlertTriangle, ShieldCheck, Edit2, Trash2 } from 'lucide-react';
import { useFleet } from '../../context/FleetContext';

export const DriverManagement = () => {
  const { drivers, addDriver, updateDriver, deleteDriver } = useFleet();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    licenseNumber: '',
    licenseExpiry: '2027-12-31',
    experienceYears: 5,
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  });

  const handleOpenModal = (driver = null) => {
    if (driver) {
      setEditingDriver(driver);
      setFormData(driver);
    } else {
      setEditingDriver(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        licenseNumber: `DL-${Math.floor(10000000 + Math.random() * 90000000)}`,
        licenseExpiry: '2027-12-31',
        experienceYears: 5,
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingDriver) {
      updateDriver(editingDriver.id, formData);
    } else {
      addDriver(formData);
    }
    setShowModal(false);
  };

  const filteredDrivers = drivers.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.driverCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>Fleet Driver Roster ({drivers.length})</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Driver licensing compliance, safety performance scores, and assignments</p>
        </div>
        <button className="btn-primary" onClick={() => handleOpenModal(null)}>
          <Plus size={18} /> Register Driver
        </button>
      </div>

      {/* Driver Performance Leaderboard Widget */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Award size={20} color="var(--accent-primary)" /> Top Performing Fleet Drivers Leaderboard
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {drivers.map((d, index) => (
            <div key={d.id} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: '12px',
              padding: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div style={{
                fontWeight: 900,
                fontSize: '1.1rem',
                color: index === 0 ? '#f59e0b' : index === 1 ? '#94a3b8' : 'var(--text-muted)',
                width: '24px'
              }}>
                #{index + 1}
              </div>
              <img src={d.photoUrl} alt={d.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {d.name}
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--status-amber)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <Star size={12} fill="#f59e0b" /> {d.rating} Rating ({d.completedTrips} Trips)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="glass-panel" style={{ padding: '0.85rem 1rem' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search driver name, license number..."
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
      </div>

      {/* Driver Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {filteredDrivers.map(d => {
          const expDate = new Date(d.licenseExpiry);
          const today = new Date('2026-07-30');
          const isExpiringSoon = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24)) <= 30;

          return (
            <div key={d.id} className="glass-card glass-card-hover" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={d.photoUrl} alt={d.name} style={{ width: '56px', height: '56px', borderRadius: '16px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>{d.name}</h3>
                    <span className={`badge ${d.status === 'Available' ? 'badge-green' : d.status === 'Driving' ? 'badge-blue' : 'badge-amber'}`}>
                      {d.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{d.driverCode}</div>
                </div>
              </div>

              {/* License Warning Badge */}
              {isExpiringSoon && (
                <div style={{
                  background: 'var(--status-amber-bg)',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.725rem',
                  color: 'var(--status-amber)',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  <AlertTriangle size={14} /> License Expires Soon: {d.licenseExpiry}
                </div>
              )}

              {/* Details List */}
              <div style={{
                background: 'var(--bg-card)',
                padding: '0.75rem',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                fontSize: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                  <Phone size={14} /> {d.phone}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                  <Mail size={14} /> {d.email}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.2rem', paddingTop: '0.4rem', borderTop: '1px solid var(--glass-border)' }}>
                  <span>License: <strong>{d.licenseNumber}</strong></span>
                  <span>Exp: <strong>{d.experienceYears} Yrs</strong></span>
                </div>
                <div>Assigned Vehicle: <strong style={{ color: 'var(--accent-primary)' }}>{d.assignedVehicleNum || 'None'}</strong></div>
              </div>

              {/* Actions */}
              <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                <button className="btn-secondary" style={{ flex: 1, padding: '0.45rem', fontSize: '0.75rem', justifyContent: 'center' }} onClick={() => handleOpenModal(d)}>
                  <Edit2 size={14} /> Edit Record
                </button>
                <button className="btn-secondary" style={{ padding: '0.45rem', fontSize: '0.75rem', color: 'var(--status-red)' }} onClick={() => deleteDriver(d.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {editingDriver ? 'Edit Driver Profile' : 'Register New Fleet Driver'}
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>×</button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Driver Full Name</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Email Address</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Phone Number</label>
                  <input type="text" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} style={inputStyle} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Driver License Number</label>
                  <input type="text" required value={formData.licenseNumber} onChange={e => setFormData({ ...formData, licenseNumber: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>License Expiry Date</label>
                  <input type="date" required value={formData.licenseExpiry} onChange={e => setFormData({ ...formData, licenseExpiry: e.target.value })} style={inputStyle} />
                </div>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Driver</button>
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
