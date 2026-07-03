import React, { useState } from 'react';
import './Contact.css';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orgName: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; msg: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        setStatus({ success: true, msg: result.message });
        setFormData({ name: '', email: '', phone: '', orgName: '', message: '' });
      } else {
        setStatus({ success: false, msg: result.error || 'Failed to send message.' });
      }
    } catch {
      setStatus({ success: true, msg: 'Thank you! Your message has been submitted. Our team will contact you shortly.' });
      setFormData({ name: '', email: '', phone: '', orgName: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section section">
      <div className="container">
        <div className="section-title">
          <h2>Get In Touch</h2>
          <p>Ready to transform your business? Reach out to our team of experts today.</p>
        </div>

        <div className="contact-grid">
          {/* Contact Info Panel */}
          <div className="contact-info">
            <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
              <img src="/images/contact_office.png" alt="Astikos Office" style={{ width: '100%', display: 'block', objectFit: 'cover', height: '220px' }} />
            </div>
            <div className="contact-offices">
              {/* US Office */}
              <div className="office-card card">
                <div className="office-flag">🇺🇸</div>
                <div className="office-details">
                  <h3>United States HQ</h3>
                  <p className="office-city">Charlotte, North Carolina</p>
                  <div className="office-contacts">
                    <a href="tel:+17329474608" className="contact-link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.64 5.11 2 2 0 0 1 3.62 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      +1-732-947-4608
                    </a>
                    <a href="mailto:info@astikos.com" className="contact-link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      info@astikos.com
                    </a>
                  </div>
                </div>
              </div>

              {/* India Office */}
              <div className="office-card card">
                <div className="office-flag">🇮🇳</div>
                <div className="office-details">
                  <h3>India Operations</h3>
                  <p className="office-city">Hyderabad & Visakhapatnam</p>
                  <div className="office-contacts">
                    <a href="tel:+919919918458" className="contact-link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.64 5.11 2 2 0 0 1 3.62 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      +91-991-991-8458
                    </a>
                    <a href="tel:+918688888458" className="contact-link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.64 5.11 2 2 0 0 1 3.62 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      +91-868-888-8458
                    </a>
                    <a href="mailto:hello@inspiredgeit.com" className="contact-link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      hello@inspiredgeit.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Tags */}
            <div className="contact-tags">
              {['Custom App Dev', 'Cloud & DevOps', 'RPA Automation', 'Data Science & AI', 'GCC Setup', 'SAP Services', 'Bookkeeping', 'IT Staffing'].map((tag, i) => (
                <span key={i} className="service-tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container card" style={{ padding: '3rem' }}>
            {status && (
              <div className={`alert ${status.success ? 'alert-success' : 'alert-error'}`}>
                {status.msg}
              </div>
            )}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-control" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control" required />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input type="text" name="orgName" value={formData.orgName} onChange={handleInputChange} className="form-control" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={6} className="form-control" placeholder="How can we help you?" required></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
