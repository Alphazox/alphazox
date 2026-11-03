import React from 'react';
import { Link } from 'react-router-dom';
import { useDemo } from '../context/demo';
import { Reveal } from './Reveal';

interface CtaBandProps {
  title: string;
  text?: string;
}

export const CtaBand: React.FC<CtaBandProps> = ({
  title,
  text = 'Book a 30-minute discovery call. We pick one high-value use case together and show you a working prototype in weeks.',
}) => {
  const { openDemo } = useDemo();
  return (
    <section className="section-tight">
      <div className="container">
        <Reveal className="cta-band">
          <span className="eyebrow">Let's talk</span>
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="cta-actions">
            <button className="btn btn-primary" onClick={openDemo}>Book a demo <span className="arrow">→</span></button>
            <Link to="/contact" className="btn btn-ghost">Contact us</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
