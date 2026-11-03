import React from 'react';

export const Logo: React.FC<{ size?: number }> = ({ size = 30 }) => (
  <span className="logo">
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path d="M 50 12 L 83 78 L 67 78 L 50 44 L 33 78 L 17 78 Z" fill="#ffffff" />
      <path d="M 50 51 L 61 74 L 39 74 Z" fill="url(#logo-grad)" />
    </svg>
    <span className="logo-text">ALPHAZO<span className="grad-text">X</span></span>
  </span>
);
