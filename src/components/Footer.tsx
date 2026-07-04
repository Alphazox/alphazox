import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Careers', path: '/careers' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

const serviceLinks = [
  'App Development', 'Cloud & DevOps', 'Data Science & AI',
  'RPA Automation', 'SAP Services', 'GCC Setup', 'Bookkeeping', 'IT Staffing'
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-glow"></div>
      <div className="container">
        {/* Top CTA Banner */}
        <div className="footer-cta-banner">
          <div className="cta-content">
            <h2>Ready to Transform Your Business?</h2>
            <p>Partner with ALPHAZOX for end-to-end digital transformation, automation, and global growth.</p>
          </div>
          <Link to="/contact" className="btn btn-primary footer-cta-btn">
            Start Your Journey →
          </Link>
        </div>

        {/* Always Visible Footer Main */}
        <div className="footer-main grid-4">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 50 12 L 83 78 L 67 78 L 50 44 L 33 78 L 17 78 Z" fill="var(--logo-chevron)" />
                <path d="M 50 51 L 61 74 L 39 74 Z" fill="url(#footer-grad)" />
                <defs>
                  <linearGradient id="footer-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0356CC" />
                    <stop offset="100%" stopColor="#4B8FFF" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="footer-brand-name">ALPHAZO<span className="brand-x">X</span></span>
            </Link>
            <p className="footer-tagline">
              Delivering next-generation IT solutions, automation, and global capability centers.
            </p>
            <div className="footer-social-links">
              <a href="https://linkedin.com" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links - always visible */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              {navLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Summary - always visible */}
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <span className="contact-flag">🇺🇸</span>
                <span>Charlotte, NC · +1-732-947-4608</span>
              </div>
              <div className="footer-contact-item">
                <span className="contact-flag">🇮🇳</span>
                <span>Visakhapatnam &amp; Hyderabad · +91-955-025-0099</span>
              </div>
              <div className="footer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <a href="mailto:support@alphazox.com" className="footer-email-link">support@alphazox.com</a>
              </div>
            </div>
          </div>

          {/* Services - always visible */}
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              {serviceLinks.slice(0, 4).map(svc => (
                <li key={svc}>
                  <Link to="/services" className="footer-link">{svc}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Expand Arrow Toggle */}
        <div className="footer-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span className="footer-toggle-text">{isOpen ? 'Show Less' : 'More Services'}</span>
          <span className={`footer-toggle-arrow ${isOpen ? 'open' : ''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </div>

        {/* Collapsible extra services */}
        <div className={`footer-collapsible ${isOpen ? 'expanded' : ''}`}>
          <div className="footer-extra-services">
            {serviceLinks.slice(4).map(svc => (
              <Link to="/services" key={svc} className="footer-link footer-extra-service-item">{svc}</Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} ALPHAZOX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
