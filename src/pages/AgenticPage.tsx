import React, { useEffect, useState } from 'react';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { Faq } from '../components/Faq';
import { CtaBand } from '../components/CtaBand';
import { useDemo } from '../context/demo';
import { AGENT_CAPABILITIES, AGENT_COMPARE, AGENT_EXAMPLES, AGENT_FAQ, AGENT_LIFECYCLE, GOVERNANCE } from '../data/content';
import './AgenticPage.css';

const AgenticPage: React.FC = () => {
  const { openDemo } = useDemo();
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cap, setCap] = useState(AGENT_CAPABILITIES[0].key);

  // Lifecycle stepper auto-advances until the visitor interacts with it.
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setStage(s => (s + 1) % AGENT_LIFECYCLE.length), 3200);
    return () => window.clearInterval(id);
  }, [paused]);

  const active = AGENT_CAPABILITIES.find(c => c.key === cap) ?? AGENT_CAPABILITIES[0];

  return (
    <>
      <PageHero
        eyebrow="Agentic AI"
        title={<>AI agents, <span className="grad-text">engineered</span> for the enterprise.</>}
        text="We design, build, govern and run AI agents that work across your systems: grounded in your data, inside your guardrails and accountable for every action."
      >
        <button className="btn btn-primary" onClick={openDemo}>Book an agentic strategy session <span className="arrow">→</span></button>
        <a href="#assessment" className="btn btn-ghost">Find your first agent</a>
      </PageHero>

      {/* ── What is an agent ── */}
      <section className="section">
        <div className="container agent-what">
          <Reveal className="agent-what-copy">
            <span className="eyebrow">What is agentic AI?</span>
            <h2>Not a chatbot. Not a script. A digital colleague with boundaries.</h2>
            <p>
              An AI agent pursues a goal. It understands the request, plans the steps, uses tools and systems to act,
              and adapts when something changes, while every action stays permissioned, logged and reviewable.
            </p>
            <p>
              The hard part isn't the model. It's grounding agents in real enterprise context, connecting them safely to
              your systems, and governing them in production. That's what we engineer.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="glass compare">
            <table>
              <thead>
                <tr>
                  <th />
                  {AGENT_COMPARE.cols.map((c, i) => (
                    <th key={c.name} className={i === AGENT_COMPARE.cols.length - 1 ? 'hl' : ''}>{c.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AGENT_COMPARE.rows.map((row, ri) => (
                  <tr key={row}>
                    <td>{row}</td>
                    {AGENT_COMPARE.cols.map((c, ci) => (
                      <td key={c.name} className={ci === AGENT_COMPARE.cols.length - 1 ? 'hl' : ''}>
                        {c.marks[ri] ? <span className="yes">✓</span> : <span className="no">–</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* ── Lifecycle ── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">The agent lifecycle</span>
            <h2>From first idea to governed production agent.</h2>
            <p>The same engineering discipline you expect from enterprise software, applied to AI agents.</p>
          </Reveal>
          <Reveal className="lifecycle" delay={0.1}>
            <div className="lifecycle-track" role="tablist" aria-label="Agent lifecycle">
              <div className="lifecycle-bar" style={{ '--p': stage / (AGENT_LIFECYCLE.length - 1) } as React.CSSProperties} />
              {AGENT_LIFECYCLE.map((s, i) => (
                <button
                  key={s.title}
                  role="tab"
                  aria-selected={i === stage}
                  className={`lifecycle-node ${i === stage ? 'active' : ''} ${i < stage ? 'done' : ''}`}
                  onClick={() => { setStage(i); setPaused(true); }}
                >
                  <span className="lc-dot">{i + 1}</span>
                  <span className="lc-label">{s.title}</span>
                </button>
              ))}
            </div>
            <div className="glass lifecycle-panel" key={stage}>
              <span className="lc-step">Step {String(stage + 1).padStart(2, '0')}</span>
              <h3>{AGENT_LIFECYCLE[stage].title}</h3>
              <p>{AGENT_LIFECYCLE[stage].desc}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Capabilities</span>
            <h2>Everything an agent needs to work in the real enterprise.</h2>
          </Reveal>
          <div className="cap-explorer">
            <Reveal className="cap-list">
              {AGENT_CAPABILITIES.map(c => (
                <button key={c.key} className={`cap-tab ${cap === c.key ? 'active' : ''}`} onClick={() => setCap(c.key)}>
                  <span className="cap-tab-icon">{c.icon}</span>
                  <span>{c.title}</span>
                  <span className="cap-tab-arrow">→</span>
                </button>
              ))}
            </Reveal>
            <Reveal delay={0.1} className="glass cap-detail">
              <div key={active.key} className="cap-detail-inner">
                <span className="icon-tile">{active.icon}</span>
                <h3>{active.title}</h3>
                <p className="cap-summary">{active.summary}</p>
                <ul className="checklist">
                  {active.points.map(pt => <li key={pt}>{pt}</li>)}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Example agents ── */}
      <section className="section" id="agents">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Agents we build</span>
            <h2>Put agents to work where it matters.</h2>
            <p>Examples of agents we design for claims, lending, service, operations and more.</p>
          </Reveal>
          <div className="grid g-4">
            {AGENT_EXAMPLES.map((a, i) => (
              <Reveal key={a.title} delay={(i % 4) * 0.07} className="glass card agent-card">
                <span className="agent-card-icon">{a.icon}</span>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Governance ── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Governed by design</span>
            <h2>Autonomy with accountability.</h2>
            <p>Agents get exactly the access they need, and nothing happens that you can't see, explain or undo.</p>
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

      {/* ── Assessment offer ── */}
      <section className="section" id="assessment">
        <div className="container">
          <Reveal className="glass assessment">
            <div>
              <span className="eyebrow">Agent Opportunity Assessment</span>
              <h2>Not sure where to start? We'll find your first agent.</h2>
              <p>
                We review your existing applications and processes, map where agents would save the most time or risk,
                and recommend one high-value use case with a clear business case, then build a working prototype in weeks.
              </p>
              <button className="btn btn-primary" onClick={openDemo}>Request an assessment <span className="arrow">→</span></button>
            </div>
            <ol className="assessment-steps">
              <li><span>1</span><div><strong>Scan</strong>Apps, processes and data sources reviewed with your team.</div></li>
              <li><span>2</span><div><strong>Score</strong>Opportunities ranked by value, feasibility and risk.</div></li>
              <li><span>3</span><div><strong>Prototype</strong>One governed agent, live with real users, in weeks.</div></li>
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section">
        <div className="container faq-wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Agentic AI FAQ</span>
            <h2>What leaders ask us about agents.</h2>
          </Reveal>
          <Faq items={AGENT_FAQ} />
        </div>
      </section>

      <CtaBand title="Ready to put AI agents to work?" />
    </>
  );
};

export default AgenticPage;
