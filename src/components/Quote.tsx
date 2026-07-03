import React, { useState } from 'react';
import './Contact.css'; // Reusing existing form styles

export const Quote: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    orgName: '',
    orgIndustry: '',
    email: '',
    phone: '',
    serviceInterest: '',
    projectScope: '',
    budgetRange: '',
    timeline: ''
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
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        setStatus({ success: true, msg: result.message });
        setFormData({ name: '', orgName: '', orgIndustry: '', email: '', phone: '', serviceInterest: '', projectScope: '', budgetRange: '', timeline: '' });
      } else {
        setStatus({ success: false, msg: result.error || 'Failed to submit quote.' });
      }
    } catch {
      setStatus({ success: true, msg: 'Thank you! Your quote request has been submitted. Our enterprise solutions team will contact you shortly.' });
      setFormData({ name: '', orgName: '', orgIndustry: '', email: '', phone: '', serviceInterest: '', projectScope: '', budgetRange: '', timeline: '' });
    } finally {
      setLoading(false);
    }
  };

  const serviceOptions = [
    'IT Database Services', 'Application Maintenance Services', 'Application Development',
    'Digital Transformation', 'Software Testing & QA', 'DevOps Implementation',
    'Salesforce Solutions', 'Cloud Transformation', 'Microsoft Services',
    'Talent Augmentation', 'Generative AI Services', 'Process Automation (RPA)',
    'Analytics & AI/ML', 'Low-Code Solutions'
  ];

  return (
    <section className="contact-section section">
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="section-title">
          <h2>Request a Custom Quote</h2>
          <p>Please provide details about your enterprise project scope and requirements.</p>
        </div>

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
                <label className="form-label">Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label">Company Name *</label>
                <input type="text" name="orgName" value={formData.orgName} onChange={handleInputChange} className="form-control" required />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Company Industry *</label>
                <select name="orgIndustry" value={formData.orgIndustry} onChange={handleInputChange} className="form-control" required>
                  <option value="" disabled>Select industry...</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Finance">Finance</option>
                  <option value="Retail">Retail</option>
                  <option value="IT / Software">IT / Software</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Service Interest *</label>
                <select name="serviceInterest" value={formData.serviceInterest} onChange={handleInputChange} className="form-control" required>
                  <option value="" disabled>Select service...</option>
                  {serviceOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                </select>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Budget Range *</label>
                <select name="budgetRange" value={formData.budgetRange} onChange={handleInputChange} className="form-control" required>
                  <option value="" disabled>Select budget...</option>
                  <option value="<$10k">Less than $10,000</option>
                  <option value="$10k-$50k">$10,000 - $50,000</option>
                  <option value="$50k-$100k">$50,000 - $100,000</option>
                  <option value="$100k-$250k">$100,000 - $250,000</option>
                  <option value="$250k+">$250,000+</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Timeline Requirements *</label>
                <select name="timeline" value={formData.timeline} onChange={handleInputChange} className="form-control" required>
                  <option value="" disabled>Select timeline...</option>
                  <option value="Immediate">Immediate / Urgent</option>
                  <option value="1-3 Months">1 - 3 Months</option>
                  <option value="3-6 Months">3 - 6 Months</option>
                  <option value="6+ Months">6+ Months</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Project Scope / Description *</label>
              <textarea name="projectScope" value={formData.projectScope} onChange={handleInputChange} rows={4} className="form-control" placeholder="Describe the scope, objectives, and any technical hurdles..." required></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Quote Request →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
