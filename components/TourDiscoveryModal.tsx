import React, { useState, useMemo, useEffect } from 'react';
import { TourPackage } from '../types';
import { TOURS } from '../data/tours';
import { 
  X, 
  Search, 
  Compass, 
  Star, 
  Calendar, 
  MapPin, 
  Check, 
  Heart, 
  ArrowRight, 
  ArrowLeft,
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Sparkles, 
  Filter,
  Car,
  Building,
  Utensils,
  AlertCircle,
  Clock,
  Share2
} from 'lucide-react';

interface TourDiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTourDemo: (tour: TourPackage) => void;
  wishlistIds: string[];
  onToggleWishlist: (item: any) => void;
}

const CATEGORIES = [
  'All Packages',
  'Weekend Getaways',
  'Hill Stations',
  'Spiritual Journeys',
  'Adventure Trips',
  'Family Holidays',
  'Honeymoon Packages',
  'Heritage and Culture',
  'Wildlife and Nature',
  'Multi-City Tours'
];

export const TourDiscoveryModal: React.FC<TourDiscoveryModalProps> = ({
  isOpen,
  onClose,
  onBookTourDemo,
  wishlistIds,
  onToggleWishlist
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Packages');
  const [selectedDuration, setSelectedDuration] = useState('All');
  
  // Nested Detailed View State (Section 2.C)
  const [activeTourDetail, setActiveTourDetail] = useState<TourPackage | null>(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (activeTourDetail) {
          setActiveTourDetail(null); // return back to list
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeTourDetail, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const filteredTours = useMemo(() => {
    return TOURS.filter(tour => {
      const matchQuery = 
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.destinationsCovered.some(d => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
        tour.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.region.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCat = 
        selectedCategory === 'All Packages' || 
        tour.category.toLowerCase() === selectedCategory.toLowerCase();

      let matchDur = true;
      if (selectedDuration === 'Short (2-3 Days)') {
        matchDur = tour.duration.includes('2 Days') || tour.duration.includes('3 Days');
      } else if (selectedDuration === 'Medium (4-6 Days)') {
        matchDur = tour.duration.includes('4 Days') || tour.duration.includes('5 Days') || tour.duration.includes('6 Days');
      } else if (selectedDuration === 'Grand (7+ Days)') {
        matchDur = tour.duration.includes('7 Days') || tour.duration.includes('8 Days') || tour.duration.includes('9 Days');
      }

      return matchQuery && matchCat && matchDur;
    });
  }, [searchQuery, selectedCategory, selectedDuration]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-[#fafbfe] w-full max-w-6xl my-auto rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[94vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="px-5 sm:px-8 py-4 bg-white border-b border-slate-200 flex items-center justify-between gap-4 shrink-0">
          
          <div className="flex items-center gap-3">
            {activeTourDetail ? (
              <button
                onClick={() => setActiveTourDetail(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Packages</span>
              </button>
            ) : (
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#7B2CBF] flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                  {activeTourDetail ? activeTourDetail.title : 'Tour Packages & Curated Trips'}
                </h3>
                {!activeTourDetail && (
                  <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-[#7B2CBF] border border-purple-200">
                    {filteredTours.length} Signature Itineraries
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                {activeTourDetail 
                  ? `${activeTourDetail.duration} · Route: ${activeTourDetail.destinationsCovered.join(' → ')}`
                  : 'Discover handpicked India-wide holiday packages with private chauffeured cabs, verified boutique stays, and flexible itineraries.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Tour Packages Overlay"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If in Detailed View (Section 2.C) */}
        {activeTourDetail ? (
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 bg-white">
            
            {/* Gallery & Hero Banner */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 rounded-3xl overflow-hidden bg-slate-900">
              <div className="md:col-span-8 relative aspect-[16/10] overflow-hidden">
                <img
                  src={activeTourDetail.image}
                  alt={activeTourDetail.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="px-2.5 py-1 rounded text-xs font-bold bg-[#7B2CBF] text-white">
                      {activeTourDetail.category}
                    </span>
                    <span className="px-2.5 py-1 rounded text-xs font-bold bg-white/90 text-slate-900">
                      {activeTourDetail.duration}
                    </span>
                    <span className="px-2.5 py-1 rounded text-xs font-medium bg-black/60 backdrop-blur-xs text-white">
                      Ideal Season: {activeTourDetail.bestSeason}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
                    {activeTourDetail.title}
                  </h1>
                </div>
              </div>

              {/* Side pricing & booking CTA card */}
              <div className="md:col-span-4 p-6 bg-slate-50 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-200">
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Indicative Cost</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-black text-slate-900">
                        ₹{activeTourDetail.pricePerPerson.toLocaleString('en-IN')}
                      </span>
                      {activeTourDetail.originalPrice && (
                        <span className="text-sm text-slate-400 line-through">
                          ₹{activeTourDetail.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                      <span className="text-xs text-slate-500 font-medium">/ person</span>
                    </div>
                    <span className="text-xs text-emerald-600 font-semibold block mt-0.5">
                      All-Inclusive Guidance · Twin-Sharing
                    </span>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                    <strong>Demo Travel Quote:</strong> Pricing is an indicative estimate based on typical 4-star boutique stays and private AC transport.
                  </div>

                  {/* Destinations Covered */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
                      Circuit Route:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeTourDetail.destinationsCovered.map((dest, i) => (
                        <span key={dest} className="px-2 py-0.5 rounded text-xs bg-white border border-slate-200 font-medium text-slate-800">
                          {dest} {i < activeTourDetail.destinationsCovered.length - 1 ? '→' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-2">
                  <button
                    onClick={() => {
                      onClose();
                      onBookTourDemo(activeTourDetail);
                    }}
                    className="w-full py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] hover:from-[#6a22a6] hover:to-[#8c3ecc] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <span>Plan This Trip / Enquire Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onToggleWishlist(activeTourDetail)}
                    className="w-full py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Heart className={`w-3.5 h-3.5 ${wishlistIds.includes(activeTourDetail.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{wishlistIds.includes(activeTourDetail.id) ? 'Saved to Wishlist' : 'Save to Wishlist'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Tour Overview & Highlights
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed max-w-4xl">
                {activeTourDetail.overview || 'Explore iconic sights, rich culture, and picturesque landscapes on this specially tailored vacation experience.'}
              </p>
            </div>

            {/* Service Inclusions & Accommodation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Building className="w-4 h-4 text-[#0088FF]" />
                  <span>Accommodation Details</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeTourDetail.hotelDetails || 'Curated 4-star boutique and heritage hotels with daily housekeeping and complimentary breakfast.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Car className="w-4 h-4 text-emerald-600" />
                  <span>Transport Inclusions</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeTourDetail.transportDetails || 'Dedicated private air-conditioned vehicle with verified chauffeur for all city sightseeing, highway transfers, tolls and parking included.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Utensils className="w-4 h-4 text-amber-600" />
                  <span>Meals & Cuisine</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeTourDetail.mealsDetails || 'Daily chef-crafted breakfasts at all hotels, with regional culinary welcome dinner.'}
                </p>
              </div>

            </div>

            {/* Day-by-Day Itinerary Timeline */}
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 font-display">
                Day-by-Day Detailed Itinerary
              </h3>

              <div className="space-y-3">
                {activeTourDetail.itinerary.map((day) => (
                  <div 
                    key={day.day}
                    className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-purple-50/20 transition-colors flex gap-4"
                  >
                    <div className="shrink-0 w-16 text-center">
                      <span className="inline-block px-2 py-1 rounded-lg text-xs font-extrabold bg-[#7B2CBF] text-white">
                        Day {day.day}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">{day.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">What’s Included:</h4>
                <div className="space-y-1.5">
                  {activeTourDetail.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Exclusions:</h4>
                <div className="space-y-1.5">
                  {activeTourDetail.exclusions.map((exc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-500">
                      <X className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel Notes & Disclaimer */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-1">
              <div className="font-bold text-slate-700 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Important Travel Guidance:</span>
              </div>
              <ul className="list-disc pl-5 space-y-0.5 text-[11px]">
                {activeTourDetail.importantNotes?.map((note, idx) => (
                  <li key={idx}>{note}</li>
                )) || (
                  <>
                    <li>Valid government-issued photo ID required for all travelers at hotels and monuments.</li>
                    <li>Itineraries can be customized for group size, vehicle tier, and dietary preferences.</li>
                  </>
                )}
              </ul>
            </div>

          </div>
        ) : (
          /* Package Directory List View */
          <>
            {/* Filter Strip */}
            <div className="p-4 sm:px-6 bg-slate-50 border-b border-slate-200/80 shrink-0 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                
                {/* Search Input */}
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search destination, trip type (Rishikesh, Agra, Kashmir)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#7B2CBF] text-slate-800"
                  />
                </div>

                {/* Duration dropdown */}
                <div className="flex items-center gap-1.5 shrink-0 w-full sm:w-auto">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="py-1.5 px-3 text-xs font-semibold bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-[#7B2CBF] w-full sm:w-auto"
                  >
                    <option value="All">All Durations</option>
                    <option value="Short (2-3 Days)">2 – 3 Days (Weekend)</option>
                    <option value="Medium (4-6 Days)">4 – 6 Days (Midweek / Week)</option>
                    <option value="Grand (7+ Days)">7+ Days (Grand Circuit)</option>
                  </select>
                </div>

              </div>

              {/* Category Filter Chips per Section 2.B */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#7B2CBF] text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Package Cards */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {filteredTours.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
                  <Compass className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <h4 className="text-base font-bold text-slate-800">No tour packages found</h4>
                  <p className="text-xs text-slate-500 mt-1">Try switching categories or searching for another destination.</p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All Packages'); setSelectedDuration('All'); }}
                    className="mt-3 px-4 py-2 text-xs font-semibold text-[#7B2CBF] bg-purple-50 rounded-xl hover:bg-purple-100 cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                filteredTours.map((tour) => {
                  const isWishlisted = wishlistIds.includes(tour.id);

                  return (
                    <div
                      key={tour.id}
                      className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                        
                        {/* Left: Image & Quick Badges */}
                        <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full bg-slate-900 overflow-hidden">
                          <img
                            src={tour.image}
                            alt={tour.title}
                            className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/20" />
                          
                          {/* Top badges */}
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white text-slate-900 shadow-xs">
                              {tour.duration}
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#7B2CBF] text-white shadow-xs">
                              {tour.category}
                            </span>
                          </div>

                          {/* Wishlist toggle */}
                          <button
                            onClick={() => onToggleWishlist(tour)}
                            aria-label="Save tour to wishlist"
                            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                              isWishlisted 
                                ? 'bg-rose-500 text-white' 
                                : 'bg-white/80 hover:bg-white text-slate-700'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                          </button>

                          {/* Bottom info over image */}
                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <div className="flex items-center gap-1.5 text-xs text-amber-300">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span className="font-bold">{tour.rating}</span>
                              <span className="text-slate-300">({tour.reviewsCount} reviews)</span>
                            </div>
                            <div className="text-[11px] text-slate-200 mt-0.5">
                              Ideal Season: {tour.bestSeason}
                            </div>
                          </div>
                        </div>

                        {/* Right: Package Details & Actions */}
                        <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                          
                          <div className="space-y-2.5">
                            <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
                              {tour.title}
                            </h4>

                            {/* Destinations Covered */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
                                Covered:
                              </span>
                              {tour.destinationsCovered.map((dest, i) => (
                                <span 
                                  key={dest} 
                                  className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700"
                                >
                                  {dest}
                                  {i < tour.destinationsCovered.length - 1 && <span className="ml-1 text-slate-400">→</span>}
                                </span>
                              ))}
                            </div>

                            {/* Short Description */}
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              {tour.overview || 'Comprehensive vacation itinerary with verified stays, chauffeur transfers, and memorable sightseeing.'}
                            </p>

                            {/* Included services chips */}
                            <div className="space-y-1 pt-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Included Services:</span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {tour.inclusions.slice(0, 4).map((inc, idx) => (
                                  <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                    <span className="line-clamp-1">{inc}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Pricing and Action Strip */}
                          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Indicative Price</span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-slate-900">
                                  ₹{tour.pricePerPerson.toLocaleString('en-IN')}
                                </span>
                                {tour.originalPrice && (
                                  <span className="text-xs text-slate-400 line-through">
                                    ₹{tour.originalPrice.toLocaleString('en-IN')}
                                  </span>
                                )}
                                <span className="text-xs text-slate-500 font-medium">/ person</span>
                              </div>
                              <span className="text-[10px] text-emerald-600 font-semibold block">
                                Includes Private Cab + Boutique Stays + Breakfast
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setActiveTourDetail(tour)}
                                className="px-4 py-2 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors cursor-pointer"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() => {
                                  onClose();
                                  onBookTourDemo(tour);
                                }}
                                className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] hover:from-[#6924a3] hover:to-[#8c3ecc] rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                              >
                                <span>Plan This Trip</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>

                          </div>

                        </div>

                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        {/* Modal Footer Disclaimer */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 text-center text-xs text-slate-500 shrink-0 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Demo Itineraries · Flexible customization for dates, hotel categories & private cabs</span>
        </div>

      </div>

    </div>
  );
};
