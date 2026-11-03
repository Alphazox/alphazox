import React, { useEffect, useRef, useState } from 'react';
import { SITE } from '../data/content';
import './ChatBot.css';

type Msg = { from: 'bot' | 'user'; text: string };

const SUGGESTIONS = ['What do you build?', 'What is an AI agent?', 'Legacy modernization', 'Contact details'];

// Word-boundary match so short keywords like "ai" or "hi" don't fire inside other words.
const has = (q: string, ...words: string[]) => words.some(w => new RegExp(`\\b${w}`, 'i').test(q));

function reply(q: string): string {
  if (has(q, 'agent', 'agentic', 'ai', 'llm', 'copilot')) {
    return 'An AI agent understands a request, plans the steps and acts across your systems, like triaging a claim or routing an approval. We build agents with role-based access, audit trails, guardrails and human approval for high-impact actions. See the Agentic AI page, or ask us for an Agent Opportunity Assessment.';
  }
  if (has(q, 'build', 'service', 'offer', 'what do you')) {
    return 'We design, build and run:\n• AI agents & automated workflows\n• Customer portals and mobile apps\n• Core systems like lending, claims and field service\n• Internal tools like onboarding, case management and ITSM\n• Legacy modernization and integrations';
  }
  if (has(q, 'legacy', 'moderni', 'migrat')) {
    return 'We modernize step by step: wrapping legacy cores with APIs and new interfaces, or replacing them module by module, so the business keeps running throughout.';
  }
  if (has(q, 'industr', 'bank', 'insur', 'health', 'government', 'retail', 'manufactur')) {
    return 'We work across financial services, insurance, government, manufacturing, healthcare, energy, retail and education. See the Industries page for examples.';
  }
  if (has(q, 'secur', 'govern', 'complian', 'hipaa', 'gdpr', 'pci')) {
    return 'Governance is built in: SSO and role-based access, full audit trails, guardrails, data-residency choices, and delivery practices aligned with HIPAA, GDPR and PCI DSS.';
  }
  if (has(q, 'price', 'cost', 'budget', 'quote', 'demo')) {
    return 'Every engagement starts with a free 30-minute discovery call. Use the "Book a demo" button and we will scope one high-value use case with you.';
  }
  if (has(q, 'career', 'job', 'hiring', 'apply')) {
    return 'We are hiring! Visit the Careers page to see open roles and apply with your CV.';
  }
  if (has(q, 'contact', 'phone', 'email', 'office', 'address', 'call')) {
    return `Email: ${SITE.email}\nIndia: ${SITE.phoneIndia}\nUSA: ${SITE.phoneUS}\nAustin and Hyderabad advisors meet by appointment; our delivery center is in Visakhapatnam.`;
  }
  if (has(q, 'hello', 'hi', 'hey')) {
    return 'Hello! Ask me about AI agents, what we build, industries, security or how to reach us.';
  }
  return 'I can help with AI agents, what we build, legacy modernization, industries, security, careers or contact details. Or book a demo to talk with our team.';
}

export const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: 'bot', text: "Hi, I'm Alpha, the ALPHAZOX assistant. How can I help?" },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing, open]);

  const send = (text: string) => {
    if (!text.trim() || typing) return;
    setMsgs(m => [...m, { from: 'user', text }]);
    setInput('');
    setTyping(true);
    window.setTimeout(() => {
      setMsgs(m => [...m, { from: 'bot', text: reply(text) }]);
      setTyping(false);
    }, 650);
  };

  return (
    <div className={`chat ${open ? 'chat-open' : ''}`}>
      {open && (
        <div className="chat-panel glass" role="dialog" aria-label="ALPHAZOX assistant">
          <div className="chat-head">
            <span className="chat-avatar">α</span>
            <div>
              <strong>Alpha</strong>
              <span className="chat-status">● Online</span>
            </div>
            <button className="chat-x" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </div>
          <div className="chat-body">
            {msgs.map((m, i) => (
              <div key={i} className={`chat-msg ${m.from}`}>{m.text}</div>
            ))}
            {typing && <div className="chat-msg bot typing"><span /><span /><span /></div>}
            <div ref={endRef} />
          </div>
          <div className="chat-suggest">
            {SUGGESTIONS.map(s => <button key={s} onClick={() => send(s)}>{s}</button>)}
          </div>
          <form className="chat-input" onSubmit={e => { e.preventDefault(); send(input); }}>
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask anything…" aria-label="Message" />
            <button type="submit" aria-label="Send">↑</button>
          </form>
        </div>
      )}
      <button className="chat-fab" onClick={() => setOpen(!open)} aria-label={open ? 'Close chat' : 'Open chat'}>
        {open ? '✕' : 'α'}
      </button>
    </div>
  );
};
