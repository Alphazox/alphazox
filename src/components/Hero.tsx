import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

interface HeroProps {
  onExploreServices: () => void;
  onContactUs: () => void;
}

const TYPEWRITER_PHRASES = [
  'Digital Transformation',
  'Cloud Engineering',
  'Generative AI',
  'Enterprise Solutions',
  'RPA Automation',
  'Data Science & Analytics',
];

const STATS = [
  { target: 150, suffix: '+', label: 'Completed Projects' },
  { target: 2500, suffix: '+', label: 'Cloud Professionals' },
  { target: 9, suffix: '', label: 'Practice Areas' },
  { target: 100, suffix: '%', label: 'Quality Commitment' },
];

function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

function StatCard({ stat, animate }: { stat: typeof STATS[0]; animate: boolean }) {
  const val = useCountUp(stat.target, 1800, animate);
  return (
    <div className="stat-card card">
      <div className="stat-value">{val}{stat.suffix}</div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

export const Hero: React.FC<HeroProps> = ({ onExploreServices, onContactUs }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    const phrase = TYPEWRITER_PHRASES[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < phrase.length) {
      timeout = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 65);
    } else if (!deleting && displayed.length === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % TYPEWRITER_PHRASES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIndex]);

  // Intersection Observer for counter animation
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStatsVisible(true);
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero-section">
      {/* Animated Background Layers */}
      <div className="hero-grid-bg" />
      <div className="hero-particle-field">
        {Array.from({ length: 60 }).map((_, i) => (
          <span key={i} className="hero-particle" style={{
            '--delay': `${(i * 0.23) % 8}s`,
            '--x': `${(i * 17.3) % 100}%`,
            '--y': `${(i * 13.7) % 100}%`,
            '--size': `${2 + (i % 3)}px`,
            '--dur': `${6 + (i % 5)}s`,
          } as React.CSSProperties} />
        ))}
      </div>

      {/* 3D Rotating Rings */}
      <div className="hero-ring-wrapper" aria-hidden="true">
        <div className="hero-ring hero-ring-1" />
        <div className="hero-ring hero-ring-2" />
        <div className="hero-ring hero-ring-3" />
        <div className="hero-ring hero-ring-4" />
      </div>

      {/* Floating 3D Orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />

      {/* Floating Service Chips */}
      <div className="hero-chips" aria-hidden="true">
        {['🤖 AI/ML', '☁️ Cloud', '⚙️ DevOps', '📊 Analytics', '🔒 Security', '🚀 RPA'].map((chip, i) => (
          <span key={i} className="hero-chip" style={{ '--chip-delay': `${i * 0.8}s` } as React.CSSProperties}>{chip}</span>
        ))}
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Next-Gen IT Transformation Partner
          </div>

          <h1 className="hero-title">
            Unlock Enterprise Growth<br />
            Through{' '}
            <span className="text-gradient typewriter-wrap">
              <span className="typewriter-text">{displayed}</span>
              <span className="typewriter-cursor">|</span>
            </span>
          </h1>

          <p className="hero-description">
            ALPHAZOX is your trusted global partner across modern technology capabilities — from custom software development and intelligent RPA automation to cloud engineering, data science, SAP services, financial management, and establishing world-class Global Capability Centers (GCCs). We combine design thinking with a cloud-first approach to accelerate your digital journey.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary hero-cta-primary" onClick={onExploreServices}>
              Explore Our Services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </button>
            <button className="btn btn-secondary" onClick={onContactUs}>
              Book Free Consultation
            </button>
          </div>

          {/* Trust Badges */}
          <div className="hero-trust-badges">
            <span className="trust-badge">🏆 Microsoft Gold Partner</span>
            <span className="trust-badge">☁️ AWS Certified</span>
            <span className="trust-badge">🌐 ISO 27001</span>
            <span className="trust-badge">⭐ Salesforce Partner</span>
          </div>
        </div>

        {/* Animated Stats */}
        <div className="hero-stats grid-4" ref={statsRef}>
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} animate={statsVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};
