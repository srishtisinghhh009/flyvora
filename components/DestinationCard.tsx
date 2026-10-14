import React from 'react';
import { Destination } from '../types';
import { Heart, Star, Calendar, Clock, MapPin, ArrowUpRight } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (destination: Destination) => void;
  isWishlisted: boolean;
  onToggleWishlist: (destination: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onSelect,
  isWishlisted,
  onToggleWishlist
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
      
      {/* Photograph Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={destination.image}
          alt={`${destination.name}, ${destination.state}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(destination);
          }}
          aria-label={isWishlisted ? "Remove from saved trips" : "Save destination"}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-slate-700 hover:text-red-500 transition-colors shadow-xs"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* State / Region Text Tag */}
        <div className="absolute bottom-3 left-3 text-white">
          <div className="flex items-center gap-1.5 text-xs font-semibold drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
            <span>{destination.state} · {destination.region} India</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          
          {/* Header Row: Title & Rating (clean unboxed metadata) */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF5500] transition-colors leading-snug">
              {destination.name}
            </h3>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-800 shrink-0">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="tabular-nums">{destination.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({destination.reviewsCount})</span>
            </div>
          </div>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {destination.tagline}
          </p>

          {/* Unboxed Metadata Strip (Zero-Pill discipline) */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>{destination.idealDuration}</span>
            </div>
            <span aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{destination.category}</span>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            <span>Budget from </span>
            <span className="font-semibold text-slate-800">{destination.estimatedBudget.budget.split('–')[0]}</span>
          </div>

          <button
            onClick={() => onSelect(destination)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF5500] hover:text-[#e64d00] transition-colors group-hover:translate-x-0.5 duration-200"
          >
            <span>Explore Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
