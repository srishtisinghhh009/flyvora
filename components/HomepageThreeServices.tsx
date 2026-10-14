import React from 'react';
import { Compass, Building, Car, ArrowRight, Sparkles, ShieldCheck, Check } from 'lucide-react';

interface HomepageThreeServicesProps {
  onOpenTourDiscovery: () => void;
  onScrollToHotels: () => void;
  onScrollToTaxi: () => void;
}

export const HomepageThreeServices: React.FC<HomepageThreeServicesProps> = ({
  onOpenTourDiscovery,
  onScrollToHotels,
  onScrollToTaxi
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-50 text-[#FF5500] border border-orange-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Travel Offerings</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
          Three Ways Flyvora Powers Your Indian Journey
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Whether you need an end-to-end guided holiday, a heritage palace stay, or a private intercity cab, explore Flyvora's three primary travel services.
        </p>
      </div>

      {/* 3 Distinct Visual Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        
        {/* PILLAR 1: TOURS & PACKAGES */}
        <div className="group relative bg-white rounded-3xl border border-purple-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1">
          {/* Card Accent Header */}
          <div className="h-2 bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD]" />
          
          <div className="p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#7B2CBF] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-purple-50 text-[#7B2CBF] border border-purple-200">
                Signature Packages
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900 font-display group-hover:text-[#7B2CBF] transition-colors">
                Tours & Packages
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Discover curated multi-day trips and authentic travel itineraries across 30+ Indian states with private chauffeured cars, boutique stays, and verified guides.
              </p>
            </div>

            {/* Inclusions list */}
            <div className="space-y-2 pt-2 border-t border-purple-100/70 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7B2CBF] shrink-0" />
                <span>Dedicated private AC chauffeur throughout</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7B2CBF] shrink-0" />
                <span>Handpicked 4-star & heritage haveli stays</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7B2CBF] shrink-0" />
                <span>Golden Triangle, Kerala, Kashmir & Yatras</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-7 pt-0">
            <button
              onClick={onOpenTourDiscovery}
              className="w-full py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] hover:from-[#6a22a6] hover:to-[#8c3ecc] rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Explore Tour Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PILLAR 2: HOTELS & STAYS */}
        <div className="group relative bg-white rounded-3xl border border-blue-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1">
          {/* Card Accent Header */}
          <div className="h-2 bg-gradient-to-r from-[#0088FF] to-[#00A3FF]" />
          
          <div className="p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#0088FF] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <Building className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-blue-50 text-[#0088FF] border border-blue-200">
                Verified Stays
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900 font-display group-hover:text-[#0088FF] transition-colors">
                Hotels & Stays
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Explore handpicked accommodation options from 250-year-old Rajput fortresses to tranquil backwater houseboats and alpine Himalayan cedar retreats.
              </p>
            </div>

            {/* Inclusions list */}
            <div className="space-y-2 pt-2 border-t border-blue-100/70 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0088FF] shrink-0" />
                <span>Rajput fortresses, Oberoi & Taj properties</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0088FF] shrink-0" />
                <span>Agra, Delhi, Rishikesh, Mussoorie & Varanasi</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0088FF] shrink-0" />
                <span>Transparent nightly rates with room tiers</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-7 pt-0">
            <button
              onClick={onScrollToHotels}
              className="w-full py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-[#0088FF] to-[#00A3FF] hover:from-[#0077e6] hover:to-[#0092e6] rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Find Hotels & Stays</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PILLAR 3: TAXI & TRANSPORT */}
        <div className="group relative bg-white rounded-3xl border border-orange-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1">
          {/* Card Accent Header */}
          <div className="h-2 bg-gradient-to-r from-[#FF5500] via-[#FF7700] to-[#FF3D00]" />
          
          <div className="p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#FF5500] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <Car className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-orange-50 text-[#FF5500] border border-orange-200">
                Chauffeur Cabs
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900 font-display group-hover:text-[#FF5500] transition-colors">
                Taxi & Transport
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Arrange reliable one-way drops, round-trip highway getaways, airport transfers, and full-day city sightseeing with commercial permit vehicles.
              </p>
            </div>

            {/* Inclusions list */}
            <div className="space-y-2 pt-2 border-t border-orange-100/70 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span>Sedan, SUV, Innova Crysta & Luxury Vans</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span>Airport pickups across DEL, BOM, BLR & COK</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span>Zero surge pricing with all toll estimates</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-7 pt-0">
            <button
              onClick={onScrollToTaxi}
              className="w-full py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-[#FF5500] via-[#FF7700] to-[#FF3D00] hover:from-[#e64d00] hover:to-[#e63700] rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Book a Taxi & Transfers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};
