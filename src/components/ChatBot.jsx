import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  Bot,
  Sparkles,
  Plus,
  MessageSquare,
  Vote,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const initialMessages = [];

// Note: The hardcoded qaPairs have been removed as we are now using Gemini API.

const ChatBot = () => {
  // State for multiple chats
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("civicbot_chats");
    return saved
      ? JSON.parse(saved)
      : [{ id: Date.now(), title: "New Chat", messages: initialMessages }];
  });

  const [activeChatId, setActiveChatId] = useState(chats[0]?.id);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("civicbot_chats", JSON.stringify(chats));
  }, [chats]);

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];
  const messages = activeChat?.messages || [];

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(scrollToBottom, [messages, activeChatId]);

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: initialMessages,
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  const handleDeleteChat = (chatId, e) => {
    e.stopPropagation();
    setChats((prev) => {
      const updated = prev.filter((c) => c.id !== chatId);
      if (updated.length === 0) {
        // Always keep at least one chat
        const newChat = {
          id: Date.now(),
          title: "New Chat",
          messages: initialMessages,
        };
        setActiveChatId(newChat.id);
        return [newChat];
      }
      if (activeChatId === chatId) {
        setActiveChatId(updated[0].id);
      }
      return updated;
    });
  };

  const updateChatMessages = (chatId, newMessages, newTitle = null) => {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: newMessages,
            title: newTitle || chat.title,
          };
        }
        return chat;
      }),
    );
  };

  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), type: "user", text };
    const updatedMessages = [...messages, userMessage];

    // Auto-generate title for "New Chat" on first user message
    let newTitle = activeChat.title;
    if (activeChat.title === "New Chat" && updatedMessages.length === 1) {
      newTitle = text.length > 20 ? text.substring(0, 20) + "..." : text;
    }

    updateChatMessages(activeChatId, updatedMessages, newTitle);
    setInput("");
    setIsTyping(true);

    try {
      // Pass the previous history (excluding the current message we just added) to the API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          history: messages,
          message: text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      const botMessage = { id: Date.now() + 1, type: "bot", text: data.reply };
      updateChatMessages(activeChatId, [...updatedMessages, botMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        type: "bot",
        text: "I'm sorry, I'm having trouble connecting to my servers right now. Please try again later.",
      };
      updateChatMessages(activeChatId, [...updatedMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-app-layout">
      {/* Sidebar */}
      <aside className="chat-sidebar">
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand">
            <Vote className="logo-icon" size={24} color="var(--primary)" />
            <span className="logo-text">
              Elec<span>Guide</span> India
            </span>
          </Link>
          <button className="new-chat-btn" onClick={handleNewChat}>
            <Plus size={18} />
            <span>New chat</span>
          </button>
        </div>

        <div className="chat-history-list">
          <div className="history-group">
            <h5>Recent Chats</h5>
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`history-item-wrapper ${chat.id === activeChatId ? "active" : ""}`}
                onClick={() => setActiveChatId(chat.id)}
              >
                <div className="history-item">
                  <MessageSquare size={16} />
                  <span className="chat-title">{chat.title}</span>
                </div>
                <button
                  className="delete-chat-btn"
                  onClick={(e) => handleDeleteChat(chat.id, e)}
                  title="Delete chat"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-footer">
          <Link to="/" className="back-link">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="chat-main-area">
        <div className="chat-main-header">
          <Link to="/" className="mobile-back-btn">
            <ArrowLeft size={20} />
          </Link>
          <div className="current-bot">
            <span className="bot-name">CivicBot</span>
            <div className="powered-by">
              <img src="/Gemini.svg" alt="Gemini" className="gemini-icon" />
              <span>Powered by Gemini</span>
            </div>
          </div>
        </div>

        <div className="chat-messages-container" ref={messagesContainerRef}>
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-logo">
                <Bot size={48} color="white" />
              </div>
              <h2>Hello, Voter</h2>
              <p>How can I help you today?</p>
            </div>
          ) : (
            <div className="messages-list">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-row ${msg.type}`}>
                  <div className="message-avatar">
                    {msg.type === "bot" ? (
                      <Bot size={20} color="white" />
                    ) : (
                      <User size={20} color="white" />
                    )}
                  </div>
                  <div className="message-content">
                    <div className="message-sender">
                      {msg.type === "bot" ? "CivicBot" : "You"}
                    </div>
                    <div className="message-text markdown-body">
                      {msg.type === "bot" ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.text}
                        </ReactMarkdown>
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="message-row bot">
                  <div className="message-avatar">
                    <Bot size={20} color="white" />
                  </div>
                  <div className="message-content">
                    <div className="message-sender">CivicBot</div>
                    <div className="message-text typing">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="chat-input-wrapper">
          <div className="quick-replies">
            <button onClick={() => handleSend("How to register?")}>
              How to register?
            </button>
            <button onClick={() => handleSend("Documents needed")}>
              Documents needed
            </button>
            <button onClick={() => handleSend("How EVMs work?")}>
              How EVMs work?
            </button>
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              placeholder="Ask CivicBot anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend(input)}
            />
            <button
              className={`send-btn ${input.trim() ? "active" : ""}`}
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isTyping}
            >
              <Send size={18} />
            </button>
          </div>
          <div className="disclaimer">
            CivicBot is an educational assistant and can make mistakes. Please
            verify important information on the official ECI website.
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatBot;
