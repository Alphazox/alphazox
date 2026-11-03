import React from 'react';
import { Reveal } from './Reveal';

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  text: string;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({ eyebrow, title, text, children }) => (
  <section className="page-hero">
    <div className="container">
      <Reveal><span className="eyebrow">{eyebrow}</span></Reveal>
      <Reveal delay={0.08}><h1>{title}</h1></Reveal>
      <Reveal delay={0.16}><p>{text}</p></Reveal>
      {children && <Reveal delay={0.24}><div className="cta-actions" style={{ marginTop: 36 }}>{children}</div></Reveal>}
    </div>
  </section>
);
