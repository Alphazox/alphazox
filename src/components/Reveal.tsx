import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
}

// Elements still waiting to be revealed, mapped to their "show" callback. A single rAF-throttled
// scroll check covers them all, with IntersectionObserver as the fast path (some browsers/iframes
// skip IO callbacks). The visible state lives in React, so re-renders never strip the `in` class.
const pending = new Map<Element, () => void>();
let scheduled = false;

const reveal = (el: Element) => {
  pending.get(el)?.();
  pending.delete(el);
};

const check = () => {
  scheduled = false;
  const limit = window.innerHeight - 40;
  pending.forEach((_, el) => {
    const r = el.getBoundingClientRect();
    if (r.top < limit && r.bottom > 0) reveal(el);
  });
};

const schedule = () => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(check);
};

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = '', as = 'div' }) => {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    pending.set(el, () => setShown(true));
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && reveal(e.target)),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    schedule();
    return () => {
      io.disconnect();
      pending.delete(el);
    };
  }, []);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={`reveal ${shown ? 'in ' : ''}${className}`} style={{ '--d': `${delay}s` } as React.CSSProperties}>
      {children}
    </Tag>
  );
};
