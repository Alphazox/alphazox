import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV } from '../data/content';
import { MEGA_MENUS, type MegaMenu } from '../data/menus';
import { useDemo } from '../context/demo';
import { Logo } from './Logo';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const [drawerSub, setDrawerSub] = useState<string | null>(null);
  const { openDemo } = useDemo();
  const { pathname } = useLocation();

  useEffect(() => {
    // Toggle the class directly: no re-render on every scroll event. It lives on .nav-inner,
    // whose className React never rewrites.
    const onScroll = () => innerRef.current?.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => { setOpen(false); setMega(null); };
  // A mega item stays highlighted on any of its sub-pages.
  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  const renderPanel = (menu: MegaMenu) => (
    <div className={`mega cols-${menu.columns.length}`} role="menu">
      {menu.columns.map(col => (
        <div key={col.title} className="mega-col">
          <h4>{col.title}</h4>
          <ul className={col.grid ? 'mega-grid' : ''}>
            {col.links.map(l => (
              <li key={l.to + l.label}>
                <Link to={l.to} onClick={close} className={l.desc ? 'mega-rich' : ''}>
                  {l.icon && <span className="mega-link-icon">{l.icon}</span>}
                  <span>
                    {l.label}
                    {l.desc && <small>{l.desc}</small>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {col.more && <Link to={col.more.to} className="mega-more" onClick={close}>{col.more.label} <span>→</span></Link>}
        </div>
      ))}
      <div className="mega-cards">
        {menu.cards.map(c => {
          const inner = (<><span className="mega-card-icon">{c.icon}</span><span>{c.label} <span className="arrow">→</span></span></>);
          return c.to
            ? <Link key={c.label} to={c.to} className="mega-card" onClick={close}>{inner}</Link>
            : <button key={c.label} className="mega-card" onClick={() => { close(); openDemo(); }}>{inner}</button>;
        })}
      </div>
    </div>
  );

  return (
    <header className={`nav ${open ? 'nav-open' : ''}`}>
      <div ref={innerRef} className="nav-inner">
        <Link to="/" className="nav-brand" onClick={close} aria-label="ALPHAZOX home">
          <Logo />
        </Link>

        <nav className="nav-links" aria-label="Main">
          {NAV.map(item => {
            const menu = MEGA_MENUS[item.path];
            if (!menu) {
              return (
                <NavLink key={item.path} to={item.path} className={({ isActive: a }) => `nav-link ${a ? 'active' : ''}`}>
                  {item.label}
                </NavLink>
              );
            }
            const isOpen = mega === item.path;
            return (
              <div
                key={item.path}
                className={`nav-item ${isOpen ? 'mega-open' : ''}`}
                onMouseEnter={() => setMega(item.path)}
                onMouseLeave={() => setMega(null)}
              >
                <button
                  className={`nav-link nav-mega-btn ${isActive(item.path) ? 'active' : ''}`}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => setMega(isOpen ? null : item.path)}
                >
                  {item.label} <span className="nav-caret" aria-hidden="true" />
                </button>
                {renderPanel(menu)}
              </div>
            );
          })}
        </nav>

        <div className="nav-actions">
          <button className="btn btn-primary btn-sm nav-cta" onClick={openDemo}>
            Book a demo <span className="arrow">→</span>
          </button>
          <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            <span /><span />
          </button>
        </div>
      </div>

      <div className="nav-drawer">
        {NAV.map((item, i) => {
          const menu = MEGA_MENUS[item.path];
          const style = { '--i': i } as React.CSSProperties;
          if (!menu) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={close}
                className={({ isActive: a }) => `drawer-link ${a ? 'active' : ''}`}
                style={style}
              >
                <span className="drawer-num">0{i + 1}</span>
                {item.label}
              </NavLink>
            );
          }
          const subOpen = drawerSub === item.path;
          return (
            <div key={item.path} className="drawer-group" style={style}>
              <button
                className={`drawer-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => setDrawerSub(subOpen ? null : item.path)}
                aria-expanded={subOpen}
              >
                <span className="drawer-num">0{i + 1}</span>
                {item.label}
                <span className={`drawer-plus ${subOpen ? 'on' : ''}`} aria-hidden="true">+</span>
              </button>
              {subOpen && (
                <div className="drawer-sub">
                  {menu.columns.map(col => (
                    <div key={col.title}>
                      <h4>{col.title}</h4>
                      {col.links.map(l => <Link key={l.to + l.label} to={l.to} onClick={close}>{l.label}</Link>)}
                      {col.more && <Link to={col.more.to} onClick={close}>{col.more.label} →</Link>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <button className="btn btn-primary drawer-cta" onClick={() => { close(); openDemo(); }}>
          Book a demo <span className="arrow">→</span>
        </button>
      </div>
    </header>
  );
};
