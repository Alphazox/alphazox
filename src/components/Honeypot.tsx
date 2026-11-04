import React from 'react';
import './Honeypot.css';

interface HoneypotProps {
  value: string;
  onChange: (value: string) => void;
}

// Invisible spam trap: people never see or reach this field, so it stays empty. Bots that fill in
// every field reveal themselves, and the server quietly drops their submission.
export const Honeypot: React.FC<HoneypotProps> = ({ value, onChange }) => (
  <input
    className="hp-field"
    type="text"
    name="website"
    tabIndex={-1}
    autoComplete="off"
    aria-hidden="true"
    value={value}
    onChange={e => onChange(e.target.value)}
  />
);
