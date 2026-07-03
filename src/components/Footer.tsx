import React from 'react';
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

  return (
    <footer className="footer">
      <div className="footer-glow"></div>
      <div className="container">
        {/* Top CTA Banner */}
        <div className="footer-cta-banner">
          <div className="cta-content">
            <h2>Ready to Transform Your Business?</h2>
            <p>Partner with Astikos IT Solutions for end-to-end digital transformation, automation, and global growth.</p>
          </div>
          <Link to="/contact" className="btn btn-primary footer-cta-btn">
            Start Your Journey →
          </Link>
        </div>

        {/* Footer Main Grid */}
        <div className="footer-main grid-4">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="20" fill="url(#footer-grad)" />
                <path d="M50 20L80 75H20L50 20Z" fill="#ffffff" opacity="0.9" />
                <path d="M50 45L70 75H30L50 45Z" fill="#06b6d4" />
                <defs>
                  <linearGradient id="footer-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366f1" />
                    <stop offset="0.5" stopColor="#06b6d4" />
                    <stop offset="1" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="footer-brand-name">ASTIKOS</span>
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

          {/* Quick Links */}
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

          {/* Services */}
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              {serviceLinks.map(svc => (
                <li key={svc}>
                  <Link to="/services" className="footer-link">{svc}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <span className="contact-flag">🇺🇸</span>
                <span>Charlotte, NC · +1-732-947-4608</span>
              </div>
              <div className="footer-contact-item">
                <span className="contact-flag">🇮🇳</span>
                <span>Hyderabad & Vizag · +91-991-991-8458</span>
              </div>
              <div className="footer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <a href="mailto:info@astikos.com" className="footer-email-link">info@astikos.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} Astikos IT Solutions. All rights reserved.</p>
          <p className="footer-sub">Inspired Global Enterprise IT Solutions (Astikos IT Solutions)</p>
        </div>
      </div>
    </footer>
  );
};
