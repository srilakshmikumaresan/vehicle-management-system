import React, { useState } from 'react';
import { FileText, Download, FileSpreadsheet, Printer, CheckCircle2 } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { useFleet } from '../../context/FleetContext';

export const ReportGenerator = () => {
  const { vehicles, drivers, trips, fuelLogs, maintenance } = useFleet();
  const [reportType, setReportType] = useState('VEHICLE');

  // Export PDF Generator
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`FleetIQ Enterprise Report - ${reportType} REPORT`, 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

    let head = [];
    let body = [];

    if (reportType === 'VEHICLE') {
      head = [['Tag Num', 'Brand & Model', 'Type', 'Registration', 'Mileage (km)', 'Health', 'Status']];
      body = vehicles.map(v => [v.vehicleNumber, `${v.brand} ${v.model}`, v.vehicleType, v.registrationNumber, v.mileageKm, `${v.healthScore}%`, v.status]);
    } else if (reportType === 'DRIVER') {
      head = [['Code', 'Name', 'License Num', 'Phone', 'Rating', 'Trips', 'Status']];
      body = drivers.map(d => [d.driverCode, d.name, d.licenseNumber, d.phone, d.rating, d.completedTrips, d.status]);
    } else if (reportType === 'FUEL') {
      head = [['Vehicle', 'Quantity (L)', 'Fuel Type', 'Cost ($)', 'Station', 'Date']];
      body = fuelLogs.map(f => [f.vehicleNumber, f.fuelQuantityLiters, f.fuelType, `$${f.costTotal.toFixed(2)}`, f.fuelStation, f.logDate]);
    } else if (reportType === 'MAINTENANCE') {
      head = [['Vehicle', 'Service Type', 'Cost ($)', 'Workshop', 'Service Date', 'Next Due']];
      body = maintenance.map(m => [m.vehicleNumber, m.serviceType, `$${m.cost.toFixed(2)}`, m.workshopName, m.serviceDate, m.nextServiceDue]);
    } else if (reportType === 'TRIP') {
      head = [['Trip Code', 'Vehicle', 'Driver', 'Source -> Destination', 'Distance', 'Status']];
      body = trips.map(t => [t.tripCode, t.vehicleNumber, t.driverName, `${t.source} -> ${t.destination}`, `${t.distanceKm} km`, t.status]);
    }

    doc.autoTable({
      head: head,
      body: body,
      startY: 35,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] }
    });

    doc.save(`FleetIQ_${reportType}_Report_${Date.now()}.pdf`);
  };

  // Export Excel Generator
  const exportExcel = () => {
    let data = [];
    if (reportType === 'VEHICLE') data = vehicles;
    else if (reportType === 'DRIVER') data = drivers;
    else if (reportType === 'FUEL') data = fuelLogs;
    else if (reportType === 'MAINTENANCE') data = maintenance;
    else if (reportType === 'TRIP') data = trips;

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, reportType);
    XLSX.writeFile(workbook, `FleetIQ_${reportType}_Report_${Date.now()}.xlsx`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>Enterprise Report & Export Engine</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Generate audit-ready PDF, Excel spreadsheets, and print manifests</p>
      </div>

      {/* Control Box */}
      <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>Select Report Module</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
          {['VEHICLE', 'DRIVER', 'FUEL', 'MAINTENANCE', 'TRIP'].map(type => (
            <button
              key={type}
              onClick={() => setReportType(type)}
              style={{
                padding: '0.75rem',
                borderRadius: '12px',
                border: reportType === type ? '2px solid var(--accent-primary)' : '1px solid var(--glass-border)',
                background: reportType === type ? 'var(--accent-light)' : 'var(--bg-card)',
                color: reportType === type ? 'var(--accent-primary)' : 'var(--text-main)',
                fontWeight: 800,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              {type} REPORT
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={exportPDF}>
            <Download size={18} /> Download PDF Report
          </button>
          <button className="btn-secondary" style={{ color: 'var(--status-green)', borderColor: 'rgba(16,185,129,0.3)' }} onClick={exportExcel}>
            <FileSpreadsheet size={18} /> Export Excel (.XLSX)
          </button>
          <button className="btn-secondary" onClick={handlePrint}>
            <Printer size={18} /> Print Document
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
          Live Data Preview ({reportType})
        </h3>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Selected dataset contains {reportType === 'VEHICLE' ? vehicles.length : reportType === 'DRIVER' ? drivers.length : reportType === 'FUEL' ? fuelLogs.length : reportType === 'MAINTENANCE' ? maintenance.length : trips.length} rows ready for export.
        </div>
      </div>
    </div>
  );
};
