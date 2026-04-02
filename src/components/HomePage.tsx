import { ArrowRight, Tractor, Truck, Snowflake, TrendingUp, ShieldCheck, MapPin, DollarSign } from 'lucide-react';
import './HomePage.css';

export default function HomePage({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="home-container">
      <header className="hero-section">
        <img src="/logo.png" alt="Yield Logic" className="pulse" style={{ width: '150px', height: '150px', objectFit: 'contain', marginBottom: '24px', borderRadius: '50%' }} />
        <p className="hero-subtitle" style={{ marginTop: '16px' }}>
          We turn complex farming into simple tools. Never lose a crop to spoilage, bad weather, or low prices again.
        </p>

        <div className="animation-container">
          <div className="animation-path"></div>
          
          <div className="animated-node pulse" style={{ borderColor: 'var(--accent-emerald)' }}>
             <Tractor size={32} className="node-icon" style={{ color: 'var(--accent-emerald)' }} />
             <span className="node-label">1. Your Farm</span>
          </div>
          
          <div className="animated-node drive">
             <Truck size={32} className="node-icon" />
             <span className="node-label">2. Fast Transport</span>
          </div>

          <div className="animated-node">
             <Snowflake size={32} className="node-icon" />
             <span className="node-label">3. Safe Storage</span>
          </div>

          <div className="animated-node pulse" style={{ borderColor: 'var(--accent-emerald)' }}>
             <TrendingUp size={32} className="node-icon" style={{ color: 'var(--accent-emerald)' }} />
             <span className="node-label">4. Best Market Price</span>
          </div>
        </div>

        <button className="cta-button" onClick={onEnter}>
          Open My Dashboard <ArrowRight size={24} />
        </button>
      </header>

      <section className="features-grid">
        <div className="feature-card">
          <ShieldCheck size={48} color="var(--accent-cyan)" style={{ margin: '0 auto' }} />
          <h3>Stop Spoilage</h3>
          <p>Your crops stay fresh while waiting. We automatically adjust cooling fans and temperatures if delays happen.</p>
        </div>
        
        <div className="feature-card">
          <MapPin size={48} color="var(--accent-emerald)" style={{ margin: '0 auto' }} />
          <h3>Smarter Trucks</h3>
          <p>Heavy rain? Traffic? Our system tells pickup trucks the fastest route to your farm, saving precious hours.</p>
        </div>

        <div className="feature-card">
          <DollarSign size={48} color="var(--warning-amber)" style={{ margin: '0 auto' }} />
          <h3>Make More Money</h3>
          <p>We connect you directly to buyers paying the highest prices, predicting precisely when you should sell your harvest.</p>
        </div>
      </section>
    </div>
  );
}
