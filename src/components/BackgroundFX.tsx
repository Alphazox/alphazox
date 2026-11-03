import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { photo, photoForPath, photoMobile } from '../data/photos';
import './BackgroundFX.css';

// Fixed, full-screen backdrop: a real photograph chosen per page, darkened by a brand tint that
// deepens as you scroll so text stays readable. Also publishes --scroll / --progress for CSS
// and drives card spotlights.
export const BackgroundFX: React.FC = () => {
  const { pathname } = useLocation();
  const name = photoForPath(pathname);
  const bg = { '--bg': `url(${photo(name)})`, '--bg-m': `url(${photoMobile(name)})` } as React.CSSProperties;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const root = document.documentElement.style;
      root.setProperty('--scroll', String(y));
      root.setProperty('--progress', String(max > 0 ? y / max : 0));
    };

    const onMove = (e: PointerEvent) => {
      // Cursor spotlight for any .card under the pointer
      const card = (e.target as Element | null)?.closest?.('.card') as HTMLElement | null;
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        card.style.setProperty('--my', `${e.clientY - rect.top}px`);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div className="bgfx" aria-hidden="true">
      <div className="bgfx-parallax">
        {/* Keyed by image so each page's photo fades in fresh */}
        <div key={name} className="bgfx-photo" style={bg} />
      </div>
      <div className="bgfx-tint" />
      <div className="bgfx-shade" />
      <div className="bgfx-noise" />
      <div className="scroll-progress" />
    </div>
  );
};
