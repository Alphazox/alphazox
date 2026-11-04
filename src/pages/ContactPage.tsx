import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Honeypot } from '../components/Honeypot';
import { isValidPhone, PHONE_HINT, PHONE_PATTERN, sanitizePhone } from '../utils/forms';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { useDemo } from '../context/demo';
import { OFFICES, SITE } from '../data/content';
import './InnerPages.css';

const EMPTY = { name: '', email: '', phone: '', orgName: '', message: '' };

const STEPS = ['30-minute discovery call', 'Choose one high-value use case', 'See a working prototype in weeks'];

const ContactPage: React.FC = () => {
  const { openDemo } = useDemo();
  const [params] = useSearchParams();
  const topic = params.get('topic');
  // Detail pages link here with ?topic= so the message starts with what the visitor was reading about.
  const [form, setForm] = useState(() => ({ ...EMPTY, message: topic ? `I'd like to talk about ${topic}.

` : '' }));
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'phone' ? sanitizePhone(value) : value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.phone && !isValidPhone(form.phone)) {
      setStatus({ ok: false, msg: `Please enter a valid phone number. ${PHONE_HINT}.` });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: honeypot }),
      });
      const data = await res.json().catch(() => null);
      if (data?.success) {
        setStatus({ ok: true, msg: data.message || 'Thanks! We will get back to you shortly.' });
        setForm(EMPTY);
      } else {
        setStatus({ ok: false, msg: data?.error || 'Failed to send message.' });
      }
    } catch {
      setStatus({ ok: false, msg: `Network error. Please email us directly at ${SITE.email}.` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let's build your <span className="grad-text">next app</span> together.</>}
        text="Tell us what you want to build or improve. A real person from our team will reply within one business day."
      />

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container contact-grid">
          <Reveal className="contact-side">
            <h2>Three steps to start</h2>
            <ol className="start-list">
              {STEPS.map((s, i) => (
                <li key={s}><span>{i + 1}</span>{s}</li>
              ))}
            </ol>
            <button className="btn btn-primary" onClick={openDemo}>Book a demo <span className="arrow">→</span></button>

            <div className="contact-direct">
              <a href={`mailto:${SITE.email}`}><span>Email</span>{SITE.email}</a>
              <a href={SITE.phoneIndiaHref}><span>India</span>{SITE.phoneIndia}</a>
              <a href={SITE.phoneUSHref}><span>USA</span>{SITE.phoneUS}</a>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer"><span>LinkedIn</span>linkedin.com/company/alphazox</a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="glass form-card">
            <form className="form" onSubmit={submit}>
              <div className="form-row">
                <div className="field"><label htmlFor="k-name">Full name *</label><input id="k-name" className="input" name="name" value={form.name} onChange={update} required /></div>
                <div className="field"><label htmlFor="k-email">Email *</label><input id="k-email" className="input" type="email" name="email" value={form.email} onChange={update} required /></div>
              </div>
              <div className="form-row">
                <div className="field"><label htmlFor="k-phone">Phone</label><input id="k-phone" className="input" type="tel" inputMode="tel" autoComplete="tel" name="phone" value={form.phone} onChange={update} pattern={PHONE_PATTERN} title={PHONE_HINT} placeholder="+91 98765 43210" maxLength={20} /></div>
                <div className="field"><label htmlFor="k-org">Company</label><input id="k-org" className="input" name="orgName" value={form.orgName} onChange={update} /></div>
              </div>
              <div className="field"><label htmlFor="k-msg">How can we help? *</label><textarea id="k-msg" className="input" name="message" value={form.message} onChange={update} required /></div>
              <Honeypot value={honeypot} onChange={setHoneypot} />
              {status && <div className={`form-status ${status.ok ? 'ok' : 'err'}`} role="status">{status.msg}</div>}
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Sending…' : 'Send message'} <span className="arrow">→</span>
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Offices</span>
            <h2>Visit or call us.</h2>
          </Reveal>
          <div className="grid g-3">
            {OFFICES.map((o, i) => (
              <Reveal key={o.city} delay={i * 0.1} className="glass card office-card">
                <div className="office-img"><img src={o.image} alt={o.imageAlt} loading="lazy" /></div>
                <span className="office-label">{o.flag} {o.label}</span>
                <h3>{o.city}</h3>
                <p>{o.address}</p>
                <a className="office-phone" href={o.phoneHref}>{o.phone}</a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
