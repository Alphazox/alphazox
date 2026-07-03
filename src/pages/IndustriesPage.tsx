import React from 'react';
import { Industries } from '../components/Industries';
import './Page.css';

const IndustriesPage: React.FC = () => {
  return (
    <div className="page-wrapper">
      <div className="page-hero-banner">
        <div className="container">
          <span className="page-label">Domain Expertise</span>
          <h1>Industries We Serve</h1>
          <p>We combine deep domain knowledge with cutting-edge technology to solve complex industry-specific challenges across 7 major verticals.</p>
        </div>
      </div>
      <Industries />
    </div>
  );
};

export default IndustriesPage;
