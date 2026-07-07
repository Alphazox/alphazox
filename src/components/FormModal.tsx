import React, { useState } from 'react';
import './Contact.css';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formType: 'consultation' | 'contact';
}

export const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose, formType }) => {
  const [formData, setFormData] = useState({
    name: '',
    orgName: '',
    orgIndustry: '',
    email: '',
    phone: '',
    serviceInterest: '',
    projectScope: '',
    budgetRange: '',
    timeline: '',
    dateTimePreference: '',
    message: '',
    formType: formType,
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
      const endpoint = formType === 'consultation' ? '/api/quote' : '/api/contact';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setStatus({ success: true, msg: result.message });
        setFormData({
          name: '',
          orgName: '',
          orgIndustry: '',
          email: '',
          phone: '',
          serviceInterest: '',
          projectScope: '',
          budgetRange: '',
          timeline: '',
          dateTimePreference: '',
          message: '',
          formType: formType,
        });
      } else {
        setStatus({ success: false, msg: result.error || 'Failed to send message.' });
      }
    } catch {
      setStatus({ success: false, msg: 'Network error. Please try again or email us at support@alphazox.com' });
    } finally {
      setLoading(false);
    }
  };

  const serviceOptions = [
    'IT Database Services', 'Application Maintenance Services', 'Application Development',
    'Digital Transformation', 'Software Testing & QA', 'DevOps Implementation',
    'Salesforce Solutions', 'Cloud Transformation', 'Microsoft Services',
    'Talent Augmentation', 'Generative AI Services', 'Process Automation (RPA)',
    'Analytics & AI/ML', 'Low-Code Solutions',
  ];

  if (!isOpen) return null;

  return (
    <div className="service-modal-overlay" onClick={onClose}>
      <div className="service-modal-card card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Modal">✕</button>
        
        <div className="modal-header" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <div>
            <h2 style={{ marginBottom: '0.25rem' }}>
              {formType === 'consultation' ? 'Schedule Your Free Consultation' : 'Get In Touch With Us'}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
              {formType === 'consultation' ? 'Tell us about your needs, and we will contact you shortly to schedule a time that works for you.' : 'Have a question or want to learn more? Fill out the form and our team will reach out.'}
            </p>
          </div>
        </div>

        <div style={{ paddingTop: '1.5rem' }}>
          {status && (
            <div className={`alert ${status.success ? 'alert-success' : 'alert-error'}`}>
              {status.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Contact Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Company / Organization</label>
                <input
                  type="text"
                  name="orgName"
                  value={formData.orgName}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder={formType === 'consultation' ? 'Required' : 'Optional'}
                  required={formType === 'consultation'}
                />
              </div>
            </div>

            {formType === 'consultation' && (
              <>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Company Industry *</label>
                    <select
                      name="orgIndustry"
                      value={formData.orgIndustry}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    >
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
                    <select
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    >
                      <option value="" disabled>Select service...</option>
                      {serviceOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Budget Range *</label>
                    <select
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    >
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
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    >
                      <option value="" disabled>Select timeline...</option>
                      <option value="Immediate">Immediate / Urgent</option>
                      <option value="1-3 Months">1 - 3 Months</option>
                      <option value="3-6 Months">3 - 6 Months</option>
                      <option value="6+ Months">6+ Months</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Date & Time (Optional)</label>
                  <input
                    type="text"
                    name="dateTimePreference"
                    value={formData.dateTimePreference}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="e.g., Next week, afternoons work best"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Project Scope / Description *</label>
                  <textarea
                    name="projectScope"
                    value={formData.projectScope}
                    onChange={handleInputChange}
                    rows={4}
                    className="form-control"
                    placeholder="Describe the scope, objectives, and any technical hurdles..."
                    required
                  />
                </div>
              </>
            )}

            {formType === 'contact' && (
              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="form-control"
                  placeholder="How can we help you?"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
              style={{ marginTop: '1rem' }}
            >
              {loading ? 'Sending Request...' : (formType === 'consultation' ? 'Book Consultation' : 'Send Message')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
