import React, { useState, useMemo } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { HOTELS } from '../data/hotels';
import { TOURS } from '../data/tours';
import { TRAVEL_GUIDES } from '../data/guides';
import { PageTab, Destination } from '../types';
import { Search, X, MapPin, Building, Compass, BookOpen, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (dest: Destination) => void;
  onNavigateTab: (tab: PageTab) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDestination,
  onNavigateTab
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const results = useMemo(() => {
    if (!searchTerm.trim()) return { destinations: [], hotels: [], tours: [], guides: [] };
    const q = searchTerm.toLowerCase();

    return {
      destinations: DESTINATIONS.filter(d => 
        d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q) || d.tagline.toLowerCase().includes(q)
      ).slice(0, 4),
      hotels: HOTELS.filter(h => 
        h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q) || h.type.toLowerCase().includes(q)
      ).slice(0, 3),
      tours: TOURS.filter(t => 
        t.title.toLowerCase().includes(q) || t.destinationsCovered.some(d => d.toLowerCase().includes(q))
      ).slice(0, 3),
      guides: TRAVEL_GUIDES.filter(g => 
        g.title.toLowerCase().includes(q) || g.destination.toLowerCase().includes(q)
      ).slice(0, 2)
    };
  }, [searchTerm]);

  const hasResults = 
    results.destinations.length > 0 || 
    results.hotels.length > 0 || 
    results.tours.length > 0 || 
    results.guides.length > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-start justify-center p-4 sm:pt-20 animate-in fade-in duration-150">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0 ml-1" />
          <input
            type="text"
            autoFocus
            placeholder="Search destinations, palaces, tours, hill stations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1 text-slate-500 hover:text-slate-800 bg-slate-100 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {searchTerm ? (
            hasResults ? (
              <div className="space-y-4">
                {/* Destinations */}
                {results.destinations.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Destinations ({results.destinations.length})
                    </span>
                    <div className="space-y-1">
                      {results.destinations.map(d => (
                        <div
                          key={d.id}
                          onClick={() => {
                            onSelectDestination(d);
                            onClose();
                          }}
                          className="p-2.5 rounded-lg hover:bg-slate-50 flex items-center justify-between cursor-pointer group"
                        >
                          <div className="flex items-center gap-2.5">
                            <MapPin className="w-4 h-4 text-[#FF5500] shrink-0" />
                            <div>
                              <div className="text-xs font-bold text-slate-900 group-hover:text-[#FF5500]">
                                {d.name}, {d.state}
                              </div>
                              <div className="text-[11px] text-slate-500">{d.tagline}</div>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#FF5500]" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tours */}
                {results.tours.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Tour Packages ({results.tours.length})
                    </span>
                    <div className="space-y-1">
                      {results.tours.map(t => (
                        <div
                          key={t.id}
                          onClick={() => {
                            onNavigateTab('tours');
                            onClose();
                          }}
                          className="p-2.5 rounded-lg hover:bg-slate-50 flex items-center justify-between cursor-pointer group"
                        >
                          <div className="flex items-center gap-2.5">
                            <Compass className="w-4 h-4 text-[#7B2CBF] shrink-0" />
                            <div>
                              <div className="text-xs font-bold text-slate-900 group-hover:text-[#7B2CBF]">
                                {t.title}
                              </div>
                              <div className="text-[11px] text-slate-500">{t.duration} · ₹{t.pricePerPerson.toLocaleString('en-IN')}</div>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#7B2CBF]" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hotels */}
                {results.hotels.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Hotels & Palaces ({results.hotels.length})
                    </span>
                    <div className="space-y-1">
                      {results.hotels.map(h => (
                        <div
                          key={h.id}
                          onClick={() => {
                            onNavigateTab('hotels');
                            onClose();
                          }}
                          className="p-2.5 rounded-lg hover:bg-slate-50 flex items-center justify-between cursor-pointer group"
                        >
                          <div className="flex items-center gap-2.5">
                            <Building className="w-4 h-4 text-[#0088FF] shrink-0" />
                            <div>
                              <div className="text-xs font-bold text-slate-900 group-hover:text-[#0088FF]">
                                {h.name}
                              </div>
                              <div className="text-[11px] text-slate-500">{h.city} · From ₹{h.pricePerNight.toLocaleString('en-IN')}</div>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0088FF]" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                No matching results found for "{searchTerm}". Try "Jaipur", "Kerala", "Manali", or "Varanasi".
              </div>
            )
          ) : (
            <div className="py-6 space-y-3">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Quick Search Suggestions:
              </span>
              <div className="flex flex-wrap gap-2">
                {['Amber Palace Jaipur', 'Kerala Houseboats', 'Varanasi Ganga Aarti', 'Solang Valley Manali', 'Agra Taj Mahal', 'Chauffeur Cabs'].map(s => (
                  <button
                    key={s}
                    onClick={() => setSearchTerm(s)}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-orange-50 hover:text-[#FF5500] text-slate-700 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
