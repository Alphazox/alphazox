import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { Industries } from '../components/Industries';
import { FormModal } from '../components/FormModal';
import { useNavigate, Link } from 'react-router-dom';
import './Page.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'consultation' | 'contact'>('consultation');

  const testimonials = [
    {
      quote: "ALPHAZOX automated our medical records indexing using custom NLP models, reducing lookup times by 80% and ensuring ISO compliance.",
      author: "Sarah Montgomery",
      role: "VP of Digital Operations",
      company: "CareGrid Healthcare Systems",
      logo: "🏥"
    },
    {
      quote: "Their Microsoft Power Platform and Salesforce custom workflows eliminated manual invoice matching, saving us over 400 operational hours per month.",
      author: "David Vance",
      role: "Chief Financial Officer",
      company: "Apex Global Manufacturing",
      logo: "🏭"
    },
    {
      quote: "We migrated our core database services to AWS under their Zero-Surprise Framework. Zero downtime. Incredible execution.",
      author: "Michael Chang",
      role: "Director of Enterprise Infrastructure",
      company: "Vanguard Wealth Partners",
      logo: "💳"
    }
  ];

  return (
    <div style={{ position: 'relative' }}>
      <Hero
        onExploreServices={() => navigate('/services')}
        onContactUs={() => {
          setModalType('consultation');
          setModalOpen(true);
        }}
      />

      {/* Trust Ticker / Stats Scrolling Left-to-Right */}
      <section className="section section-alt" style={{ padding: '3rem 0', overflow: 'hidden' }}>
        <div className="container">
          <div className="ticker-container">
            <div className="ticker-track">
              {/* Loop triple-times for a seamless scroll ticker loop */}
              {[1, 2, 3].map((loopIdx) => (
                <React.Fragment key={loopIdx}>
                  <div className="ticker-item">
                    <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-secondary)' }}>150+</span>
                    <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Completed Projects</p>
                  </div>
                  <div className="ticker-item">
                    <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>9</span>
                    <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Practice Areas</p>
                  </div>
                  <div className="ticker-item">
                    <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-accent)' }}>99%</span>
                    <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Customer Satisfaction</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brief Company Overview / About Intro */}
      <section className="section container">
        <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ color: 'var(--color-secondary)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>Global IT Solutions Partner</span>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '1.25rem', color: 'var(--text-white)' }}>Pioneering Enterprise Growth & Intelligence</h2>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: '1.7' }}>
              ALPHAZOX engineers and delivers cutting-edge technology frameworks for the world's most demanding enterprises. From custom database optimizations to Generative AI implementations, we provide the skills and scale to accelerate your digital future.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <Link to="/about" className="btn btn-primary">Learn About Our History</Link>
              <Link to="/services" className="btn btn-secondary">Our Capabilities</Link>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-white)', marginBottom: '0.5rem' }}>Why Organizations Choose Us</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.95rem' }}>
                  <span style={{ color: 'var(--color-secondary)', fontWeight: 'bold' }}>✓</span>
                  <span><strong>Microsoft Gold Partner</strong> — Azure, .NET and Power Platform integrations.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.95rem' }}>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>✓</span>
                  <span><strong>Global Capability Centers (GCC)</strong> — Custom operations setup in India.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.95rem' }}>
                  <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>✓</span>
                  <span><strong>Certified Security</strong> — Strictly ISO-compliant data protection.</span>
                </li>
              </ul>
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
                src="/images/enterprise_overview.png" 
                alt="ALPHAZOX Enterprise Technology Overview" 
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
      </section>

      {/* Industries Served Section */}
      <Industries />

      {/* Testimonials Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-title">
            <h2>Success Stories & Testimonials</h2>
            <p>Read how our custom services transformed operations for global clients.</p>
          </div>

          {/* Continuous scrolling testimonials slider */}
          <div className="slider-container">
            <div className="slider-track">
              {/* Duplicate the array twice to ensure seamless infinite looping */}
              {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="card slider-item" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '2rem' }}>{t.logo}</span>
                  <p style={{ fontStyle: 'italic', fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
                    "{t.quote}"
                  </p>
                  <div>
                    <h4 style={{ fontSize: '1rem', margin: '0 0 0.15rem 0' }}>{t.author}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <FormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        formType={modalType}
      />
    </div>
  );
};

export default HomePage;
