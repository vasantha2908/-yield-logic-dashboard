import { useState, useEffect } from 'react';
import { Thermometer, Droplets, Fan, Leaf } from 'lucide-react';

export default function TelemetryDashboard({ summaryOnly }: { summaryOnly?: boolean }) {
  const [data, setData] = useState({ temp: 22.0, humidity: 88, airflow: 45, freshness: 95.5 });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        temp: prev.temp + (Math.random() * 0.4 - 0.2),
        humidity: prev.humidity + (Math.random() * 2 - 1),
        airflow: 45 + (Math.random() * 5 - 2.5),
        freshness: Math.max(90, prev.freshness - (Math.random() * 0.1))
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel text-white">
      <h3 style={{ marginTop: 0, marginBottom: '24px', color: 'var(--text-primary)', fontWeight: 600 }}>STORAGE & WAREHOUSE HEALTH</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '14px' }}>We are monitoring your stored crops to ensure they stay fresh until the buyer picks them up.</p>
      <div className="grid-cards" style={{ gridTemplateColumns: summaryOnly ? 'repeat(4, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <MetricCard title="Temperature" value={`${data.temp.toFixed(1)} °C`} icon={<Thermometer size={24} color="var(--accent-cyan)" />} status="Good" />
        <MetricCard title="Air Moisture" value={`${data.humidity.toFixed(0)} %`} icon={<Droplets size={24} color="var(--accent-cyan)" />} status="Good" />
        <MetricCard title="Ventilation" value="Active" icon={<Fan size={24} color="var(--accent-cyan)" />} status="Fans Running" />
        <MetricCard title="Crop Freshness" value={`${data.freshness.toFixed(1)} %`} icon={<Leaf size={24} color={data.freshness < 92 ? 'var(--warning-amber)' : 'var(--accent-emerald)'} />} status={data.freshness < 92 ? 'Requires Attention' : 'Excellent'} />
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, status }: { title: string, value: string | number, icon: React.ReactNode, status: string }) {
  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="card-title" style={{ margin: 0, color: 'var(--text-muted)', fontSize: '13px' }}>{title}</span>
        {icon}
      </div>
      <div className="card-value" style={{ fontSize: '28px', color: 'var(--text-primary)' }}>{value}</div>
      <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--accent-emerald)' }}>✓ {status}</div>
    </div>
  );
}
