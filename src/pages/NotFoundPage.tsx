import React from 'react';
import { Link } from 'react-router-dom';
import './Page.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '6rem', fontFamily: 'var(--font-heading)', fontWeight: 800, background: 'linear-gradient(135deg, #6366f1, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          404
        </div>
        <h2 style={{ marginBottom: '1rem' }}>Page Not Found</h2>
        <p style={{ marginBottom: '2rem' }}>The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn btn-primary">← Back to Home</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
