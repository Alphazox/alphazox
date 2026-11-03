import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { CtaBand } from '../components/CtaBand';
import { INDUSTRIES } from '../data/content';
import { photoSm } from '../data/photos';
import './InnerPages.css';

const IndustriesPage: React.FC = () => (
  <>
    <PageHero
      eyebrow="Industries"
      title={<>Built for <span className="grad-text">regulated</span>, demanding industries.</>}
      text="The same discovery-led method adapts to the journeys, systems and compliance requirements of each sector."
    />

    <section className="section" style={{ paddingTop: 20 }}>
      <div className="container">
        <div className="grid g-2">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name} delay={(i % 2) * 0.1} className="glass card industry-card">
              <div className="card-photo"><img src={photoSm(ind.slug)} alt={ind.name} loading="lazy" /></div>
              <div className="industry-top">
                <span className="industry-icon">{ind.icon}</span>
                <span className="cap-idx">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3>{ind.name}</h3>
              <p>{ind.desc}</p>
              <div className="industry-builds">
                <span>What we build</span>
                <ul className="checklist">
                  {ind.builds.map(b => <li key={b}>{b}</li>)}
                </ul>
              </div>
              <Link to={`/industries/${ind.slug}`} className="card-link">Explore {ind.name} <span>→</span></Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <CtaBand title="Don't see your industry? We probably build for it." />
  </>
);

export default IndustriesPage;
