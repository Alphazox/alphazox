import React from 'react';
import './Industries.css';

interface IndustryItem {
  name: string;
  desc: string;
  points: string[];
}

export const Industries: React.FC = () => {
  const industries: IndustryItem[] = [
    {
      name: 'Healthcare & Life Sciences',
      desc: 'Optimize patient data and expand remote care with secure digital health infrastructure.',
      points: ['Electronic Health Records (EHR) & EMR Systems', 'Telehealth & Telemedicine Platforms', 'Medical Device Integrations', 'Clinical Research Analytics']
    },
    {
      name: 'Finance & Banking',
      desc: 'Transform operations with robust banking, risk management, and compliance solutions.',
      points: ['Digital Banking Solutions', 'Risk Management Systems', 'Regulatory Compliance Tools', 'Secure Payment Gateways']
    },
    {
      name: 'Manufacturing & Supply Chain',
      desc: 'Revolutionize production with IoT tracking, analytics, and enterprise resource planning.',
      points: ['Industrial IoT (IIoT) Implementation', 'Warehouse Management Systems (WMS)', 'ERP System Optimization', 'Predictive Maintenance Analytics']
    },
    {
      name: 'Retail & E-commerce',
      desc: 'Deliver seamless commerce experiences and optimize inventory lifecycle.',
      points: ['Custom E-commerce Storefronts', 'Inventory & SKU Management', 'Customer Analytics Platforms', 'Personalization & recommendation engines']
    },
    {
      name: 'Education & E-learning',
      desc: 'Empower student outcomes with virtual classrooms and administrative tools.',
      points: ['Learning Management Systems (LMS)', 'Virtual Classrooms & Collaboration', 'Student Information Systems', 'Educational Progress Analytics']
    },
    {
      name: 'Transportation & Logistics',
      desc: 'Maximize fleet visibility and cargo routing efficiency with real-time tracking.',
      points: ['Real-Time Fleet & Cargo Tracking', 'Route Optimization Algorithms', 'IoT sensor telemetry integration', 'Supply Chain Visibility Platforms']
    },
    {
      name: 'Hospitality & Leisure',
      desc: 'Redefine guest interactions and property management efficiency.',
      points: ['Property Management Systems', 'Hassle-Free Booking Engines', 'Contactless Guest Check-in Solutions', 'Guest Sentiment Analytics']
    }
  ];

  return (
    <section className="industries-section section">
      <div className="container">
        <div className="section-title">
          <h2>Industries We Serve</h2>
          <p>We combine deep domain expertise with cutting-edge technology to solve complex industry-specific challenges.</p>
        </div>

        <div className="industries-grid grid-3">
          {industries.map((ind, idx) => (
            <div key={idx} className="industry-card card">
              <div className="industry-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="industry-icon">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3>{ind.name}</h3>
              <p>{ind.desc}</p>
              <div className="industry-hover-details">
                <h4>Solutions include:</h4>
                <ul className="industry-bullet-list">
                  {ind.points.map((pt, pIdx) => (
                    <li key={pIdx}>
                      <span className="bullet-dash"></span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
