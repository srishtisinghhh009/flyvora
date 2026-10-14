import React from 'react';
import { Destination } from '../types';
import { X, Heart, Star, MapPin, Calendar, Clock, Plane, Train, Car, Compass, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (dest: Destination) => void;
  onPlanTrip: (dest: Destination) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onPlanTrip
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 relative my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Close & Action Top Bar */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => onToggleWishlist(destination)}
            className="p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-red-500 shadow-md transition-colors"
            aria-label="Save Destination"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 shadow-md transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          
          {/* Hero Banner with Scrim */}
          <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full bg-slate-100 overflow-hidden">
            <img
              src={destination.image}
              alt={destination.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
            
            {/* Header Overlay Content */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{destination.state} · {destination.region} India · {destination.category}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display mb-1">
                {destination.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 max-w-2xl">
                {destination.tagline}
              </p>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Quick Facts Strip (Unboxed metadata) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Rating</span>
                <span className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  {destination.rating} ({destination.reviewsCount} reviews)
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Best Season</span>
                <span className="font-bold text-slate-900 block mt-0.5">{destination.bestSeason}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Ideal Duration</span>
                <span className="font-bold text-slate-900 block mt-0.5">{destination.idealDuration}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Daily Budget</span>
                <span className="font-bold text-slate-900 block mt-0.5">{destination.estimatedBudget.moderate}</span>
              </div>
            </div>

            {/* Overview */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Overview & Why Visit</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* Major Attractions & Things To Do */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Attractions */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs text-slate-400">
                  Major Attractions
                </h4>
                <ul className="space-y-2">
                  {destination.attractions.map((att, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] mt-1.5 shrink-0" />
                      <span>{att}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Things to Do */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs text-slate-400">
                  Experiences & Things To Do
                </h4>
                <ul className="space-y-2">
                  {destination.thingsToDo.map((thing, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{thing}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Suggested Day-by-Day Itinerary */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Suggested Day-by-Day Itinerary</h3>
              <div className="space-y-3">
                {destination.suggestedItinerary.map((itin) => (
                  <div key={itin.day} className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-orange-200 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-[#FF5500]">Day {itin.day}</span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs font-bold text-slate-900">{itin.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{itin.activities}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Reach & Local Transport */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-900">How to Reach & Local Commute</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="space-y-1">
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5 text-[#0088FF]" />
                    <span>By Air</span>
                  </div>
                  <p className="text-slate-600 leading-normal">{destination.howToReach.air}</p>
                </div>

                <div className="space-y-1">
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Train className="w-3.5 h-3.5 text-[#FF5500]" />
                    <span>By Rail</span>
                  </div>
                  <p className="text-slate-600 leading-normal">{destination.howToReach.rail}</p>
                </div>

                <div className="space-y-1">
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-emerald-600" />
                    <span>By Road</span>
                  </div>
                  <p className="text-slate-600 leading-normal">{destination.howToReach.road}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Local Transport: </span>
                {destination.localTransport}
              </div>
            </div>

            {/* Budget Guidance with Mandatory Disclaimer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Indicative Daily Budget Guidance</h3>
                <span className="text-[11px] text-slate-400">Prices in INR</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-lg border border-slate-200 bg-white">
                  <div className="text-[11px] text-slate-400 font-medium">Budget Backpacker</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">{destination.estimatedBudget.budget}</div>
                </div>
                <div className="p-3 rounded-lg border border-orange-200 bg-orange-50/50">
                  <div className="text-[11px] text-[#FF5500] font-medium">Comfort Explorer</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">{destination.estimatedBudget.moderate}</div>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-white">
                  <div className="text-[11px] text-slate-400 font-medium">Luxury Heritage</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">{destination.estimatedBudget.luxury}</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 italic flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-slate-400 shrink-0" />
                <span>Budget estimates are representative planning ranges. Actual fares vary by seasonality and hotel availability.</span>
              </p>
            </div>

            {/* Nearby Excursions */}
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Nearby Excursions: </span>
              {destination.nearbyPlaces.join(' · ')}
            </div>

          </div>

          {/* Modal Sticky Bottom Action Bar */}
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 sticky bottom-0">
            <div className="text-xs text-slate-600">
              Ready to visit <strong className="text-slate-900">{destination.name}</strong>? Build your custom plan or check live taxi rates.
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleWishlist(destination)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{isWishlisted ? 'Saved' : 'Save to Wishlist'}</span>
              </button>
              <button
                onClick={() => {
                  onPlanTrip(destination);
                  onClose();
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3D00] hover:from-[#e64d00] hover:to-[#e63700] rounded-lg shadow-sm transition-all flex items-center gap-1.5"
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
};
