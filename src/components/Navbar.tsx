import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Careers', path: '/careers' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [lang, setLang] = useState('🇺🇸 American English');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'dark' | 'light') || 'dark';
  });
  
  const location = useLocation();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Handle Theme Toggle
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Click outside language selector dropdown handler
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo">
            <rect width="100" height="100" rx="20" fill="url(#brand-grad)" />
            <path d="M50 20L80 75H20L50 20Z" fill="#ffffff" opacity="0.9" />
            <path d="M50 45L70 75H30L50 45Z" fill="#06b6d4" />
            <defs>
              <linearGradient id="brand-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366f1" />
                <stop offset="0.5" stopColor="#06b6d4" />
                <stop offset="1" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <span className="brand-name">ASTIKOS</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-menu">
          {navLinks.map(link => (
            <li key={link.path} className="navbar-item">
              <Link
                to={link.path}
                className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          {/* Language Selector Dropdown */}
          <div className="lang-selector" ref={langRef}>
            <button className="lang-btn" onClick={() => setIsLangOpen(!isLangOpen)} aria-label="Select Language">
              <span className="lang-flag">{lang.split(' ')[0]}</span>
              <span className="lang-text">{lang.split(' ')[1]}</span>
              <span className="lang-arrow">{isLangOpen ? '▲' : '▼'}</span>
            </button>
            {isLangOpen && (
              <ul className="lang-dropdown">
                {['🇺🇸 American English', '🇬🇧 British English', '🇦🇺 Australian English', '🇨🇦 Canadian English'].map(l => (
                  <li 
                    key={l} 
                    className={lang === l ? 'active' : ''} 
                    onClick={() => { setLang(l); setIsLangOpen(false); }}
                  >
                    <span className="lang-flag">{l.split(' ')[0]}</span>
                    <span>{l.split(' ').slice(1).join(' ')}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn" 
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <Link to="/quote" className="btn btn-primary btn-sm nav-cta">
            Get A Quote
          </Link>

          {/* Mobile Hamburger */}
          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`navbar-mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="navbar-mobile-menu">
          {navLinks.map(link => (
            <li key={link.path} className="navbar-mobile-item">
              <Link
                to={link.path}
                className={`navbar-mobile-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          
          {/* Mobile Language Selector */}
          <li className="navbar-mobile-item" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', padding: '0.75rem 0' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)' }}>Language</span>
            <div className="mobile-lang-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.75rem' }}>
              {['🇺🇸 American', '🇬🇧 British', '🇦🇺 Australian', '🇨🇦 Canadian'].map((l, i) => {
                const fullNames = ['🇺🇸 American English', '🇬🇧 British English', '🇦🇺 Australian English', '🇨🇦 Canadian English'];
                const fullName = fullNames[i];
                return (
                  <button 
                    key={fullName} 
                    className={`btn ${lang === fullName ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    style={{ padding: '0.4rem', fontSize: '0.75rem', justifyContent: 'center' }}
                    onClick={() => setLang(fullName)}
                  >
                    {l}
                  </button>
                );
              })}
            </div>
          </li>

          <li className="navbar-mobile-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)' }}>Switch Theme</span>
            <button 
              onClick={toggleTheme} 
              className="theme-toggle-btn" 
              style={{ fontSize: '1.5rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </li>
          <li className="navbar-mobile-item">
            <Link to="/quote" className="btn btn-primary w-full">
              Get A Quote
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
