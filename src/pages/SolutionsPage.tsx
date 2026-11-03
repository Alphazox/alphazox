import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { CtaBand } from '../components/CtaBand';
import { INITIATIVES, USE_CASES } from '../data/content';
import { photoSm, photoForPath } from '../data/photos';
import './InnerPages.css';

const SolutionsPage: React.FC = () => (
  <>
    <PageHero
      eyebrow="Solutions"
      title={<>Apps and agents for <span className="grad-text">every process</span>.</>}
      text="From customer-facing portals to the core systems that run your operations, we build what your business needs, on a foundation that scales."
    />

    <nav className="jump-nav">
      {USE_CASES.map(g => (
        <a key={g.key} href={`#${g.key}`}>{g.icon} {g.label}</a>
      ))}
      <a href="#initiatives">🎯 Initiatives</a>
    </nav>

    {USE_CASES.map((g, gi) => (
      <section key={g.key} id={g.key} className="section solution-group">
        <div className="container solution-grid">
          <Reveal className="solution-side">
            <span className="solution-num">0{gi + 1}</span>
            <span className="eyebrow">{g.label}</span>
            <h2>{g.intro}</h2>
          </Reveal>
          <div className="solution-list">
            {g.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06} className="glass card solution-item">
                <Link to={item.to} className="solution-item-link">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                  <span className="usecase-arrow">↗</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    ))}

    <section id="initiatives" className="section">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Business initiatives</span>
          <h2>Solutions mapped to your goals.</h2>
        </Reveal>
        <div className="grid g-3">
          {INITIATIVES.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.08} className="glass card">
              <div className="card-photo"><img src={photoSm(photoForPath(it.to))} alt={it.title} loading="lazy" /></div>
              <span className="icon-tile">{it.icon}</span>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
              <Link to={it.to} className="card-link">Learn more <span>→</span></Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <CtaBand title="Have a process in mind? Let's build it." />
  </>
);

export default SolutionsPage;
