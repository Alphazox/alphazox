import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDemo } from '../context/demo';
import { DELIVERY } from '../data/content';
import type { SolutionDetail } from '../data/solutions';
import './DemoModal.css';
import './AreaModal.css';

interface AreaModalProps {
  page: SolutionDetail;
  steps?: { title: string; desc: string }[];
  index: number | null;
  onSelect: (index: number | null) => void;
}

// Detail panel for one solution-area card: what it covers, how we deliver it and how to get in touch.
export const AreaModal: React.FC<AreaModalProps> = ({ page, steps, index, onSelect }) => {
  const { openDemo } = useDemo();
  const area = index === null ? null : page.areas[index];
  const close = () => onSelect(null);

  useEffect(() => {
    if (!area) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onSelect(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [area, onSelect]);

  if (!area) return null;
  const topic = `${area.title} (${page.name})`;

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal glass area-modal" role="dialog" aria-modal="true" aria-label={area.title} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={close} aria-label="Close">✕</button>

        <div key={area.title} className="area-modal-body">
          <span className="eyebrow">{page.icon} {page.name}</span>
          <div className="area-modal-title">
            <span className="icon-tile">{area.icon}</span>
            <h2>{area.title}</h2>
          </div>
          <p className="modal-sub">{area.desc}</p>

          <h4 className="area-modal-h">What we build</h4>
          <ul className="checklist">
            {area.builds.map(b => <li key={b}>{b}</li>)}
          </ul>

          <h4 className="area-modal-h">How we deliver it</h4>
          <ol className="area-steps">
            {(steps ?? DELIVERY).map((s, i) => (
              <li key={s.title}><span>{String(i + 1).padStart(2, '0')}</span><div><strong>{s.title}</strong>{s.desc}</div></li>
            ))}
          </ol>

          <div className="area-modal-cta">
            <Link to={`/contact?topic=${encodeURIComponent(topic)}`} className="btn btn-primary" onClick={close}>
              Talk to us about this <span className="arrow">→</span>
            </Link>
            <button className="btn btn-ghost" onClick={() => { close(); openDemo(); }}>Book a demo</button>
          </div>

          <h4 className="area-modal-h">Also on this page</h4>
          <div className="area-related">
            {page.areas.map((a, i) => i !== index && (
              <button key={a.title} onClick={() => onSelect(i)}>{a.icon} {a.title}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
