import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Sparkles, X } from 'lucide-react';

const initialMessages = [
  { id: 1, type: 'bot', text: "Namaste! I'm CivicBot, your Indian Election Assistant. How can I help you today?" }
];

const qaPairs = {
  "registration": "To register, visit voters.eci.gov.in (NVSP portal). You'll need Form 6 for a new registration. You must be 18 or older as of the qualifying date.",
  "documents": "Commonly accepted documents include Aadhaar Card, PAN Card, Driving License, Indian Passport, or Bank Passbook with a photograph.",
  "polling": "On polling day, take your Voter ID (EPIC) or any other approved ID proof to your polling station. You can find your polling booth on the ECI Voter Helpline App.",
  "evm": "Electronic Voting Machines (EVMs) are secure, stand-alone machines. Each vote is recorded electronically, and a VVPAT slip is generated for you to verify your choice.",
  "results": "Results are declared on the date announced by the ECI, usually a few days after the final phase of polling. You can track live results on results.eci.gov.in.",
  "default": "That's a great question! I recommend checking the official Election Commission of India website (eci.gov.in) for the most accurate and up-to-date information."
};

const ChatBot = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Mock bot response
    setTimeout(() => {
      let botText = qaPairs.default;
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('register') || lowerInput.includes('apply')) botText = qaPairs.registration;
      else if (lowerInput.includes('document') || lowerInput.includes('id')) botText = qaPairs.documents;
      else if (lowerInput.includes('polling') || lowerInput.includes('vote') || lowerInput.includes('station')) botText = qaPairs.polling;
      else if (lowerInput.includes('evm') || lowerInput.includes('machine')) botText = qaPairs.evm;
      else if (lowerInput.includes('result') || lowerInput.includes('winner')) botText = qaPairs.results;

      const botMessage = { id: Date.now() + 1, type: 'bot', text: botText };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <section id="assistant" className="chatbot-section">
      <div className="container">
        <div className="section-header">
          <h2>Ask <span>CivicBot</span></h2>
          <p>Instant answers to your questions about the election process.</p>
        </div>

        <div className="chat-container card">
          <div className="chat-header">
            <div className="bot-info">
              <div className="bot-avatar">
                <Bot size={24} color="white" />
              </div>
              <div>
                <h4>CivicBot</h4>
                <div className="online-indicator">
                  <span className="dot"></span> Online
                </div>
              </div>
            </div>
            <Sparkles size={20} color="var(--accent)" />
          </div>

          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message-wrapper ${msg.type}`}>
                <div className="message-icon">
                  {msg.type === 'bot' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className="message-text">
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message-wrapper bot">
                <div className="message-icon"><Bot size={16} /></div>
                <div className="message-text typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <div className="quick-replies">
              <button onClick={() => setInput("How to register?")}>How to register?</button>
              <button onClick={() => setInput("Documents needed")}>Documents needed</button>
              <button onClick={() => setInput("How EVMs work?")}>How EVMs work?</button>
            </div>
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Ask me anything..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className="send-btn" onClick={handleSend} disabled={!input.trim() || isTyping}>
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default ChatBot;
