import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Truck, AlertTriangle } from 'lucide-react';
import { useFleet } from '../../context/FleetContext';

// Custom Marker Icons
const vehicleIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -18]
});

const breakdownIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20]
});

export const LiveTrackingMap = () => {
  const { vehicles, breakdowns } = useFleet();

  const defaultCenter = [12.9716, 77.5946]; // Bangalore Fleet Hub coordinates

  // Route sample polylines for On Trip vehicles
  const sampleRoute = [
    [12.9716, 77.5946],
    [12.9600, 77.6100],
    [12.9352, 77.6245]
  ];

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'calc(100vh - 100px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <MapPin size={22} color="var(--accent-primary)" /> Live GPS Fleet Telematics Map
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Real-time location updates, active routes, and breakdown incident markers</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <span className="badge badge-green">Live GPS Connected</span>
          <span className="badge badge-blue">{vehicles.length} Tracked Nodes</span>
        </div>
      </div>

      {/* Leaflet Map Box */}
      <div className="glass-card" style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--glass-border)', position: 'relative' }}>
        <MapContainer center={defaultCenter} zoom={12} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Render Vehicles Markers */}
          {vehicles.map(v => (
            <Marker
              key={v.id}
              position={[v.currentLatitude || 12.9716, v.currentLongitude || 77.5946]}
              icon={v.status === 'Maintenance' ? breakdownIcon : vehicleIcon}
            >
              <Popup>
                <div style={{ padding: '0.2rem', minWidth: '180px' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>
                    {v.vehicleNumber} ({v.brand} {v.model})
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.2rem 0' }}>
                    Reg: {v.registrationNumber}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem', fontSize: '0.75rem' }}>
                    <span>Status: <strong style={{ color: v.status === 'Available' ? '#10b981' : '#3b82f6' }}>{v.status}</strong></span>
                    <span>Health: <strong>{v.healthScore}%</strong></span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.3rem' }}>
                    Driver: {v.assignedDriverName || 'Unassigned'}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Polyline Route for active trips */}
          <Polyline positions={sampleRoute} color="#3b82f6" weight={4} dashArray="8, 8" />
        </MapContainer>
      </div>
    </div>
  );
};
