import React, { useState, useEffect } from 'react';
import { TOURS } from '../data/tours';
import { X, Sparkles, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

interface TourPackageFloatingTeaserProps {
  onOpenTourDiscovery: () => void;
  canShow?: boolean;
}

export const TourPackageFloatingTeaser: React.FC<TourPackageFloatingTeaserProps> = ({
  onOpenTourDiscovery,
  canShow = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    try {
      return sessionStorage.getItem('flyvora_tour_teaser_dismissed') === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    if (isDismissed || !canShow) return;

    const handleScroll = () => {
      // Trigger after reasonable scroll threshold (350px)
      if (window.scrollY > 350) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Also check on mount if user already scrolled
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed, canShow]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    try {
      sessionStorage.setItem('flyvora_tour_teaser_dismissed', 'true');
    } catch (e) {
      // ignore
    }
  };

  if (!isVisible || isDismissed) return null;

  const featuredTour = TOURS[0]; // Royal Golden Triangle
  const secondTour = TOURS[1]; // Kerala Backwaters

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-30 max-w-[360px] sm:max-w-[400px] w-full animate-in fade-in slide-in-from-bottom-6 duration-300">
      <div className="relative bg-white/95 backdrop-blur-md rounded-2xl border border-purple-200/90 shadow-2xl overflow-hidden hover:shadow-purple-500/10 transition-shadow">
        
        {/* Top hairline brand gradient */}
        <div className="h-1 bg-gradient-to-r from-[#FF5500] via-[#0088FF] to-[#7B2CBF]" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          aria-label="Close tour package recommendation"
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Visual Header with Image */}
        <div className="relative h-28 overflow-hidden bg-slate-900">
          <img
            src={featuredTour?.image || '/assets/images/dest_rajasthan_heritage_1791892028463.jpg'}
            alt="Signature Tour Packages"
            className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
          
          <div className="absolute bottom-2.5 left-3.5 right-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#7B2CBF] text-white shadow-xs">
              <Sparkles className="w-2.5 h-2.5" />
              Signature Tour Packages
            </span>
            <h4 className="text-sm font-bold text-white font-display leading-tight drop-shadow-sm mt-0.5">
              Find Your Perfect Getaway
            </h4>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-3.5 space-y-2.5">
          <p className="text-xs text-slate-600 line-clamp-2">
            Explore handcrafted pan-India itineraries with private chauffeured transport, boutique heritage stays, and verified guides.
          </p>

          {/* Quick Package Highlights */}
          <div className="space-y-1.5 pt-0.5">
            {featuredTour && (
              <div 
                onClick={() => { handleDismiss(); onOpenTourDiscovery(); }}
                className="flex items-center justify-between p-2 rounded-xl bg-purple-50/60 hover:bg-purple-100/60 border border-purple-100 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Compass className="w-3.5 h-3.5 text-[#7B2CBF] shrink-0" />
                  <div className="truncate">
                    <span className="text-xs font-semibold text-slate-800 truncate group-hover:text-[#7B2CBF] block">
                      {featuredTour.title}
                    </span>
                    <span className="text-[10px] text-purple-700 font-medium">{featuredTour.duration}</span>
                  </div>
                </div>
                <div className="text-right shrink-0 pl-2">
                  <span className="text-[11px] font-bold text-[#7B2CBF]">₹{featuredTour.pricePerPerson.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-400 block leading-none">/ person</span>
                </div>
              </div>
            )}

            {secondTour && (
              <div 
                onClick={() => { handleDismiss(); onOpenTourDiscovery(); }}
                className="flex items-center justify-between p-2 rounded-xl bg-blue-50/60 hover:bg-blue-100/60 border border-blue-100 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Compass className="w-3.5 h-3.5 text-[#0088FF] shrink-0" />
                  <div className="truncate">
                    <span className="text-xs font-semibold text-slate-800 truncate group-hover:text-[#0088FF] block">
                      {secondTour.title}
                    </span>
                    <span className="text-[10px] text-blue-700 font-medium">{secondTour.duration}</span>
                  </div>
                </div>
                <div className="text-right shrink-0 pl-2">
                  <span className="text-[11px] font-bold text-[#0088FF]">₹{secondTour.pricePerPerson.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-400 block leading-none">/ person</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => {
                handleDismiss();
                onOpenTourDiscovery();
              }}
              className="flex-1 py-2 px-3 text-xs font-bold text-white bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] hover:from-[#6a24a6] hover:to-[#8c3ecc] rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
            >
              <span>Explore All Tour Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleDismiss}
              className="px-2.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Later
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-0.5">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Zero Booking Fees · Free Customization Advice</span>
          </div>

        </div>

      </div>
    </div>
  );
};
