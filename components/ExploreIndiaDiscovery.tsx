import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { Destination } from '../types';
import { MapPin, Compass, ArrowRight, Star, Sparkles, Calendar, Clock, Check } from 'lucide-react';

interface ExploreIndiaDiscoveryProps {
  onSelectDestination: (dest: Destination) => void;
}

export const ExploreIndiaDiscovery: React.FC<ExploreIndiaDiscoveryProps> = ({ onSelectDestination }) => {
  const [activeTheme, setActiveTheme] = useState<string>('all');

  // Key requested highlights per CHANGE 6:
  // Nainital, Kainchi Dham, Rishikesh, Mussoorie, Agra, Varanasi, Delhi, Srinagar, Jaipur, Alleppey, Goa, Darjeeling
  const featuredIds = [
    'nainital',
    'kainchi-dham',
    'rishikesh',
    'mussoorie',
    'agra',
    'varanasi',
    'srinagar',
    'jaipur',
    'alleppey',
    'goa',
    'darjeeling',
    'delhi'
  ];

  const featuredDestinations = DESTINATIONS.filter(d => featuredIds.includes(d.id));

  const filterThemes = [
    { id: 'all', label: 'All Signature Wonders' },
    { id: 'himalayas', label: 'Himalayan & Hill Trails' },
    { id: 'spiritual', label: 'Spiritual Sanctuaries' },
    { id: 'heritage', label: 'Heritage & Fortresses' },
    { id: 'coastal', label: 'Backwaters & Coast' },
  ];

  const filtered = featuredDestinations.filter(d => {
    if (activeTheme === 'all') return true;
    if (activeTheme === 'himalayas') return d.category === 'Mountains & Hill Stations';
    if (activeTheme === 'spiritual') return d.category === 'Spiritual Destinations';
    if (activeTheme === 'heritage') return d.category === 'Heritage & Culture';
    if (activeTheme === 'coastal') return d.category === 'Beaches & Islands';
    return true;
  });

  return (
    <div id="explore-india-discovery" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF5500] uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Pan-India Destination Discovery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            Explore India’s Most Celebrated Destinations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            From the tranquil waters of Nainital and the spiritual hermitage of Kainchi Dham to the sunset ghats of Varanasi and Dal Lake houseboats.
          </p>
        </div>

        {/* Region / Theme Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {filterThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setActiveTheme(theme.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTheme === theme.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {theme.label}
            </button>
          ))}
        </div>
      </div>

      {/* Destination Grid Collage (Replaces the weak map image) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((dest) => (
          <div
            key={dest.id}
            onClick={() => onSelectDestination(dest)}
            className="group relative bg-slate-50/60 rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-orange-300 hover:bg-white transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            {/* Image Frame */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
              <img
                src={dest.image}
                alt={dest.name}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              
              {/* Region & State Pill Badge */}
              <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#FF5500]" />
                <span>{dest.state}</span>
              </div>

              {/* Rating */}
              <div className="absolute top-2.5 right-2.5 bg-white/95 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>{dest.rating}</span>
              </div>

              {/* Bottom Caption on Image */}
              <div className="absolute bottom-2.5 left-3 right-3 text-white">
                <h3 className="text-base font-bold font-display leading-tight drop-shadow-xs group-hover:text-orange-300 transition-colors">
                  {dest.name}
                </h3>
                <div className="text-[10px] text-slate-300 truncate">
                  {dest.tagline}
                </div>
              </div>
            </div>

            {/* Quick Travel Intel Strip */}
            <div className="p-3.5 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 font-medium">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{dest.idealDuration}</span>
                </span>
                <span className="text-slate-400">·</span>
                <span className="truncate max-w-[130px]">{dest.category}</span>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                <div className="text-[11px] text-slate-600">
                  <span className="text-slate-400">From </span>
                  <strong className="text-slate-900 font-bold">{dest.estimatedBudget.budget.split('–')[0]}</strong>
                </div>

                <span className="text-xs font-bold text-[#FF5500] group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editorial Trust Note & State Coverage */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-50/60 via-slate-50 to-blue-50/60 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <Sparkles className="w-4 h-4 text-[#FF5500] shrink-0" />
          <span>
            Looking for a specific town or pilgrimage circuit? Flyvora catalogues over 30 states and territories across India.
          </span>
        </div>
        <button
          onClick={() => {
            const destTab = document.querySelector('button[name="destinations-nav"]');
            if (destTab) (destTab as HTMLElement).click();
          }}
          className="font-bold text-[#0088FF] hover:underline shrink-0"
        >
          View Full State Directory →
        </button>
      </div>

    </div>
  );
};
