import React, { useState } from 'react';
import { FleetProvider } from './context/FleetContext';
import { Sidebar } from './components/common/Sidebar';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/ToastContainer';
import { QRModal } from './components/common/QRModal';

import { DashboardView } from './components/dashboard/DashboardView';
import { VehicleManagement } from './components/vehicles/VehicleManagement';
import { DriverManagement } from './components/drivers/DriverManagement';
import { AllocationView } from './components/allocation/AllocationView';
import { TripManagement } from './components/trips/TripManagement';
import { FuelManagement } from './components/fuel/FuelManagement';
import { MaintenanceManagement } from './components/maintenance/MaintenanceManagement';
import { LiveTrackingMap } from './components/map/LiveTrackingMap';
import { ReportGenerator } from './components/reports/ReportGenerator';
import { FleetCalendar } from './components/calendar/FleetCalendar';
import { BreakdownAlertModal } from './components/breakdown/BreakdownAlertModal';
import { SettingsView } from './components/settings/SettingsView';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [qrVehicle, setQrVehicle] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView setActiveTab={setActiveTab} onSelectVehicleQr={setQrVehicle} />;
      case 'vehicles':
      case 'my-vehicle':
        return <VehicleManagement onSelectVehicleQr={setQrVehicle} />;
      case 'drivers':
        return <DriverManagement />;
      case 'allocation':
        return <AllocationView />;
      case 'trips':
        return <TripManagement />;
      case 'fuel':
        return <FuelManagement />;
      case 'maintenance':
        return <MaintenanceManagement />;
      case 'map':
        return <LiveTrackingMap />;
      case 'reports':
        return <ReportGenerator />;
      case 'calendar':
        return <FleetCalendar />;
      case 'breakdown':
        return <BreakdownAlertModal />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView setActiveTab={setActiveTab} onSelectVehicleQr={setQrVehicle} />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Executive Fleet Analytics Dashboard';
      case 'vehicles': return 'Vehicle Directory & Telematics';
      case 'my-vehicle': return 'My Assigned Vehicle';
      case 'drivers': return 'Driver Roster & Licensing Compliance';
      case 'allocation': return 'Vehicle & Driver Pairing Engine';
      case 'trips': return 'Trip Manifest & Dispatch Control';
      case 'fuel': return 'Fuel Log & Efficiency Tracker';
      case 'maintenance': return 'Workshop Service & Maintenance Logs';
      case 'map': return 'Live GPS Tracking Map';
      case 'reports': return 'Enterprise Report & Data Export';
      case 'calendar': return 'Operations & Expiry Calendar';
      case 'breakdown': return 'Roadside Breakdown SOS Dispatch';
      case 'settings': return 'System Settings & Credentials';
      default: return 'Fleet Management System';
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-gradient)' }}>
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Workspace Container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Navbar title={getTitle()} activeTab={activeTab} />

        <main style={{ flex: 1, overflowY: 'auto' }}>
          {renderContent()}
        </main>
      </div>

      {/* Floating Notifications */}
      <ToastContainer />

      {/* QR Code Profile Inspector Modal */}
      {qrVehicle && (
        <QRModal vehicle={qrVehicle} onClose={() => setQrVehicle(null)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <FleetProvider>
      <AppContent />
    </FleetProvider>
  );
}
