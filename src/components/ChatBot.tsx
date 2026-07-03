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

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: "👋 Hi there! I'm **Astia**, Astikos' virtual assistant.\n\nHow can I help you today? You can ask me about our services, GCCs, careers, or anything else about Astikos IT Solutions!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { from: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      const botReply: Message = {
        from: 'bot',
        text: data.success ? data.reply : "I'm having trouble responding right now. Please try again!"
      };
      setMessages(prev => [...prev, botReply]);
    } catch {
      setMessages(prev => [...prev, { from: 'bot', text: "Connection error. Please make sure the server is running." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage(input);
  };

  // Format bold markdown
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
        aria-label="Open Astikos Chat Assistant"
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
            <h4>Astia</h4>
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
