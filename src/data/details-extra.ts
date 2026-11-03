// Topic-specific sections for every detail page (industries, business goals, platform), keyed by slug.

export interface DetailExtra {
  introTitle: string;
  intro: string[];
  stack: string[];
  process: { title: string; desc: string }[];
  examples: { icon: string; title: string; desc: string }[];
  faq: { q: string; a: string }[];
}

export const DETAIL_EXTRAS: Record<string, DetailExtra> = {
  // ── Industries ──────────────────────────────────────────────────────────────
  'banking-financial-services': {
    introTitle: 'Banks need speed without losing control.',
    intro: [
      'Customers expect to open accounts, borrow and resolve issues from their phone in minutes. Behind the scenes, most banks still rely on core platforms that are expensive to change and on operations teams that re-key data between screens.',
      'We put a modern layer of apps, APIs and governed AI agents around the core. New journeys launch quickly, manual checks shrink, and every automated step stays explainable to risk, audit and regulators.',
    ],
    stack: ['Core banking APIs', 'KYC / AML services', 'Open banking', 'Document AI', 'Event streaming', 'SSO & MFA', 'Audit logging'],
    process: [
      { title: 'Map the journey', desc: 'Walk through one product journey with operations, risk and customers to find the slowest, most manual steps.' },
      { title: 'Connect the core', desc: 'Expose the data and functions that journey needs through secure APIs, without changing the core platform.' },
      { title: 'Add agents with controls', desc: 'Introduce agents for document checks and data preparation, with approval points agreed with risk.' },
      { title: 'Pilot with real customers', desc: 'Release to a limited group, compare turnaround times and error rates against the old process.' },
      { title: 'Scale across products', desc: 'Reuse the same APIs, components and agent patterns for the next product line.' },
    ],
    examples: [
      { icon: '🪪', title: 'Digital account opening', desc: 'Mobile onboarding with ID capture, liveness checks and automatic screening, with exceptions routed to staff.' },
      { icon: '🏠', title: 'Mortgage document hub', desc: 'Applicants upload documents once; an agent checks completeness and extracts figures for underwriters.' },
      { icon: '🚨', title: 'AML alert workspace', desc: 'Analysts see each alert with linked accounts, transaction history and a drafted case summary.' },
      { icon: '💬', title: 'Service request assistant', desc: 'Customers change details, order cards and raise disputes through chat, with full handoff to agents.' },
    ],
    faq: [
      { q: 'How do you handle sensitive financial data?', a: 'Data stays in your approved environments, access is role-based, and AI models are used through private endpoints with logging and no training on your data.' },
      { q: 'How long does a first journey take?', a: 'A working prototype usually takes a few weeks; a production release for one journey typically follows within a few months, depending on integration needs.' },
    ],
  },
  insurance: {
    introTitle: 'Insurance runs on documents and decisions.',
    intro: [
      'Claims, policies and submissions arrive as emails, PDFs and photos. Handlers and underwriters spend much of their day finding, reading and re-typing information before any real judgement happens.',
      'We automate that groundwork. Agents read documents, check coverage and assemble complete files, while modern portals give brokers and policyholders self-service, so your experts focus on decisions, not admin.',
    ],
    stack: ['Policy admin integration', 'Document AI', 'Fraud scoring', 'Broker portals', 'Workflow engine', 'Mobile apps', 'Audit logging'],
    process: [
      { title: 'Pick a line of business', desc: 'Choose one product and one process, such as motor claims intake, to keep scope tight.' },
      { title: 'Digitise intake', desc: 'Replace emailed forms with guided digital intake that captures complete information first time.' },
      { title: 'Automate the groundwork', desc: 'Agents classify documents, check coverage and prepare the file for the handler.' },
      { title: 'Measure and tune', desc: 'Track cycle time, leakage and customer satisfaction, and adjust rules and prompts.' },
      { title: 'Extend to more lines', desc: 'Roll the same components out to other products and channels.' },
    ],
    examples: [
      { icon: '🚗', title: 'Motor claims intake', desc: 'Photo-based claim submission with damage capture, coverage checks and automatic routing.' },
      { icon: '📑', title: 'Submission summariser', desc: 'Underwriters get a one-page summary of each broker submission with key risks highlighted.' },
      { icon: '🤝', title: 'Broker self-service portal', desc: 'Brokers quote, bind and track policies without calling the underwriting team.' },
      { icon: '🔎', title: 'Fraud signal dashboard', desc: 'Suspicious patterns across claims flagged for investigators, with reasons shown.' },
    ],
    faq: [
      { q: 'Can you work with our existing claims system?', a: 'Yes. We integrate through APIs or data access and add new intake and automation around it.' },
      { q: 'How accurate is document extraction?', a: 'Accuracy depends on document quality, so we measure it on your real samples during the pilot and keep people reviewing low-confidence results.' },
    ],
  },
  government: {
    introTitle: 'Public services should be simple to use.',
    intro: [
      'Citizens still queue, print forms and wait weeks for answers. Staff juggle paper files, ageing desktop systems and growing case backlogs, all under strict rules on accessibility, privacy and transparency.',
      'We build accessible digital services and caseworker tools that cut waiting times, plus AI assistants that help staff find answers and summarise cases, always with clear audit trails and human decisions.',
    ],
    stack: ['Accessible web (WCAG)', 'Digital identity', 'Case management', 'Payments', 'Document AI', 'On-prem & gov cloud', 'Audit trails'],
    process: [
      { title: 'Understand users', desc: 'Research with citizens and staff, including people with accessibility needs.' },
      { title: 'Design the service', desc: 'Prototype the end-to-end service and test it with real users before building.' },
      { title: 'Build and integrate', desc: 'Connect to existing registers, payment and identity systems.' },
      { title: 'Launch in phases', desc: 'Start with a private beta, then open to the public once it is proven.' },
      { title: 'Improve continuously', desc: 'Use feedback and analytics to keep improving after launch.' },
    ],
    examples: [
      { icon: '🏗️', title: 'Building permit portal', desc: 'Online applications, plan uploads, fee payment and inspection booking in one service.' },
      { icon: '🗂️', title: 'Caseworker workspace', desc: 'One screen with case history, documents, tasks and an AI summary of long files.' },
      { icon: '💬', title: 'Citizen help assistant', desc: 'Answers common questions from official guidance and hands off to staff when needed.' },
      { icon: '🎓', title: 'Grant application service', desc: 'Eligibility checks, online applications and payment tracking for funding schemes.' },
    ],
    faq: [
      { q: 'Can AI make decisions about citizens?', a: 'We design AI to assist staff, for example by summarising or checking documents. Decisions about people stay with authorised officers.' },
      { q: 'Do you support on-premises hosting?', a: 'Yes. We can deploy to government cloud, private cloud or your own data centres.' },
    ],
  },
  manufacturing: {
    introTitle: 'The shop floor still runs on paper.',
    intro: [
      'Inspections, maintenance logs and shift handovers often live on clipboards and spreadsheets. ERP systems hold the master data but rarely fit the way frontline teams actually work.',
      'We build mobile, offline-capable apps for the floor that connect straight to your ERP and MES, then add AI that spots quality issues, summarises shifts and answers operators’ questions.',
    ],
    stack: ['SAP / Dynamics / Oracle', 'MES integration', 'Offline mobile', 'IoT data', 'Computer vision', 'Power BI', 'Azure / AWS'],
    process: [
      { title: 'Walk the floor', desc: 'Observe how inspections, maintenance and handovers happen today.' },
      { title: 'Prototype on a tablet', desc: 'Put a working app in operators’ hands within weeks and collect feedback.' },
      { title: 'Connect ERP and MES', desc: 'Sync work orders, assets and quality data with your core systems.' },
      { title: 'Roll out by line or plant', desc: 'Start with one line or plant, train teams and measure results.' },
      { title: 'Add intelligence', desc: 'Layer in predictive alerts, vision checks and AI summaries.' },
    ],
    examples: [
      { icon: '✅', title: 'Digital quality checklist', desc: 'Guided inspections with photos and automatic non-conformance reports.' },
      { icon: '🛠️', title: 'Maintenance mobile app', desc: 'Technicians receive, update and close work orders offline, synced to the ERP.' },
      { icon: '📦', title: 'Supplier collaboration portal', desc: 'Suppliers confirm orders, upload certificates and resolve quality issues.' },
      { icon: '🧾', title: 'AI shift summary', desc: 'End-of-shift reports drafted automatically from production and incident data.' },
    ],
    faq: [
      { q: 'Can apps run on rugged devices?', a: 'Yes. We build for rugged tablets and handhelds, including barcode scanning and camera use.' },
      { q: 'Do we need IoT sensors to start?', a: 'No. Most projects start with digitising manual processes; sensor data can be added later.' },
    ],
  },
  healthcare: {
    introTitle: 'Clinicians should spend time with patients, not paperwork.',
    intro: [
      'Booking an appointment is still a phone call for many patients, and clinicians spend hours each day on documentation, referrals and forms.',
      'We build patient-facing apps and secure staff tools that remove admin, connect to clinical systems through healthcare standards, and use AI carefully, always with clinician review.',
    ],
    stack: ['HL7 / FHIR', 'EHR integration', 'Patient apps', 'Secure messaging', 'Document AI', 'HIPAA-aligned controls', 'Azure / AWS'],
    process: [
      { title: 'Shadow the care team', desc: 'Understand clinical and admin workflows before designing anything.' },
      { title: 'Design with patients', desc: 'Test journeys with patients of different ages and abilities.' },
      { title: 'Integrate safely', desc: 'Connect to EHR and scheduling systems using healthcare standards.' },
      { title: 'Pilot in one service', desc: 'Launch with one clinic or department and measure the impact.' },
      { title: 'Expand across sites', desc: 'Roll out to more services once results are proven.' },
    ],
    examples: [
      { icon: '📅', title: 'Self-scheduling app', desc: 'Patients book, change and cancel appointments online with reminders.' },
      { icon: '📝', title: 'Visit note assistant', desc: 'Drafts structured notes from clinician input for review and sign-off.' },
      { icon: '🔁', title: 'Referral tracker', desc: 'Digital referrals with status tracking replace fax and email.' },
      { icon: '🛏️', title: 'Bed management board', desc: 'Real-time view of bed status, discharges and admissions for operations teams.' },
    ],
    faq: [
      { q: 'Is AI allowed to diagnose patients?', a: 'No. Our AI supports admin and documentation tasks; clinical judgement always stays with qualified staff.' },
      { q: 'Can you work with our existing EHR?', a: 'Yes, through standards such as HL7 and FHIR or the vendor’s APIs.' },
    ],
  },
  'energy-utilities': {
    introTitle: 'Critical infrastructure needs reliable digital tools.',
    intro: [
      'Field crews work in remote locations with patchy signal, customers want instant updates during outages, and regulators expect detailed records of every inspection.',
      'We build offline-first field apps, customer self-service and inspection tools that connect to asset, GIS and billing systems, with AI to prioritise work and summarise findings.',
    ],
    stack: ['Offline-first mobile', 'GIS integration', 'Asset management', 'Billing systems', 'SMS & push alerts', 'Computer vision', 'Cloud & on-prem'],
    process: [
      { title: 'Ride along with crews', desc: 'See how field work is planned, done and recorded today.' },
      { title: 'Design offline-first', desc: 'Make sure every key task works without connectivity.' },
      { title: 'Connect core systems', desc: 'Integrate asset, GIS, work management and billing.' },
      { title: 'Pilot with one depot', desc: 'Prove the app with one team before wider rollout.' },
      { title: 'Scale and automate', desc: 'Add AI prioritisation and automatic reporting.' },
    ],
    examples: [
      { icon: '🧰', title: 'Crew work-order app', desc: 'Jobs, maps, safety checks and sign-off on one offline mobile app.' },
      { icon: '📸', title: 'Pole and line inspections', desc: 'Guided inspections with photos, GPS and automatic defect reports.' },
      { icon: '📢', title: 'Outage notifications', desc: 'Affected customers get proactive updates until service is restored.' },
      { icon: '🏠', title: 'Move-in / move-out service', desc: 'Customers start or stop service online without calling.' },
    ],
    faq: [
      { q: 'What happens if a device loses connection mid-job?', a: 'Work is saved on the device and synced automatically once a connection returns.' },
      { q: 'Can you meet our security requirements for critical infrastructure?', a: 'Yes. We follow your security standards, support on-premises hosting and test every release.' },
    ],
  },
  retail: {
    introTitle: 'Online and in-store should feel like one shop.',
    intro: [
      'Shoppers move between app, website and store and expect the same prices, stock and service everywhere. Store teams need fast tools, not more paperwork.',
      'We build customer apps, store tools and AI shopping assistants that connect to your commerce, POS and ERP systems, so every channel works from the same data.',
    ],
    stack: ['Commerce platforms', 'POS integration', 'Loyalty engines', 'Mobile apps', 'Product search AI', 'ERP integration', 'Analytics'],
    process: [
      { title: 'Map the customer journey', desc: 'Follow shoppers across channels to find friction.' },
      { title: 'Prototype the experience', desc: 'Test new app or store flows with real customers and staff.' },
      { title: 'Connect commerce data', desc: 'Integrate products, stock, orders and loyalty.' },
      { title: 'Launch in pilot stores', desc: 'Roll out to a few stores or a customer segment first.' },
      { title: 'Grow with data', desc: 'Use analytics and testing to keep improving conversion.' },
    ],
    examples: [
      { icon: '💳', title: 'Loyalty app', desc: 'Points, personal offers and digital receipts in one branded app.' },
      { icon: '↩️', title: 'Returns portal', desc: 'Self-service returns with label printing and instant refund status.' },
      { icon: '📋', title: 'Store task manager', desc: 'Head office sends tasks and audits to stores and tracks completion.' },
      { icon: '🛍️', title: 'Product Q&A assistant', desc: 'Answers sizing, compatibility and stock questions from your catalogue.' },
    ],
    faq: [
      { q: 'Can you handle peak trading periods?', a: 'Yes. We design and load-test for seasonal peaks such as sales events and holidays.' },
      { q: 'Will the assistant recommend products we don’t stock?', a: 'No. It is grounded in your own catalogue and stock data.' },
    ],
  },
  education: {
    introTitle: 'Students expect campus services on their phone.',
    intro: [
      'Admissions, fees, timetables and support requests are often spread across separate systems and inboxes. Staff spend time answering the same questions again and again.',
      'We build student portals, admissions workflows and AI assistants grounded in your own course and policy content, connected to your student, learning and finance systems.',
    ],
    stack: ['SIS integration', 'LMS integration', 'Student portals', 'Payments', 'Knowledge AI', 'SSO', 'Mobile apps'],
    process: [
      { title: 'Listen to students and staff', desc: 'Find the most common pain points in campus services.' },
      { title: 'Design the portal', desc: 'Prototype one front door for key services and test it.' },
      { title: 'Connect campus systems', desc: 'Integrate SIS, LMS, finance and identity.' },
      { title: 'Launch for a cohort', desc: 'Start with one intake or faculty, then expand.' },
      { title: 'Add AI support', desc: 'Introduce assistants for common student questions.' },
    ],
    examples: [
      { icon: '📨', title: 'Online admissions', desc: 'Applications, document checks and offer letters managed end to end.' },
      { icon: '🎒', title: 'Student mobile app', desc: 'Timetables, grades, fees and campus news in one app.' },
      { icon: '📚', title: 'Course question assistant', desc: 'Answers questions about modules, deadlines and policies at any hour.' },
      { icon: '🏢', title: 'Facilities request service', desc: 'Students and staff report and track facility issues.' },
    ],
    faq: [
      { q: 'Can students sign in with their existing campus account?', a: 'Yes. We connect to your identity provider for single sign-on.' },
      { q: 'Does the assistant replace student services staff?', a: 'No. It handles routine questions and passes complex cases to staff with context.' },
    ],
  },

  // ── Business goals ──────────────────────────────────────────────────────────
  'ai-accelerated-engineering': {
    introTitle: 'AI changes how fast good software gets built.',
    intro: [
      'AI coding assistants can draft code, tests and documentation in seconds, but without discipline they also produce inconsistent, insecure or unmaintainable systems.',
      'We combine AI tools with senior engineers, reusable components and automated quality gates. You get the speed of AI with the reliability of a proper engineering process.',
    ],
    stack: ['AI coding assistants', 'Component libraries', 'Automated testing', 'Static analysis', 'CI/CD', '.NET / Java / React', 'Low-code platforms'],
    process: [
      { title: 'Capture requirements', desc: 'Turn workshops and documents into clear user stories and data models.' },
      { title: 'Generate the foundation', desc: 'Use AI to scaffold screens, APIs and tests as a starting point.' },
      { title: 'Engineer and review', desc: 'Senior engineers refine, review and harden every change.' },
      { title: 'Test automatically', desc: 'Automated test suites and security scans run on every commit.' },
      { title: 'Release often', desc: 'Small, frequent releases keep feedback loops short.' },
    ],
    examples: [
      { icon: '⚡', title: 'Prototype in two weeks', desc: 'A clickable, data-backed prototype of a new internal tool for user testing.' },
      { icon: '🧪', title: 'Test coverage boost', desc: 'AI-generated tests that raise coverage on a legacy codebase before changes.' },
      { icon: '📘', title: 'Living documentation', desc: 'Documentation generated and kept up to date from the code itself.' },
      { icon: '🧱', title: 'Shared component kit', desc: 'A reusable library that speeds up every new app in the portfolio.' },
    ],
    faq: [
      { q: 'Which AI tools do you use?', a: 'We use leading AI coding assistants and adapt to tools your organisation has already approved.' },
      { q: 'Does AI-assisted delivery cost less?', a: 'It usually shortens timelines, which reduces cost, while reviews and testing keep quality the same.' },
    ],
  },
  'faster-it-delivery': {
    introTitle: 'The business is waiting on IT.',
    intro: [
      'Most IT teams have a backlog that never shrinks. Releases are slow and risky, technical debt piles up, and business teams start building their own unofficial tools.',
      'We help IT deliver more, more often, through modular architecture, automation, governed self-service for business users and extra delivery capacity when you need it.',
    ],
    stack: ['CI/CD pipelines', 'Infrastructure as code', 'Microservices', 'Low-code', 'Monitoring', 'Agile delivery', 'Code quality tools'],
    process: [
      { title: 'Assess delivery health', desc: 'Measure lead time, release frequency and failure rate today.' },
      { title: 'Fix the bottlenecks', desc: 'Automate builds, tests and deployments where they hurt most.' },
      { title: 'Restructure for change', desc: 'Split tightly coupled systems into modules that change independently.' },
      { title: 'Enable the business', desc: 'Give business users safe templates and guardrails for simple apps.' },
      { title: 'Track the gains', desc: 'Report improvements in speed and stability over time.' },
    ],
    examples: [
      { icon: '🚦', title: 'Release pipeline rebuild', desc: 'Moved a team from monthly manual releases to automated weekly ones.' },
      { icon: '📦', title: 'Monolith split', desc: 'Pulled a frequently changed module out into its own service.' },
      { icon: '🏛️', title: 'Low-code centre of excellence', desc: 'Standards and templates so business teams can build safely.' },
      { icon: '👥', title: 'Dedicated delivery squad', desc: 'A cross-functional team working through a priority backlog.' },
    ],
    faq: [
      { q: 'How do you measure improvement?', a: 'We track standard delivery metrics such as lead time, deployment frequency, change failure rate and recovery time.' },
      { q: 'Can you work alongside our in-house team?', a: 'Yes. Most engagements are blended teams with knowledge transfer built in.' },
    ],
  },
  'process-automation': {
    introTitle: 'Too much work still happens in inboxes.',
    intro: [
      'Requests arrive by email, get tracked in spreadsheets and move between people by forwarding. Nobody knows exactly where a case is or why it is late.',
      'We turn those processes into tracked digital workflows and add AI agents to handle the routine steps, so people spend their time on exceptions and judgement.',
    ],
    stack: ['Workflow engines', 'Document AI', 'AI agents', 'Business rules', 'ERP / CRM integration', 'Dashboards', 'Email & Teams integration'],
    process: [
      { title: 'Measure the process', desc: 'Map steps, volumes, wait times and rework in the current process.' },
      { title: 'Redesign the flow', desc: 'Remove unnecessary steps before automating anything.' },
      { title: 'Automate the routine', desc: 'Workflows and agents take over repetitive steps.' },
      { title: 'Keep people in control', desc: 'Exceptions and approvals route to the right person.' },
      { title: 'Track the savings', desc: 'Dashboards show cycle time and hours saved.' },
    ],
    examples: [
      { icon: '🧾', title: 'Invoice processing', desc: 'Invoices read, matched to orders and routed for approval automatically.' },
      { icon: '👋', title: 'Employee onboarding', desc: 'Accounts, equipment and training tasks triggered from one request.' },
      { icon: '🛒', title: 'Purchase approvals', desc: 'Multi-level approvals with budgets checked automatically.' },
      { icon: '🖥️', title: 'IT request agent', desc: 'Password resets and access requests resolved without a ticket queue.' },
    ],
    faq: [
      { q: 'Which processes should we automate first?', a: 'High-volume, rule-based processes with clear inputs, such as invoices or onboarding, usually deliver the fastest return.' },
      { q: 'Can automation work with email?', a: 'Yes. Agents can read incoming emails and attachments and start the right workflow.' },
    ],
  },
  'digital-customer-journeys': {
    introTitle: 'Customers judge you by your digital experience.',
    intro: [
      'A confusing form or a slow app sends customers to competitors or to your contact centre. Most frustrations come from journeys that weren’t designed end to end.',
      'We research, design and build customer journeys across web, mobile and chat, connected to the systems behind them, so customers can get things done without calling.',
    ],
    stack: ['UX research', 'Design systems', 'React / mobile', 'Conversational AI', 'CRM integration', 'Analytics', 'A/B testing'],
    process: [
      { title: 'Research', desc: 'Interviews, analytics and complaint data reveal where customers struggle.' },
      { title: 'Design', desc: 'Prototype the new journey and test it with real customers.' },
      { title: 'Build', desc: 'Develop the journey and connect it to core systems.' },
      { title: 'Launch', desc: 'Release gradually and watch the data closely.' },
      { title: 'Optimise', desc: 'Test improvements and keep raising completion rates.' },
    ],
    examples: [
      { icon: '📝', title: 'Application redesign', desc: 'A long application form rebuilt as a short, guided mobile journey.' },
      { icon: '🌐', title: 'Customer self-service portal', desc: 'Top contact-centre requests moved online.' },
      { icon: '💬', title: 'Website assistant', desc: 'Answers questions and completes simple tasks around the clock.' },
      { icon: '🔀', title: 'Shared customer timeline', desc: 'Staff see every interaction across channels in one place.' },
    ],
    faq: [
      { q: 'How do you know a new journey is better?', a: 'We agree success metrics up front, such as completion rate or call volume, and measure before and after.' },
      { q: 'Can you work with our brand guidelines?', a: 'Yes. We build on your brand and turn it into a reusable design system.' },
    ],
  },
  'application-modernization': {
    introTitle: 'Old systems hold the business back.',
    intro: [
      'Legacy applications still run critical processes, but they are costly to change, hard to staff and difficult to connect to modern apps and AI.',
      'We modernise step by step: understanding the old system, opening it up through APIs, then replacing parts one at a time while the business keeps running.',
    ],
    stack: ['Code analysis AI', 'API gateways', '.NET / Java', 'Cloud migration', 'Data migration tools', 'Containers', 'Automated testing'],
    process: [
      { title: 'Assess', desc: 'Inventory applications, code and dependencies, and score them by value and risk.' },
      { title: 'Plan', desc: 'Choose to retain, wrap, rebuild or retire each part, and sequence the work.' },
      { title: 'Open up', desc: 'Expose legacy functions and data through modern APIs.' },
      { title: 'Replace in slices', desc: 'Rebuild one module at a time and switch over gradually.' },
      { title: 'Retire safely', desc: 'Migrate remaining data and switch off the old system.' },
    ],
    examples: [
      { icon: '🏚️', title: 'Desktop to web', desc: 'An old desktop application rebuilt as a modern web app with the same data.' },
      { icon: '🔌', title: 'Mainframe API layer', desc: 'Mainframe functions exposed as APIs for new digital channels.' },
      { icon: '☁️', title: 'Data centre to cloud', desc: 'Applications moved to the cloud with minimal downtime.' },
      { icon: '📘', title: 'Legacy code documentation', desc: 'AI-assisted documentation of undocumented business rules before rebuilding.' },
    ],
    faq: [
      { q: 'How do you avoid downtime?', a: 'Old and new run side by side, and traffic moves over gradually with rollback ready.' },
      { q: 'What if nobody understands the old code?', a: 'We use AI-assisted code analysis and interviews with users to recover the business rules.' },
    ],
  },

  // ── Platform capabilities ───────────────────────────────────────────────────
  'app-development': {
    introTitle: 'Great apps start with understanding users.',
    intro: [
      'Most failed apps were built to a feature list, not to how people actually work. They end up unused, worked around or rebuilt within a few years.',
      'We start with research and prototypes, then build responsive web and mobile apps on a shared design system, connected to your systems and ready to grow.',
    ],
    stack: ['React', 'Next.js', 'Flutter', 'React Native', 'Swift / Kotlin', 'Low-code', 'Figma', 'REST & GraphQL'],
    process: [
      { title: 'Discover', desc: 'Interviews and workshops to understand users, goals and constraints.' },
      { title: 'Design', desc: 'Wireframes, visual design and a clickable prototype tested with users.' },
      { title: 'Build', desc: 'Short sprints with demos every two weeks.' },
      { title: 'Test', desc: 'Automated, manual, accessibility and performance testing.' },
      { title: 'Launch & grow', desc: 'App store release, analytics and a roadmap for what comes next.' },
    ],
    examples: [
      { icon: '🌐', title: 'Customer portal', desc: 'Account management, requests and documents for thousands of customers.' },
      { icon: '📲', title: 'Field team app', desc: 'Offline mobile app with camera, GPS and signature capture.' },
      { icon: '🧑‍💼', title: 'Internal operations tool', desc: 'Replaces spreadsheets with a fast, role-based web app.' },
      { icon: '🤖', title: 'App with built-in assistant', desc: 'An AI helper that answers questions and fills in forms for users.' },
    ],
    faq: [
      { q: 'Do you publish apps to the App Store and Google Play?', a: 'Yes. We handle store submission, review requirements and release management.' },
      { q: 'How much does an app cost?', a: 'It depends on scope and integrations. A discovery phase gives you a clear estimate before the main build.' },
    ],
  },
  'workflow-automation': {
    introTitle: 'Every business runs on processes.',
    intro: [
      'Approvals, requests and case handling often depend on email and memory. Work gets lost, deadlines slip and nobody can see the full picture.',
      'We model your processes as digital workflows with clear owners, deadlines and rules, and let AI agents handle routine steps so people focus on the decisions.',
    ],
    stack: ['BPM / workflow engines', 'Low-code', 'Decision tables', 'AI agents', 'Email & Teams', 'ERP / CRM', 'Dashboards'],
    process: [
      { title: 'Map', desc: 'Document how the process really runs today.' },
      { title: 'Simplify', desc: 'Remove waste and agree the target process.' },
      { title: 'Model', desc: 'Build the workflow with rules, SLAs and roles.' },
      { title: 'Automate', desc: 'Connect systems and add agents for routine tasks.' },
      { title: 'Monitor', desc: 'Track performance and keep improving.' },
    ],
    examples: [
      { icon: '✅', title: 'Contract approval flow', desc: 'Contracts routed by value and type, with reminders and audit trail.' },
      { icon: '📥', title: 'Shared service desk', desc: 'One intake for HR, finance and facilities requests.' },
      { icon: '⏱️', title: 'Complaint handling', desc: 'Complaints tracked against regulatory deadlines with escalation.' },
      { icon: '🤖', title: 'Agent-assisted triage', desc: 'Incoming requests classified and routed by an AI agent.' },
    ],
    faq: [
      { q: 'Can workflows span several systems?', a: 'Yes. Workflows call APIs, update records and wait for events across your systems.' },
      { q: 'What happens to cases already in progress when we change a workflow?', a: 'Workflows are versioned, so existing cases finish on the version they started with.' },
    ],
  },
  'data-integration': {
    introTitle: 'Disconnected systems slow everything down.',
    intro: [
      'When systems don’t talk to each other, people copy data by hand, reports disagree and every new app needs its own one-off integration.',
      'We build a reusable integration layer of APIs, events and data pipelines, so systems stay in sync and new apps and AI agents plug in quickly.',
    ],
    stack: ['REST & GraphQL', 'API gateways', 'Kafka', 'ETL / ELT', 'Data warehouses', 'Vector databases', 'MCP'],
    process: [
      { title: 'Inventory', desc: 'List systems, data flows and existing interfaces.' },
      { title: 'Design', desc: 'Define reusable APIs, events and data ownership.' },
      { title: 'Build', desc: 'Implement integrations with testing and monitoring.' },
      { title: 'Secure', desc: 'Add authentication, authorisation and encryption.' },
      { title: 'Reuse', desc: 'Publish APIs in a catalogue so teams can find and reuse them.' },
    ],
    examples: [
      { icon: '🔗', title: 'Customer 360 API', desc: 'One API combining customer data from CRM, billing and support.' },
      { icon: '📨', title: 'Order event stream', desc: 'Orders published as events so warehouse, finance and CRM react instantly.' },
      { icon: '📊', title: 'Reporting data pipeline', desc: 'Nightly batch replaced by near-real-time data for dashboards.' },
      { icon: '📚', title: 'AI knowledge index', desc: 'Policies and manuals indexed so agents answer with sources.' },
    ],
    faq: [
      { q: 'Do we need a new integration platform?', a: 'Not necessarily. We often build on the tools you already own and add only what is missing.' },
      { q: 'How do AI agents use these integrations?', a: 'Agents call the same secure APIs as apps, with the same permissions and logging.' },
    ],
  },
  'security-governance': {
    introTitle: 'Security has to be designed in, not added later.',
    intro: [
      'Every new app and AI agent is a new way into your data. Bolting security on at the end leads to delays, gaps and audit findings.',
      'We build security and governance into every sprint: identity, permissions, logging, testing and AI guardrails, documented so audits go smoothly.',
    ],
    stack: ['SSO / OAuth / OIDC', 'MFA', 'Role-based access', 'Audit logging', 'SAST / DAST', 'Secrets management', 'AI guardrails'],
    process: [
      { title: 'Assess risk', desc: 'Identify sensitive data, threats and compliance needs.' },
      { title: 'Design controls', desc: 'Define access, logging and AI guardrails up front.' },
      { title: 'Build securely', desc: 'Secure coding, reviews and automated scanning in every sprint.' },
      { title: 'Test', desc: 'Penetration and AI misuse testing before release.' },
      { title: 'Monitor', desc: 'Ongoing monitoring, alerting and regular reviews.' },
    ],
    examples: [
      { icon: '🔐', title: 'Single sign-on rollout', desc: 'All internal apps moved to one identity provider with MFA.' },
      { icon: '🧱', title: 'AI guardrail layer', desc: 'Filters and limits applied to every agent’s inputs and actions.' },
      { icon: '🧾', title: 'Audit trail service', desc: 'Central, searchable log of user and agent actions.' },
      { icon: '🔍', title: 'Secure pipeline', desc: 'Code and dependency scanning added to every build.' },
    ],
    faq: [
      { q: 'How do you test AI agents for security?', a: 'We run misuse tests such as prompt injection and data-leakage attempts, and fix issues before release.' },
      { q: 'Which compliance frameworks do you support?', a: 'Our delivery practices align with HIPAA, GDPR and PCI DSS, and we adapt to your internal policies.' },
    ],
  },
  'cloud-devops': {
    introTitle: 'Production is where software earns its keep.',
    intro: [
      'Manual deployments, unclear monitoring and surprise cloud bills turn every release into a risk and every outage into a scramble.',
      'We set up cloud foundations, automated pipelines and monitoring so releases are routine, problems are caught early and costs stay predictable.',
    ],
    stack: ['Azure', 'AWS', 'Google Cloud', 'Kubernetes', 'Terraform', 'GitHub Actions / Azure DevOps', 'Grafana / OpenTelemetry'],
    process: [
      { title: 'Baseline', desc: 'Review current environments, pipelines, monitoring and costs.' },
      { title: 'Foundation', desc: 'Set up secure landing zones and infrastructure as code.' },
      { title: 'Automate', desc: 'Build pipelines for build, test and deployment.' },
      { title: 'Observe', desc: 'Add logs, metrics, traces and alerts.' },
      { title: 'Optimise', desc: 'Tune performance and cost continuously.' },
    ],
    examples: [
      { icon: '☁️', title: 'Cloud landing zone', desc: 'Secure, compliant cloud foundation ready for new workloads.' },
      { icon: '🔁', title: 'Zero-downtime releases', desc: 'Blue/green deployments with automatic rollback.' },
      { icon: '📡', title: 'Unified monitoring', desc: 'One dashboard for app, infrastructure and AI model health.' },
      { icon: '💸', title: 'Cloud cost reduction', desc: 'Right-sizing and scheduling that cut wasted spend.' },
    ],
    faq: [
      { q: 'Can you migrate our apps to the cloud?', a: 'Yes. We plan migrations app by app, choosing to rehost, replatform or rebuild based on value.' },
      { q: 'Do you provide 24/7 support?', a: 'We offer managed operations with agreed response times; coverage is tailored to your needs.' },
    ],
  },

  // ── Technologies ────────────────────────────────────────────────────────────
  dotnet: {
    introTitle: '.NET powers a huge share of enterprise systems.',
    intro: [
      'Many organisations run critical systems on .NET, some on older .NET Framework versions that are harder to host, secure and staff.',
      'Our .NET engineers build new services on modern .NET, upgrade older applications step by step and connect them to Azure, Microsoft 365 and AI services.',
    ],
    stack: ['C#', 'ASP.NET Core', 'Entity Framework', 'Blazor', 'Azure Functions', 'SQL Server', 'xUnit'],
    process: [
      { title: 'Review', desc: 'Code health, architecture and dependency review.' },
      { title: 'Plan', desc: 'Agree priorities: new features, upgrades or refactoring.' },
      { title: 'Build', desc: 'Clean, tested code delivered in short sprints.' },
      { title: 'Deploy', desc: 'Automated pipelines to Azure, containers or on-premises.' },
      { title: 'Support', desc: 'Ongoing maintenance and performance tuning.' },
    ],
    examples: [
      { icon: '⬆️', title: 'Framework upgrade', desc: 'A .NET Framework app moved to modern .NET with no change for users.' },
      { icon: '🔧', title: 'API platform', desc: 'ASP.NET Core APIs serving web and mobile front ends.' },
      { icon: '⚡', title: 'Serverless processing', desc: 'Azure Functions handling document and event processing.' },
      { icon: '🧠', title: 'AI-enabled .NET app', desc: 'An existing system extended with search and assistant features.' },
    ],
    faq: [
      { q: 'How long does a .NET upgrade take?', a: 'It depends on size and dependencies; an assessment gives a reliable estimate and phased plan.' },
      { q: 'Can .NET work with non-Microsoft tools?', a: 'Yes. Modern .NET is cross-platform and integrates with most databases, clouds and services.' },
    ],
  },
  java: {
    introTitle: 'Java remains the backbone of high-volume systems.',
    intro: [
      'Banks, telecoms and retailers rely on Java for systems that handle millions of transactions. Many of those systems are now monoliths that are hard to change.',
      'Our Java engineers build scalable Spring Boot services, event-driven platforms and cloud-native deployments, and modernise older Java estates safely.',
    ],
    stack: ['Java 17 / 21', 'Spring Boot', 'Kafka', 'Kubernetes', 'PostgreSQL', 'JUnit', 'Gradle / Maven'],
    process: [
      { title: 'Assess', desc: 'Architecture, performance and code quality review.' },
      { title: 'Design', desc: 'Target architecture and migration path.' },
      { title: 'Build', desc: 'Services built and tested in short iterations.' },
      { title: 'Scale', desc: 'Containerised deployment with autoscaling.' },
      { title: 'Operate', desc: 'Monitoring, tuning and ongoing support.' },
    ],
    examples: [
      { icon: '📨', title: 'Event-driven order platform', desc: 'Kafka-based services processing orders in real time.' },
      { icon: '🧩', title: 'Monolith decomposition', desc: 'High-change modules extracted into independent services.' },
      { icon: '⬆️', title: 'Java version upgrade', desc: 'Legacy Java apps moved to a current LTS release.' },
      { icon: '⚡', title: 'Performance tuning', desc: 'Profiling and caching that removed peak-time slowdowns.' },
    ],
    faq: [
      { q: 'Do you support Spring and Jakarta EE?', a: 'Yes. We work with Spring Boot and Jakarta EE, and help migrate between them.' },
      { q: 'Can you run Java on any cloud?', a: 'Yes. We deploy to Azure, AWS, Google Cloud and on-premises Kubernetes.' },
    ],
  },
  'low-code': {
    introTitle: 'Low-code delivers fast, if it is engineered properly.',
    intro: [
      'Low-code platforms let teams build apps in a fraction of the time. Without architecture and standards, though, portfolios become hard to maintain.',
      'Our certified low-code developers combine platform speed with real engineering: reusable modules, integration patterns, testing and governance.',
    ],
    stack: ['Enterprise low-code platforms', 'Microsoft Power Platform', 'Custom code extensions', 'REST APIs', 'SQL databases', 'CI/CD'],
    process: [
      { title: 'Choose the platform', desc: 'Match the platform to your needs, skills and licensing.' },
      { title: 'Set the architecture', desc: 'Define module structure, reuse and standards.' },
      { title: 'Build quickly', desc: 'Deliver working features every sprint.' },
      { title: 'Integrate', desc: 'Connect to your core systems and data.' },
      { title: 'Enable your team', desc: 'Train your developers to continue independently.' },
    ],
    examples: [
      { icon: '🚀', title: 'Customer portal in weeks', desc: 'A secure portal launched far faster than traditional development.' },
      { icon: '🗂️', title: 'Case management system', desc: 'Workflow-heavy internal app built and extended by a small team.' },
      { icon: '🏛️', title: 'Centre of excellence', desc: 'Standards and reviews for a growing low-code portfolio.' },
      { icon: '🩺', title: 'Portfolio health check', desc: 'Review of existing apps for performance, security and reuse.' },
    ],
    faq: [
      { q: 'Will we be locked in to a low-code vendor?', a: 'We design clean integrations and documentation so you keep flexibility, and we discuss lock-in openly when choosing a platform.' },
      { q: 'Can low-code apps scale?', a: 'Yes, with proper architecture. Enterprise platforms run large, high-traffic applications.' },
    ],
  },
  'python-ai': {
    introTitle: 'Python is the language of practical AI.',
    intro: [
      'Most AI and machine-learning tools are built for Python. The hard part is not running a model, but building reliable services around it that work with your data.',
      'Our data and AI engineers build retrieval systems, predictive models and agent services in Python, with testing, monitoring and security built in.',
    ],
    stack: ['Python', 'FastAPI', 'PyTorch / scikit-learn', 'LangChain / LlamaIndex', 'Vector databases', 'MLflow', 'Docker'],
    process: [
      { title: 'Frame the problem', desc: 'Define the question, success metric and available data.' },
      { title: 'Explore the data', desc: 'Check quality, coverage and privacy constraints.' },
      { title: 'Build and evaluate', desc: 'Train or configure models and measure them on real cases.' },
      { title: 'Productionise', desc: 'Wrap models in secure, monitored services.' },
      { title: 'Monitor and retrain', desc: 'Watch for drift and keep models accurate.' },
    ],
    examples: [
      { icon: '📚', title: 'Policy question answering', desc: 'Staff ask questions and get answers with links to the source documents.' },
      { icon: '📈', title: 'Demand forecast', desc: 'Weekly forecasts that improve stock planning.' },
      { icon: '🧾', title: 'Invoice extraction service', desc: 'Data pulled from invoices of many formats into structured records.' },
      { icon: '🤖', title: 'Agent tool server', desc: 'Python services exposing safe tools for AI agents to call.' },
    ],
    faq: [
      { q: 'Which AI models do you use?', a: 'We are model-agnostic and choose between commercial and open-source models based on quality, cost and data rules.' },
      { q: 'How do you know the AI is accurate enough?', a: 'We build evaluation sets from your real data and agree accuracy targets before going live.' },
    ],
  },
};
