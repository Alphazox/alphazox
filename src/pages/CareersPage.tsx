import React, { useState } from 'react';
import { Honeypot } from '../components/Honeypot';
import { isValidPhone, PHONE_HINT, PHONE_PATTERN, sanitizePhone } from '../utils/forms';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { JOBS, SITE } from '../data/content';
import './InnerPages.css';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  location: '',
  position: JOBS[0].title,
  experienceLevel: '',
  technicalSkills: '',
  githubProfile: '',
  coverLetter: '',
};

const PERKS = [
  { icon: '🚀', title: 'Real AI work', desc: 'Ship agents and apps that run in production for real customers.' },
  { icon: '📚', title: 'Learn constantly', desc: 'Certifications, mentoring and time to explore new technology.' },
  { icon: '🌍', title: 'Global teams', desc: 'Collaborate across the USA and India on enterprise projects.' },
  { icon: '📈', title: 'Grow fast', desc: 'Performance-driven culture with equal growth opportunities.' },
];

const CareersPage: React.FC = () => {
  const [form, setForm] = useState(EMPTY);
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'phone' ? sanitizePhone(value) : value });
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && !/\.(pdf|doc|docx)$/i.test(file.name)) {
      setStatus({ ok: false, msg: 'Please upload a PDF or Word document.' });
      e.target.value = '';
      return;
    }
    if (file && file.size > 10 * 1024 * 1024) {
      setStatus({ ok: false, msg: 'Resume must be smaller than 10 MB.' });
      e.target.value = '';
      return;
    }
    setStatus(null);
    setResume(file);
  };

  const apply = (title: string) => {
    setForm(f => ({ ...f, position: title }));
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setStatus({ ok: false, msg: 'Please attach your resume before submitting.' });
      return;
    }
    if (!isValidPhone(form.phone)) {
      setStatus({ ok: false, msg: `Please enter a valid phone number. ${PHONE_HINT}.` });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const body = new FormData();
      Object.entries(form).forEach(([k, v]) => body.append(k, v));
      body.append('website', honeypot);
      // The resume goes last so the server has every text field before it reads the file.
      body.append('resume', resume);
      const res = await fetch('/api/careers', { method: 'POST', body });
      const data = await res.json().catch(() => null);
      if (data?.success) {
        setStatus({ ok: true, msg: data.message || 'Application received. Thank you!' });
        setForm(EMPTY);
        setResume(null);
        const fileInput = document.getElementById('c-resume') as HTMLInputElement | null;
        if (fileInput) fileInput.value = '';
      } else {
        setStatus({ ok: false, msg: data?.error || 'Failed to submit application. Please try again.' });
      }
    } catch {
      setStatus({ ok: false, msg: `Network error. Please email your CV to ${SITE.email}.` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={<>Build the <span className="grad-text">future</span> with us.</>}
        text="Join engineers, designers and AI specialists building agentic systems and enterprise apps for organizations around the world."
      />

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="grid g-4">
            {PERKS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="glass card">
                <span className="icon-tile">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Open roles</span>
            <h2>Find your next mission.</h2>
          </Reveal>
          <div className="jobs">
            {JOBS.map((j, i) => (
              <Reveal key={j.title} delay={i * 0.05} className="glass job-row">
                <div>
                  <h3>{j.title}</h3>
                  <span className="job-team">{j.team}</span>
                </div>
                <div className="job-meta">
                  <span className="tag">📍 {j.location}</span>
                  <span className="tag">{j.type}</span>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => apply(j.title)}>Apply <span className="arrow">→</span></button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="apply">
        <div className="container narrow">
          <Reveal className="section-head center">
            <span className="eyebrow">Apply now</span>
            <h2>Tell us about you.</h2>
          </Reveal>
          <Reveal className="glass form-card">
            <form className="form" onSubmit={submit}>
              <div className="form-row">
                <div className="field"><label htmlFor="c-name">Full name *</label><input id="c-name" className="input" name="name" value={form.name} onChange={update} required /></div>
                <div className="field"><label htmlFor="c-email">Email *</label><input id="c-email" className="input" type="email" name="email" value={form.email} onChange={update} required /></div>
              </div>
              <div className="form-row">
                <div className="field"><label htmlFor="c-phone">Phone *</label><input id="c-phone" className="input" type="tel" inputMode="tel" autoComplete="tel" name="phone" value={form.phone} onChange={update} pattern={PHONE_PATTERN} title={PHONE_HINT} placeholder="+91 98765 43210" maxLength={20} required /></div>
                <div className="field"><label htmlFor="c-loc">Current location *</label><input id="c-loc" className="input" name="location" value={form.location} onChange={update} required /></div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="c-pos">Position *</label>
                  <select id="c-pos" className="input" name="position" value={form.position} onChange={update} required>
                    {JOBS.map(j => <option key={j.title}>{j.title}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="c-exp">Experience *</label>
                  <select id="c-exp" className="input" name="experienceLevel" value={form.experienceLevel} onChange={update} required>
                    <option value="">Select experience</option>
                    <option>Fresher (0–1 years)</option>
                    <option>Junior (1–3 years)</option>
                    <option>Mid-level (3–6 years)</option>
                    <option>Senior (6+ years)</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="field"><label htmlFor="c-skills">Key skills *</label><input id="c-skills" className="input" name="technicalSkills" value={form.technicalSkills} onChange={update} placeholder="React, .NET, Azure…" required /></div>
                <div className="field"><label htmlFor="c-gh">GitHub / Portfolio</label><input id="c-gh" className="input" name="githubProfile" value={form.githubProfile} onChange={update} /></div>
              </div>
              <div className="field"><label htmlFor="c-resume">Resume (PDF/DOC, max 10 MB) *</label><input id="c-resume" className="input" type="file" accept=".pdf,.doc,.docx" onChange={onFile} required /></div>
              <div className="field"><label htmlFor="c-cover">Cover letter *</label><textarea id="c-cover" className="input" name="coverLetter" value={form.coverLetter} onChange={update} required /></div>
              <Honeypot value={honeypot} onChange={setHoneypot} />
              {status && <div className={`form-status ${status.ok ? 'ok' : 'err'}`} role="status">{status.msg}</div>}
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Submitting…' : 'Submit application'} <span className="arrow">→</span>
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default CareersPage;
