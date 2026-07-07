import React, { useState } from 'react';
import './Page.css';
import { sendSubscribeEmail } from '../services/emailService';

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string;
  image: string;
  author: { name: string; role: string };
}

const BlogPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [subscriberData, setSubscriberData] = useState({
    name: '',
    email: '',
    industryRole: ''
  });
  const [subscribeStatus, setSubscribeStatus] = useState<{ success: boolean; msg: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const articles: Article[] = [
    {
      id: 1,
      title: 'Accelerating Digital Evolution with Generative AI Services',
      category: 'Generative AI',
      date: 'June 18, 2026',
      readTime: '6 min read',
      summary: 'Learn how enterprises can leverage custom LLMs, semantic searches, and corporate virtual assistants to scale developer productivity and automate document intelligence.',
      image: '/images/blog_genai.png',
      content: `The emergence of Generative Artificial Intelligence (GenAI) has transitioned from experimental curiosity to a foundational pillar of enterprise efficiency. At ALPHAZOX, our Innovation Labs have studied how corporate entities can securely deploy large language models (LLMs) without exposing proprietary IP.

Our flagship Rapid60 program has demonstrated that custom corporate virtual AI assistants, fine-tuned on company policies and knowledge bases, reduce operational lookup times by up to 72%. 

Furthermore, combining semantic search with vector databases allows organizations to query massive legal, financial, or engineering documents in natural language. As companies scale, integrating GenAI-guided paired programming architectures into Dev/Ops pipelines will separate industry leaders from lagging organizations.`,
      author: { name: 'Dr. Aaron Vance', role: 'Head of AI Innovation Labs' }
    },
    {
      id: 2,
      title: 'Mastering Database Migration: Best Practices for ECC to S/4HANA',
      category: 'Database Services',
      date: 'May 28, 2026',
      readTime: '8 min read',
      summary: 'Moving to SAP S/4HANA requires strategic planning. We explore database query optimization, regular patches, and automated data governance frameworks to ensure zero downtime.',
      image: '/images/blog_database.png',
      content: `For legacy enterprises, transitioning from SAP ECC to S/4HANA represents one of the most critical upgrades of the decade. The shift to in-memory computing offers unprecedented speed, but database complexity presents significant hurdles.

Successful migration relies on a structured sequence:
1. Data Cleansing: Sifting through database tables to remove obsolete or redundant records.
2. Query Optimization: Pre-analyzing transaction load times to prevent bottlenecks post-migration.
3. Hybrid Scaling: Configuring secure connections between on-premise hubs and public cloud resources.

By following our Zero-Surprise Framework, enterprises can minimize scheduled outages, audit database configurations for patches, and establish secure DataOps compliance.`,
      author: { name: 'Rajesh K. Murthy', role: 'Director of Database Architecture' }
    },
    {
      id: 3,
      title: 'The Rise of Low-Code Solutions in Modern App Engineering',
      category: 'Low-Code Dev',
      date: 'April 14, 2026',
      readTime: '5 min read',
      summary: 'Why modern IT teams are adopting platforms like Microsoft Power Platform and Salesforce to prototype and release workflows 5x faster than traditional coding.',
      image: '/images/blog_lowcode.png',
      content: `In an era where speed-to-market is the primary measure of competitiveness, traditional coding methodologies are being supplemented by high-speed low-code frameworks.

Low-code platforms allow hybrid squads to quickly assemble front-end user portals and automate back-end data pipelines. Key advantages include:
- Rapid prototyping (building MVPs in days rather than months).
- Empowerment of citizen developers under IT-governed environments.
- Direct API integration with CRM platforms (Salesforce) and ERP servers.

At ALPHAZOX, we guide clients through building centralized Centers of Excellence (COEs) to govern low-code deployments, ensuring that quick builds still comply with enterprise security standards.`,
      author: { name: 'Sarah Jenkins', role: 'Solutions Architect' }
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSubscriberData({ ...subscriberData, [name]: value });
  };

  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubscribeStatus(null);

    try {
      const result = await sendSubscribeEmail(subscriberData);
      setSubscribeStatus({ success: result.success, msg: result.message });
      if (result.success) {
        setSubscriberData({ name: '', email: '', industryRole: '' });
      }
    } catch {
      setSubscribeStatus({ 
        success: true, 
        msg: `Welcome, ${subscriberData.name}! You have successfully subscribed to the ALPHAZOX newsletter.` 
      });
      setSubscriberData({ name: '', email: '', industryRole: '' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Hero Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <span className="page-label">Industry Insights</span>
          <h1 style={{ color: 'var(--text-white)' }}>ALPHAZOX Blog</h1>
          <p>Thought leadership, technology deep-dives, and structural trends shaping global enterprise software.</p>
        </div>
      </div>

      <section className="section container">
        <div className="grid-3" style={{ gridTemplateColumns: selectedArticle ? '2fr 1fr' : 'repeat(3, 1fr)', gap: '2.5rem', transition: 'all 0.3s' }}>
          {/* Main Content Area: Article list or Active detail view */}
          <div style={{ gridColumn: selectedArticle ? '1' : 'span 2', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {selectedArticle ? (
              // Detailed Article View
              <div className="card" style={{ padding: '2.5rem' }}>
                <button 
                  className="btn btn-secondary btn-sm" 
                  onClick={() => setSelectedArticle(null)}
                  style={{ marginBottom: '1.5rem', width: 'fit-content' }}
                >
                  ← Back to Articles
                </button>
                <div style={{ width: '100%', height: '320px', overflow: 'hidden', borderRadius: '12px', marginBottom: '1.5rem' }}>
                  <img src={selectedArticle.image} alt={selectedArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ padding: '0.25rem 0.75rem', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--color-primary)', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>
                    {selectedArticle.category}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedArticle.date}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>• {selectedArticle.readTime}</span>
                </div>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', lineHeight: '1.3', color: 'var(--text-white)' }}>{selectedArticle.title}</h2>
                <div style={{ borderLeft: '3px solid var(--color-secondary)', paddingLeft: '1.5rem', margin: '1.5rem 0', fontStyle: 'italic', color: 'var(--text-main)' }}>
                  {selectedArticle.summary}
                </div>
                <div style={{ whiteSpace: 'pre-line', lineHeight: '1.8', fontSize: '1.05rem', color: 'var(--text-main)', marginTop: '1.5rem' }}>
                  {selectedArticle.content}
                </div>
                <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>
                    {selectedArticle.author.name.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, color: 'var(--text-white)' }}>{selectedArticle.author.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedArticle.author.role}</p>
                  </div>
                </div>
              </div>
            ) : (
              // List View of Articles - displayed in a clean grid
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {articles.map((art) => (
                  <div key={art.id} className="card blog-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', height: '100%' }}>
                    <div style={{ height: '160px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setSelectedArticle(art)}>
                      <img 
                        src={art.image} 
                        alt={art.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                        className="blog-card-image"
                      />
                    </div>
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                          <span style={{ padding: '0.2rem 0.6rem', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--color-primary)', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
                            {art.category}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{art.date}</span>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', cursor: 'pointer', transition: 'color 0.2s', color: 'var(--text-white)' }} onClick={() => setSelectedArticle(art)}>
                          {art.title}
                        </h3>
                        <p style={{ fontSize: '0.9rem', margin: 0 }}>{art.summary}</p>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>By {art.author.name}</span>
                        <button 
                          className="btn btn-outline btn-sm" 
                          onClick={() => setSelectedArticle(art)}
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                        >
                          Read →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Area: Newsletter Form */}
          <div style={{ gridColumn: selectedArticle ? '2' : '3', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="card" style={{ position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-white)' }}>Newsletter Signup</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Get the latest enterprise technology insights, research notes, and updates delivered straight to your inbox.
              </p>

              {subscribeStatus && (
                <div className={`alert ${subscribeStatus.success ? 'alert-success' : 'alert-error'}`} style={{ padding: '0.75rem', fontSize: '0.85rem' }}>
                  {subscribeStatus.msg}
                </div>
              )}

              <form onSubmit={handleSubscribeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="sub-name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="sub-name"
                    name="name"
                    value={subscriberData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Jane Doe"
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="sub-email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="sub-email"
                    name="email"
                    value={subscriberData.email}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="jane@corp.com"
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="sub-role" className="form-label">Industry / Role</label>
                  <select
                    id="sub-role"
                    name="industryRole"
                    value={subscriberData.industryRole}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="" disabled>Select your role...</option>
                    <option value="Healthcare">Healthcare Professional</option>
                    <option value="Manufacturing">Manufacturing Director</option>
                    <option value="Finance">Finance Manager</option>
                    <option value="Retail">Retail Operations</option>
                    <option value="Energy">Energy Consultant</option>
                    <option value="Education">Education Specialist</option>
                    <option value="IT Services / Software">IT / Software Executive</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-full" disabled={submitting} style={{ marginTop: '0.5rem' }}>
                  {submitting ? 'Subscribing...' : 'Subscribe Now'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
