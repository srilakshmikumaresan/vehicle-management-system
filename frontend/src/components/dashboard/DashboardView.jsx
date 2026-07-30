import React from 'react';
import {
  Truck,
  Users,
  Navigation,
  Fuel,
  Wrench,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  QrCode,
  MapPin,
  ArrowUpRight
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useFleet } from '../../context/FleetContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

export const DashboardView = ({ setActiveTab, onSelectVehicleQr }) => {
  const { vehicles, drivers, trips, fuelLogs, maintenance, breakdowns, getAiRecommendations } = useFleet();

  // Metrics Calculations
  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter(v => v.status === 'Available').length;
  const onTripVehicles = vehicles.filter(v => v.status === 'On Trip').length;
  const maintenanceVehicles = vehicles.filter(v => v.status === 'Maintenance').length;
  const activeDrivers = drivers.filter(d => d.status !== 'On Leave').length;
  const todayTrips = trips.filter(t => t.startTime.includes('2026-07-30') || t.status === 'In Progress').length;

  const totalFuelCost = fuelLogs.reduce((acc, f) => acc + f.costTotal, 0);
  const totalMaintenanceCost = maintenance.reduce((acc, m) => acc + m.cost, 0);
  const aiRecommendations = getAiRecommendations();

  // Insurance expiring soon count (< 30 days)
  const expiringInsuranceCount = vehicles.filter(v => {
    const expDate = new Date(v.insuranceExpiry);
    const today = new Date('2026-07-30');
    const diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  }).length;

  // Chart Data: Vehicle Status Distribution
  const statusDoughnutData = {
    labels: ['Available', 'On Trip', 'Assigned', 'Maintenance'],
    datasets: [
      {
        data: [
          vehicles.filter(v => v.status === 'Available').length,
          vehicles.filter(v => v.status === 'On Trip').length,
          vehicles.filter(v => v.status === 'Assigned').length,
          vehicles.filter(v => v.status === 'Maintenance').length
        ],
        backgroundColor: ['#10b981', '#3b82f6', '#8b5cf6', '#ef4444'],
        borderWidth: 0,
        hoverOffset: 6
      }
    ]
  };

  // Chart Data: Monthly Expense Trends
  const expenseBarData = {
    labels: ['May', 'Jun', 'Jul', 'Aug (Est)'],
    datasets: [
      {
        label: 'Fuel Cost ($)',
        data: [420, 510, totalFuelCost || 352, 480],
        backgroundColor: 'rgba(59, 130, 246, 0.85)',
        borderRadius: 8
      },
      {
        label: 'Maintenance Cost ($)',
        data: [890, 320, totalMaintenanceCost || 650, 400],
        backgroundColor: 'rgba(239, 68, 68, 0.85)',
        borderRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: 'rgba(148, 163, 184, 0.9)', font: { family: 'Plus Jakarta Sans', size: 11 } }
      }
    },
    scales: {
      x: { ticks: { color: 'rgba(148, 163, 184, 0.9)' }, grid: { display: false } },
      y: { ticks: { color: 'rgba(148, 163, 184, 0.9)' }, grid: { color: 'rgba(255,255,255,0.05)' } }
    }
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner Alert for Breakdowns if any */}
      {breakdowns.length > 0 && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(185, 28, 28, 0.3) 100%)',
          border: '1px solid rgba(239, 68, 68, 0.5)',
          borderRadius: '16px',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 8px 24px rgba(239, 68, 68, 0.2)'
        }} className="pulse-alert">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ShieldAlert size={28} color="var(--status-red)" />
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>
                EMERGENCY BREAKDOWN REPORTED ({breakdowns.length})
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {breakdowns[0].vehicleNumber} reported issue: "{breakdowns[0].description}" at {breakdowns[0].location}
              </p>
            </div>
          </div>
          <button className="btn-primary" style={{ background: 'var(--status-red)' }} onClick={() => setActiveTab('breakdown')}>
            View Live Breakdown Alert
          </button>
        </div>
      )}

      {/* KPI Cards Grid (8 Cards) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        {/* Total Vehicles */}
        <div className="glass-card glass-card-hover" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Total Fleet Vehicles</span>
            <div style={{ background: 'var(--accent-light)', padding: '0.5rem', borderRadius: '10px', color: 'var(--accent-primary)' }}>
              <Truck size={20} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.5rem 0 0.2rem 0' }}>
            {totalVehicles}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--status-green)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <TrendingUp size={14} /> 100% Operational Readiness
          </div>
        </div>

        {/* Available Vehicles */}
        <div className="glass-card glass-card-hover" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Available Fleet</span>
            <div style={{ background: 'var(--status-green-bg)', padding: '0.5rem', borderRadius: '10px', color: 'var(--status-green)' }}>
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.5rem 0 0.2rem 0' }}>
            {availableVehicles}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Ready for instant allocation
          </div>
        </div>

        {/* Active Drivers */}
        <div className="glass-card glass-card-hover" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Active Drivers</span>
            <div style={{ background: 'var(--status-blue-bg)', padding: '0.5rem', borderRadius: '10px', color: 'var(--status-blue)' }}>
              <Users size={20} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.5rem 0 0.2rem 0' }}>
            {activeDrivers}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {drivers.filter(d => d.status === 'Driving').length} currently on road
          </div>
        </div>

        {/* Under Maintenance */}
        <div className="glass-card glass-card-hover" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Under Service</span>
            <div style={{ background: 'var(--status-amber-bg)', padding: '0.5rem', borderRadius: '10px', color: 'var(--status-amber)' }}>
              <Wrench size={20} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.5rem 0 0.2rem 0' }}>
            {maintenanceVehicles}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--status-amber)', fontWeight: 600 }}>
            Scheduled servicing in progress
          </div>
        </div>

        {/* Today's Trips */}
        <div className="glass-card glass-card-hover" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Today's Active Trips</span>
            <div style={{ background: 'var(--status-purple-bg)', padding: '0.5rem', borderRadius: '10px', color: 'var(--status-purple)' }}>
              <Navigation size={20} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.5rem 0 0.2rem 0' }}>
            {todayTrips}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {onTripVehicles} active route movements
          </div>
        </div>

        {/* Monthly Fuel Cost */}
        <div className="glass-card glass-card-hover" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Monthly Fuel Cost</span>
            <div style={{ background: 'var(--status-blue-bg)', padding: '0.5rem', borderRadius: '10px', color: 'var(--status-blue)' }}>
              <Fuel size={20} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.5rem 0 0.2rem 0' }}>
            ${totalFuelCost.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--status-green)', fontWeight: 600 }}>
            Avg 4.8 km/L efficiency
          </div>
        </div>

        {/* Monthly Maintenance Cost */}
        <div className="glass-card glass-card-hover" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Maintenance Cost</span>
            <div style={{ background: 'var(--status-red-bg)', padding: '0.5rem', borderRadius: '10px', color: 'var(--status-red)' }}>
              <Wrench size={20} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.5rem 0 0.2rem 0' }}>
            ${totalMaintenanceCost.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            2 Workshop logs this month
          </div>
        </div>

        {/* Insurance Expiring Soon */}
        <div className="glass-card glass-card-hover" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Insurance Expiring</span>
            <div style={{ background: 'var(--status-amber-bg)', padding: '0.5rem', borderRadius: '10px', color: 'var(--status-amber)' }}>
              <AlertTriangle size={20} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.5rem 0 0.2rem 0' }}>
            {expiringInsuranceCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--status-red)', fontWeight: 700 }}>
            Requires renewal within 30 days
          </div>
        </div>
      </div>

      {/* Main Analytics Grid (Charts + AI Recommendations) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Left: Monthly Expenses Chart */}
        <div className="glass-card" style={{ padding: '1.5rem', height: '360px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>Fleet Expense & Cost Analysis</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fuel vs Maintenance Expenditure Breakdown</p>
            </div>
            <button className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }} onClick={() => setActiveTab('reports')}>
              Full Expense Report
            </button>
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <Bar data={expenseBarData} options={chartOptions} />
          </div>
        </div>

        {/* Right: Fleet Status Doughnut Chart */}
        <div className="glass-card" style={{ padding: '1.5rem', height: '360px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>Fleet Operational Status</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Vehicle Distribution Overview</p>
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Doughnut data={statusDoughnutData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: 'rgba(148,163,184,0.9)' } } } }} />
          </div>
        </div>
      </div>

      {/* Bottom Grid: AI Smart Suggestions & Recent Vehicle Health */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* AI Smart Maintenance Recommendations Widget */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)', padding: '0.45rem', borderRadius: '10px', color: 'white' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>AI Predictive Maintenance Suggestions</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Automated Telematics Diagnostic Rules</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {aiRecommendations.map(rec => (
              <div key={rec.id} style={{
                background: 'var(--bg-surface-solid)',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem'
              }}>
                <AlertTriangle size={20} color={rec.severity === 'Critical' ? 'var(--status-red)' : 'var(--status-amber)'} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      Vehicle {rec.vehicleNumber}: {rec.title}
                    </span>
                    <span className={`badge ${rec.severity === 'Critical' ? 'badge-red' : 'badge-amber'}`} style={{ fontSize: '0.65rem' }}>
                      {rec.severity}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {rec.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Vehicle Roster Quick List & QR Code Trigger */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>Fleet Roster & Health Scores</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Instant QR Tagging & Diagnostic Status</p>
            </div>
            <button className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }} onClick={() => setActiveTab('vehicles')}>
              View All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {vehicles.slice(0, 4).map(v => (
              <div key={v.id} style={{
                background: 'var(--bg-surface-solid)',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <img src={v.imageUrl} alt={v.vehicleNumber} style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {v.vehicleNumber} • {v.brand} {v.model}
                    </div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                      Reg: {v.registrationNumber} • {v.mileageKm.toLocaleString()} km
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {/* Health Score Pill */}
                  <span className={`badge ${v.healthScore >= 80 ? 'badge-green' : v.healthScore >= 60 ? 'badge-amber' : 'badge-red'}`}>
                    Health: {v.healthScore}
                  </span>

                  {/* QR Code Button */}
                  <button
                    onClick={() => onSelectVehicleQr(v)}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--glass-border)',
                      padding: '0.45rem',
                      borderRadius: '8px',
                      color: 'var(--text-main)',
                      cursor: 'pointer'
                    }}
                    title="View QR Code Profile"
                  >
                    <QrCode size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
