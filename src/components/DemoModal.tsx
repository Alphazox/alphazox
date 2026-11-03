import React, { useEffect, useState } from 'react';
import { INDUSTRIES, INITIATIVES, SITE } from '../data/content';
import './DemoModal.css';

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  orgName: '',
  orgIndustry: '',
  serviceInterest: '',
  timeline: '',
  projectScope: '',
  budgetRange: '',
};

// "Book a demo" request. Posts to the existing /api/quote endpoint.
export const DemoModal: React.FC<DemoModalProps> = ({ open, onClose }) => {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, formType: 'consultation' }),
      });
      const data = await res.json().catch(() => null);
      if (data?.success) {
        setStatus({ ok: true, msg: data.message || 'Thanks! Our team will contact you within one business day.' });
        setForm(EMPTY);
      } else {
        setStatus({ ok: false, msg: data?.error || 'Something went wrong. Please try again.' });
      }
    } catch {
      setStatus({ ok: false, msg: `Network error. Please email us at ${SITE.email}.` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal glass" role="dialog" aria-modal="true" aria-label="Book a demo" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <span className="eyebrow">Book a demo</span>
        <h2>See what we can build for you</h2>
        <p className="modal-sub">A 30-minute discovery call. We'll pick one high-value use case and show you how fast it can be live.</p>

        <form className="form" onSubmit={submit}>
          <div className="form-row">
            <div className="field">
              <label htmlFor="d-name">Full name *</label>
              <input id="d-name" className="input" name="name" value={form.name} onChange={update} required />
            </div>
            <div className="field">
              <label htmlFor="d-email">Work email *</label>
              <input id="d-email" className="input" type="email" name="email" value={form.email} onChange={update} required />
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="d-org">Company *</label>
              <input id="d-org" className="input" name="orgName" value={form.orgName} onChange={update} required />
            </div>
            <div className="field">
              <label htmlFor="d-phone">Phone *</label>
              <input id="d-phone" className="input" name="phone" value={form.phone} onChange={update} required />
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="d-ind">Industry *</label>
              <select id="d-ind" className="input" name="orgIndustry" value={form.orgIndustry} onChange={update} required>
                <option value="">Select industry</option>
                {INDUSTRIES.map(i => <option key={i.name}>{i.name}</option>)}
                <option>Other</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="d-int">Interested in *</label>
              <select id="d-int" className="input" name="serviceInterest" value={form.serviceInterest} onChange={update} required>
                <option value="">Select a focus</option>
                {INITIATIVES.map(i => <option key={i.title}>{i.title}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="d-time">Timeline *</label>
              <select id="d-time" className="input" name="timeline" value={form.timeline} onChange={update} required>
                <option value="">Select timeline</option>
                <option>As soon as possible</option>
                <option>1–3 months</option>
                <option>3–6 months</option>
                <option>Just exploring</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="d-budget">Budget range *</label>
              <select id="d-budget" className="input" name="budgetRange" value={form.budgetRange} onChange={update} required>
                <option value="">Select budget</option>
                <option>Under $25k</option>
                <option>$25k – $100k</option>
                <option>$100k – $250k</option>
                <option>$250k+</option>
                <option>Not sure yet</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="d-scope">What would you like to build? *</label>
            <textarea id="d-scope" className="input" name="projectScope" value={form.projectScope} onChange={update} required />
          </div>
          {status && <div className={`form-status ${status.ok ? 'ok' : 'err'}`}>{status.msg}</div>}
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Sending…' : 'Request my demo'} <span className="arrow">→</span>
          </button>
        </form>
      </div>
    </div>
  );
};
