import React, { useState } from 'react';
import './Page.css';

interface Office {
  country: string;
  flag: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  coordinates: { x: number; y: number };
}

const AboutPage: React.FC = () => {
  const [activeOffice, setActiveOffice] = useState<number>(0);

  const offices: Office[] = [
    {
      country: 'United States',
      flag: '🇺🇸',
      city: 'Austin, TX',
      address: 'USA Advisory Office, Alphazox, Austin, Texas, USA (Meet the Advisor by Appointment Only)',
      phone: '+1 (716) 939-6514',
      email: 'info@alphazox.com',
      coordinates: { x: 25, y: 42 } // Normalized SVG coordinates
    },
    {
      country: 'India (Hyd)',
      flag: '🇮🇳',
      city: 'Hyderabad, TS',
      address: 'Alphazox, Near Hyderabad Knowledge City, Raidurgam, Serilingampally, Hyderabad, Telangana – 500081, India',
      phone: '+91-955-025-0099',
      email: 'support@alphazox.com',
      coordinates: { x: 72, y: 55 }
    },
    {
      country: 'India (Vizag)',
      flag: '🇮🇳',
      city: 'Visakhapatnam, AP',
      address: 'Alphazox: Near Andhra University, North Campus, Visakhapatnam, Andhra Pradesh – 530003, India',
      phone: '+91-955-025-0099',
      email: 'support@alphazox.com',
      coordinates: { x: 75, y: 57 }
    }
  ];

  const values = [
    { title: 'Excellence', desc: 'We deliver nothing less than state-of-the-art solutions engineered to perfection.' },
    { title: 'Integrity', desc: 'Honesty, transparency, and ethical practices form the bedrock of our relationships.' },
    { title: 'Innovation', desc: 'We constantly challenge the status quo, leveraging GenAI and automation to break boundaries.' },
    { title: 'Client First', desc: 'Your growth is our compass. We tailor every single operation around your business goals.' }
  ];

  return (
    <div className="page-wrapper">
      {/* Hero Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <span className="page-label">Who We Are</span>
          <h1>About ALPHAZOX</h1>
          <p>A trusted global digital transformation partner delivering pioneering next-generation technology solutions.</p>
        </div>
      </div>

      {/* Overview Section */}
      <section className="section container">
        <div className="grid-2" style={{ alignItems: 'center', gap: '3rem', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '1.5rem', color: 'var(--text-white)' }}>Pioneering Enterprise Innovation</h2>
            <p style={{ marginBottom: '1.25rem', fontSize: '1.05rem', lineHeight: '1.7' }}>
              ALPHAZOX stands at the intersection of business strategy and cutting-edge technology. As a modern, agile IT service partner, we empower enterprises, mid-market companies, and scaling startups to accelerate their digital evolutionary journeys.
            </p>
            <p style={{ marginBottom: '2rem', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Through our specialized delivery models, robust engineering frameworks, and strategic partnerships, we provide end-to-end solutions that stabilize backend operations, automate administrative friction, and inject artificial intelligence into modern enterprise workflows.
            </p>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-secondary)' }}>150+</div>
                <p style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Completed Projects</p>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>250+</div>
                <p style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Certified Experts</p>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-accent)' }}>99%</div>
                <p style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Client Retention</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
              border: '1px solid var(--border-color)',
              width: '100%',
              aspectRatio: '4/3'
            }}>
              <img 
                src="/images/about_overview.png" 
                alt="About ALPHAZOX Innovation & Systems" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(11,15,25,0.6) 0%, transparent 50%)',
                pointerEvents: 'none'
              }} />
            </div>
          </div>
        </div>

        {/* Global Partnerships & Credentials Badge Row */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
          <h3 style={{ fontSize: '1.4rem', textAlign: 'center', marginBottom: '0.5rem', color: 'var(--text-white)' }}>Global Accreditations & Key Alliances</h3>
          <div className="grid-3" style={{ gap: '1.5rem' }}>
            <div className="card" style={{ borderTop: '4px solid var(--color-secondary)', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '2rem' }}>🏆</span>
                <h4 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-white)' }}>Microsoft Gold Partner</h4>
              </div>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>Direct integration with Microsoft ecosystem, cloud solutions, Azure scaling, and enterprise licensing discounts.</p>
            </div>
            
            <div className="card" style={{ borderTop: '4px solid var(--color-primary)', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '2rem' }}>⚡</span>
                <h4 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-white)' }}>TD SYNNEX Strategic Alliance</h4>
              </div>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>Strategic technology licensing and procurement, giving our clients access to volume software discounts and hardware bundles.</p>
            </div>

            <div className="card" style={{ borderTop: '4px solid var(--color-accent)', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '2rem' }}>🛡️</span>
                <h4 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-white)' }}>ISO 27001 Security Standard</h4>
              </div>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>Our delivery systems utilize strict ISMS regulations, ensuring complete data sovereignty, protection, and strict SLA compliance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-title">
            <h2>Our Core Values</h2>
            <p>The principles that define how we cooperate, engineer, and lead.</p>
          </div>
          <div className="grid-4">
            {values.map((v, i) => (
              <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                  0{i + 1}
                </div>
                <h3 style={{ fontSize: '1.15rem' }}>{v.title}</h3>
                <p style={{ fontSize: '0.9rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Global Presence Map Section */}
      <section className="section container">
        <div className="section-title">
          <h2>Global Presence Map</h2>
          <p>Connecting global operations from our state-of-the-art office spaces in USA and India.</p>
        </div>

        <div className="grid-2" style={{ alignItems: 'center' }}>
          {/* Interactive SVG Map Illustration */}
          <div className="card" style={{ position: 'relative', overflow: 'hidden', padding: '1rem', background: '#0a0e22', border: '1px solid rgba(255,255,255,0.05)' }}>
            <svg viewBox="0 0 100 60" width="100%" height="auto" style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))' }}>
              {/* Simplified world map path silhouettes */}
              <rect width="100%" height="100%" fill="#040612" rx="8" />
              {/* Grid pattern overlay */}
              <defs>
                <pattern id="map-grid" width="4" height="4" patternUnits="userSpaceOnUse">
                  <path d="M 4 0 L 0 0 0 4" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#map-grid)" />
              
              {/* Outline map of Americas and Eurasia (simplified placeholders) */}
              <path d="M10,15 Q15,10 25,12 T35,25 T28,45 T18,50 Z" fill="rgba(255, 255, 255, 0.04)" />
              <path d="M50,15 Q65,10 80,12 T90,25 T80,45 T70,55 Z" fill="rgba(255, 255, 255, 0.04)" />
              
              {/* Connecting flight/ping paths */}
              <path d={`M 25 42 Q 48.5 25, 72 55`} fill="none" stroke="var(--color-primary)" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.6" />
              <path d={`M 25 42 Q 50 30, 75 57`} fill="none" stroke="var(--color-secondary)" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.6" />
              
              {/* Office Location Markers */}
              {offices.map((office, idx) => (
                <g key={idx} style={{ cursor: 'pointer' }} onClick={() => setActiveOffice(idx)}>
                  {/* Outer pulsating ring for active location */}
                  {activeOffice === idx && (
                    <circle cx={office.coordinates.x} cy={office.coordinates.y} r="3.5" fill="none" stroke={idx === 0 ? 'var(--color-primary)' : 'var(--color-secondary)'} strokeWidth="0.5">
                      <animate attributeName="r" values="1.5;4.5;1.5" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {/* Central marker point */}
                  <circle
                    cx={office.coordinates.x}
                    cy={office.coordinates.y}
                    r="1.5"
                    fill={activeOffice === idx ? (idx === 0 ? 'var(--color-primary)' : 'var(--color-secondary)') : '#64748b'}
                    style={{ transition: 'all 0.3s' }}
                  />
                  {/* Label */}
                  <text
                    x={office.coordinates.x}
                    y={office.coordinates.y - 3}
                    fontSize="1.8"
                    fontWeight="bold"
                    fill="#ffffff"
                    textAnchor="middle"
                    opacity={activeOffice === idx ? 1 : 0.6}
                  >
                    {office.city.split(',')[0]}
                  </text>
                </g>
              ))}
            </svg>
            <div style={{ textAlign: 'center', fontSize: '0.75rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
              Click on the map markers to toggle selected office view
            </div>
          </div>

          {/* Interactive Office Details Panel */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%', justifyContent: 'center' }}>
            <span style={{ fontSize: '2.5rem' }}>{offices[activeOffice].flag}</span>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {offices[activeOffice].country} Office
              </span>
              <h3 style={{ fontSize: '1.75rem', marginTop: '0.25rem' }}>{offices[activeOffice].city}</h3>
            </div>
            
            <p style={{ fontSize: '1.05rem', margin: 0 }}>
              <strong>Address:</strong><br />
              {offices[activeOffice].address}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
              <a href={`tel:${offices[activeOffice].phone.replace(/-/g, '')}`} className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                📞 {offices[activeOffice].phone}
              </a>
              <a href={`mailto:${offices[activeOffice].email}`} className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                ✉️ {offices[activeOffice].email}
              </a>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              {offices.map((off, idx) => (
                <button
                  key={idx}
                  className={`btn ${activeOffice === idx ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                  onClick={() => setActiveOffice(idx)}
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                >
                  {off.city.split(',')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
