import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { Marquee } from '../components/Marquee';
import { CtaBand } from '../components/CtaBand';
import { useDemo } from '../context/demo';
import { CAPABILITIES, GOVERNANCE, TECH_STACK } from '../data/content';
import './InnerPages.css';

const PlatformPage: React.FC = () => {
  const { openDemo } = useDemo();
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title={<>One stack for <span className="grad-text">agents and apps</span>.</>}
        text="Everything we need to design, build, govern and run AI agents and enterprise applications, engineered as one connected system."
      >
        <button className="btn btn-primary" onClick={openDemo}>Book a demo <span className="arrow">→</span></button>
      </PageHero>

      <section className="marquee" aria-label="Technologies">
        <Marquee items={TECH_STACK.flatMap(g => g.items)} solid speed={0.4} />
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Capabilities</span>
            <h2>Eight building blocks, engineered together.</h2>
            <p>Each capability works on its own, and they are designed to work together across every app and agent we deliver.</p>
          </Reveal>
          <div className="grid g-2">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 0.1} className="glass card cap-card">
                <div className="cap-top">
                  <span className="icon-tile">{c.icon}</span>
                  <span className="cap-idx">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="tags">{c.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                <Link to={c.to} className="card-link">Learn more <span>→</span></Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="architecture">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Architecture</span>
            <h2>How the layers fit together.</h2>
          </Reveal>
          <Reveal className="stack-diagram">
            {[
              { label: 'Experience', items: ['Web apps', 'Mobile apps', 'Copilots', 'Chat'] },
              { label: 'Agents & Workflows', items: ['Agent orchestration', 'Business rules', 'Approvals', 'Automation'] },
              { label: 'AI & Data', items: ['LLMs', 'RAG', 'Predictive models', 'Data hub'] },
              { label: 'Integration', items: ['APIs', 'Events', 'ERP / CRM', 'Legacy systems'] },
              { label: 'Cloud & Governance', items: ['Identity', 'Audit', 'Monitoring', 'Azure / AWS / GCP'] },
            ].map((layer, i) => (
              <div key={layer.label} className="stack-layer" style={{ '--i': i } as React.CSSProperties}>
                <span className="stack-label">{layer.label}</span>
                <div className="stack-items">{layer.items.map(it => <span key={it}>{it}</span>)}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Security & governance</span>
            <h2>Guardrails on every agent, every app.</h2>
          </Reveal>
          <div className="grid g-3">
            {GOVERNANCE.map((g, i) => (
              <Reveal key={g.title} delay={(i % 3) * 0.08} className="glass card">
                <span className="icon-tile">{g.icon}</span>
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="tech">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Technology</span>
            <h2>We pick the right tool for each job.</h2>
          </Reveal>
          <div className="grid g-4">
            {TECH_STACK.map((g, i) => (
              <Reveal key={g.group} delay={i * 0.08} className="glass card">
                <h3 style={{ marginTop: 0 }}>{g.group}</h3>
                <div className="tags">{g.items.map(t => <span key={t} className="tag">{t}</span>)}</div>
                <Link to={g.to} className="card-link">Learn more <span>→</span></Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="See the platform on your use case." />
    </>
  );
};

export default PlatformPage;
