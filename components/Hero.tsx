import React from 'react';
import { PageTab } from '../types';
import { 
  Compass, 
  Building, 
  Briefcase, 
  Car, 
  Calendar, 
  BookOpen, 
  Map, 
  PieChart, 
  Sun, 
  Flame, 
  Mountain, 
  Users, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Star
} from 'lucide-react';

interface HeroProps {
  onSelectCategory: (category: string) => void;
  setActiveTab: (tab: PageTab) => void;
  onScrollToDiscovery: () => void;
  onOpenTourDiscovery?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectCategory,
  setActiveTab,
  onScrollToDiscovery,
  onOpenTourDiscovery
}) => {
  // 12 Travel Service Tiles per CHANGE 2
  const serviceTiles = [
    {
      id: 'destinations',
      title: 'Explore Destinations',
      desc: '30+ States & UTs',
      icon: Compass,
      color: 'from-[#FF5500] to-[#FF7700]',
      bgColor: 'bg-orange-50 text-[#FF5500] border-orange-100',
      action: () => setActiveTab('destinations')
    },
    {
      id: 'hotels',
      title: 'Hotels & Stays',
      desc: 'Heritage & Palaces',
      icon: Building,
      color: 'from-[#0088FF] to-[#00A3FF]',
      bgColor: 'bg-blue-50 text-[#0088FF] border-blue-100',
      action: () => setActiveTab('hotels')
    },
    {
      id: 'tours',
      title: 'Tour Packages',
      desc: 'Curated Itineraries',
      icon: Briefcase,
      color: 'from-[#7B2CBF] to-[#9D4EDD]',
      bgColor: 'bg-purple-50 text-[#7B2CBF] border-purple-100',
      action: () => {
        if (onOpenTourDiscovery) {
          onOpenTourDiscovery();
        } else {
          setActiveTab('tours');
        }
      }
    },
    {
      id: 'transport',
      title: 'Taxi & Transfers',
      desc: 'Transparent Fares',
      icon: Car,
      color: 'from-emerald-600 to-teal-500',
      bgColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      action: () => setActiveTab('transport')
    },
    {
      id: 'planner',
      title: 'Trip Planner',
      desc: 'Custom Day Builder',
      icon: Calendar,
      color: 'from-[#FF3D00] to-[#FF6B00]',
      bgColor: 'bg-rose-50 text-[#FF3D00] border-rose-100',
      action: () => setActiveTab('planner')
    },
    {
      id: 'guides',
      title: 'Travel Guides',
      desc: 'Culture & Packing',
      icon: BookOpen,
      color: 'from-cyan-600 to-blue-500',
      bgColor: 'bg-cyan-50 text-cyan-600 border-cyan-100',
      action: () => setActiveTab('guides')
    },
    {
      id: 'maps',
      title: 'Interactive Maps',
      desc: 'Regional Markers',
      icon: Map,
      color: 'from-indigo-600 to-purple-600',
      bgColor: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      action: onScrollToDiscovery
    },
    {
      id: 'budget',
      title: 'Budget Planner',
      desc: 'Real-Time Calc',
      icon: PieChart,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50 text-amber-600 border-amber-100',
      action: () => setActiveTab('budget')
    },
    {
      id: 'weekend',
      title: 'Weekend Getaways',
      desc: 'Quick 2–3 Day Escapes',
      icon: Sun,
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50 text-orange-600 border-orange-100',
      action: () => {
        onSelectCategory('Weekend Getaways');
        setActiveTab('destinations');
      }
    },
    {
      id: 'spiritual',
      title: 'Spiritual Journeys',
      desc: 'Ghats & Sacred Temples',
      icon: Flame,
      color: 'from-rose-500 to-orange-600',
      bgColor: 'bg-rose-50 text-rose-600 border-rose-100',
      action: () => {
        onSelectCategory('Spiritual Destinations');
        setActiveTab('destinations');
      }
    },
    {
      id: 'adventure',
      title: 'Adventure Travel',
      desc: 'Himalayas & Rafting',
      icon: Mountain,
      color: 'from-teal-600 to-emerald-600',
      bgColor: 'bg-teal-50 text-teal-600 border-teal-100',
      action: () => {
        onSelectCategory('Adventure');
        setActiveTab('destinations');
      }
    },
    {
      id: 'family',
      title: 'Family Holidays',
      desc: 'Comfort & Leisure',
      icon: Users,
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-50 text-blue-600 border-blue-100',
      action: () => setActiveTab('tours')
    }
  ];

  return (
    <section className="relative bg-white pt-4 pb-14 lg:pt-8 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Editorial 2-Column Hero Header with Ken Burns Layered Window */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography, Value Proposition & Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
              <span className="w-6 h-[2px] bg-[#FF5500]" />
              <span>India-Wide Travel Discovery & Planning</span>
            </div>

            {/* Main Headline with Brand Gradient Accent */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] text-balance">
              Explore India with{' '}
              <span className="bg-gradient-to-r from-[#FF5500] via-[#00A3FF] to-[#7B2CBF] bg-clip-text text-transparent">
                authentic wonder
              </span>{' '}
              and total clarity.
            </h1>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              From snow-dusted Himalayan passes and emerald Kerala backwaters to timeless Rajput sandstone fortresses. Discover verified regional destinations, compare handpicked heritage stays, calculate transparent taxi fares, and build custom day-by-day itineraries.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => setActiveTab('planner')}
                className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF5500] via-[#FF7700] to-[#FF3D00] hover:from-[#e64d00] hover:to-[#e63700] rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
              >
                <span>Plan Your Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('destinations')}
                className="px-6 py-3 text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 rounded-xl transition-all"
              >
                Explore 30+ States
              </button>
            </div>

            {/* Trust and Rigor Strip */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>All 28 States & 8 UTs Catalogued</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Curated Heritage Stays</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#0088FF]" />
                <span>Real-Time Fare Calculations</span>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Photography Frame with Ken Burns Animation (CHANGE 1) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3]">
              
              {/* Ken Burns Animated Image Layer */}
              <div className="w-full h-full overflow-hidden">
                <img
                  src="/assets/images/hero_cinematic_india_1791892010717.jpg"
                  alt="Scenic Himalayan sunrise over tranquil alpine lake in India"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover animate-ken-burns transform-gpu"
                />
              </div>

              {/* Scrim Overlay for Contrast & Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />

              {/* Editorial Caption Tag */}
              <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                <div>
                  <div className="text-xs font-semibold text-orange-300 uppercase tracking-wider">
                    Himalayan Escapes
                  </div>
                  <div className="text-lg sm:text-xl font-bold font-display">
                    Alpine Summits & Peaceful Valleys
                  </div>
                  <div className="text-xs text-slate-300">
                    Himachal Pradesh, Uttarakhand & Kashmir · Best Season: April – Oct
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('destinations')}
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/30 text-white transition-colors"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Floating Highlight Card */}
            <div className="absolute -bottom-5 -left-4 sm:left-6 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-slate-200/80 flex items-center gap-3 max-w-[270px] hidden sm:flex">
              <div className="w-9 h-9 rounded-lg bg-orange-100 text-[#FF5500] flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900">Custom Itinerary Builder</div>
                <div className="text-slate-500 text-[11px]">Real expense tracking per day</div>
              </div>
            </div>
          </div>

        </div>

        {/* CHANGE 2: Compact Animated Travel Service Launcher (Replacing Large Search Box) */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider">
                Travel Services & Fast Launcher
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mt-0.5">
                Everything You Need for Your India Journey
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              Tap any tile to launch instant tools & guides
            </span>
          </div>

          {/* 12 Interactive Service Tiles Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {serviceTiles.map((tile, index) => {
              const IconComponent = tile.icon;
              return (
                <button
                  key={tile.id}
                  onClick={tile.action}
                  style={{ animationDelay: `${index * 40}ms` }}
                  className="group relative flex flex-col items-center text-center p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-[#FF5500]/40 hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
                >
                  {/* Icon Circle with Soft Gradient Container */}
                  <div className={`w-11 h-11 rounded-xl ${tile.bgColor} border flex items-center justify-center mb-2.5 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3 shadow-2xs`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Title */}
                  <div className="text-xs font-bold text-slate-900 group-hover:text-[#FF5500] transition-colors leading-tight">
                    {tile.title}
                  </div>

                  {/* One-line micro description */}
                  <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                    {tile.desc}
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
