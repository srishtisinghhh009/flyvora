import React, { useState } from 'react';
import { TourPackage } from '../types';
import { TOURS } from '../data/tours';
import { Compass, Star, Calendar, MapPin, Check, X, ShieldAlert, ArrowRight, Heart } from 'lucide-react';

interface ToursPageProps {
  onBookTourDemo: (tour: TourPackage) => void;
  wishlistIds: string[];
  onToggleWishlist: (item: any) => void;
}

export const ToursPage: React.FC<ToursPageProps> = ({
  onBookTourDemo,
  wishlistIds,
  onToggleWishlist
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTourDetail, setSelectedTourDetail] = useState<TourPackage | null>(null);

  const categories = ['All', 'Cultural & Heritage', 'Honeymoon', 'Spiritual', 'Adventure'];

  const filteredTours = TOURS.filter(tour => {
    return selectedCategory === 'All' || tour.category === selectedCategory;
  });

  return (
    <div className="py-10 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#FF5500] uppercase tracking-widest mb-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Curated Multi-Day Journeys</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Handcrafted Indian Tours & Packages
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            All-inclusive itineraries featuring private chauffeurs, verified boutique & heritage hotels, expert monument guides, and daily activities.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat === 'All' ? 'All Packages' : cat}
            </button>
          ))}
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Photo & Duration Badge */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={tour.image}
                  alt={tour.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                <button
                  onClick={() => onToggleWishlist({ id: tour.id, type: 'tour', title: tour.title, subtitle: tour.duration, image: tour.image, price: tour.pricePerPerson })}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-slate-700 hover:text-red-500 transition-colors shadow-xs"
                  aria-label="Save tour"
                >
                  <Heart className={`w-4 h-4 ${wishlistIds.includes(tour.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                <div className="absolute bottom-3 left-4 right-4 text-white flex items-end justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 block">
                      {tour.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-[#FF5500]" />
                      <span>{tour.duration} · Best Season: {tour.bestSeason}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold bg-black/40 backdrop-blur-md px-2 py-1 rounded">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{tour.rating}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF5500] transition-colors leading-snug">
                    {tour.title}
                  </h3>

                  {/* Destinations Covered */}
                  <div className="text-xs text-slate-600 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF5500] shrink-0 mt-0.5" />
                    <span><strong>Route: </strong>{tour.destinationsCovered.join(' → ')}</span>
                  </div>

                  {/* Key Inclusions */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Package Highlights</span>
                    {tour.inclusions.slice(0, 3).map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Strip & Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400">Indicative Price per person</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                        ₹{tour.pricePerPerson.toLocaleString('en-IN')}
                      </span>
                      {tour.originalPrice && (
                        <span className="text-xs text-slate-400 line-through tabular-nums">
                          ₹{tour.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedTourDetail(tour)}
                      className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      Full Itinerary
                    </button>
                    <button
                      onClick={() => onBookTourDemo(tour)}
                      className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3D00] hover:from-[#e64d00] rounded-lg shadow-xs flex items-center gap-1"
                    >
                      <span>Enquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Tour Detail Modal */}
        {selectedTourDetail && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 relative my-8 max-h-[90vh] flex flex-col">
              
              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={() => setSelectedTourDetail(null)}
                  className="p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 shadow-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-6">
                <div>
                  <div className="text-xs font-bold text-[#FF5500] uppercase tracking-wider">
                    {selectedTourDetail.category} · {selectedTourDetail.duration}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1 font-display">
                    {selectedTourDetail.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Destinations Covered: {selectedTourDetail.destinationsCovered.join(' · ')}
                  </p>
                </div>

                {/* Day-by-Day Itinerary */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900">Day-by-Day Journey Plan</h3>
                  <div className="space-y-3">
                    {selectedTourDetail.itinerary.map((day) => (
                      <div key={day.day} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                        <div className="text-xs font-bold text-[#FF5500]">Day {day.day}: {day.title}</div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{day.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inclusions and Exclusions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/40 space-y-2">
                    <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">What’s Included</div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {selectedTourDetail.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/40 space-y-2">
                    <div className="text-xs font-bold text-rose-800 uppercase tracking-wider">What’s Excluded</div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {selectedTourDetail.exclusions.map((exc, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Modal CTA */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500">Starting from</span>
                    <div className="text-xl font-bold text-slate-900">
                      ₹{selectedTourDetail.pricePerPerson.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-500">/ traveler</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onBookTourDemo(selectedTourDetail);
                      setSelectedTourDetail(null);
                    }}
                    className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3D00] rounded-lg shadow-md hover:from-[#e64d00]"
                  >
                    Enquire This Tour (Demo)
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
