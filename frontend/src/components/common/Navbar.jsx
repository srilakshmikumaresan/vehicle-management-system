import React, { useState } from 'react';
import { Search, Bell, ShieldAlert, Sparkles, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { useFleet } from '../../context/FleetContext';

export const Navbar = ({ title, activeTab }) => {
  const { role, toasts, removeToast } = useFleet();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header style={{
      height: '72px',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--glass-border)',
      background: 'var(--bg-surface)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 90
    }}>
      {/* Title & Subtitle */}
      <div>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {title}
          <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>
            {role === 'ADMIN' ? 'Enterprise Console' : 'Driver Workspace'}
          </span>
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Real-time Fleet Operations, Telematics & Management System
        </p>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Global Search */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search vehicles, drivers, trips..."
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: '20px',
              padding: '0.5rem 1rem 0.5rem 2.2rem',
              fontSize: '0.85rem',
              color: 'var(--text-main)',
              outline: 'none',
              width: '240px',
              transition: 'all 0.2s ease'
            }}
          />
        </div>

        {/* System Date Badge */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--glass-border)',
          padding: '0.45rem 0.85rem',
          borderRadius: '10px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <Sparkles size={14} color="var(--accent-primary)" />
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
        </div>

        {/* Notifications Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--glass-border)',
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-main)',
              position: 'relative'
            }}
          >
            <Bell size={20} />
            {toasts.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--status-red)',
                color: 'white',
                fontSize: '0.65rem',
                fontWeight: 800,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)'
              }}>
                {toasts.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '50px',
              width: '340px',
              background: 'var(--bg-surface-solid)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              padding: '1rem',
              zIndex: 200
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Notifications & Alerts ({toasts.length})
                </h4>
                <button
                  onClick={() => setShowNotifications(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
                >
                  Close
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '280px', overflowY: 'auto' }}>
                {toasts.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '1.5rem 0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    No unread system alerts.
                  </div>
                ) : (
                  toasts.map(t => (
                    <div key={t.id} style={{
                      padding: '0.75rem',
                      borderRadius: '10px',
                      background: t.type === 'alert' ? 'var(--status-red-bg)' : 'var(--bg-card)',
                      border: `1px solid ${t.type === 'alert' ? 'rgba(239, 68, 68, 0.3)' : 'var(--glass-border)'}`,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.6rem'
                    }}>
                      {t.type === 'alert' ? <ShieldAlert size={18} color="var(--status-red)" /> : <Info size={18} color="var(--accent-primary)" />}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>{t.title}</div>
                        <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{t.message}</div>
                      </div>
                      <button
                        onClick={() => removeToast(t.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
