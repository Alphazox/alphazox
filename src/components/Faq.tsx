import React, { useState } from 'react';
import { FAQ } from '../data/content';
import './Faq.css';

interface FaqProps {
  items?: { q: string; a: string }[];
}

export const Faq: React.FC<FaqProps> = ({ items = FAQ }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq">
      {items.map((f, i) => (
        <div key={f.q} className={`faq-item ${open === i ? 'open' : ''}`}>
          <button className="faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span>{f.q}</span>
            <span className="faq-icon" aria-hidden="true" />
          </button>
          <div className="faq-a">
            <div><p>{f.a}</p></div>
          </div>
        </div>
      ))}
    </div>
  );
};
