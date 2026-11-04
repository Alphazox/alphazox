import React, { useCallback, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { Faq } from '../components/Faq';
import { CtaBand } from '../components/CtaBand';
import { AreaModal } from '../components/AreaModal';
import { ProcessStepper } from '../components/ProcessStepper';
import { useDemo } from '../context/demo';
import { GOVERNANCE } from '../data/content';
import { INDUSTRY_DETAILS, INITIATIVE_DETAILS, WHY_US, type SolutionDetail } from '../data/solutions';
import { PLATFORM_DETAILS } from '../data/platform';
import { DETAIL_EXTRAS } from '../data/details-extra';
import { photoInline } from '../data/photos';
import NotFoundPage from './NotFoundPage';
import './SolutionDetailPage.css';

// Splits the title so the highlighted phrase gets the gradient.
const renderTitle = (title: string, highlight: string) => {
  const at = title.indexOf(highlight);
  if (at < 0) return title;
  return <>{title.slice(0, at)}<span className="grad-text">{highlight}</span>{title.slice(at + highlight.length)}</>;
};

type Kind = SolutionDetail['kind'];

const KINDS: Record<Kind, { list: SolutionDetail[]; base: string; more: string; extra?: { label: string; to: string } }> = {
  industry: { list: INDUSTRY_DETAILS, base: '/industries', more: 'Other industries' },
  initiative: { list: INITIATIVE_DETAILS, base: '/solutions', more: 'Other business goals', extra: { label: '🤖 AI Agents at Work', to: '/agentic-ai' } },
  platform: { list: PLATFORM_DETAILS, base: '/platform', more: 'More of the platform', extra: { label: '🤖 AI agents & orchestration', to: '/agentic-ai' } },
};

const SolutionDetailPage: React.FC<{ kind: Kind }> = ({ kind }) => {
  const { slug } = useParams();
  const { openDemo } = useDemo();
  const { list, base, more, extra } = KINDS[kind];
  // Open area panel, tagged with its page so it closes when the visitor moves to another page.
  const [open, setOpen] = useState<{ slug?: string; index: number } | null>(null);
  const selectArea = useCallback((index: number | null) => setOpen(index === null ? null : { slug, index }), [slug]);
  const d = list.find(x => x.slug === slug);
  if (!d) return <NotFoundPage />;
  const openIndex = open && open.slug === d.slug ? open.index : null;

  const others = list.filter(x => x.slug !== d.slug);
  const isIndustry = kind === 'industry';
  const x = DETAIL_EXTRAS[d.slug];

  // Keyed by slug so moving between detail pages remounts sections (reveal + FAQ state reset).
  return (
    <React.Fragment key={d.slug}>
      <PageHero eyebrow={`${d.icon} ${d.eyebrow}`} title={renderTitle(d.title, d.highlight)} text={d.summary}>
        <button className="btn btn-primary" onClick={openDemo}>Book a demo <span className="arrow">→</span></button>
        <a href="#areas" className="btn btn-ghost">See what we build</a>
      </PageHero>

      {/* ── What it is & why it matters ── */}
      {x && (
        <section className="section">
          <div className="container agent-what">
            <Reveal className="agent-what-copy">
              <span className="eyebrow">Why it matters</span>
              <h2>{x.introTitle}</h2>
              {x.intro.map(p => <p key={p}>{p}</p>)}
            </Reveal>
            <Reveal delay={0.1} className="glass sd-stack">
              <div className="sd-photo"><img src={photoInline(d.slug)} alt={d.name} loading="lazy" /></div>
              <span className="eyebrow">Technologies we use</span>
              <div className="sd-stack-cloud">
                {x.stack.map((t, i) => <span key={t} style={{ '--i': i } as React.CSSProperties}>{t}</span>)}
              </div>
              <p className="sd-stack-note">We pick the stack that fits your environment, team skills and licensing.</p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Outcomes ── */}
      <section className="section">
        <div className="container sd-outcomes">
          <Reveal className="sd-outcomes-head">
            <span className="eyebrow">Outcomes</span>
            <h2>What changes when we deliver together.</h2>
            <p>{isIndustry ? `Results ${d.name} teams can expect.` : 'Results you can expect from the first release onward.'}</p>
          </Reveal>
          <ol className="sd-outcome-list">
            {d.outcomes.map((o, i) => (
              <Reveal as="li" key={o} delay={i * 0.06} className="glass">
                <span className="sd-outcome-num">{String(i + 1).padStart(2, '0')}</span>
                <span>{o}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Solution areas ── */}
      <section className="section" id="areas">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">{kind === 'platform' ? "What's included" : 'Solution areas'}</span>
            <h2>{isIndustry ? `Where we help ${d.name}.` : 'What we deliver.'}</h2>
          </Reveal>
          <div className="grid g-3">
            {d.areas.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 0.08} className="glass card sd-area">
                <div
                  className="sd-area-hit"
                  role="button"
                  tabIndex={0}
                  aria-label={`More about ${a.title}`}
                  onClick={() => selectArea(i)}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), selectArea(i))}
                >
                  <span className="icon-tile">{a.icon}</span>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                  <div className="tags">
                    {a.builds.map(b => <span key={b} className="tag">{b}</span>)}
                  </div>
                  <span className="card-link">View details <span>→</span></span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Delivery process ── */}
      {x && (
        <section className="section">
          <div className="container">
            <Reveal className="section-head center">
              <span className="eyebrow">How we deliver</span>
              <h2>Our approach to {d.name.toLowerCase()}.</h2>
              <p>Click any step to see what happens there.</p>
            </Reveal>
            <ProcessStepper steps={x.process} label={`${d.name} delivery steps`} />
          </div>
        </section>
      )}

      {/* ── Example projects ── */}
      {x && (
        <section className="section">
          <div className="container">
            <Reveal className="section-head">
              <span className="eyebrow">Example projects</span>
              <h2>What this looks like in practice.</h2>
              <p>Typical projects we deliver in this area.</p>
            </Reveal>
            <div className="grid g-4">
              {x.examples.map((ex, i) => (
                <Reveal key={ex.title} delay={i * 0.07} className="glass card agent-card">
                  <span className="agent-card-icon">{ex.icon}</span>
                  <h3>{ex.title}</h3>
                  <p>{ex.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Why ALPHAZOX ── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Why ALPHAZOX</span>
            <h2>Why teams choose to build with us.</h2>
          </Reveal>
          <div className="grid g-4">
            {WHY_US.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.07} className="glass card">
                <span className="icon-tile">{w.icon}</span>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="sd-gov">
            {GOVERNANCE.map(g => <span key={g.title}>{g.icon} {g.title}</span>)}
          </Reveal>
        </div>
      </section>

      {/* ── Where to start ── */}
      <section className="section">
        <div className="container">
          <Reveal className="glass sd-start">
            <div>
              <span className="eyebrow">Where to start</span>
              <h2>Pick one process. Prove it. Then expand.</h2>
              <p>Pick one high-value process. We'll have a working prototype in front of real users within weeks.</p>
              <button className="btn btn-primary" onClick={openDemo}>Plan your first project <span className="arrow">→</span></button>
            </div>
            <ul className="sd-start-list">
              {d.start.map((s, i) => (
                <li key={s.title}><span>{i + 1}</span><div><strong>{s.title}</strong>{s.desc}</div></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section">
        <div className="container faq-wrap">
          <Reveal className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>Common questions.</h2>
          </Reveal>
          <Faq items={x ? [...d.faq, ...x.faq] : d.faq} />
        </div>
      </section>

      {/* ── Explore more ── */}
      <section className="section-tight">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Explore more</span>
            <h2>{more}</h2>
          </Reveal>
          <div className="sd-more">
            {extra && <Link to={extra.to} className="glass sd-more-link">{extra.label} <span>→</span></Link>}
            {others.map(o => (
              <Link key={o.slug} to={`${base}/${o.slug}`} className="glass sd-more-link">{o.icon} {o.name} <span>→</span></Link>
            ))}
          </div>
        </div>
      </section>

      <AreaModal page={d} steps={x?.process} index={openIndex} onSelect={selectArea} />

      <CtaBand title={`Let's build what's next for ${isIndustry ? d.name : 'your business'}.`} />
    </React.Fragment>
  );
};

export default SolutionDetailPage;
