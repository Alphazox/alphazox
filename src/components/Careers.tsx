import React, { useState } from 'react';
import './Careers.css';

interface JobRole {
  title: string;
  department: string;
  location: string;
  type: string;
}

export const Careers: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    position: 'React Full Stack Developer',
    experienceLevel: '',
    technicalSkills: '',
    githubProfile: '',
    coverLetter: ''
  });
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; msg: string } | null>(null);

  const openPositions: JobRole[] = [
    { title: 'React Full Stack Developer', department: 'Web Application Development', location: 'Hyderabad / Remote', type: 'Full-Time' },
    { title: 'DevOps & Cloud Engineer', department: 'Cloud Infrastructure', location: 'Austin / Remote', type: 'Full-Time' },
    { title: 'Salesforce CRM Consultant', department: 'Salesforce Solutions', location: 'Hyderabad', type: 'Full-Time' },
    { title: 'Certified Accounting Specialist', department: 'Bookkeeping Services', location: 'Visakhapatnam', type: 'Full-Time' },
    { title: 'Computer Vision AI Engineer', department: 'Data Science & VDO Intel', location: 'Remote', type: 'Contract' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setStatus({ success: true, msg: result.message });
        setFormData({
          name: '',
          email: '',
          phone: '',
          location: '',
          position: 'React Full Stack Developer',
          experienceLevel: '',
          technicalSkills: '',
          githubProfile: '',
          coverLetter: ''
        });
        setResume(null);
        const fileInput = document.getElementById('resume') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setStatus({ success: false, msg: result.error || 'Failed to submit application. Please try again.' });
      }
    } catch {
      setStatus({ success: false, msg: 'Network error. Please try again or email us at support@alphazox.com' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="careers-section section section-alt">
      <div className="container">
        <div className="section-title">
          <h2>Career Opportunities</h2>
          <p>Join a vibrant ecosystem of brilliant minds and shape solutions that revolutionize industries.</p>
        </div>

        <div className="careers-grid">
          {/* Left Side: Culture & Job Postings */}
          <div className="careers-info-panel">
            <div className="culture-block card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
                <img 
                  src="/images/careers_culture.png" 
                  alt="ALPHAZOX Team Culture" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-secondary)', marginBottom: '0.75rem' }}>Our Work Culture</h3>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>
                  At ALPHAZOX, we foster a performance-driven culture where every individual is empowered to achieve 
                  their full potential. We champion equal opportunities for growth and success, ensuring that every 
                  team member thrives in an environment that values excellence, collaboration, and continuous learning.
                </p>
              </div>
            </div>

            <h3 className="jobs-header">Open Positions</h3>
            <div className="jobs-list">
              {openPositions.map((job, idx) => (
                <div key={idx} className="job-row card">
                  <div className="job-details">
                    <h4>{job.title}</h4>
                    <p>{job.department} • {job.location}</p>
                  </div>
                  <div className="job-badge">{job.type}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Apply Now Form */}
          <div className="apply-form-container card">
            <h3>Apply Now</h3>
            <p className="form-sub">Submit your details and CV/resume below to join our talent pool.</p>

            {status && (
              <div className={`alert ${status.success ? 'alert-success' : 'alert-error'}`}>
                {status.msg}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="apply-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="+1-123-456-7890"
                    required
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="location" className="form-label">Current Location *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="City, Country"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="position" className="form-label">Position Applied For *</label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="form-control select-control"
                    required
                  >
                    {openPositions.map((pos, idx) => (
                      <option key={idx} value={pos.title}>{pos.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="experience" className="form-label">Experience Level *</label>
                  <select
                    id="experience"
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleInputChange}
                    className="form-control select-control"
                    required
                  >
                    <option value="" disabled>Select experience...</option>
                    <option value="Entry-level">Entry-level (0-2 years)</option>
                    <option value="Mid-level">Mid-level (2-5 years)</option>
                    <option value="Senior">Senior (5-8 years)</option>
                    <option value="Lead / Architect">Lead / Architect (8+ years)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="skills" className="form-label">Technical Skills *</label>
                  <input
                    type="text"
                    id="skills"
                    name="technicalSkills"
                    value={formData.technicalSkills}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="e.g. React, Node.js, AWS, SQL"
                    required
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="github" className="form-label">Portfolio / GitHub Profile URL</label>
                  <input
                    type="url"
                    id="github"
                    name="githubProfile"
                    value={formData.githubProfile}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="resume" className="form-label">Upload Resume (PDF/Word) *</label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="form-control file-control"
                    required
                  />
                  {resume && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-primary)', marginTop: '0.25rem' }}>
                      ✓ Selected: {resume.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="coverLetter" className="form-label">Cover Letter *</label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={4}
                  className="form-control"
                  placeholder="Introduce yourself and explain why you'd be a great fit for ALPHAZOX..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
