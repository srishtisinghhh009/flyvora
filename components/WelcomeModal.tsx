import React, { useState, useEffect } from 'react';
import { PageTab } from '../types';
import { Compass, Sparkles, X, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface WelcomeModalProps {
  onPlanTrip: () => void;
  onExploreDestinations: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  onPlanTrip,
  onExploreDestinations
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check session storage to avoid spamming the user
    const hasSeenWelcome = sessionStorage.getItem('flyvora_seen_welcome_popup');
    if (!hasSeenWelcome) {
      // 2-second gentle delay per prompt specifications
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('flyvora_seen_welcome_popup', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 z-10 p-1.5 text-slate-400 hover:text-slate-800 bg-white/80 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Skip welcome popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Graphic */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-[#FF5500]/90 p-6 text-white relative">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-orange-400 mb-3 border border-white/20">
            <Compass className="w-6 h-6" />
          </div>
          <div className="text-xs font-semibold text-orange-300 uppercase tracking-widest">
            Welcome to Flyvora
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1 font-display">
            Where would you like to explore in India?
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-sm">
            Curated coverage across all 28 states & 8 Union Territories with verified stays and interactive budgets.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="space-y-2.5">
            <button
              onClick={() => {
                handleDismiss();
                onExploreDestinations();
              }}
              className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50/30 text-left transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#FF5500] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-[#FF5500]">
                    Discover Top Indian Destinations
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Filter by mountains, beaches, heritage forts, or temples
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF5500] group-hover:translate-x-1 transition-all" />
            </button>

            <button
              onClick={() => {
                handleDismiss();
                onPlanTrip();
              }}
              className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 text-left transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0088FF] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-[#0088FF]">
                    Build a Custom Trip Itinerary
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Step-by-step day planner with real expense forecasting
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0088FF] group-hover:translate-x-1 transition-all" />
            </button>
          </div>

          {/* Footer note & Skip */}
          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Session-aware · No annoying popups</span>
            </span>
            <button
              onClick={handleDismiss}
              className="text-slate-500 hover:text-slate-800 font-semibold"
            >
              Skip & Browse
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
