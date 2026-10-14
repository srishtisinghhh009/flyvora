import React, { useState } from 'react';
import { TRAVEL_GUIDES } from '../data/guides';
import { TravelGuide } from '../types';
import { BookOpen, Clock, Calendar, Check, ShieldCheck, ArrowRight, X, HeartHandshake } from 'lucide-react';

export const TravelGuidesPage: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<TravelGuide | null>(null);

  return (
    <div className="py-10 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0088FF] uppercase tracking-widest mb-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curated Travel Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            India Travel Guides & Editorial Handbooks
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Essential culture notes, local transit secrets, climate timing, verified packing lists, and safety advisories written by seasoned regional travelers.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRAVEL_GUIDES.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => setSelectedGuide(guide)}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={guide.image}
                  alt={guide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-semibold text-slate-800">
                  {guide.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{guide.destination}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {guide.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#FF5500] transition-colors leading-snug">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {guide.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0088FF] group-hover:text-[#0077e6]">
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Guide Modal Reader */}
        {selectedGuide && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 relative my-8 max-h-[90vh] flex flex-col">
              
              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 shadow-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-6">
                <div>
                  <div className="text-xs font-semibold text-[#0088FF] uppercase tracking-wider">
                    {selectedGuide.category} · {selectedGuide.destination} · {selectedGuide.readTime}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-display">
                    {selectedGuide.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 font-medium">{selectedGuide.subtitle}</p>
                </div>

                {/* Summary */}
                <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedGuide.summary}
                </div>

                {/* Key Highlights */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-900">Key Insights & Takeaways</h3>
                  <ul className="space-y-2">
                    {selectedGuide.keyHighlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best time to visit */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#FF5500]" />
                    <span>Best Season & Climate</span>
                  </div>
                  <p className="text-slate-600">{selectedGuide.bestTimeToVisit}</p>
                </div>

                {/* Packing List & Safety */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Essential Packing Items</h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {selectedGuide.packingList.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0088FF]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Health & Safety Tips</h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {selectedGuide.safetyTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Cultural Etiquette */}
                {selectedGuide.culturalEtiquette && (
                  <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/40 text-xs space-y-2">
                    <div className="font-bold text-purple-900 flex items-center gap-1.5">
                      <HeartHandshake className="w-3.5 h-3.5 text-[#7B2CBF]" />
                      <span>Respecting Local Customs & Etiquette</span>
                    </div>
                    <ul className="space-y-1 text-slate-700">
                      {selectedGuide.culturalEtiquette.map((eq, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7B2CBF] mt-1.5 shrink-0" />
                          <span>{eq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
