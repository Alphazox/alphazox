import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
  <section className="page-hero" style={{ minHeight: '80vh' }}>
    <div className="container">
      <span className="eyebrow">Error 404</span>
      <h1><span className="grad-text">Lost</span> in the network.</h1>
      <p>The page you're looking for doesn't exist or has moved.</p>
      <div className="cta-actions" style={{ marginTop: 36 }}>
        <Link to="/" className="btn btn-primary">Back to home <span className="arrow">→</span></Link>
      </div>
    </div>
  </section>
);

export default NotFoundPage;
