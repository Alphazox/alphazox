// All site copy lives here so pages stay layout-only.

export const SITE = {
  name: 'ALPHAZOX',
  email: 'support@alphazox.com',
  phoneIndia: '+91 81259 50099',
  phoneIndiaHref: 'tel:+918125950099',
  phoneUS: '+1 (716) 939-6514',
  phoneUSHref: 'tel:+17169396514',
  linkedin: 'https://www.linkedin.com/company/alphazox/',
  x: 'https://x.com/Alphazox',
  instagram: 'https://www.instagram.com/alphazox_',
};

// Items with an entry in MEGA_MENUS (data/menus.ts) open a dropdown.
export const NAV = [
  { label: 'Agentic AI', path: '/agentic-ai' },
  { label: 'Platform', path: '/platform' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Industries', path: '/industries' },
  { label: 'About', path: '/about' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

export const MARQUEE = [
  'AI Agents', 'Agent Orchestration', 'Enterprise Apps', 'Legacy Modernization', 'Workflow Automation',
  'Customer Portals', 'Mobile Apps', 'Data Integration', 'Governed AI', 'Cloud Native', 'DevOps',
  '.NET', 'Java', 'Python', 'React', 'Azure', 'AWS', 'LLMs', 'RAG', 'APIs',
];

export const PILLARS = [
  {
    icon: '⚙️',
    title: 'Operational Efficiency',
    desc: 'AI agents and automated workflows take over approvals, document handling and repetitive back-office work, with people kept in the loop.',
    points: ['Intelligent document processing', 'Approval & case workflows', 'Process automation'],
  },
  {
    icon: '✨',
    title: 'Digital Experiences',
    desc: 'Customer portals, mobile apps and self-service journeys that feel modern and connect straight into your core systems.',
    points: ['Web & mobile apps', 'Customer & partner portals', 'Conversational assistants'],
  },
  {
    icon: '🧠',
    title: 'Specialized AI',
    desc: 'Domain-specific AI built on your own data, with guardrails, so answers and actions are accurate, explainable and auditable.',
    points: ['Retrieval-augmented AI', 'Predictive models', 'AI copilots for teams'],
  },
];

export const AGENT_LOOP = [
  { key: 'perceive', title: 'Perceive', desc: 'The agent connects to your data, documents, APIs and events, and understands the request in context.' },
  { key: 'reason', title: 'Reason', desc: 'It plans the next steps using language models combined with your business rules and policies.' },
  { key: 'act', title: 'Act', desc: 'It executes across systems: updating records, triggering workflows and drafting responses.' },
  { key: 'govern', title: 'Govern', desc: 'Every step is logged, permissioned and reviewable, with humans approving high-impact actions.' },
];

export interface UseCase { title: string; desc: string; to: string; }
export interface UseCaseGroup { key: string; label: string; icon: string; intro: string; items: UseCase[]; }

export const USE_CASES: UseCaseGroup[] = [
  {
    key: 'external',
    label: 'External Apps',
    icon: '🌐',
    intro: 'Experiences your customers, citizens and partners use every day.',
    items: [
      { title: 'Customer Portals', desc: 'Self-service accounts, requests and real-time status in one place.', to: '/platform/app-development' },
      { title: 'Citizen Services', desc: 'Digital applications, permits and payments for public-sector bodies.', to: '/industries/government' },
      { title: 'Banking & Insurance Apps', desc: 'Onboarding, servicing and claims journeys on web and mobile.', to: '/industries/banking-financial-services' },
      { title: 'Patient Portals', desc: 'Appointments, records and secure messaging for healthcare providers.', to: '/industries/healthcare' },
    ],
  },
  {
    key: 'core',
    label: 'Core Systems',
    icon: '🏛️',
    intro: 'The business-critical systems that run your operations.',
    items: [
      { title: 'Digital Lending', desc: 'Loan origination, underwriting and servicing with automated decisions.', to: '/industries/banking-financial-services' },
      { title: 'Claims Management', desc: 'Intake, triage and settlement with AI-assisted document review.', to: '/industries/insurance' },
      { title: 'Field Service', desc: 'Scheduling, inspections and offline mobile work orders.', to: '/industries/energy-utilities' },
      { title: 'Supply Chain', desc: 'Orders, inventory and shipment visibility across partners.', to: '/industries/manufacturing' },
      { title: 'ERP & CRM Extensions', desc: 'Custom apps that extend SAP, Salesforce and Dynamics without touching the core.', to: '/platform/data-integration' },
    ],
  },
  {
    key: 'internal',
    label: 'Internal Apps',
    icon: '🏢',
    intro: 'Tools that make your teams faster and replace spreadsheets and email.',
    items: [
      { title: 'Employee Onboarding', desc: 'Guided onboarding with tasks, documents and equipment requests.', to: '/solutions/process-automation' },
      { title: 'Case Management', desc: 'Track, route and resolve cases with SLAs and AI summaries.', to: '/solutions/process-automation' },
      { title: 'IT Service Management', desc: 'Requests, incidents and approvals with an AI service desk agent.', to: '/solutions/faster-it-delivery' },
      { title: 'Procurement & Approvals', desc: 'Purchase requests and multi-level approvals with full audit trails.', to: '/platform/workflow-automation' },
    ],
  },
];

export const INITIATIVES = [
  { icon: '🤖', title: 'AI Agents at Work', to: '/agentic-ai', desc: 'Design, build and run AI agents that work safely across your systems.' },
  { icon: '⚡', title: 'AI-Accelerated Engineering', to: '/solutions/ai-accelerated-engineering', desc: 'AI-assisted engineering that ships production apps in weeks, not years.' },
  { icon: '🔄', title: 'Application Modernization', to: '/solutions/application-modernization', desc: 'Replace or wrap ageing systems step by step, without a risky big-bang.' },
  { icon: '💬', title: 'Digital Customer Journeys', to: '/solutions/digital-customer-journeys', desc: 'Faster, personal digital journeys across web, mobile and chat.' },
  { icon: '📈', title: 'Process Automation', to: '/solutions/process-automation', desc: 'Automate manual work and free your people for higher-value tasks.' },
  { icon: '🧭', title: 'Faster IT Delivery', to: '/solutions/faster-it-delivery', desc: 'Reusable components and DevOps so IT can respond to change quickly.' },
];

export interface Industry { slug: string; icon: string; name: string; desc: string; builds: string[]; }

export const INDUSTRIES: Industry[] = [
  { slug: 'banking-financial-services', icon: '🏦', name: 'Financial Services', desc: 'Faster onboarding, lending and servicing, with compliance built in.', builds: ['Digital onboarding & KYC', 'Loan origination', 'Advisor copilots'] },
  { slug: 'insurance', icon: '🛡️', name: 'Insurance', desc: 'Modern policy and claims journeys powered by AI document review.', builds: ['Claims automation', 'Broker portals', 'Underwriting assistants'] },
  { slug: 'government', icon: '🏛️', name: 'Government', desc: 'Accessible digital services for citizens and efficient case handling for staff.', builds: ['Citizen portals', 'Permit & licence workflows', 'Case management'] },
  { slug: 'manufacturing', icon: '🏭', name: 'Manufacturing', desc: 'Connected operations from the shop floor to the supply chain.', builds: ['Quality & inspection apps', 'Maintenance scheduling', 'Supplier portals'] },
  { slug: 'healthcare', icon: '🏥', name: 'Healthcare', desc: 'Better patient journeys and less admin for clinical staff.', builds: ['Patient portals', 'Appointment scheduling', 'Clinical documentation AI'] },
  { slug: 'energy-utilities', icon: '⚡', name: 'Energy & Utilities', desc: 'Field-ready apps and customer self-service for critical infrastructure.', builds: ['Field service apps', 'Outage communication', 'Asset inspections'] },
  { slug: 'retail', icon: '🛒', name: 'Retail', desc: 'Unified commerce, loyalty and store operations.', builds: ['Order & returns portals', 'Loyalty apps', 'Store operations tools'] },
  { slug: 'education', icon: '🎓', name: 'Education', desc: 'Digital campuses for students, faculty and administration.', builds: ['Student portals', 'Admissions workflows', 'AI learning assistants'] },
];

export const GOVERNANCE = [
  { icon: '🔐', title: 'Role-Based Access', desc: 'Agents only see and do what the user they act for is allowed to.' },
  { icon: '🧾', title: 'Full Audit Trails', desc: 'Every prompt, decision and action is logged and reviewable.' },
  { icon: '🙋', title: 'Human in the Loop', desc: 'High-impact actions wait for human approval by design.' },
  { icon: '🧱', title: 'Guardrails', desc: 'Policy checks, content filters and safe-action limits on every agent.' },
  { icon: '🌍', title: 'Data Residency', desc: 'Choose where data lives and keep sensitive data inside your boundary.' },
  { icon: '📋', title: 'Compliance-Ready', desc: 'Delivery practices aligned with HIPAA, GDPR and PCI DSS requirements.' },
];

export const DELIVERY = [
  { step: '01', title: 'Discover', desc: 'Map goals, users, data and constraints. Pick one high-value use case.' },
  { step: '02', title: 'Prototype', desc: 'A working prototype of the riskiest journey, in front of users within weeks.' },
  { step: '03', title: 'Build', desc: 'Iterative releases with automated testing, security reviews and feedback.' },
  { step: '04', title: 'Scale', desc: 'Operate, monitor and extend. Reuse components across the next use cases.' },
];

export const CAPABILITIES = [
  { icon: '🧬', title: 'Agent Engineering', to: '/agentic-ai', desc: 'Agents with defined goals, tools, memory and limits, built and tested like any production service.', tags: ['Agent design', 'Tool calling', 'Memory', 'Evaluation'] },
  { icon: '🕸️', title: 'Agent Orchestration', to: '/agentic-ai', desc: 'Coordinate multiple agents and people across long-running business processes.', tags: ['Multi-agent', 'Hand-offs', 'Escalation', 'Scheduling'] },
  { icon: '🖥️', title: 'Human + Agent Interfaces', to: '/platform/app-development', desc: 'Screens where staff and agents collaborate: chat panels, copilots and assistants built into your apps.', tags: ['Copilots', 'Chat UI', 'Embedded AI', 'Voice'] },
  { icon: '🔀', title: 'Workflows & Automation', to: '/platform/workflow-automation', desc: 'Model approvals, SLAs and exceptions visually, then let agents handle the routine steps.', tags: ['BPM', 'Approvals', 'SLAs', 'RPA'] },
  { icon: '🗄️', title: 'Data & Integration Hub', to: '/platform/data-integration', desc: 'Connect ERP, CRM, core systems and documents so agents and apps share one view of the truth.', tags: ['APIs', 'Events', 'RAG', 'Connectors'] },
  { icon: '🛡️', title: 'Security & Governance', to: '/platform/security-governance', desc: 'Identity, permissions, audit and policy enforcement for every app and agent.', tags: ['SSO', 'RBAC', 'Audit', 'Guardrails'] },
  { icon: '🚀', title: 'AI-Accelerated Engineering', to: '/solutions/ai-accelerated-engineering', desc: 'AI coding assistants plus a reusable component library shorten delivery while reviews keep quality high.', tags: ['AI pair-coding', 'Reusable modules', 'Code review'] },
  { icon: '📡', title: 'DevOps & Observability', to: '/platform/cloud-devops', desc: 'Automated pipelines, monitoring and cost tracking for apps and models in production.', tags: ['CI/CD', 'Monitoring', 'LLMOps', 'FinOps'] },
];

export const TECH_STACK = [
  { group: 'Engineering', to: '/platform/dotnet', items: ['.NET', 'Java', 'Python', 'Node.js', 'React', 'Flutter'] },
  { group: 'AI & Data', to: '/platform/python-ai', items: ['LLMs', 'RAG', 'Vector DBs', 'ML Models', 'Power BI'] },
  { group: 'Cloud & DevOps', to: '/platform/cloud-devops', items: ['Azure', 'AWS', 'Google Cloud', 'Kubernetes', 'Terraform'] },
  { group: 'Enterprise', to: '/platform/data-integration', items: ['SAP', 'Salesforce', 'Dynamics 365', 'ServiceNow', 'REST & GraphQL'] },
];

export const FAQ = [
  { q: 'What does ALPHAZOX build?', a: 'We design, build and run enterprise applications and AI agents: customer portals, mobile apps, core business systems, internal tools and automated workflows, plus the integrations that connect them to your existing systems.' },
  { q: 'What is an AI agent, in practical terms?', a: 'An AI agent is software that can understand a request, plan the steps, and act across your systems, for example reading a claim, checking policy rules and drafting a decision for a person to approve.' },
  { q: 'Is agentic AI safe for regulated industries?', a: 'Yes, when it is governed. We build agents with role-based access, audit trails, guardrails and human approval for high-impact actions, aligned with requirements such as HIPAA, GDPR and PCI DSS.' },
  { q: 'Can you modernize our legacy systems?', a: 'Yes. We modernize step by step, wrapping legacy cores with APIs and new interfaces or replacing them module by module, so the business keeps running throughout.' },
  { q: 'How fast can we see results?', a: 'Most engagements start with a discovery call and a working prototype of one high-value use case within weeks. We then scale what works.' },
  { q: 'Do you work with large enterprises?', a: 'Yes. Our delivery model, security practices and support are designed for enterprise scale, with teams in the USA and India.' },
];

export const OFFICES = [
  { flag: '🇺🇸', city: 'Austin, Texas', label: 'USA Advisory Office', address: 'Austin, Texas, USA. Meet the advisor by appointment only.', phone: SITE.phoneUS, phoneHref: SITE.phoneUSHref, image: '/images/photos/city-austin-sm.jpg', imageAlt: 'Downtown Austin skyline across Lady Bird Lake' },
  { flag: '🇮🇳', city: 'Hyderabad', label: 'India Advisory Office', address: 'Hyderabad, Telangana, India. Meet the advisor by appointment only.', phone: SITE.phoneIndia, phoneHref: SITE.phoneIndiaHref, image: '/images/photos/city-hyderabad-sm.jpg', imageAlt: 'The Charminar in Hyderabad' },
  { flag: '🇮🇳', city: 'Visakhapatnam', label: 'India Delivery Center', address: 'Near Siripuram, Visakhapatnam, Andhra Pradesh 530003', phone: SITE.phoneIndia, phoneHref: SITE.phoneIndiaHref, image: '/images/photos/city-vizag-sm.jpg', imageAlt: 'Visakhapatnam coastline' },
];

export const VALUES = [
  { icon: '🎯', title: 'Outcomes First', desc: 'We measure success in business results, not lines of code.' },
  { icon: '🔍', title: 'Transparency', desc: 'Clear scope, honest estimates and visible progress every sprint.' },
  { icon: '🛡️', title: 'Responsible AI', desc: 'Governance, privacy and human oversight are part of every design.' },
  { icon: '🤝', title: 'Partnership', desc: 'We stay after go-live to support, improve and scale what works.' },
];

export interface Job { title: string; team: string; location: string; type: string; }

export const JOBS: Job[] = [
  { title: 'OutSystems Developer', team: 'Low-Code Engineering', location: 'Visakhapatnam', type: 'Full-Time' },
  { title: 'Senior OutSystems Developer', team: 'Low-Code Engineering', location: 'Visakhapatnam / Remote', type: 'Full-Time' },
  { title: 'OutSystems Tech Lead / Architect', team: 'Solution Architecture', location: 'Visakhapatnam / Remote', type: 'Full-Time' },
  { title: 'OutSystems Mobile Developer', team: 'Low-Code Engineering', location: 'Visakhapatnam', type: 'Full-Time' },
  { title: 'AI Agent Engineer', team: 'AI & Data', location: 'Visakhapatnam / Remote', type: 'Full-Time' },
  { title: 'Integration Developer (.NET & APIs)', team: 'Integration Services', location: 'Visakhapatnam', type: 'Full-Time' },
  { title: 'QA & Test Automation Engineer', team: 'Quality Engineering', location: 'Visakhapatnam', type: 'Full-Time' },
  { title: 'DevOps & Cloud Engineer', team: 'Cloud Infrastructure', location: 'Austin / Remote', type: 'Full-Time' },
  { title: 'Certified Accounting Specialist', team: 'Business Services', location: 'Visakhapatnam', type: 'Full-Time' },
];

// ── Agentic AI page ───────────────────────────────────────────────────────────

export const AGENT_COMPARE = {
  rows: ['Understands intent', 'Plans multi-step work', 'Acts across systems', 'Adapts when things change', 'Governed & auditable'],
  cols: [
    { name: 'Chatbot', marks: [true, false, false, false, false] },
    { name: 'Rule-based automation', marks: [false, false, true, false, true] },
    { name: 'ALPHAZOX AI agent', marks: [true, true, true, true, true] },
  ],
};

export const AGENT_LIFECYCLE = [
  { title: 'Discover', desc: 'We workshop with your teams to find the tasks where an agent saves real hours, and flag the ones better left to people.' },
  { title: 'Design', desc: 'We define the job description for each agent: its goal, the tools it may call, the data it may read and the moments a person signs off.' },
  { title: 'Ground', desc: 'We wire the agent into your documents, records and APIs so its answers come from your facts, not guesses.' },
  { title: 'Govern', desc: 'Permissions, spending limits, content filters and approval gates are agreed and tested before go-live.' },
  { title: 'Deploy', desc: 'The agent ships through the same release pipeline as your other software, with rollback ready.' },
  { title: 'Observe', desc: 'Dashboards show what each agent decided, which tools it touched, how long it took and what it cost.' },
  { title: 'Improve', desc: 'Regular test runs, prompt tuning and model upgrades keep accuracy climbing after launch.' },
];

export interface AgentCapability { key: string; icon: string; title: string; summary: string; points: string[]; }

export const AGENT_CAPABILITIES: AgentCapability[] = [
  {
    key: 'orchestration',
    icon: '🕸️',
    title: 'Multi-Agent Coordination',
    summary: 'Several focused agents, each with one job, passing work between them like a well-run team.',
    points: [
      'We split big processes into small agent roles that are easy to test',
      'A coordinator decides which agent picks up each task, and when a person should',
      'Every hand-off is checked against permissions and written to the audit log',
      'Starter agents for common jobs such as intake, summarising and routing, tailored to your domain',
      'Agents move from test to live through your normal release approvals',
    ],
  },
  {
    key: 'workflows',
    icon: '🔀',
    title: 'People + Agent Processes',
    summary: 'Business processes where software agents do the legwork and your staff make the calls that matter.',
    points: [
      'Agents slot into the steps where they help most, not everywhere',
      'Approvals, exceptions and judgement calls stay with your people',
      'A case can wait days for a signature or a reply, then pick up where it left off',
      'Processes start from an email, form, API call, data change or timer',
      'Process versions are tracked so in-flight cases are never disrupted',
    ],
  },
  {
    key: 'context',
    icon: '🗄️',
    title: 'Grounding & Data Access',
    summary: 'Agents are only as good as what they know, so we connect them to trusted, current information.',
    points: [
      'Read data where it already lives instead of copying it into yet another store',
      'Combine database records with PDFs, emails and knowledge articles',
      'Connectors for ERP, CRM, core platforms and popular SaaS tools',
      'A glossary of your terms and rules so agents speak your language',
      'An agent can never see more than the user it is working for',
    ],
  },
  {
    key: 'engineering',
    icon: '🧬',
    title: 'Agent Build & Testing',
    summary: 'We engineer agents with the same rigour as any production system: code review, tests and release control.',
    points: [
      'Your developers keep their favourite AI coding assistants; we add the guardrails',
      'Existing services and components are reused, not rewritten',
      'Change analysis shows which apps and agents a release will affect',
      'Automated checks enforce your coding, security and naming standards',
      'Risky changes need a named reviewer, and everything is traceable',
    ],
  },
  {
    key: 'observability',
    icon: '📡',
    title: 'Monitoring & Quality',
    summary: 'Full visibility of agent behaviour in production, with the data to keep improving it.',
    points: [
      'Step-by-step traces of every decision and system call',
      'Live metrics for accuracy, speed and spend per agent',
      'Test suites that run before release and continuously in production',
      'Alerts when answers or actions start drifting from expectations',
      'Swap the underlying model for cost or quality without rebuilding the agent',
    ],
  },
];

export const AGENT_EXAMPLES = [
  { icon: '🛡️', title: 'Claims Triage Agent', desc: 'Reads new claims and documents, checks policy coverage, flags fraud signals and routes to the right handler.' },
  { icon: '🏦', title: 'Lending Pre-Underwriter', desc: 'Collects documents, extracts data, runs eligibility rules and prepares a decision pack for the underwriter.' },
  { icon: '👋', title: 'Onboarding Agent', desc: 'Guides new customers or employees, chases missing items and completes setup across systems.' },
  { icon: '🖥️', title: 'IT Service Desk Agent', desc: 'Resolves common requests, resets access, and escalates incidents with a full summary.' },
  { icon: '🔧', title: 'Field Inspection Assistant', desc: 'Helps technicians on site with checklists, photos and work orders, even offline.' },
  { icon: '🧾', title: 'Procurement Agent', desc: 'Compares quotes, checks budgets and policies, and prepares purchase approvals.' },
  { icon: '💬', title: 'Customer Service Agent', desc: 'Answers questions from your own knowledge, updates records and hands off to people when needed.' },
  { icon: '📄', title: 'Document Intake Agent', desc: 'Classifies, extracts and validates incoming documents, then files them in the right system.' },
];

export const AGENT_FAQ = [
  { q: 'What is agentic AI?', a: 'Agentic AI refers to AI systems that can pursue a goal: they understand a request, plan the steps, use tools and systems to act, and adjust as they go, within boundaries you define.' },
  { q: 'How is an AI agent different from a chatbot or RPA?', a: 'A chatbot answers questions; RPA follows fixed scripts. An agent combines both. It understands intent, decides what to do next and acts across systems, while staying governed and auditable.' },
  { q: 'How do you keep agents safe and compliant?', a: 'Agents inherit user permissions, run inside guardrails and usage limits, route high-impact actions to human approval, and log every decision and tool call for audit.' },
  { q: 'Can agents work with our existing systems?', a: 'Yes. We connect agents to ERP, CRM, core and legacy systems through APIs, standard connectors and protocols such as MCP, without moving your data.' },
  { q: 'How do multiple agents work together?', a: 'Specialized agents are orchestrated through defined workflows. Hand-offs between agents follow permissions and routing rules, and every interaction is traceable.' },
  { q: 'Which AI models do you use?', a: 'We are model-agnostic. We choose the best model for each task and can swap models later for cost, quality or data-residency reasons without rewriting agent logic.' },
  { q: 'How do we get started?', a: 'Start with an Agent Opportunity Assessment: we review your processes, pick one high-value use case and deliver a working, governed agent prototype within weeks.' },
];
