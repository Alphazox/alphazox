import React, { useState } from 'react';
import { FormModal } from './FormModal';
import './Services.css';

interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  desc: string;
  icon: string;
  category: string;
  benefits: string[];
  useCases: string[];
  technologies: string[];
  whyChoose: string;
  process: string[];
}

const CATEGORIES = [
  { key: 'all', label: 'All Services' },
  { key: 'core', label: 'Core IT Services' },
  { key: 'enterprise', label: 'Enterprise Solutions' },
  { key: 'professional', label: 'Professional Services' },
  { key: 'support', label: 'Customer Support & Operations' },
  { key: 'financial', label: 'Financial Management' },
  { key: 'infrastructure', label: 'Infrastructure & Operations' },
  { key: 'integration', label: 'Digital Integration' },
  { key: 'marketing', label: 'Digital Marketing & Web' },
  { key: 'innovation', label: 'Low-Code & Innovation' },
];

const servicesData: ServiceDetail[] = [
  // ── CORE IT SERVICES ───────────────────────────────────────────────
  {
    id: 'app-maintenance',
    category: 'core',
    title: 'Application Maintenance & Support',
    shortDesc: 'Proactive upkeep, bug fixing, performance optimization, and 24/7 monitoring for peak application performance.',
    desc: 'Ensures your software systems operate at peak performance with proactive issue resolution, performance enhancement, security updates, code optimization, platform compatibility, and 24/7 monitoring. Our SLA-driven maintenance schedules prevent disruptions before they impact end-users.',
    icon: '⚙️',
    benefits: ['Proactive issue resolution before impacting end-users', 'Sustained application longevity and reduced technical debt', 'SLA-driven bug fixing and emergency support response', 'Seamless integration of minor functional updates'],
    useCases: ['E-commerce application monitoring during peak holiday sales', 'ERP software logic troubleshooting and database synchronization'],
    technologies: ['.NET', 'Java Spring Boot', 'Node.js', 'React', 'Angular', 'Splunk'],
    whyChoose: 'We offer robust, SLA-driven maintenance schedules led by dedicated support squads with 24/7 technical helpdesk access.',
    process: ['System Audits', 'Define SLA Protocols', 'Continuous Monitoring', 'Proactive Maintenance'],
  },
  {
    id: 'custom-app-dev',
    category: 'core',
    title: 'Custom Application Development',
    shortDesc: 'Robust, scalable solutions for enterprise apps, mobile, web, cloud-native, APIs, and legacy modernization.',
    desc: 'Builds robust, scalable solutions tailored to unique business requirements including enterprise applications, mobile apps (iOS/Android), web applications, cloud-native solutions, API development, and legacy system modernization. Our Agile squads deliver 40% faster than industry benchmarks.',
    icon: '💻',
    benefits: ['Bespoke features designed for unique workflows', 'Modern architecture engineered for infinite scaling', 'Highly engaging UI/UX design with micro-animations', 'Secure development lifecycle aligning with OWASP Top 10'],
    useCases: ['A custom B2B supplier portal for an industrial manufacturer', 'A cross-platform mobile telemetry app for shipping logistics'],
    technologies: ['React', 'TypeScript', 'Node.js', 'Python', 'Go', 'Flutter', 'Docker'],
    whyChoose: 'Our multi-disciplinary Agile development squads combine product management, engineering, and QA to deliver software 40% faster.',
    process: ['Discovery & Wireframing', 'Agile Sprints', 'Automated QA Testing', 'Deployment & Handover'],
  },
  {
    id: 'digital-trans',
    category: 'core',
    title: 'Digital Transformation Services',
    shortDesc: 'Reimagine operations through process digitization, cloud migration, analytics, and change management.',
    desc: 'Reimagines organizational operations through process digitization, cloud migration, data analytics implementation, customer experience enhancement, workflow optimization, and change management. We retire legacy debt and automate operations to boost employee output.',
    icon: '🔄',
    benefits: ['Retire expensive legacy mainframes and systems', 'Boost team velocity through automated digital workflows', 'Make data-driven decisions with unified data pipelines', 'Increase organization agility to respond to market shifts'],
    useCases: ['Digitizing paper-based record workflows for a major educational system', 'Re-architecting legacy customer portals into modern microservices'],
    technologies: ['Cloud APIs', 'Enterprise Integration Services', 'Big Data Hubs', 'MuleSoft'],
    whyChoose: 'Our modern engineering approaches and deep industry knowledge help us understand the complexities of enterprise legacy systems better than anyone else.',
    process: ['Discovery & Analysis', 'Transformation Roadmap', 'Incremental Modernization', 'Change Management'],
  },
  {
    id: 'qa-testing',
    category: 'core',
    title: 'Quality Assurance & Testing',
    shortDesc: 'Comprehensive functional, performance, security, usability, and automated testing for highest quality standards.',
    desc: 'Comprehensive testing including functional testing, performance testing, security testing, usability testing, compatibility testing, and automated testing to ensure highest quality standards. SDET-led methodologies ensure 100% test coverage.',
    icon: '🛡️',
    benefits: ['Detect logic errors before code reaches production', 'Reduce QA regression cycles from weeks to hours', 'Verify UI responsiveness across 100+ screen resolutions', 'Validate API performance under heavy user loads'],
    useCases: ['CI/CD test automation setup for a financial trading desk', 'Vulnerability assessment and penetration testing for a medical app'],
    technologies: ['Selenium', 'Cypress', 'Playwright', 'JMeter', 'Postman', 'SonarQube'],
    whyChoose: 'Our SDET-led testing methodologies ensure 100% test coverage with detailed reporting and tracking.',
    process: ['Test Plan Definition', 'Script Automation', 'Execute Sprints', 'Comprehensive Defect Reporting'],
  },
  {
    id: 'devops-impl',
    category: 'core',
    title: 'DevOps Implementation',
    shortDesc: 'CI/CD pipeline setup, infrastructure as code, container orchestration, and DevSecOps practices.',
    desc: 'Bridges development and operations through CI/CD pipeline setup, infrastructure as code, container orchestration, monitoring & logging, and DevSecOps practices. We enable multiple error-free daily releases with zero downtime.',
    icon: '🚀',
    benefits: ['Zero-downtime rolling deployments', 'Infrastructure consistency across dev, staging, and prod', 'Faster feedback loops for engineers', 'Optimized cloud resource usage and spending'],
    useCases: ['Kubernetes container orchestration setup for microservices scaling', 'Terraform Infrastructure-as-Code scripts for multi-region backup'],
    technologies: ['Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Jenkins', 'Prometheus'],
    whyChoose: 'Certified DevOps architects ready to align your developer pipeline with industry-leading uptime practices.',
    process: ['Pipeline Assessment', 'IaC Configuration', 'CI/CD Automation', 'Monitor & Optimize'],
  },
  {
    id: 'cloud-salesforce',
    category: 'core',
    title: 'Cloud & Salesforce Solutions',
    shortDesc: 'Platform development, CRM implementation, Sales Cloud optimization, and cloud strategy & migration.',
    desc: 'Helps leverage Salesforce and cloud technologies with platform development, CRM implementation, Sales Cloud optimization, Service Cloud enhancement, and cloud strategy/migration. Certified Salesforce consultants deliver a 360-degree customer view.',
    icon: '☁️',
    benefits: ['Unified customer sales and support records', 'Automated lead management and sales routing', 'Custom reports and visual executive dashboards', 'Reduced administrative data entry tasks'],
    useCases: ['Salesforce Sales Cloud custom pipeline setup for global manufacturers', 'MuleSoft integrations syncing Salesforce with legacy ERP inventory databases'],
    technologies: ['Salesforce CRM', 'Apex', 'Lightning Web Components', 'Salesforce Flow', 'MuleSoft'],
    whyChoose: 'As a certified Salesforce partner, our engineers specialize in custom business integrations and process automation.',
    process: ['CRM Discovery', 'Custom Configuration', 'Data Migration', 'User Training & Launch'],
  },
  {
    id: 'data-science',
    category: 'core',
    title: 'Data Science & Analytics',
    shortDesc: 'Predictive analytics, machine learning, business intelligence, data visualization, and statistical analysis.',
    desc: 'Transforms data into strategic advantage through predictive analytics, machine learning solutions, business intelligence, data visualization, and statistical analysis. Our data science team combines math, coding, and business logic.',
    icon: '📊',
    benefits: ['Accurate demand forecasting preventing inventory shortages', 'Automated image and video safety threat detection', 'Dynamic pricing algorithms maximizing profit margins', 'Interactive real-time dashboards detailing business health'],
    useCases: ['Computer vision analyzing video feeds for warehouse safety hazards', 'A predictive model forecasting hospital patient intake volumes'],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Power BI', 'Tableau', 'Hadoop'],
    whyChoose: 'Our data science team combines math, coding, and business logic to design ML models that solve real-world problems.',
    process: ['Data Gathering & Cleaning', 'Model Selection & Training', 'Validation & Fine-Tuning', 'API Integration'],
  },

  // ── ENTERPRISE SOLUTIONS ─────────────────────────────────────────
  {
    id: 'sap-services',
    category: 'enterprise',
    title: 'SAP Services',
    shortDesc: 'Intelligent enterprise solutions: consulting, implementation, support, cloud transformation, and process automation.',
    desc: 'Intelligent enterprise solutions including consulting & strategy, implementation & development, support & maintenance, cloud transformation, advanced analytics, process automation, and integration services. Our SAP-certified team delivers end-to-end solutions.',
    icon: '🏢',
    benefits: ['Streamlined enterprise resource planning across all departments', 'Real-time analytics and reporting for leadership decisions', 'Seamless integration with third-party business tools', 'Reduced operational costs through SAP automation'],
    useCases: ['SAP S/4HANA migration for a global manufacturing firm', 'SAP SuccessFactors HR module implementation for 10,000+ employees'],
    technologies: ['SAP S/4HANA', 'SAP BTP', 'SAP SuccessFactors', 'SAP Analytics Cloud', 'SAP Integration Suite'],
    whyChoose: 'Our SAP-certified consultants have deep industry-specific experience and proven methodologies for on-time, on-budget delivery.',
    process: ['SAP Landscape Assessment', 'Solution Architecture Design', 'Agile Implementation', 'Go-Live Support & Hypercare'],
  },
  {
    id: 'microsoft-services',
    category: 'enterprise',
    title: 'Microsoft Services',
    shortDesc: 'Certified solutions for digital product development, enterprise integration, Power Platform, Azure, Dynamics 365, and AI/ML.',
    desc: 'Certified solutions partner services for digital product development, enterprise integration, business collaboration, Power Platform, cloud engineering, Dynamics 365, AI/ML, and data analytics. As a Microsoft Gold Partner, we keep engineers trained on the latest roadmap.',
    icon: '🪟',
    benefits: ['Native compatibility across your entire corporate software library', 'Rapid internal tool creation using PowerApps', 'Secure corporate communication via SharePoint custom intranets', 'Robust, highly maintainable .NET backends'],
    useCases: ['A custom SharePoint portal serving 15,000 corporate employees', 'Power Automate script automating financial invoice parsing and storage'],
    technologies: ['.NET Core', 'Microsoft Azure', 'SharePoint', 'PowerApps', 'Power BI', 'Dynamics 365', 'Microsoft 365'],
    whyChoose: 'As a Microsoft Gold Partner, we keep our engineers trained on the latest Microsoft roadmap updates.',
    process: ['Scope Alignment', 'Architecture Setup', 'Incremental Sprint Development', 'Support & Governance'],
  },

  // ── PROFESSIONAL SERVICES ────────────────────────────────────────
  {
    id: 'talent-aug',
    category: 'professional',
    title: 'Talent Augmentation Services',
    shortDesc: 'AI-powered recruitment connecting skilled tech professionals globally with onsite, onshore, and offshore models.',
    desc: 'AI-powered recruitment connecting skilled technology professionals globally with onsite, onshore, and offshore delivery models including Core/Flex capacity options. We source, screen, and deploy highly qualified engineers to integrate directly with your teams.',
    icon: '👥',
    benefits: ['Rapid candidate sourcing matching exact tech stack needs', 'Flexible engagement: scale teams up or down easily', 'Thorough technical screening by senior architects', 'Reduced HR overhead and recruiting costs'],
    useCases: ['Deploying a temporary squad of 4 React developers to meet a product deadline', 'Injecting a certified Oracle DBA to guide a sensitive data migration'],
    technologies: ['Technical Recruiting Platforms', 'Video Screening', 'Skill Assessment Tests', 'AI Matching Tools'],
    whyChoose: 'Our Core/Flex recruitment model ensures client stability while maintaining the flexibility to source niche expertise globally.',
    process: ['Requirement Alignment', 'Technical Screening', 'Candidate Presentation', 'Onboarding Support'],
  },
  {
    id: 'software-procurement',
    category: 'professional',
    title: 'Software Procurement & Licensing',
    shortDesc: 'Strategic technology investment management: procurement, license optimization, vendor management, and cost savings.',
    desc: 'Strategic technology investment management including software procurement, license optimization, vendor relationship management, and cost optimization with preferred partner discounts. We ensure you get maximum value from every software dollar spent.',
    icon: '📋',
    benefits: ['Up to 30% cost savings through license optimization', 'Single point of contact for all vendor relationships', 'Proactive renewal tracking and compliance management', 'Access to exclusive partner pricing and discounts'],
    useCases: ['Consolidating 50+ software licenses for a Fortune 500 company', 'Renegotiating Microsoft EA agreements saving $2M annually'],
    technologies: ['Microsoft EA', 'Adobe VIP', 'Oracle ULA', 'ServiceNow', 'Flexera'],
    whyChoose: 'Our preferred partner relationships with major vendors translate to significant cost savings passed directly to our clients.',
    process: ['License Audit', 'Vendor Consolidation Plan', 'Negotiation & Procurement', 'Ongoing Optimization'],
  },
  {
    id: 'agile-squads',
    category: 'professional',
    title: 'Agile Development Squads',
    shortDesc: 'Purpose-built multidisciplinary teams for modernization, cloud-native development, and digital product innovation.',
    desc: 'Purpose-built multidisciplinary teams for application modernization, cloud-native development, enterprise system migration, and digital product innovation. These dedicated squads bring product management, engineering, design, and QA under one roof.',
    icon: '🏃',
    benefits: ['Cross-functional teams with no coordination overhead', 'Dedicated sprint velocity with predictable delivery timelines', 'Built-in QA reduces post-release defects by 60%', 'Transparent Agile ceremonies with full client involvement'],
    useCases: ['A 3-squad parallel development program for a fintech product launch', 'Legacy monolith broken into 12 microservices across 6-month sprints'],
    technologies: ['Jira', 'Confluence', 'Figma', 'GitHub', 'React', 'Node.js', 'Docker'],
    whyChoose: 'Our Agile squads are pre-formed and ready to embed within 2 weeks, eliminating the typical 3-month team-building overhead.',
    process: ['Squad Formation', 'Sprint Planning', 'Iterative Development', 'Demo & Retrospective'],
  },
  {
    id: 'on-demand-support',
    category: 'professional',
    title: 'On-Demand Support & Development',
    shortDesc: 'Flexible, pay-as-you-go access to certified technology professionals for development and support activities.',
    desc: 'Flexible, pay-as-you-go model providing scalable access to certified technology professionals for development and support activities. Scale up during product launches and scale down during stable periods — you only pay for what you use.',
    icon: '🔧',
    benefits: ['Pay only for hours consumed — zero idle cost', 'Immediate access to certified specialists within 24-48 hours', 'Flexible engagement terms from 1 week to 12 months', 'No long-term commitment or fixed overhead'],
    useCases: ['Emergency bug fix squad deployed overnight for a payments processor', '3-month on-demand iOS development for a retail mobile app launch'],
    technologies: ['Freshdesk', 'Zendesk', 'PagerDuty', 'ServiceNow', 'Jira Service Management'],
    whyChoose: 'Our bench of 2,500+ pre-vetted professionals means we can deploy the right expert within hours, not weeks.',
    process: ['Requirement Brief', 'Expert Matching', 'Same-Day Engagement', 'Flexible Scale Up/Down'],
  },
  {
    id: 'rips',
    category: 'professional',
    title: 'Rapid Innovation Prototyping (RIPS)',
    shortDesc: '4-6 week rapid prototypes to evaluate technical feasibility using fail-fast and design thinking methodologies.',
    desc: '4-6 week rapid prototypes to evaluate technical feasibility and business value using fail-fast, agile methodologies with design thinking approach. RIPS helps organizations validate ideas before full-scale investment.',
    icon: '⚡',
    benefits: ['Validate concepts in 4-6 weeks before full investment', 'Reduce innovation risk with a structured fail-fast approach', 'Hands-on prototype stakeholders can click through and test', 'Clear go/no-go decision framework based on real data'],
    useCases: ['Prototyping an AI-driven inventory system to present to the board', 'Building a click-through IoT dashboard MVP for investor demos'],
    technologies: ['Figma', 'React', 'Python Flask', 'Firebase', 'AWS Lambda', 'OpenAI API'],
    whyChoose: 'ALPHAZOX Innovation Labs has run 200+ RIPS engagements with an 85% conversion rate to full product development.',
    process: ['Ideation Workshop', 'Rapid Prototyping', 'User Testing & Feedback', 'Decision Framework Report'],
  },
  {
    id: 'managed-services',
    category: 'professional',
    title: 'Managed Services & Support',
    shortDesc: 'SLA-driven, outcome-based, fixed-fee 24x7 managed services for applications, data, and infrastructure.',
    desc: 'Comprehensive SLA-driven, outcome-based, fixed-fee 24x7 managed services for applications, data, and infrastructure with risk-mitigated transitions. We take full ownership of your operations so your team can focus on innovation.',
    icon: '🖥️',
    benefits: ['Predictable fixed-fee billing eliminates budget surprises', 'Round-the-clock operations with guaranteed SLA response times', 'Risk-mitigated transition with zero service interruption', 'Continuous improvement through monthly business reviews'],
    useCases: ['Full managed operations takeover for a regional bank\'s IT stack', 'Application managed services for a 300-outlet retail chain'],
    technologies: ['ServiceNow', 'Dynatrace', 'New Relic', 'Splunk', 'PagerDuty', 'Ansible'],
    whyChoose: 'Our Zero Surprise Framework guarantees transparency, accountability, and measurable outcomes across every engagement.',
    process: ['Due Diligence', 'Transition Planning', 'Steady State Operations', 'Continuous Improvement'],
  },

  // ── CUSTOMER SUPPORT & OPERATIONS ───────────────────────────────
  {
    id: 'customer-service',
    category: 'support',
    title: 'Customer Service Solutions',
    shortDesc: '24/7 multichannel support combining human expertise with intelligent routing, CRM, analytics, and omnichannel integration.',
    desc: '24/7 multichannel support combining human expertise with technology including intelligent routing, CRM, analytics, quality assurance, and omnichannel integration. We deliver consistent, high-quality customer experiences across every channel.',
    icon: '🎯',
    benefits: ['Omnichannel support via phone, email, chat, and social', 'AI-powered intelligent routing to the right agent instantly', 'Real-time analytics and customer satisfaction dashboards', 'Consistent brand experience across all touchpoints'],
    useCases: ['24/7 multilingual support center for a global e-commerce platform', 'Omnichannel CX transformation for a major telecommunications provider'],
    technologies: ['Salesforce Service Cloud', 'Zendesk', 'Genesys', 'Freshdesk', 'Twilio'],
    whyChoose: 'Our blended human + AI support model consistently achieves 95%+ CSAT scores across all client engagements.',
    process: ['CX Audit', 'Technology Setup', 'Agent Training', 'Quality Monitoring & Optimization'],
  },
  {
    id: 'technical-support',
    category: 'support',
    title: 'Technical Support Services',
    shortDesc: 'Round-the-clock expert technical assistance with multi-tier support, remote diagnostics, and proactive monitoring.',
    desc: 'Round-the-clock expert technical assistance for hardware, software, and system issues with multi-tier support, remote diagnostics, and proactive monitoring. Our L1/L2/L3 support model ensures every issue is routed to the right expert.',
    icon: '🔧',
    benefits: ['L1/L2/L3 escalation model for efficient resolution', 'Remote diagnostic tools resolve 80% of issues without site visits', 'Proactive monitoring catches issues before users notice', '4-hour SLA for critical Priority-1 incidents'],
    useCases: ['24/7 IT helpdesk for 8,000 remote employees across 5 countries', 'Level-3 technical escalation support for a cloud-based SaaS product'],
    technologies: ['ServiceNow', 'Remote Desktop Tools', 'Freshservice', 'Jira Service Desk', 'Dynatrace'],
    whyChoose: 'Our certified technical support engineers hold an average of 8+ years of industry experience across diverse technology stacks.',
    process: ['Intake & Triage', 'Remote Diagnostics', 'Escalation Management', 'Root Cause Analysis & Prevention'],
  },
  {
    id: 'virtual-assistant',
    category: 'support',
    title: 'Virtual Assistant Services',
    shortDesc: 'Intelligent automation for email organization, data entry, scheduling, research, and customer interaction handling.',
    desc: 'Streamlines operations through intelligent automation including email organization, data entry, appointment scheduling, research support, and customer interaction handling. Our VAs combine human judgement with AI efficiency.',
    icon: '🤖',
    benefits: ['Free up executive time for high-value strategic work', 'Error-free data entry with 99.9% accuracy guarantee', 'Round-the-clock task handling across time zones', 'Seamless integration with existing business tools'],
    useCases: ['Virtual EA services for C-suite managing 200+ emails daily', 'Automated appointment booking and reminders for a healthcare network'],
    technologies: ['Microsoft 365', 'Zapier', 'HubSpot', 'Calendly', 'ChatGPT API', 'Slack'],
    whyChoose: 'Our hybrid human-AI VA model delivers 5x the productivity of traditional executive assistants at 40% of the cost.',
    process: ['Task Discovery', 'Workflow Setup', 'VA Onboarding', 'Performance Review & Optimization'],
  },
  {
    id: 'remote-monitoring',
    category: 'support',
    title: 'Remote Monitoring & Surveillance',
    shortDesc: 'AI-powered 24/7 video surveillance with threat detection, real-time alerts, and incident response coordination.',
    desc: 'Advanced security through AI-powered video analytics with 24/7 surveillance, threat detection, real-time alerts, and incident response coordination. Powered by VDO Intel, our computer vision platform automates safety at scale.',
    icon: '📹',
    benefits: ['AI detects safety threats faster than human operators', 'Solar-powered surveillance for remote and outdoor locations', 'Real-time mobile alerts with live video evidence', 'False alarm reduction by 90% using AI verification'],
    useCases: ['24/7 AI surveillance for a 50-site construction company', 'Vehicle monitoring for a drive-through service lane eliminating false claims'],
    technologies: ['VDO Intel', 'Computer Vision', 'NVIDIA CUDA', 'RTSP Cameras', 'AWS Rekognition'],
    whyChoose: 'Our VDO Intel platform processes 1M+ video frames per day with sub-second alert response times.',
    process: ['Site Assessment', 'Camera Installation & Calibration', 'AI Model Configuration', '24/7 Live Operations'],
  },

  // ── FINANCIAL MANAGEMENT ─────────────────────────────────────────
  {
    id: 'bookkeeping',
    category: 'financial',
    title: 'Bookkeeping Services',
    shortDesc: '50+ certified professionals delivering account setup, payables/receivables, bank reconciliation, and financial statements.',
    desc: 'Comprehensive bookkeeping with 50+ certified professionals providing account setup, payables/receivables management, bank reconciliation, and financial statement preparation. We deliver 40-50% cost savings over in-house accounting.',
    icon: '📒',
    benefits: ['40-50% cost savings vs. in-house accounting teams', '100% accuracy with double-entry verification', 'Monthly reconciled statements delivered on schedule', 'Dedicated account manager for every client'],
    useCases: ['Full-cycle bookkeeping for a 200-employee manufacturing firm', 'Accounts payable automation for a regional hospital network'],
    technologies: ['QuickBooks', 'Xero', 'Sage', 'NetSuite', 'FreshBooks', 'Bill.com'],
    whyChoose: 'Our team of 50+ certified bookkeepers has collectively managed over $5B in client financial transactions with zero audit failures.',
    process: ['Account Setup & Chart of Accounts', 'Transaction Recording', 'Bank Reconciliation', 'Monthly Financial Reporting'],
  },
  {
    id: 'payroll',
    category: 'financial',
    title: 'Payroll Processing',
    shortDesc: 'Complete payroll including employee setup, time tracking, net pay calculation, direct deposit, and tax filing.',
    desc: 'Complete payroll solutions including employee setup, time tracking, net pay calculation, reconciliation, direct deposit processing, and tax filing. We ensure 100% compliance with federal, state, and local payroll regulations.',
    icon: '💰',
    benefits: ['100% payroll tax compliance — zero penalty guarantee', 'Automated direct deposit processing on schedule', 'Multi-state and international payroll capability', 'Employee self-service portal for pay stubs and W-2s'],
    useCases: ['Multi-state payroll processing for a 500-employee retail chain', 'International payroll for a software company with teams in 8 countries'],
    technologies: ['ADP', 'Paychex', 'Gusto', 'Workday', 'BambooHR', 'Rippling'],
    whyChoose: 'Our payroll specialists maintain updated knowledge of all federal and state tax regulations, protecting clients from costly penalties.',
    process: ['Employee Data Setup', 'Time & Attendance Integration', 'Payroll Calculation & Review', 'Disbursement & Tax Filing'],
  },
  {
    id: 'financial-reporting',
    category: 'financial',
    title: 'Financial & MIS Reporting',
    shortDesc: 'Detailed financial insights: periodic statements, P&L analysis, income statements, cash flow, and variance analysis.',
    desc: 'Detailed financial insights through periodic statements, P&L analysis, income statements, cash flow projections, and variance analysis. Our MIS reporting gives leadership the intelligence needed for confident strategic decisions.',
    icon: '📈',
    benefits: ['Board-ready financial decks delivered monthly on schedule', 'Real-time KPI dashboards accessible 24/7', 'Variance analysis highlights budget overruns immediately', 'Custom report templates aligned to your industry'],
    useCases: ['MIS dashboard for a PE-backed company tracking 12 portfolio companies', 'Weekly P&L and cash flow reports for a high-growth startup'],
    technologies: ['Power BI', 'Tableau', 'QuickBooks', 'SAP Analytics Cloud', 'Excel Advanced Modeling'],
    whyChoose: 'Our financial analysts translate complex data into clear narratives that drive leadership decisions and investor confidence.',
    process: ['Report Requirements Workshop', 'Data Integration', 'Dashboard Design', 'Monthly Delivery & Review'],
  },
  {
    id: 'controller-services',
    category: 'financial',
    title: 'Controller Services',
    shortDesc: 'Financial management: budgeting, forecasting, cash flow management, job costing, and audit preparation.',
    desc: 'Comprehensive financial management including budgeting, forecasting, cash flow management, job costing, and audit preparation. Our virtual controllers provide CFO-level expertise at a fraction of the cost.',
    icon: '🎛️',
    benefits: ['Virtual CFO-level expertise at 60% of the cost of full-time', 'Rigorous budget vs. actuals tracking every month', 'Audit-ready financial records reducing external audit fees', 'Cash flow forecasting 90-day rolling window'],
    useCases: ['Part-time controller services for a $15M revenue SaaS company', 'Full audit preparation support for an acquisition due diligence process'],
    technologies: ['NetSuite', 'QuickBooks Enterprise', 'Adaptive Insights', 'Planful', 'Excel'],
    whyChoose: 'Our virtual controllers average 15+ years of industry experience and serve as true strategic financial partners.',
    process: ['Financial Health Assessment', 'Process Implementation', 'Monthly Close & Reporting', 'CFO Advisory Support'],
  },
  {
    id: 'tax-services',
    category: 'financial',
    title: 'Tax Services',
    shortDesc: 'Comprehensive tax filing, planning, sales tax processing, and IRS audit assistance for individuals and corporations.',
    desc: 'Comprehensive tax support including tax filing, tax planning, sales tax processing, and IRS audit assistance for individuals and corporations. Our tax specialists minimize your liability while ensuring full regulatory compliance.',
    icon: '📄',
    benefits: ['Proactive tax planning minimizes annual liability', 'Multi-state and international tax compliance expertise', 'IRS audit representation included with every engagement', 'R&D tax credit identification for qualifying businesses'],
    useCases: ['Federal and state tax filing for a multi-entity corporate group', 'Sales tax nexus analysis and compliance for a 35-state e-commerce business'],
    technologies: ['ProConnect Tax', 'Lacerte', 'Avalara', 'TaxJar', 'Thomson Reuters UltraTax'],
    whyChoose: 'Our CPAs and enrolled agents have managed over 10,000 tax returns with a perfect record of zero IRS penalties.',
    process: ['Tax Situation Review', 'Strategic Planning Session', 'Return Preparation', 'Filing & Audit Defense'],
  },
  {
    id: 'ecommerce-integrations',
    category: 'financial',
    title: 'E-Commerce Integrations',
    shortDesc: 'Streamline online business finances with product management, order processing, inventory tracking, and backend updates.',
    desc: 'Streamline online business finances with product management, order processing, inventory tracking, and backend system updates. We connect your e-commerce platforms seamlessly to your accounting and ERP systems.',
    icon: '🛒',
    benefits: ['Real-time inventory sync across all sales channels', 'Automated order-to-cash accounting reconciliation', 'Multi-currency and multi-platform support', 'Reduced manual data entry errors by 95%'],
    useCases: ['Shopify-to-NetSuite integration for a 10,000 SKU retailer', 'Amazon Seller Central to QuickBooks sync for a marketplace brand'],
    technologies: ['Shopify', 'WooCommerce', 'Amazon API', 'NetSuite', 'QuickBooks', 'Zapier'],
    whyChoose: 'We have pre-built connectors for 25+ e-commerce and ERP platforms, reducing integration timelines from months to weeks.',
    process: ['Platform Audit', 'Integration Architecture', 'Build & Test', 'Go-Live & Support'],
  },

  // ── INFRASTRUCTURE & OPERATIONS ─────────────────────────────────
  {
    id: 'it-infrastructure',
    category: 'infrastructure',
    title: 'IT Infrastructure Management',
    shortDesc: 'Comprehensive IT management with pre-deployment planning, project management, and post-deployment support.',
    desc: 'Comprehensive IT infrastructure management with pre-deployment planning, project management, post-deployment support, and professional services. We design, deploy, and manage your entire technology stack.',
    icon: '🏗️',
    benefits: ['Single-pane-of-glass infrastructure visibility', 'Proactive capacity planning prevents performance bottlenecks', 'Hardware lifecycle management reducing total cost of ownership', '99.99% infrastructure uptime commitment'],
    useCases: ['Complete network refresh for a 1,200-seat corporate campus', 'Data center migration with zero downtime for a financial services firm'],
    technologies: ['Cisco', 'VMware', 'HP ProLiant', 'Dell EMC', 'Veeam', 'SCCM'],
    whyChoose: 'Our infrastructure engineers hold the deepest certifications across major vendors and have designed 500+ enterprise-grade deployments.',
    process: ['Infrastructure Assessment', 'Architecture Design', 'Deployment & Configuration', 'Ongoing Management'],
  },
  {
    id: 'security-services',
    category: 'infrastructure',
    title: 'Security Services',
    shortDesc: 'Proactive security management: threat discovery, incident management, intrusion detection, and vulnerability assessment.',
    desc: 'Proactive security management including threat discovery, incident management, intrusion detection, and vulnerability assessment. Our security operations center monitors your environment around the clock.',
    icon: '🔒',
    benefits: ['24/7 Security Operations Center (SOC) monitoring', 'Threat intelligence feeds from global security networks', 'Penetration testing identifies vulnerabilities before attackers', 'Incident response times averaging under 15 minutes'],
    useCases: ['SOC-as-a-Service for a regional bank meeting PCI-DSS requirements', 'Penetration testing identifying 23 critical vulnerabilities in a healthcare portal'],
    technologies: ['CrowdStrike', 'Palo Alto', 'Splunk SIEM', 'Qualys', 'Rapid7', 'Tenable'],
    whyChoose: 'Our certified security professionals (CISSP, CEH, CISM) operate a true 24/7 SOC with global threat intelligence.',
    process: ['Security Posture Assessment', 'Threat Modeling', 'Defense Implementation', '24/7 SOC Operations'],
  },
  {
    id: 'gcc-services',
    category: 'infrastructure',
    title: 'Global Capability Center (GCC) Services',
    shortDesc: 'Establish world-class GCCs with regulatory compliance, infrastructure, talent acquisition, and operational excellence.',
    desc: 'Establish and manage world-class GCCs with regulatory compliance, infrastructure setup, talent acquisition, operational excellence, and process automation. Our GCC-as-a-Service model gives global companies a fast track to India.',
    icon: '🌍',
    benefits: ['Access to 2M+ sq. ft. of Tier 1 workspace in India', 'End-to-end legal entity and compliance setup in 60 days', 'Pre-screened talent pool of 50,000+ technology professionals', 'Cost savings of 40-60% vs. equivalent US/UK operations'],
    useCases: ['Setting up a 500-seat GCC in Hyderabad for a US Fortune 500 company', 'Expanding a GCC from Bangalore to Pune with 200 additional technology specialists'],
    technologies: ['Legal Entity Setup', 'HRMS', 'IT Infrastructure', 'Compliance Frameworks', 'Process Automation'],
    whyChoose: 'ALPHAZOX has established 30+ GCCs in India using our proven Zero Surprise Framework, delivering within timeline and budget.',
    process: ['Location Strategy', 'Legal & Compliance Setup', 'Infrastructure & Talent', 'Operations Handover'],
  },
  {
    id: 'expense-management',
    category: 'infrastructure',
    title: 'Expense Management',
    shortDesc: 'Technology Expense Management (TEM), Utility Expense Management, and Cloud Expense Management for all industries.',
    desc: 'Industry-focused expense management including Technology Expense Management (TEM), Utility Expense Management, and Cloud Expense Management. We find savings hidden in your existing spending through rigorous audit and optimization.',
    icon: '💳',
    benefits: ['Average 15-25% cost reduction on technology spend', 'Cloud waste elimination through FinOps practices', 'Automated invoice processing reducing AP workload by 70%', 'Vendor contract renegotiation on your behalf'],
    useCases: ['TEM audit uncovering $800K in unused telecom contracts for a retailer', 'Cloud FinOps reducing AWS spend by 35% for a media company'],
    technologies: ['Flexera', 'Apptio', 'CloudHealth', 'Tangoe', 'AWS Cost Explorer', 'Azure Cost Management'],
    whyChoose: 'Our expense management team has recovered over $50M in unnecessary spend for clients across all major industries.',
    process: ['Spend Audit', 'Savings Opportunity Report', 'Optimization Implementation', 'Ongoing Governance'],
  },

  // ── DIGITAL & INTEGRATION SOLUTIONS ─────────────────────────────
  {
    id: 'digital-integration',
    category: 'integration',
    title: 'Digital Integration Services',
    shortDesc: 'Eliminate business silos through application integration, API management, data integration, and event-driven architecture.',
    desc: 'Eliminate business silos through application integration, API management, data integration, and event-driven architecture. We connect your disparate systems into a unified, real-time digital backbone.',
    icon: '🔗',
    benefits: ['Real-time data flow across all business systems', 'Elimination of manual data handoffs between departments', 'Event-driven architecture for millisecond response times', 'Single source of truth for all business data'],
    useCases: ['Connecting 15 enterprise systems into a unified data backbone for a telecom', 'Real-time point-of-sale to ERP integration for a 200-outlet retail chain'],
    technologies: ['MuleSoft', 'Azure Integration Services', 'AWS EventBridge', 'Kafka', 'IBM App Connect'],
    whyChoose: 'Our integration architects have delivered 300+ enterprise integration projects with 99.9% uptime SLAs.',
    process: ['Integration Mapping Workshop', 'Architecture Design', 'Build & Test', 'Production Deployment'],
  },
  {
    id: 'b2b-edi',
    category: 'integration',
    title: 'B2B/EDI Integration',
    shortDesc: 'Transform B2B ecosystem with faster partner onboarding, real-time visibility, cloud-scale resilience, and EDI modernization.',
    desc: 'Transform B2B ecosystem with faster partner onboarding, real-time visibility, cloud-scale resilience, and EDI modernization. We modernize legacy EDI into API-based integrations while maintaining backward compatibility.',
    icon: '🤝',
    benefits: ['Partner onboarding time reduced from weeks to hours', 'Real-time transaction visibility across entire supply chain', 'EDI modernization while maintaining legacy compatibility', 'Cloud-native resilience with 99.99% transaction reliability'],
    useCases: ['EDI modernization connecting 200+ trading partners for a CPG company', 'AS2 to API migration for a logistics firm improving throughput by 10x'],
    technologies: ['IBM Sterling', 'MuleSoft B2B', 'OpenText', 'Cleo', 'AWS B2B Data Interchange'],
    whyChoose: 'Our B2B integration specialists have onboarded 5,000+ trading partners across retail, manufacturing, and logistics.',
    process: ['Partner Ecosystem Mapping', 'Standard Selection', 'Connection Setup', 'Testing & Go-Live'],
  },
  {
    id: 'api-management',
    category: 'integration',
    title: 'API Management',
    shortDesc: 'Design, secure, and scale APIs with authentication, performance monitoring, and developer portal management.',
    desc: 'Develop secure, scalable APIs with design services, authentication, performance monitoring, and developer portal management. We build APIs that become competitive advantages and ecosystems for partner collaboration.',
    icon: '🔌',
    benefits: ['API-first design enabling future ecosystem expansion', 'OAuth 2.0 and JWT-based security for every endpoint', 'Rate limiting and throttling protecting backend services', 'Developer portal accelerating partner API adoption'],
    useCases: ['Open Banking API layer for a digital-first neobank', 'Partner API ecosystem for a SaaS company enabling 50+ integrations'],
    technologies: ['Apigee', 'AWS API Gateway', 'Kong', 'Azure API Management', 'Swagger/OpenAPI'],
    whyChoose: 'Our API architects design for developer experience first, resulting in adoption rates 3x higher than industry average.',
    process: ['API Strategy Workshop', 'Design & Documentation', 'Gateway Configuration & Security', 'Developer Portal Launch'],
  },
  {
    id: 'rpa-solutions',
    category: 'integration',
    title: 'RPA Solutions',
    shortDesc: 'Robotic Process Automation: strategy, process evaluation, bot development, training, and Center of Excellence design.',
    desc: 'Digital transformation through RPA including strategy development, process evaluation, bot development, training, and Center of Excellence design. Our bots work 24/7, eliminating repetitive manual tasks with zero errors.',
    icon: '🤖',
    benefits: ['Process administrative tasks 10x faster, 24/7/365', 'Eliminate human manual typing and copy-paste errors', 'Free up employees for high-value client communication', 'Seamless integration with legacy software lacking APIs'],
    useCases: ['Bots logging into vendor portals to download, parse, and upload invoices to ERP', 'Automating banking reconciliations comparing ledger items with bank statements'],
    technologies: ['UiPath', 'Blue Prism', 'Automation Anywhere', 'Power Automate', 'Python RPA'],
    whyChoose: 'We specialize in bot migration, Center of Excellence setup, and connecting legacy screens to automated pipelines.',
    process: ['Process Mining & Audit', 'RPA Scripting & Flow Design', 'User Testing', 'Bot Deploy & Monitoring'],
  },
  {
    id: 'idp',
    category: 'integration',
    title: 'Intelligent Document Processing (IDP)',
    shortDesc: 'Transform unstructured data using NLP, Computer Vision, Deep Learning, and ML for classification and extraction.',
    desc: 'Transform unstructured data using NLP, Computer Vision, Deep Learning, and Machine Learning for classification and extraction. Turn documents, PDFs, images, and emails into structured, actionable data automatically.',
    icon: '📑',
    benefits: ['Process 10,000+ documents per hour with 99% accuracy', 'Eliminate manual data entry from invoices, contracts, and forms', 'Continuous learning improves accuracy with every document', 'Multi-language document processing support'],
    useCases: ['Automated mortgage document classification for a major US lender', 'Invoice extraction and routing for a Fortune 500 shared services team'],
    technologies: ['Azure Form Recognizer', 'AWS Textract', 'Google Document AI', 'ABBYY', 'UiPath Document Understanding'],
    whyChoose: 'Our IDP solutions average 95%+ accuracy from day one, improving to 99%+ within 90 days of production use.',
    process: ['Document Type Analysis', 'Model Training', 'Validation & Tuning', 'Production Integration'],
  },
  {
    id: 'process-mining',
    category: 'integration',
    title: 'Process Mining',
    shortDesc: 'Optimize time-consuming processes with powerful algorithms for higher operational efficiency and productivity.',
    desc: 'Optimize time-consuming processes with powerful algorithms for higher operational efficiency and productivity. We use actual event log data to discover, monitor, and improve real business processes — not assumed ones.',
    icon: '⛏️',
    benefits: ['Discover hidden process inefficiencies from actual event logs', 'Quantify the cost of process deviations and bottlenecks', 'Identify highest-ROI automation candidates objectively', 'Continuous process monitoring dashboard'],
    useCases: ['Order-to-cash process mining revealing $3M in annual inefficiencies', 'Claims processing bottleneck analysis for an insurance company'],
    technologies: ['Celonis', 'UiPath Process Mining', 'IBM Process Mining', 'SAP Signavio', 'Power BI'],
    whyChoose: 'Our process mining engagements consistently uncover 20-40% process improvement opportunities within the first 8 weeks.',
    process: ['Event Log Extraction', 'Process Discovery', 'Conformance Checking', 'Optimization Roadmap'],
  },

  // ── DIGITAL MARKETING & WEB ──────────────────────────────────────
  {
    id: 'digital-marketing',
    category: 'marketing',
    title: 'Digital Marketing Services',
    shortDesc: 'Result-driven online branding: strategy building, implementation assistance, business audit, and platform expertise.',
    desc: 'Result-driven online branding including strategy building, implementation assistance, business audit, and platform expertise. We design integrated digital marketing programs that drive measurable revenue growth.',
    icon: '📣',
    benefits: ['Data-driven campaigns with measurable ROI tracking', 'SEO strategies delivering sustainable organic traffic growth', 'Paid media management across Google, Meta, and LinkedIn', 'Content marketing building brand authority in your sector'],
    useCases: ['200% organic traffic growth for a B2B SaaS company in 6 months', 'LinkedIn ABM campaign generating $2M pipeline for an enterprise tech vendor'],
    technologies: ['Google Analytics 4', 'HubSpot', 'Salesforce Marketing Cloud', 'SEMrush', 'Marketo', 'Meta Ads'],
    whyChoose: 'Our marketing strategists bring both creative and analytical expertise, delivering campaigns that combine brand impact with hard revenue outcomes.',
    process: ['Digital Audit', 'Strategy Development', 'Campaign Launch', 'Optimization & Reporting'],
  },
  {
    id: 'web-services',
    category: 'marketing',
    title: 'Web Services & Development',
    shortDesc: 'Complete web solutions from discovery through information architecture, interaction design, and API integration.',
    desc: 'Complete web solutions from discovery phase through information architecture, interaction design, front-end development, and API integration. We build websites that are fast, accessible, and convert visitors into customers.',
    icon: '🌐',
    benefits: ['Page speed scores of 90+ on Google Lighthouse', 'WCAG 2.1 AA accessibility compliance by default', 'CMS integration allowing non-technical team self-updates', 'Conversion-optimized landing pages and user journeys'],
    useCases: ['Full corporate website redesign generating 180% increase in lead forms', 'Custom web app with CMS for a global professional services firm'],
    technologies: ['React', 'Next.js', 'WordPress', 'Webflow', 'Node.js', 'Contentful', 'Vercel'],
    whyChoose: 'Our web teams blend UX research, visual design, and front-end engineering to produce websites that win industry awards.',
    process: ['Discovery & Sitemap', 'Wireframes & Design', 'Development & CMS', 'Launch & SEO'],
  },
  {
    id: 'solution-consulting',
    category: 'marketing',
    title: 'Solution Consulting',
    shortDesc: 'Strategic consulting for business transformation through analysis, process re-engineering, and custom solution implementation.',
    desc: 'Strategic consulting for business transformation through analysis, process re-engineering, and custom solution implementation. Our consultants act as trusted advisors — not just vendors — in your transformation journey.',
    icon: '💡',
    benefits: ['Vendor-neutral advice prioritizing your business outcomes', 'Current-state assessment identifying quick wins and long-term plays', 'Business case development with quantified ROI projections', 'Ongoing advisory relationship throughout implementation'],
    useCases: ['Enterprise architecture review for a $500M company planning ERP migration', 'Digital strategy roadmap for a traditional retailer entering e-commerce'],
    technologies: ['Enterprise Architecture Frameworks', 'TOGAF', 'McKinsey 7S', 'Business Model Canvas', 'SWOT Analysis'],
    whyChoose: 'Our consulting principals have led transformations for 100+ Fortune 500 companies.',
    process: ['Stakeholder Interviews', 'Current-State Analysis', 'Recommendations & Roadmap', 'Implementation Advisory'],
  },
  {
    id: 'qa-compliance',
    category: 'marketing',
    title: 'Quality Assurance & Compliance',
    shortDesc: 'Achieve quality standards and regulatory compliance through audits, SLA adherence checks, and continuous improvement.',
    desc: 'Achieve quality standards and regulatory compliance through comprehensive audits, SLA adherence checks, and continuous improvement. We help organizations meet ISO, SOC 2, GDPR, HIPAA, and other regulatory requirements.',
    icon: '✅',
    benefits: ['ISO 9001 / ISO 27001 certification readiness in 90 days', 'SOC 2 Type II report preparation and audit support', 'Continuous compliance monitoring dashboards', 'Policy and procedure documentation aligned to standards'],
    useCases: ['ISO 27001 certification for a healthcare IT vendor in 4 months', 'GDPR compliance program for a European e-commerce company'],
    technologies: ['Vanta', 'Drata', 'OneTrust', 'AuditBoard', 'ServiceNow GRC'],
    whyChoose: 'Our compliance specialists have guided 80+ organizations to successful ISO, SOC 2, and GDPR certifications without audit failures.',
    process: ['Compliance Gap Assessment', 'Policy Framework Development', 'Control Implementation', 'Audit Preparation & Support'],
  },

  // ── LOW-CODE & INNOVATION ────────────────────────────────────────
  {
    id: 'low-code',
    category: 'innovation',
    title: 'Low-Code Solutions',
    shortDesc: 'Accelerate digital transformation using OutSystems and Power Apps with consulting, development, and training.',
    desc: 'Accelerate digital transformation using low-code platforms including OutSystems and Power Apps with consulting, product development, and training services. Release internal software 5x faster with governed low-code environments.',
    icon: '⚡',
    benefits: ['Release software 5x faster than traditional development', 'Governed environment preventing security and shadow IT issues', 'Easy integration with existing enterprise systems', 'Visual configurations allowing quick future adjustments'],
    useCases: ['An internal company travel-request and manager-approval app in PowerApps', 'A field-officer inspections logging app syncing data to cloud systems'],
    technologies: ['PowerApps', 'Power Automate', 'Salesforce Flow', 'Retool', 'OutSystems', 'Mendix'],
    whyChoose: 'We build low-code solutions backed by strict governance structures to prevent Shadow IT complications.',
    process: ['Requirements Mapping', 'Visual Prototyping', 'Integration Configurations', 'Security Governance Audit'],
  },
  {
    id: 'gen-ai',
    category: 'innovation',
    title: 'Generative AI Services',
    shortDesc: 'Transform business with AI: foundation models, conversational experiences, document intelligence, and intelligent digital products.',
    desc: 'Transform business operations with AI including foundation models, conversational experiences, document intelligence, and intelligent digital products. ALPHAZOX Innovation Labs runs the Rapid60 program delivering AI proof-of-concepts within 60 days.',
    icon: '🧠',
    benefits: ['Automated customer query handling with human-like accuracy', 'Instant natural-language queries across corporate PDF libraries', 'Secure sandbox environments keeping business data private', 'Custom LLM agents trained on your proprietary knowledge'],
    useCases: ['A secure corporate assistant trained on internal HR and tech guidelines', 'Document intelligence pipelines automating mortgage contract classifications'],
    technologies: ['OpenAI API', 'LangChain', 'LlamaIndex', 'Python', 'Pinecone', 'HuggingFace'],
    whyChoose: 'ALPHAZOX Innovation Labs runs the Rapid60 Generative AI program, delivering proof-of-concepts within 60 days.',
    process: ['Use Case Discovery', 'Vectorizing & RAG Setup', 'Model Fine-Tuning', 'Deployment & Safety Guardrails'],
  },
  {
    id: 'intelligent-automation',
    category: 'innovation',
    title: 'Intelligent Process Automation',
    shortDesc: 'Combine RPA with AI, ML, and document processing for cost optimization, productivity, and compliance.',
    desc: 'Combine RPA with AI, ML, and document processing for cost optimization, enhanced productivity, compliance, and customer satisfaction. Intelligent automation goes beyond simple bots — it thinks, adapts, and improves over time.',
    icon: '🔮',
    benefits: ['Decision-making bots that handle exceptions autonomously', 'Natural language document processing at enterprise scale', 'End-to-end process automation with zero human touchpoints', 'Continuous learning improving bot accuracy over time'],
    useCases: ['Intelligent invoice processing combining OCR, AI, and RPA for a global bank', 'Automated customer onboarding reducing processing time from 5 days to 2 hours'],
    technologies: ['UiPath AI Fabric', 'Blue Prism Decipher', 'Microsoft AI Builder', 'OpenAI', 'AWS Comprehend'],
    whyChoose: 'Our IPA implementations consistently deliver 300-500% ROI within 12 months of deployment.',
    process: ['Process Discovery', 'Automation Architecture', 'AI Integration', 'Deploy & Continuously Improve'],
  },
  {
    id: 'advanced-analytics-ai',
    category: 'innovation',
    title: 'Advanced Analytics & AI/ML',
    shortDesc: 'Data-driven enterprise transformation: data strategy, predictive analytics, ML, and self-service analytics platforms.',
    desc: 'Data-driven enterprise transformation through data strategy, predictive analytics, machine learning, and self-service analytics platforms. We help organizations move from descriptive reporting to prescriptive intelligence.',
    icon: '📡',
    benefits: ['Move from hindsight to foresight with predictive models', 'Self-service analytics empowering all business users', 'ML operations (MLOps) ensuring models stay accurate over time', 'Enterprise data platform consolidating all data sources'],
    useCases: ['Customer churn prediction model saving $5M annually for a telecom', 'Demand forecasting AI reducing inventory costs by 25% for a retailer'],
    technologies: ['Databricks', 'Snowflake', 'Azure ML', 'Google Vertex AI', 'dbt', 'Apache Spark'],
    whyChoose: 'Our data scientists combine deep mathematical expertise with business acumen to build models that actually get adopted.',
    process: ['Data Maturity Assessment', 'Platform Design', 'Model Development', 'MLOps & Governance'],
  },
  {
    id: 'cloud-engineering',
    category: 'innovation',
    title: 'Cloud Engineering & Transformation',
    shortDesc: 'Comprehensive cloud solutions: strategy, architecture design, migration, operations, and innovation development.',
    desc: 'Comprehensive cloud solutions including strategy, architecture design, migration services, operations, and innovation development. Strategic partnerships with AWS, Azure, and GCP ensure the most cost-effective cloud topologies.',
    icon: '🌤️',
    benefits: ['Scalable resources matching real-time user traffic demands', 'Reduced physical data center footprint and costs', 'Improved global disaster recovery capabilities', 'Access to advanced cloud AI/ML and serverless tools'],
    useCases: ['Moving a retail warehouse system from on-premise to AWS Cloud', 'Setting up a hybrid backup system using Azure Synapse'],
    technologies: ['AWS', 'Microsoft Azure', 'Google Cloud Platform', 'Terraform', 'CloudFlare', 'Linux'],
    whyChoose: 'Strategic partnerships with leading cloud providers ensure we implement the most cost-effective and secure cloud topologies.',
    process: ['Cloud Readiness Assessment', 'Topology Design', 'Workload Migration', 'FinOps Cost Audit'],
  },
  {
    id: 'app-enterprise-solutions',
    category: 'innovation',
    title: 'Application Services & Enterprise Solutions',
    shortDesc: 'Modern application development: strategic planning, agile development, legacy modernization, and DevOps integration.',
    desc: 'Modern application development with strategic planning, agile development, legacy modernization, automation, and DevOps integration. End-to-end application lifecycle management from concept to retirement.',
    icon: '🏛️',
    benefits: ['Full application lifecycle management under one partner', 'Legacy modernization with zero business disruption', 'Containerized microservices for maximum flexibility', 'Integrated DevSecOps pipeline from day one'],
    useCases: ['Monolith-to-microservices migration for a 20-year-old banking application', 'Full application portfolio rationalization for a post-merger integration'],
    technologies: ['Java', '.NET', 'React', 'Angular', 'Kubernetes', 'Docker', 'Azure DevOps'],
    whyChoose: 'We manage 200+ applications across industries with proven frameworks for modernization and operational excellence.',
    process: ['Portfolio Assessment', 'Modernization Roadmap', 'Incremental Delivery', 'DevOps & Support'],
  },
];

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);

  const getCategoryLabel = (key: string) => CATEGORIES.find(c => c.key === key)?.label || key;

  return (
    <section className="services-section section section-alt">
      <div className="container">
        {/* Introduction Section */}
        <div className="section-title" style={{ marginBottom: '3rem' }}>
          <h2>Our IT Service Capabilities</h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
            From Core IT and Enterprise Solutions to Financial Management, Digital Integration, and Generative AI — 
            explore our full portfolio across 10 practice areas designed to transform your business.
          </p>
        </div>

        {/* Services Grouped By Category */}
        <div className="services-grouped-container">
          {CATEGORIES.filter(cat => cat.key !== 'all').map(cat => {
            const catServices = servicesData.filter(s => s.category === cat.key);
            if (catServices.length === 0) return null;
            return (
              <div key={cat.key} className="service-category-section">
                <h3 className="service-category-title">{cat.label}</h3>
                <div className="services-grid">
                  {catServices.map((svc) => (
                    <div key={svc.id} className="service-card card">
                      <span className="service-icon">{svc.icon}</span>
                      <h3>{svc.title}</h3>
                      <p>{svc.shortDesc}</p>
                      <div className="service-card-footer" style={{ justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => setSelectedService(svc)}
                          className="btn btn-outline btn-sm"
                        >
                          Learn More →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        {selectedService && (
          <div className="service-modal-overlay" onClick={() => setSelectedService(null)}>
            <div className="service-modal-card card" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setSelectedService(null)} aria-label="Close Modal">✕</button>

              <div className="modal-header">
                <span className="modal-icon">{selectedService.icon}</span>
                <div>
                  <h2>{selectedService.title}</h2>
                  <p className="modal-subtitle">
                    <span className="service-cat-tag">{getCategoryLabel(selectedService.category)}</span>
                    &nbsp;· ALPHAZOX
                  </p>
                </div>
              </div>

              <div className="modal-body">
                <div className="modal-section">
                  <h4>Detailed Description</h4>
                  <p>{selectedService.desc}</p>
                </div>

                <div className="modal-grid-info">
                  <div className="modal-column">
                    <h4>Key Benefits & Features</h4>
                    <ul className="modal-list">
                      {selectedService.benefits.map((b, i) => <li key={i}>✓ {b}</li>)}
                    </ul>
                  </div>
                  <div className="modal-column">
                    <h4>Real-World Use Cases</h4>
                    <ul className="modal-list use-case-list">
                      {selectedService.useCases.map((u, i) => <li key={i}>📌 {u}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="modal-grid-info">
                  <div className="modal-column">
                    <h4>Technologies Used</h4>
                    <div className="tech-tags-container">
                      {selectedService.technologies.map((t, i) => <span key={i} className="tech-tag-badge">{t}</span>)}
                    </div>
                  </div>
                  <div className="modal-column">
                    <h4>Our Process / Methodology</h4>
                    <ol className="modal-process-list">
                      {selectedService.process.map((p, i) => (
                        <li key={i}>
                          <span className="step-num">{i + 1}</span>
                          <span className="step-text">{p}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="modal-section why-astikos-box">
                  <h4>Why Choose ALPHAZOX?</h4>
                  <p>💬 {selectedService.whyChoose}</p>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedService(null)}>Close Details</button>
                <button className="btn btn-primary" onClick={() => {
                  setSelectedService(null);
                  setFormModalOpen(true);
                }}>Book Free Consultation</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <FormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        formType="consultation"
      />
    </section>
  );
};
