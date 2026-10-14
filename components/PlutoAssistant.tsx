import React, { useState, useRef, useEffect } from 'react';
import { PLUTO_SUGGESTED_PROMPTS, findPlutoAnswer, PlutoQAPair } from '../data/plutoData';
import { PageTab } from '../types';
import { Bot, Send, X, Minimize2, Sparkles, User, ArrowRight, CornerDownRight, RotateCcw } from 'lucide-react';

interface PlutoAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: PageTab) => void;
}

interface ChatMessage {
  id: string;
  sender: 'pluto' | 'user';
  text: string;
  actionText?: string;
  actionTab?: string;
  suggestions?: string[];
  timestamp: string;
}

export const PlutoAssistant: React.FC<PlutoAssistantProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'pluto',
      text: "Namaste! I am Pluto, your Flyvora travel planning assistant. I can recommend destinations across 30+ Indian states, outline day-by-day itineraries, explain hotel & tour options, and help you project your trip budget.",
      suggestions: PLUTO_SUGGESTED_PROMPTS.slice(0, 3),
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate intelligent query processing delay
    setTimeout(() => {
      const match = findPlutoAnswer(query);

      const botMsg: ChatMessage = {
        id: `pluto-${Date.now()}`,
        sender: 'pluto',
        text: match.answer,
        actionText: match.actionText,
        actionTab: match.actionTab,
        suggestions: match.relatedSuggestions,
        timestamp: 'Just now'
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'pluto',
        text: "Conversation cleared. How can I assist with your India journey today?",
        suggestions: PLUTO_SUGGESTED_PROMPTS.slice(0, 4),
        timestamp: 'Just now'
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[540px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
      
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF5500] to-[#FF7700] flex items-center justify-center text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold flex items-center gap-1.5">
              <span>Pluto</span>
              <span className="text-[10px] font-normal text-orange-300 bg-white/10 px-1.5 py-0.5 rounded">
                Travel Guide
              </span>
            </div>
            <div className="text-[11px] text-slate-300">
              India discovery & itinerary helper
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            title="Close Assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Message History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'pluto' && (
              <div className="w-6 h-6 rounded-lg bg-orange-100 text-[#FF5500] flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}

            <div className={`space-y-2 max-w-[85%] ${
              msg.sender === 'user'
                ? 'bg-slate-900 text-white rounded-2xl rounded-tr-xs p-3.5'
                : 'bg-white border border-slate-200/90 text-slate-800 rounded-2xl rounded-tl-xs p-3.5 shadow-xs'
            }`}>
              <div className="whitespace-pre-line leading-relaxed">
                {msg.text}
              </div>

              {/* Action Button if available */}
              {msg.actionText && msg.actionTab && (
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      onNavigateTab(msg.actionTab as PageTab);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3D00] rounded-lg shadow-xs hover:from-[#e64d00]"
                  >
                    <span>{msg.actionText}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Suggested Follow-up Prompts */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 block">Suggested:</span>
                  <div className="flex flex-col gap-1">
                    {msg.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(sug)}
                        className="text-left text-[11px] text-[#0088FF] hover:text-[#0066cc] hover:underline flex items-start gap-1 py-0.5"
                      >
                        <CornerDownRight className="w-3 h-3 mt-0.5 shrink-0" />
                        <span>{sug}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-6 h-6 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <div className="w-6 h-6 rounded-lg bg-orange-100 text-[#FF5500] flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask Pluto anything about traveling in India..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#FF5500] focus:bg-white"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="p-2.5 rounded-xl bg-gradient-to-r from-[#FF5500] to-[#FF3D00] text-white hover:from-[#e64d00] disabled:opacity-50 disabled:cursor-not-allowed shadow-xs transition-colors shrink-0"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Subtle architecture notice */}
      <div className="px-3 py-1 bg-slate-100 text-[10px] text-slate-500 text-center border-t border-slate-200/60">
        Local curated assistant prototype · LLM backend ready
      </div>

    </div>
  );
};
