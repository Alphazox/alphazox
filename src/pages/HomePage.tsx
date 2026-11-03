import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Marquee } from '../components/Marquee';
import { Reveal } from '../components/Reveal';
import { CtaBand } from '../components/CtaBand';
import { Faq } from '../components/Faq';
import { useDemo } from '../context/demo';
import { AGENT_LOOP, DELIVERY, GOVERNANCE, INDUSTRIES, INITIATIVES, MARQUEE, PILLARS, USE_CASES } from '../data/content';
import { photo, photoSm } from '../data/photos';
import './HomePage.css';

const ROTATING = ['AI agents', 'enterprise apps', 'customer portals', 'core systems'];

const HomePage: React.FC = () => {
  const { openDemo } = useDemo();
  const [word, setWord] = useState(0);
  const [tab, setTab] = useState(USE_CASES[0].key);
  const [step, setStep] = useState(0);
  const loopRef = useRef<HTMLElement>(null);

  // Rotating hero word
  useEffect(() => {
    const id = window.setInterval(() => setWord(w => (w + 1) % ROTATING.length), 2600);
    return () => window.clearInterval(id);
  }, []);

  // Sticky agent-loop section: the active step follows scroll position inside the section.
  useEffect(() => {
    const onScroll = () => {
      const el = loopRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / (total || 1), 0), 0.999);
      el.style.setProperty('--loop', String(progress));
      setStep(Math.floor(progress * AGENT_LOOP.length));
    };
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const group = USE_CASES.find(g => g.key === tab) ?? USE_CASES[0];

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Reveal>
              <Link to="/agentic-ai" className="hero-pill">
                <span className="pill-tag">NEW</span> Agentic AI for regulated industries <span className="arrow">→</span>
              </Link>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="hero-title">
                Build the <span className="grad-text">agentic</span> enterprise.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="hero-sub">
                ALPHAZOX designs, builds and runs{' '}
                <span className="rotator" key={word}>{ROTATING[word]}</span>
                {' '}that are governed, secure and ready to scale, in weeks rather than years.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={openDemo}>Book a demo <span className="arrow">→</span></button>
                <Link to="/platform" className="btn btn-ghost">Explore the platform</Link>
              </div>
            </Reveal>
            <Reveal delay={0.32}>
              <ul className="hero-meta">
                <li><strong>Weeks</strong><span>to a working prototype</span></li>
                <li><strong>Governed</strong><span>by design, audit-ready</span></li>
                <li><strong>USA + India</strong><span>delivery teams</span></li>
              </ul>
            </Reveal>
          </div>
          {/* The 3D core from the background sits in this column; the chips orbit it. */}
          <Reveal delay={0.4} className="hero-visual" aria-hidden="true">
            <div className="hero-photo"><img src={photo('home-hero')} alt="" /></div>
            <div className="agent-chip chip-a"><span className="dot" /> Claim #4821 triaged</div>
            <div className="agent-chip chip-b"><span className="dot violet" /> Approval routed to manager</div>
            <div className="agent-chip chip-c"><span className="dot green" /> Policy check passed</div>
          </Reveal>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span /></div>
      </section>

      {/* ── Marquee ── */}
      <section className="marquee" aria-label="Capabilities">
        <Marquee items={MARQUEE.slice(0, 10)} solid />
        <Marquee items={MARQUEE.slice(10)} reverse />
      </section>

      {/* ── Pillars ── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">What we deliver</span>
            <h2>One partner for AI agents, apps and modernization.</h2>
            <p>Custom AI and agentic solutions with enterprise-grade security, built around the way your business actually works.</p>
          </Reveal>
          <div className="grid g-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} className="glass card pillar">
                <span className="pillar-num">0{i + 1}</span>
                <span className="icon-tile">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <ul className="checklist">
                  {p.points.map(pt => <li key={pt}>{pt}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agent loop (sticky scroll) ── */}
      <section className="loop" ref={loopRef}>
        <div className="loop-sticky">
          <div className="container loop-grid">
            <div>
              <span className="eyebrow">How an agent works</span>
              <h2 className="loop-title">From request to <span className="grad-text">governed action</span>.</h2>
              <ol className="loop-steps">
                {AGENT_LOOP.map((s, i) => (
                  <li key={s.key} className={i === step ? 'active' : i < step ? 'done' : ''}>
                    <span className="loop-idx">0{i + 1}</span>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="loop-visual" aria-hidden="true">
              <div className="loop-ring">
                <svg viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="90" className="ring-track" />
                  <circle cx="100" cy="100" r="90" className="ring-fill" pathLength={1} />
                </svg>
                {AGENT_LOOP.map((s, i) => (
                  <span key={s.key} className={`ring-node n${i} ${i <= step ? 'on' : ''}`}>{s.title}</span>
                ))}
                <div className="ring-core">
                  <span className="ring-step">0{step + 1}</span>
                  <strong>{AGENT_LOOP[step].title}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Use cases ── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Use cases</span>
            <h2>Whatever you need to build, we build it.</h2>
            <p>From the apps your customers love to the core systems that run your business.</p>
          </Reveal>
          <Reveal className="tabs" delay={0.1}>
            {USE_CASES.map(g => (
              <button key={g.key} className={`tab ${tab === g.key ? 'active' : ''}`} onClick={() => setTab(g.key)}>
                <span>{g.icon}</span> {g.label}
              </button>
            ))}
          </Reveal>
          <div className="usecase-panel" key={group.key}>
            <p className="usecase-intro">{group.intro}</p>
            <div className="grid g-2">
              {group.items.map((item, i) => (
                <Link key={item.title} to={item.to} className="glass card usecase" style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="usecase-head">
                    <h3>{item.title}</h3>
                    <span className="usecase-arrow">↗</span>
                  </div>
                  <p>{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="center-link">
            <Link to="/solutions" className="btn btn-ghost">See all solutions <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      {/* ── Initiatives bento ── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Business initiatives</span>
            <h2>Built for the priorities on your roadmap.</h2>
          </Reveal>
          <div className="bento">
            {INITIATIVES.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.06} className={`glass card bento-item b${i}`}>
                <span className="icon-tile">{it.icon}</span>
                <h3>{it.title}</h3>
                <p>{it.desc}</p>
                <Link to={it.to} className="card-link">Learn more <span>→</span></Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries (photo grid) ── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Industries</span>
            <h2>Built for the industries that keep the world running.</h2>
          </Reveal>
          <div className="industry-photos">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 4) * 0.07}>
                <Link to={`/industries/${ind.slug}`} className="industry-photo">
                  <img src={photoSm(ind.slug)} alt={ind.name} loading="lazy" />
                  <span className="industry-photo-label">{ind.icon} {ind.name} <span className="arrow">→</span></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Governance ── */}
      <section className="section">
        <div className="container gov-grid">
          <Reveal className="gov-copy">
            <span className="eyebrow">Trust & governance</span>
            <h2>AI you can put in front of a regulator.</h2>
            <p>Every agent and app we ship runs inside clear boundaries: who it acts for, what it may do, and a complete record of what it did.</p>
            <Link to="/agentic-ai" className="btn btn-ghost">How we govern AI agents <span className="arrow">→</span></Link>
          </Reveal>
          <div className="grid g-2">
            {GOVERNANCE.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.06} className="glass card gov-card">
                <span className="gov-icon">{g.icon}</span>
                <div>
                  <h3>{g.title}</h3>
                  <p>{g.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Delivery ── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">How we deliver</span>
            <h2>Start with one valuable process. Scale what works.</h2>
          </Reveal>
          <div className="timeline">
            {DELIVERY.map((d, i) => (
              <Reveal key={d.step} delay={i * 0.12} className="timeline-item">
                <span className="timeline-dot" />
                <span className="timeline-step">{d.step}</span>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section">
        <div className="container faq-wrap">
          <Reveal className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>Questions, answered.</h2>
            <p>Still curious? Our assistant in the corner, or our team, is happy to help.</p>
          </Reveal>
          <Faq />
        </div>
      </section>

      <CtaBand title="Ready to build your agentic future?" />
    </>
  );
};

export default HomePage;
