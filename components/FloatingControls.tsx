import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, ArrowUp, Bot, Sparkles, MessageCircle } from 'lucide-react';

interface FloatingControlsProps {
  onOpenPluto: () => void;
  onOpenContactModal: () => void;
  isPlutoOpen: boolean;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  onOpenPluto,
  onOpenContactModal,
  isPlutoOpen
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5">
      
      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="w-10 h-10 rounded-full bg-white text-slate-700 shadow-md border border-slate-200/80 hover:bg-slate-50 transition-all flex items-center justify-center hover:-translate-y-0.5 active:translate-y-0"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* WhatsApp / Direct Support Trigger */}
      <button
        onClick={onOpenContactModal}
        aria-label="Direct travel support enquiry"
        className="w-10 h-10 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-all flex items-center justify-center hover:scale-105 active:scale-95"
        title="WhatsApp & Specialist Contact"
      >
        <MessageCircle className="w-5 h-5" />
      </button>

      {/* Pluto AI Assistant Trigger */}
      {!isPlutoOpen && (
        <button
          onClick={onOpenPluto}
          aria-label="Open Pluto Travel Assistant"
          className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-slate-950 to-slate-900 text-white shadow-xl hover:shadow-2xl border border-slate-700 hover:border-orange-500 transition-all hover:scale-105 active:scale-95"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FF5500] to-[#FFAA00] flex items-center justify-center text-white shrink-0 shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold tracking-wide pr-1 hidden sm:inline-block">
            Ask Pluto
          </span>
          {/* Subtle notification badge */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF5500]"></span>
          </span>
        </button>
      )}

    </div>
  );
};
