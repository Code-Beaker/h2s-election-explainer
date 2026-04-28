import { useState, useRef, useEffect } from "react";
import {
  Send,
  User,
  Bot,
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
  const messages = activeChat?.messages || initialMessages;

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
    <div className="flex h-screen w-screen bg-bg-primary overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-[260px] bg-bg-secondary border-r border-border-main flex-col shrink-0">
        <div className="p-6 flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl text-text-primary no-underline">
            <Vote className="text-primary-main" size={24} />
            <span>Elec<span className="text-primary-main">Guide</span> India</span>
          </Link>
          <button 
            className="flex items-center gap-3 p-3 bg-transparent border border-border-main rounded-md text-text-primary font-medium text-[0.95rem] transition-all hover:bg-bg-tertiary" 
            onClick={handleNewChat}
          >
            <Plus size={18} />
            <span>New chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          <div className="mb-6">
            <h5 className="text-[0.75rem] uppercase tracking-widest text-text-muted mb-3 pl-2 font-semibold">Recent Chats</h5>
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`group w-full flex items-center justify-between p-2 rounded-md mb-1 cursor-pointer text-text-secondary transition-all hover:bg-bg-tertiary hover:text-text-primary ${
                  chat.id === activeChatId ? "bg-bg-tertiary text-text-primary font-medium" : ""
                }`}
                onClick={() => setActiveChatId(chat.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveChatId(chat.id);
                  }
                }}
              >
                <div className="flex items-center gap-3 text-sm truncate flex-1">
                  <MessageSquare size={16} />
                  <span className="truncate">{chat.title}</span>
                </div>
                <button
                  className="opacity-0 group-hover:opacity-100 p-1 text-text-muted hover:text-danger-main hover:bg-danger-main/10 rounded transition-all"
                  onClick={(e) => handleDeleteChat(chat.id, e)}
                  title="Delete chat"
                  aria-label="Delete chat"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-border-main">
          <Link to="/" className="flex items-center gap-3 text-text-secondary hover:text-text-primary text-sm no-underline transition-colors">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative">
        <div className="h-[60px] flex items-center px-6 border-b border-border-main bg-bg-primary/50 backdrop-blur-sm z-10">
          <Link to="/" className="md:hidden mr-4 text-text-secondary hover:text-text-primary">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg text-text-primary">CivicBot</span>
            <div className="flex items-center gap-2 pl-3 ml-3 border-l border-border-main">
              <img src="/Gemini.svg" alt="Gemini" className="w-4 h-4" />
              <span className="text-[0.7rem] text-text-muted font-medium uppercase tracking-wider">Powered by Gemini</span>
            </div>
          </div>
        </div>

        <div 
          className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col space-y-8 scroll-smooth" 
          ref={messagesContainerRef}
        >
          {messages.length === 0 ? (
            <div className="m-auto flex flex-col items-center text-center gap-6 max-w-sm">
              <div className="w-20 h-20 bg-primary-main rounded-2xl flex items-center justify-center shadow-lg shadow-primary-main/20">
                <Bot size={48} className="text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-heading font-bold text-text-primary">Hello, Voter</h2>
                <p className="text-text-secondary leading-relaxed">I&apos;m your Indian Election Assistant. How can I help you today?</p>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl w-full mx-auto flex flex-col gap-8 pb-8">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-4 md:gap-6 ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${
                    msg.type === "bot" ? "bg-primary-main text-white" : "bg-secondary-main text-white"
                  }`}>
                    {msg.type === "bot" ? <Bot size={20} /> : <User size={20} />}
                  </div>
                  <div className={`flex flex-col max-w-[85%] ${msg.type === "user" ? "items-end" : "items-start"}`}>
                    <div className="text-[0.75rem] font-bold text-text-muted mb-1 px-1">
                      {msg.type === "bot" ? "CivicBot" : "You"}
                    </div>
                    <div className={`p-4 rounded-2xl text-[1rem] leading-relaxed ${
                      msg.type === "user" 
                        ? "bg-bg-tertiary text-text-primary rounded-tr-none border border-border-main" 
                        : "text-text-primary"
                    }`}>
                      {msg.type === "bot" ? (
                        <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-bg-tertiary prose-pre:border prose-pre:border-border-main">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-4 md:gap-6 flex-row">
                  <div className="w-9 h-9 rounded-lg bg-primary-main text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Bot size={20} />
                  </div>
                  <div className="flex flex-col items-start max-w-[85%]">
                    <div className="text-[0.75rem] font-bold text-text-muted mb-1 px-1">CivicBot</div>
                    <div className="flex gap-1 p-4 bg-bg-tertiary/50 rounded-2xl rounded-tl-none border border-border-main">
                      <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-4 md:p-8 bg-gradient-to-t from-bg-primary via-bg-primary to-transparent">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {["How to register?", "Documents needed", "How EVMs work?"].map((q) => (
                <button 
                  key={q}
                  onClick={() => handleSend(q)}
                  className="px-4 py-1.5 bg-bg-secondary border border-border-main rounded-full text-xs font-medium text-text-secondary hover:text-text-primary hover:border-border-focus transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
            
            <div className="relative group">
              <input
                type="text"
                placeholder="Ask CivicBot anything about Indian elections..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend(input)}
                className="w-full bg-bg-secondary border border-border-main rounded-xl px-5 py-4 pr-16 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-main/20 focus:border-primary-main transition-all shadow-lg shadow-black/20"
              />
              <button
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-lg transition-all ${
                  input.trim() ? "bg-primary-main text-white shadow-lg shadow-primary-main/30" : "bg-bg-tertiary text-text-muted cursor-not-allowed"
                }`}
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isTyping}
              >
                <Send size={18} />
              </button>
            </div>
            
            <div className="text-[0.7rem] text-center text-text-muted px-4 leading-relaxed">
              CivicBot is an educational assistant and can make mistakes. Please
              verify important information on the official <a href="https://eci.gov.in" target="_blank" rel="noreferrer" className="text-primary-main hover:underline">ECI website</a>.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatBot;
