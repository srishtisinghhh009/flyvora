import React, { useState, useEffect } from 'react';
import { PageTab } from '../types';
import { Bot, X, Sparkles, Compass, Building, Calendar, ArrowRight, MessageSquare } from 'lucide-react';

interface PlutoWelcomePopupProps {
  onOpenFullAssistant: () => void;
  onNavigateTab: (tab: PageTab) => void;
  onDismissed: () => void;
}

export const PlutoWelcomePopup: React.FC<PlutoWelcomePopupProps> = ({
  onOpenFullAssistant,
  onNavigateTab,
  onDismissed
}) => {
  // Stages: 'idle' -> 'animating-orbit' -> 'card-open' -> 'dismissed'
  const [stage, setStage] = useState<'idle' | 'animating-orbit' | 'card-open' | 'dismissed'>('idle');

  useEffect(() => {
    // Check if user has already experienced Pluto welcome in this session
    const seen = sessionStorage.getItem('flyvora_pluto_welcomed');
    if (seen) {
      setStage('dismissed');
      onDismissed();
      return;
    }

    // Step 1: Wait ~2s after page becomes interactive
    const introTimer = setTimeout(() => {
      setStage('animating-orbit');

      // Step 2: Show luminous ring animation for ~1.6s, then open welcome card
      const openCardTimer = setTimeout(() => {
        setStage('card-open');
      }, 1600);

      return () => clearTimeout(openCardTimer);
    }, 2000);

    return () => clearTimeout(introTimer);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('flyvora_pluto_welcomed', 'true');
    setStage('dismissed');
    onDismissed();
  };

  const handleAction = (tab?: PageTab, openChat?: boolean) => {
    handleDismiss();
    if (tab) onNavigateTab(tab);
    if (openChat) onOpenFullAssistant();
  };

  if (stage === 'idle' || stage === 'dismissed') return null;

  return (
    <div className="fixed bottom-24 right-4 sm:right-6 z-50 pointer-events-auto">
      
      {/* Intro Stage: Pluto Icon with Bright White Luminous Orbit Ring */}
      {stage === 'animating-orbit' && (
        <div className="relative flex items-center justify-center animate-in zoom-in-75 duration-300">
          
          {/* Luminous Circular Orbit Trail Container */}
          <div className="relative w-16 h-16 rounded-full flex items-center justify-center">
            
            {/* Smooth continuous luminous orbit light ring */}
            <div className="absolute inset-0 rounded-full border-[2.5px] border-white/20"></div>
            
            {/* Animated revolving luminous bead with glowing light trail */}
            <div className="absolute inset-0 rounded-full animate-pluto-orbit">
              <div className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#ffffff,0_0_24px_#FF8A00] -top-1.5 left-1/2 -translate-x-1/2 absolute"></div>
            </div>

            {/* Pluto Avatar Center with Subtle Radial Glow */}
            <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#FF5500] via-[#FF7700] to-[#FFAA00] text-white flex items-center justify-center shadow-2xl animate-pluto-glow">
              <Bot className="w-7 h-7 drop-shadow-sm" />
            </div>

          </div>

          {/* Floating Micro Message Pill */}
          <div className="absolute -top-8 right-0 whitespace-nowrap bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
            Pluto is ready ✨
          </div>
        </div>
      )}

      {/* Stage: Compact Chat Welcome Card */}
      {stage === 'card-open' && (
        <div className="w-[320px] sm:w-[350px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 flex flex-col">
          
          {/* Card Header with Pluto Branding */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FF5500] to-[#FFAA00] flex items-center justify-center text-white shadow-xs">
                  <Bot className="w-5 h-5" />
                </div>
                {/* Micro orbit trail */}
                <div className="absolute inset-0 rounded-full border border-white/40 animate-pluto-orbit pointer-events-none" />
              </div>

              <div>
                <div className="text-xs font-bold flex items-center gap-1.5">
                  <span>Pluto</span>
                  <span className="text-[9px] font-semibold text-orange-300 bg-white/10 px-1.5 py-0.2 rounded-full">
                    AI Travel Companion
                  </span>
                </div>
                <div className="text-[10px] text-slate-300">
                  India Discovery Concierge
                </div>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              aria-label="Dismiss Pluto welcome"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Card Body */}
          <div className="p-4 space-y-3.5 bg-slate-50/50">
            <p className="text-xs font-medium text-slate-800 leading-relaxed">
              Hey, I'm <strong className="text-[#FF5500]">Pluto</strong>! Where would you like to explore in India today?
            </p>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => handleAction('destinations')}
                className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-orange-50 border border-slate-200/80 hover:border-orange-200 text-xs font-bold text-slate-800 hover:text-[#FF5500] transition-colors flex items-center justify-between group"
              >
                <span className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>Explore Destinations</span>
                </span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#FF5500] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleAction('hotels')}
                className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 text-xs font-bold text-slate-800 hover:text-[#0088FF] transition-colors flex items-center justify-between group"
              >
                <span className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-[#0088FF]" />
                  <span>Find Hotels & Palaces</span>
                </span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#0088FF] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleAction('planner')}
                className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-purple-50 border border-slate-200/80 hover:border-purple-200 text-xs font-bold text-slate-800 hover:text-[#7B2CBF] transition-colors flex items-center justify-between group"
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#7B2CBF]" />
                  <span>Plan a Custom Trip</span>
                </span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#7B2CBF] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleAction(undefined, true)}
                className="w-full text-center py-2 text-xs font-bold text-white bg-slate-900 hover:bg-[#FF5500] rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ask Pluto a Question</span>
              </button>
            </div>

            {/* Footer note */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
              <span>Prototype assistant</span>
              <button
                onClick={handleDismiss}
                className="hover:underline text-slate-500 font-semibold"
              >
                Dismiss for now
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
