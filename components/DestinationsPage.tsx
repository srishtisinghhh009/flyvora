import React, { useState, useMemo } from 'react';
import { Destination, DestinationCategory, IndiaRegion } from '../types';
import { DESTINATIONS } from '../data/destinations';
import { DestinationCard } from './DestinationCard';
import { Search, Filter, MapPin, Compass, Sparkles } from 'lucide-react';

interface DestinationsPageProps {
  onSelectDestination: (dest: Destination) => void;
  wishlistIds: string[];
  onToggleWishlist: (dest: Destination) => void;
  initialQuery?: string;
  initialCategory?: string;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({
  onSelectDestination,
  wishlistIds,
  onToggleWishlist,
  initialQuery = '',
  initialCategory = 'All'
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedState, setSelectedState] = useState<string>('All');

  const regions: IndiaRegion[] = ['North', 'South', 'East', 'West', 'Northeast'];
  const categories: DestinationCategory[] = [
    'Mountains & Hill Stations',
    'Beaches & Islands',
    'Heritage & Culture',
    'Spiritual Destinations',
    'Adventure'
  ];

  // Unique states from data
  const states = useMemo(() => {
    const set = new Set(DESTINATIONS.map(d => d.state));
    return ['All', ...Array.from(set).sort()];
  }, []);

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter(dest => {
      const matchesSearch = 
        !searchQuery ||
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.attractions.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRegion = selectedRegion === 'All' || dest.region === selectedRegion;
      const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
      const matchesState = selectedState === 'All' || dest.state === selectedState;

      return matchesSearch && matchesRegion && matchesCategory && matchesState;
    });
  }, [searchQuery, selectedRegion, selectedCategory, selectedState]);

  return (
    <div className="py-10 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#FF5500] uppercase tracking-widest mb-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Pan-India Discovery Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Discover India’s Wonders
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            From the high alpine snow passes of Himachal and Kashmir to the royal sandstone palaces of Rajasthan and tranquil emerald waterways of Kerala.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          
          {/* Top Row: Search input & State picker */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by city, state, monument, or attraction..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#FF5500] focus:bg-white transition-all text-slate-900"
              />
            </div>
            <div className="md:col-span-4">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full py-2 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#FF5500] focus:bg-white transition-all text-slate-800"
              >
                <option value="All">All Indian States & UTs</option>
                {states.filter(s => s !== 'All').map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Segmented Region Controls (Allowed interactive filter buttons per Skill) */}
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-400 mr-1">Region:</span>
            <button
              onClick={() => setSelectedRegion('All')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedRegion === 'All'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100'
              }`}
            >
              All India
            </button>
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedRegion === reg
                    ? 'bg-[#FF5500] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                }`}
              >
                {reg} India
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-xs font-semibold text-slate-400 mr-1">Category:</span>
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100'
              }`}
            >
              All Themes
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Results Counter & Active Filters Summary */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-900">{filteredDestinations.length}</strong> curated destinations
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </div>
          {(searchQuery || selectedRegion !== 'All' || selectedCategory !== 'All' || selectedState !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('All');
                setSelectedCategory('All');
                setSelectedState('All');
              }}
              className="text-[#FF5500] font-semibold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Destination Cards Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onSelect={onSelectDestination}
                isWishlisted={wishlistIds.includes(dest.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <Sparkles className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No destinations match your filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or resetting the region and theme filters to explore more of India.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('All');
                setSelectedCategory('All');
                setSelectedState('All');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#FF5500] rounded-lg shadow-xs hover:bg-[#e64d00]"
            >
              Show All Destinations
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
