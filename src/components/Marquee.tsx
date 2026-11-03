import React, { useEffect, useRef } from 'react';

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  solid?: boolean;
  speed?: number;
}

// Endless text row that drifts on its own and speeds up with scroll velocity.
export const Marquee: React.FC<MarqueeProps> = ({ items, reverse = false, solid = false, speed = 0.5 }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let x = 0;
    let lastY = window.scrollY;
    let boost = 0;
    let raf = 0;
    const dir = reverse ? 1 : -1;

    const tick = () => {
      const y = window.scrollY;
      boost = boost * 0.9 + Math.abs(y - lastY) * 0.12;
      lastY = y;
      const half = row.scrollWidth / 2;
      x += dir * (speed + boost);
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      row.style.transform = `translate3d(${x}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reverse, speed]);

  const doubled = [...items, ...items];
  return (
    <div ref={rowRef} className={`marquee-row ${solid ? 'solid' : ''}`}>
      {doubled.map((item, i) => (
        <span key={i} className="marquee-item">{item}</span>
      ))}
    </div>
  );
};
