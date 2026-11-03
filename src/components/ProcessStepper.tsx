import React, { useEffect, useState } from 'react';
import { Reveal } from './Reveal';
// Shares the lifecycle stepper styles with the Agentic AI page.
import '../pages/AgenticPage.css';

interface ProcessStepperProps {
  steps: { title: string; desc: string }[];
  label: string;
}

// Auto-advancing step tracker; stops cycling once the visitor picks a step.
export const ProcessStepper: React.FC<ProcessStepperProps> = ({ steps, label }) => {
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setStage(s => (s + 1) % steps.length), 3200);
    return () => window.clearInterval(id);
  }, [paused, steps.length]);

  return (
    <Reveal className="lifecycle" delay={0.1}>
      <div className="lifecycle-track" role="tablist" aria-label={label}>
        <div className="lifecycle-bar" style={{ '--p': stage / (steps.length - 1) } as React.CSSProperties} />
        {steps.map((s, i) => (
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
        <h3>{steps[stage].title}</h3>
        <p>{steps[stage].desc}</p>
      </div>
    </Reveal>
  );
};
