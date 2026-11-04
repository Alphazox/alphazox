import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { JOBS, SITE } from '../data/content';
import './ChatBot.css';

type Msg = { from: 'bot' | 'user'; text: string };

const GREETING = "Hi, I'm Alpha, the ALPHAZOX assistant. Ask me anything about our services, industries, open roles or how to reach us.";
const SUGGESTIONS = ['What do you build?', 'What is an AI agent?', 'Current job openings', 'Contact details'];

// ─── Offline fallback ─────────────────────────────────────────────────────────
// Used only when the AI service (/api/chat) is unavailable, so the widget still says something useful.

// Word-boundary match so short keywords like "ai" or "hi" don't fire inside other words.
const has = (q: string, ...words: string[]) => words.some(w => new RegExp(`\\b${w}`, 'i').test(q));

function localReply(q: string): string {
  if (has(q, 'career', 'job', 'hiring', 'apply', 'opening', 'vacanc', 'role')) {
    return `We currently have ${JOBS.length} open roles:\n${JOBS.map(j => `• ${j.title} (${j.location})`).join('\n')}\nApply on the Careers page (/careers).`;
  }
  if (has(q, 'contact', 'phone', 'email', 'office', 'address', 'call')) {
    return `Email: ${SITE.email}\nIndia: ${SITE.phoneIndia}\nUSA: ${SITE.phoneUS}\nOur delivery center is near Siripuram, Visakhapatnam. Austin and Hyderabad advisors meet by appointment. See /contact.`;
  }
  if (has(q, 'agent', 'agentic', 'ai', 'llm', 'copilot')) {
    return 'An AI agent understands a request, plans the steps and acts across your systems, like triaging a claim or routing an approval. We build agents with role-based access, audit trails, guardrails and human approval for high-impact actions. See /agentic-ai.';
  }
  if (has(q, 'build', 'service', 'offer', 'what do you')) {
    return 'We design, build and run:\n• AI agents & automated workflows\n• Customer portals and mobile apps\n• Core systems like lending, claims and field service\n• Internal tools like onboarding, case management and ITSM\n• Legacy modernization and integrations';
  }
  return `I can't reach my knowledge service right now. Please email ${SITE.email} or use the Contact page (/contact), and our team will reply within one business day.`;
}

// ─── Rendering ────────────────────────────────────────────────────────────────
// Turns site paths (/careers, /platform/cloud-devops) and the email address in replies into links.

const LINKABLE = /((?<=^|[\s(])\/(?:agentic-ai|platform|solutions|industries|about|careers|contact)(?:\/[a-z0-9-]+)?|[\w.+-]+@[\w-]+\.[a-z.]{2,})/gi;

function renderText(text: string, onNavigate: () => void) {
  return text.split(LINKABLE).map((part, i) => {
    if (i % 2 === 0) return part;
    if (part.includes('@')) return <a key={i} href={`mailto:${part}`}>{part}</a>;
    return <Link key={i} to={part} onClick={onNavigate}>{part}</Link>;
  });
}

async function askAssistant(history: Msg[]): Promise<string> {
  const messages = history.slice(1).map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    const data = await res.json().catch(() => null);
    if (data?.success && data.reply) return data.reply;
    if (data?.error && !data.fallback) return data.error;
  } catch {
    // Network error: fall through to the offline answer.
  }
  return localReply(messages[messages.length - 1].content);
}

export const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'bot', text: GREETING }]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing, open]);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || typing) return;
    const next = [...msgs, { from: 'user' as const, text: question.slice(0, 1000) }];
    setMsgs(next);
    setInput('');
    setTyping(true);
    const answer = await askAssistant(next);
    setMsgs(m => [...m, { from: 'bot', text: answer }]);
    setTyping(false);
    inputRef.current?.focus();
  };

  return (
    <div className={`chat ${open ? 'chat-open' : ''}`}>
      {open && (
        <div className="chat-panel glass" role="dialog" aria-label="ALPHAZOX assistant">
          <div className="chat-head">
            <span className="chat-avatar">α</span>
            <div>
              <strong>Alpha</strong>
              <span className="chat-status">● Online · AI assistant</span>
            </div>
            <button className="chat-x" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </div>
          <div className="chat-body" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`chat-msg ${m.from}`}>
                {m.from === 'bot' ? renderText(m.text, () => setOpen(false)) : m.text}
              </div>
            ))}
            {typing && <div className="chat-msg bot typing" aria-label="Alpha is typing"><span /><span /><span /></div>}
            <div ref={endRef} />
          </div>
          {msgs.length <= 1 && (
            <div className="chat-suggest">
              {SUGGESTIONS.map(s => <button key={s} onClick={() => send(s)}>{s}</button>)}
            </div>
          )}
          <form className="chat-input" onSubmit={e => { e.preventDefault(); send(input); }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything about ALPHAZOX…"
              aria-label="Message"
              maxLength={1000}
            />
            <button type="submit" aria-label="Send" disabled={typing || !input.trim()}>↑</button>
          </form>
          <p className="chat-note">AI answers can be wrong. For anything important, contact our team.</p>
        </div>
      )}
      <button className="chat-fab" onClick={() => setOpen(!open)} aria-label={open ? 'Close chat' : 'Open chat'}>
        {open ? '✕' : 'α'}
      </button>
    </div>
  );
};
