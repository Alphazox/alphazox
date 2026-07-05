import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

interface Message {
  from: 'user' | 'bot';
  text: string;
}

const QUICK_QUESTIONS = [
  'What services do you offer?',
  'Tell me about GCC services',
  'RPA & Automation details',
  'Cloud & DevOps capabilities',
  'Generative AI offerings',
  'Contact information'
];

// ── Local knowledge-base (no server needed) ──────────────────────────────────
function getBotReply(message: string): string {
  const q = message.toLowerCase();

  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return "Hello! I'm **Alpha**, ALPHAZOX's virtual assistant. How can I help you transform your business today? Ask me about our 45 services, GCCs, careers, or how to reach us.";
  }
  if (q.includes('service') || q.includes('what do you do') || q.includes('offerings') || q.includes('45')) {
    return "ALPHAZOX offers **45 comprehensive services** across 9 practice areas:\n\n" +
      "1. **Core IT** — Custom App Dev, DevOps, Cloud, Data Science\n" +
      "2. **Enterprise** — SAP, Microsoft Services\n" +
      "3. **Professional** — Talent Augmentation, Managed Services\n" +
      "4. **Customer Support** — Tech Support, Virtual Assistants\n" +
      "5. **Financial** — Bookkeeping, Payroll, Tax, MIS Reporting\n" +
      "6. **Infrastructure** — IT Security, GCC, Expense Mgmt\n" +
      "7. **Digital Integration** — RPA, IDP, API Mgmt, EDI\n" +
      "8. **Digital Marketing** — Web Services, SEO, Analytics\n" +
      "9. **Low-Code & AI** — Generative AI, Cloud Engineering";
  }
  if (q.includes('rpa') || q.includes('automation') || q.includes('uipath')) {
    return "ALPHAZOX drives efficiency through **RPA & Intelligent Document Processing**. We support **UiPath, Power Automate, Blue Prism, and Automation Anywhere** — from Bot Development and Process Mining to building Centers of Excellence (COE).";
  }
  if (q.includes('gcc') || q.includes('global capability') || q.includes('india')) {
    return "ALPHAZOX is a premier partner for **Global Capability Centers (GCCs)**. We offer **GCC-as-a-Service** — helping global companies set up in India with regulatory compliance, office setup (2M+ sq.ft Tier 1 workspace), talent acquisition, and our **Zero Surprise Framework** for operations.";
  }
  if (q.includes('cloud') || q.includes('devops') || q.includes('azure') || q.includes('aws')) {
    return "Our **Cloud & DevOps** services deliver cloud-native scalability. We partner with **AWS, Azure, and Google Cloud** for strategy, architecture, and migration. We also set up automated CI/CD pipelines and 24/7 SLA-driven container orchestration (Docker/Kubernetes).";
  }
  if (q.includes('data science') || q.includes('ai') || q.includes('generative') || q.includes('ml')) {
    return "ALPHAZOX unlocks data value through **Advanced Analytics, ML, and Generative AI**. Our **ALPHAZOX Innovation Labs** offers the **Rapid60 program** — kickstart your Gen AI journey in 60 days with custom virtual assistants, semantic search, and document intelligence.";
  }
  if (q.includes('sap')) {
    return "Our **SAP Services** team provides end-to-end intelligent enterprise solutions: SAP S/4HANA consulting, implementation, cloud transformation, advanced analytics, and process automation — all delivered on time and on budget by our certified team.";
  }
  if (q.includes('financial') || q.includes('bookkeeping') || q.includes('accounting') || q.includes('payroll') || q.includes('tax')) {
    return "ALPHAZOX provides comprehensive **Financial Management**: Bookkeeping (50+ certified professionals, 40–50% cost savings), Payroll Processing, MIS Reporting, Controller Services, Tax Services with IRS audit defense, and E-Commerce Integrations.";
  }
  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('office') || q.includes('address')) {
    return "Reach **ALPHAZOX** at:\n\n" +
      "📍 **US**: Charlotte, North Carolina | +1-732-947-4608\n" +
      "📍 **Visakhapatnam**: Near Andhra University, AP – 530003\n" +
      "📍 **Hyderabad**: Near Knowledge City, Telangana – 500081\n" +
      "📧 **Email**: support@alphazox.com\n\n" +
      "Or fill in the **Contact** form on our website!";
  }
  if (q.includes('career') || q.includes('job') || q.includes('apply') || q.includes('work') || q.includes('hire')) {
    return "We're always looking for talent at ALPHAZOX! We foster a **performance-driven culture** with equal growth opportunities. Visit our **Careers** page to see open positions and submit your CV.";
  }
  if (q.includes('security') || q.includes('surveillance') || q.includes('monitor')) {
    return "Our **Remote Video Monitoring & e-Surveillance** solutions are powered by **VDO Intel**, using AI computer vision for safety automation — 24/7 live monitoring, solar-powered surveillance for remote sites, and service lane monitoring.";
  }
  if (q.includes('microsoft') || q.includes('power platform') || q.includes('.net')) {
    return "As a **Microsoft Gold Partner**, ALPHAZOX delivers Azure, .NET, and Power Platform integrations. Our certified engineers keep up with the latest Microsoft roadmap — from Dynamics 365 and Power BI to Teams, SharePoint, and Azure AI.";
  }
  if (q.includes('price') || q.includes('cost') || q.includes('quote') || q.includes('budget')) {
    return "Pricing depends on the scope and scale of your project. We offer flexible engagement models — fixed price, time & material, and dedicated teams. Use our **Get A Quote** page for a tailored estimate, or contact us directly!";
  }

  return "Thank you for asking! **ALPHAZOX** is a trusted digital transformation partner with 45 services across 9 practice areas. We specialize in custom software, cloud engineering, RPA, AI/ML, financial management, and global operations.\n\nTry asking about: services, GCC, cloud, automation, careers, or contact details!";
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: "👋 Hi there! I'm **Alpha**, ALPHAZOX's virtual assistant.\n\nHow can I help you today? Ask me about our services, GCCs, careers, or anything else about ALPHAZOX!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim() || loading) return;
    setMessages(prev => [...prev, { from: 'user', text }]);
    setInput('');
    setLoading(true);
    // Simulate a brief typing delay
    setTimeout(() => {
      const reply = getBotReply(text);
      setMessages(prev => [...prev, { from: 'bot', text: reply }]);
      setLoading(false);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage(input);
  };

  // Format bold markdown **text**
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <span key={i}>
          {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        className={`chatbot-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open ALPHAZOX Chat Assistant"
        id="chatbot-trigger-btn"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        )}
        <span className="trigger-pulse"></span>
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`} id="chatbot-window">
        {/* Header */}
        <div className="chatbot-header">
          <div className="bot-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
          </div>
          <div className="bot-info">
            <h4>Alpha</h4>
            <span className="bot-status">● Online</span>
          </div>
          <button className="chatbot-close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.from}`}>
              {msg.from === 'bot' && (
                <div className="bot-msg-avatar">A</div>
              )}
              <div className="message-bubble">
                {formatText(msg.text)}
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat-message bot">
              <div className="bot-msg-avatar">A</div>
              <div className="message-bubble typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <div className="quick-questions">
          {QUICK_QUESTIONS.map((q, i) => (
            <button key={i} className="quick-q-btn" onClick={() => sendMessage(q)}>
              {q}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="chatbot-input-area">
          <input
            type="text"
            className="chatbot-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            disabled={loading}
            id="chatbot-input"
          />
          <button
            className="chatbot-send-btn"
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
    </>
  );
};
