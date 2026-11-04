import React from 'react';
import { Link } from 'react-router-dom';
import { INDUSTRIES, OFFICES, SITE } from '../data/content';
import { Logo } from './Logo';
import './Footer.css';

const COLUMNS = [
  {
    title: 'Platform',
    links: [
      { label: 'Agentic AI', to: '/agentic-ai' },
      { label: 'Web & mobile apps', to: '/platform/app-development' },
      { label: 'Workflow & automation', to: '/platform/workflow-automation' },
      { label: 'Data & integration', to: '/platform/data-integration' },
      { label: 'Security & governance', to: '/platform/security-governance' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'What we build', to: '/solutions' },
      { label: 'AI-accelerated engineering', to: '/solutions/ai-accelerated-engineering' },
      { label: 'Process automation', to: '/solutions/process-automation' },
      { label: 'Digital customer journeys', to: '/solutions/digital-customer-journeys' },
      { label: 'Application modernization', to: '/solutions/application-modernization' },
    ],
  },
  {
    title: 'Industries',
    links: INDUSTRIES.slice(0, 5).map(i => ({ label: i.name, to: `/industries/${i.slug}` })),
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Careers', to: '/careers' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

export const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo size={34} />
          <p>We design, build and run AI agents and enterprise applications: governed, secure and ready to scale.</p>
          <a className="footer-mail" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <div className="footer-social">
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
            <a href={SITE.x} target="_blank" rel="noopener noreferrer" aria-label="X">𝕏</a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">◎</a>
          </div>
        </div>
        {COLUMNS.map(col => (
          <div key={col.title} className="footer-col">
            <h4>{col.title}</h4>
            <ul>
              {col.links.map(l => (
                <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-offices">
        {OFFICES.map(o => (
          <address key={o.city} className="footer-office">
            <span className="footer-office-pin" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </span>
            <div>
              <h4>{o.label}</h4>
              <p>{o.address}</p>
              <a href={o.phoneHref}>{o.phone}</a>
            </div>
          </address>
        ))}
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} ALPHAZOX. All rights reserved.</span>
        <span>Built for the agentic enterprise.</span>
      </div>
    </div>
  </footer>
);
