import React from 'react';
import { Link } from 'react-router-dom';
import { Tour } from '../types';
import { formatINR } from '../utils/format';
import { ArrowRight, MapPin } from 'lucide-react';

interface TourCardProps {
  tour: Tour;
}

export const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <div className="group bg-white rounded-2xl border border-[#DCE5E4] overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5">
      {/* Tour Image Placeholder with Unique Gradient */}
      <div
        className="h-44 relative p-4 flex flex-col justify-between text-white"
        style={{ background: tour.gradient }}
        aria-hidden="true"
      >
        {/* Subtle decorative grid/topo line pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between text-xs tracking-wider uppercase font-semibold text-white/90">
          <span>{tour.theme}</span>
          <span className="bg-black/25 backdrop-blur-xs px-2.5 py-0.5 rounded-[8px] font-medium tracking-normal lowercase">
            {tour.durationNights} nights
          </span>
        </div>

        <div className="relative z-10 flex items-center gap-1.5 text-xs text-white/90 font-medium truncate">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-white/80" />
          <span className="truncate">{tour.route}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3
            className="text-lg font-bold text-[#12263A] group-hover:text-[#1B8A8F] transition-colors leading-snug"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <Link to={`/tours/${tour.slug}`} className="focus-ring rounded-sm">
              {tour.title}
            </Link>
          </h3>

          <p className="mt-2 text-xs text-[#5B6B7A] line-clamp-2 leading-relaxed">
            {tour.summary}
          </p>
        </div>

        {/* Price & CTA Footer */}
        <div className="mt-5 pt-4 border-t border-[#DCE5E4] flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#5B6B7A] uppercase tracking-wider font-medium">Starting from</div>
            <div className="text-base font-bold text-[#12263A] tabular-nums">
              {formatINR(tour.priceFrom)}
              <span className="text-xs font-normal text-[#5B6B7A] ml-1">/ person</span>
            </div>
          </div>

          <Link
            to={`/tours/${tour.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B8A8F] hover:text-[#157175] bg-[#F5F8F7] hover:bg-[#eaf1f0] border border-[#DCE5E4] px-3 py-2 rounded-[10px] focus-ring transition-colors"
          >
            <span>View Tour</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
