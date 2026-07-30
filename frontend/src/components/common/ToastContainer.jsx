import React from 'react';
import { ShieldAlert, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useFleet } from '../../context/FleetContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useFleet();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      maxWidth: '380px',
      pointerEvents: 'none'
    }}>
      {toasts.map(t => {
        let Icon = Info;
        let borderColor = 'var(--accent-primary)';
        let bgColor = 'var(--bg-surface-solid)';

        if (t.type === 'alert' || t.type === 'error') {
          Icon = ShieldAlert;
          borderColor = 'var(--status-red)';
        } else if (t.type === 'success') {
          Icon = CheckCircle2;
          borderColor = 'var(--status-green)';
        } else if (t.type === 'warning') {
          Icon = AlertTriangle;
          borderColor = 'var(--status-amber)';
        }

        return (
          <div
            key={t.id}
            style={{
              pointerEvents: 'auto',
              background: bgColor,
              borderLeft: `4px solid ${borderColor}`,
              borderTop: '1px solid var(--glass-border)',
              borderRight: '1px solid var(--glass-border)',
              borderBottom: '1px solid var(--glass-border)',
              borderRadius: '12px',
              padding: '0.85rem 1rem',
              boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <Icon size={20} color={borderColor} style={{ marginTop: '2px', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{t.title}</h5>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: '1.3' }}>
                {t.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
