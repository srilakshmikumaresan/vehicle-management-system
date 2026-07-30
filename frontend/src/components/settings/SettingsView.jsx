import React, { useState } from 'react';
import { Settings, Moon, Sun, Lock, Bell, User, Save } from 'lucide-react';
import { useFleet } from '../../context/FleetContext';

export const SettingsView = () => {
  const { darkMode, setDarkMode, role, addToast } = useFleet();
  const [profile, setProfile] = useState({
    name: role === 'ADMIN' ? 'Alex Mercer' : 'Robert Johnson',
    email: role === 'ADMIN' ? 'admin@fleet.com' : 'robert.j@fleet.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSave = (e) => {
    e.preventDefault();
    addToast('success', 'Settings Saved', 'System preferences and security credentials updated.');
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Settings size={22} color="var(--accent-primary)" /> Platform Preferences & Security Settings
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Customize UI theme, notification parameters, and account password credentials</p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Appearance Settings */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Sun size={18} color="var(--accent-cyan)" /> Interface Theme & Aesthetic
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Glassmorphism Dark Theme</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Toggle between high-contrast dark mode and sleek light mode</div>
            </div>
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="btn-secondary"
            >
              {darkMode ? <Moon size={16} color="#f59e0b" /> : <Sun size={16} color="#f59e0b" />}
              {darkMode ? 'Dark Mode Active' : 'Light Mode Active'}
            </button>
          </div>
        </div>

        {/* User Profile Info */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} color="var(--accent-primary)" /> Profile Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Display Name</label>
              <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Email Address</label>
              <input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock size={18} color="var(--status-red)" /> Change Password
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Current Password</label>
              <input type="password" placeholder="••••••••" value={profile.currentPassword} onChange={e => setProfile({ ...profile, currentPassword: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>New Password</label>
              <input type="password" placeholder="••••••••" value={profile.newPassword} onChange={e => setProfile({ ...profile, newPassword: e.target.value })} style={inputStyle} />
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '0.75rem' }}>
          <Save size={18} /> Save Settings & Preferences
        </button>
      </form>
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
