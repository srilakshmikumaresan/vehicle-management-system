import React from 'react';
import {
  LayoutDashboard,
  Truck,
  Users,
  UserCheck,
  Navigation,
  Fuel,
  Wrench,
  FileText,
  MapPin,
  Calendar,
  AlertTriangle,
  Settings,
  Sun,
  Moon,
  ShieldAlert,
  LogOut
} from 'lucide-react';
import { useFleet } from '../../context/FleetContext';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { role, setRole, darkMode, setDarkMode } = useFleet();

  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vehicles', label: 'Vehicles', icon: Truck },
    { id: 'drivers', label: 'Drivers', icon: Users },
    { id: 'allocation', label: 'Allocation', icon: UserCheck },
    { id: 'trips', label: 'Trips', icon: Navigation },
    { id: 'fuel', label: 'Fuel Logs', icon: Fuel },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'map', label: 'Live GPS Map', icon: MapPin },
    { id: 'reports', label: 'Reports & Exports', icon: FileText },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'breakdown', label: 'Breakdown Alerts', icon: AlertTriangle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const driverNavItems = [
    { id: 'dashboard', label: 'Driver Dashboard', icon: LayoutDashboard },
    { id: 'my-vehicle', label: 'My Vehicle & Specs', icon: Truck },
    { id: 'trips', label: 'My Trips', icon: Navigation },
    { id: 'breakdown', label: 'Report Breakdown', icon: AlertTriangle },
    { id: 'settings', label: 'Profile Settings', icon: Settings },
  ];

  const navItems = role === 'ADMIN' ? adminNavItems : driverNavItems;

  return (
    <aside style={{
      width: '260px',
      background: 'var(--sidebar-bg)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRight: '1px solid var(--sidebar-border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '1.25rem 1rem'
    }}>
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.5rem 1.5rem 0.5rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 4px 16px rgba(37, 99, 235, 0.4)'
        }}>
          <Truck size={24} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
            FLEET<span style={{ color: 'var(--accent-primary)' }}>IQ</span>
          </h1>
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Enterprise Fleet
          </span>
        </div>
      </div>

      {/* Role Switcher Pill */}
      <div style={{
        background: 'var(--bg-card)',
        padding: '0.4rem',
        borderRadius: '12px',
        display: 'flex',
        marginBottom: '1.25rem',
        border: '1px solid var(--glass-border)'
      }}>
        <button
          onClick={() => setRole('ADMIN')}
          style={{
            flex: 1,
            padding: '0.4rem 0.5rem',
            borderRadius: '8px',
            border: 'none',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            background: role === 'ADMIN' ? 'var(--accent-primary)' : 'transparent',
            color: role === 'ADMIN' ? 'white' : 'var(--text-muted)',
            transition: 'all 0.2s ease'
          }}
        >
          Admin Portal
        </button>
        <button
          onClick={() => setRole('DRIVER')}
          style={{
            flex: 1,
            padding: '0.4rem 0.5rem',
            borderRadius: '8px',
            border: 'none',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            background: role === 'DRIVER' ? 'var(--accent-primary)' : 'transparent',
            color: role === 'DRIVER' ? 'white' : 'var(--text-muted)',
            transition: 'all 0.2s ease'
          }}
        >
          Driver Portal
        </button>
      </div>

      {/* Navigation List */}
      <nav style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: 'none',
                background: isActive ? 'var(--accent-light)' : 'transparent',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={20} color={isActive ? 'var(--accent-primary)' : 'currentColor'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Controls */}
      <div style={{
        marginTop: 'auto',
        paddingTop: '1rem',
        borderTop: '1px solid var(--sidebar-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {/* Dark/Light mode button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.6rem 0.85rem',
            borderRadius: '10px',
            border: '1px solid var(--glass-border)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {darkMode ? <Moon size={16} color="#f59e0b" /> : <Sun size={16} color="#f59e0b" />}
            {darkMode ? 'Dark Mode' : 'Light Mode'}
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Toggle</span>
        </button>

        {/* User Card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.6rem 0.5rem',
          background: 'var(--bg-card)',
          borderRadius: '12px',
          border: '1px solid var(--glass-border)'
        }}>
          <img
            src={role === 'ADMIN'
              ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
              : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
            alt="User avatar"
            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {role === 'ADMIN' ? 'Alex Mercer (Admin)' : 'Robert Johnson'}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {role === 'ADMIN' ? 'Fleet Operations Manager' : 'Senior Fleet Driver'}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
