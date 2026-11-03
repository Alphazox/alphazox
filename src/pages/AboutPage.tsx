import React from 'react';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { CtaBand } from '../components/CtaBand';
import { DELIVERY, OFFICES, VALUES } from '../data/content';
import './InnerPages.css';

const AboutPage: React.FC = () => (
  <>
    <PageHero
      eyebrow="About ALPHAZOX"
      title={<>Engineers of the <span className="grad-text">agentic enterprise</span>.</>}
      text="We help organizations turn AI and modern application development into real business outcomes: faster journeys, leaner operations and systems ready for what's next."
    />

    <section className="section" style={{ paddingTop: 20 }}>
      <div className="container about-split">
        <Reveal className="about-image">
          <img src="/images/photos/team.jpg" alt="Team members joining hands" loading="lazy" />
        </Reveal>
        <Reveal delay={0.1} className="about-copy">
          <span className="eyebrow">Our mission</span>
          <h2>Make enterprise software fast to build and safe to run.</h2>
          <p>
            Most organizations know where AI and modern apps could help. What slows them down is legacy systems, scarce
            skills and the risk of getting governance wrong. ALPHAZOX closes that gap with delivery teams in the USA and
            India who design, build and operate production-grade apps and AI agents.
          </p>
          <p>
            We start small, with one valuable process, and prove results in weeks. Then we scale what works, reusing
            components, integrations and guardrails across every new use case.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Our values</span>
          <h2>What we stand for.</h2>
        </Reveal>
        <div className="grid g-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08} className="glass card">
              <span className="icon-tile">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Our approach</span>
          <h2>Four steps, repeated until it scales.</h2>
        </Reveal>
        <div className="grid g-4">
          {DELIVERY.map((d, i) => (
            <Reveal key={d.step} delay={i * 0.08} className="glass card">
              <span className="cap-idx">{d.step}</span>
              <h3>{d.title}</h3>
              <p>{d.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Where we are</span>
          <h2>Global delivery, local partnership.</h2>
        </Reveal>
        <div className="grid g-3">
          {OFFICES.map((o, i) => (
            <Reveal key={o.city} delay={i * 0.1} className="glass card office-card">
              <div className="office-img"><img src={o.image} alt={o.imageAlt} loading="lazy" /></div>
              <span className="office-label">{o.flag} {o.label}</span>
              <h3>{o.city}</h3>
              <p>{o.address}</p>
              <a className="office-phone" href={o.phoneHref}>{o.phone}</a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <CtaBand title="Let's build something that matters." />
  </>
);

export default AboutPage;
