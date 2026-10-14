import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

interface WhatsAppContactCardProps {
  canShow: boolean; // Only true when Pluto welcome is done/dismissed
  onOpenContactModal: () => void;
}

export const WhatsAppContactCard: React.FC<WhatsAppContactCardProps> = ({
  canShow,
  onOpenContactModal
}) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check session storage
    const dismissed = sessionStorage.getItem('flyvora_whatsapp_card_dismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 280) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    sessionStorage.setItem('flyvora_whatsapp_card_dismissed', 'true');
  };

  if (!canShow || !hasScrolled || isDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-24 right-4 sm:right-6 z-40 max-w-[320px] bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* Top Banner with Travel Image */}
      <div className="relative h-20 bg-slate-900 overflow-hidden">
        <img
          src="/assets/images/dest_kerala_backwaters_1791892057635.jpg"
          alt="Kerala Backwaters"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors cursor-pointer"
          aria-label="Dismiss contact card"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="absolute bottom-2 left-3 right-3 text-white">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Travel Specialist Desk</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-3.5 space-y-2.5 bg-slate-50/60">
        <div>
          <h4 className="text-xs font-bold text-slate-900">
            Need help planning your trip?
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
            Speak directly with a specialist for custom itineraries, heritage stays, and outstation cabs.
          </p>
        </div>

        {/* Action Button: Opens Contact Modal with verified support options */}
        <button
          onClick={() => {
            setIsDismissed(true);
            onOpenContactModal();
          }}
          className="w-full py-2 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Chat on WhatsApp / Contact Us</span>
        </button>

        <div className="text-[9px] text-slate-400 text-center">
          Verified Flyvora Concierge Desk · Working hours: 9:30 AM – 7:30 PM IST
        </div>
      </div>

    </div>
  );
};
