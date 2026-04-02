import { useState } from 'react';
import { LayoutDashboard, Map, Activity, TrendingUp, AlertCircle, Bell, LogOut } from 'lucide-react';
import './App.css';

import TelemetryDashboard from './components/TelemetryDashboard';
import FleetMap from './components/FleetMap';
import MarketExchange from './components/MarketExchange';
import HomePage from './components/HomePage';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!showDashboard) {
    return <HomePage onEnter={() => setShowDashboard(true)} />;
  }

  return (
    <div className="layout-grid">
      <aside className="sidebar">
        <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', paddingBottom: '24px', borderBottom: '1px solid var(--border-color)' }}>
          <img src="/logo.png" alt="Yield Logic Logo" style={{ height: '80px', objectFit: 'contain' }} />
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
            style={navBtnStyle(activeTab === 'overview')}
          >
            <LayoutDashboard size={20} /> My Dashboard
          </button>
          <button 
            className={`nav-btn ${activeTab === 'fleet' ? 'active' : ''}`}
            onClick={() => setActiveTab('fleet')}
            style={navBtnStyle(activeTab === 'fleet')}
          >
            <Map size={20} /> Truck Pickups
          </button>
          <button 
            className={`nav-btn ${activeTab === 'telemetry' ? 'active' : ''}`}
            onClick={() => setActiveTab('telemetry')}
            style={navBtnStyle(activeTab === 'telemetry')}
          >
            <Activity size={20} /> Storage Health
          </button>
          <button 
            className={`nav-btn ${activeTab === 'market' ? 'active' : ''}`}
            onClick={() => setActiveTab('market')}
            style={navBtnStyle(activeTab === 'market')}
          >
            <TrendingUp size={20} /> Market Prices
          </button>
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '16px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--warning-amber)', marginBottom: '8px', fontWeight: 600 }}>
              <AlertCircle size={16} /> Weather Update
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              Heavy rain expected tonight. We have automatically rescheduled your pickup truck to arrive 2 hours earlier.
            </p>
          </div>
          
          <button 
            onClick={() => setShowDashboard(false)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }}
          >
            <LogOut size={16} /> Back to Home
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1 className="header-title">
            {activeTab === 'overview' ? 'MY DASHBOARD' :
             activeTab === 'fleet' ? 'TRUCK PICKUPS' :
             activeTab === 'telemetry' ? 'STORAGE HEALTH' : 'MARKET PRICES'}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <Bell size={24} />
            </button>
            <div className="status-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
              <div className="status-dot"></div>
              ALL SYSTEMS GOOD
            </div>
          </div>
        </header>

        <div className="tab-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
          {activeTab === 'overview' && (
             <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <TelemetryDashboard summaryOnly />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <FleetMap previewOnly />
                  <MarketExchange previewOnly />
                </div>
             </div>
          )}
          {activeTab === 'fleet' && <FleetMap />}
          {activeTab === 'telemetry' && <TelemetryDashboard />}
          {activeTab === 'market' && <MarketExchange />}
        </div>
      </main>
    </div>
  );
}

const navBtnStyle = (active: boolean): React.CSSProperties => ({
  display: 'flex', 
  alignItems: 'center', 
  gap: '12px', 
  padding: '12px 16px', 
  background: active ? 'rgba(16, 185, 129, 0.15)' : 'transparent', 
  border: 'none', 
  color: active ? 'var(--accent-emerald)' : 'var(--text-muted)', 
  borderRadius: '8px', 
  cursor: 'pointer',
  textAlign: 'left',
  fontWeight: 500,
  fontSize: '16px',
  transition: 'all 0.2s',
  borderLeft: active ? '3px solid var(--accent-emerald)' : '3px solid transparent'
});

export default App;
