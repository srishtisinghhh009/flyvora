import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTour } from '../services/api';
import { Tour } from '../types';
import { formatINR } from '../utils/format';
import {
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  ArrowLeft,
  ShieldCheck,
  Compass,
  AlertCircle
} from 'lucide-react';

export const TourDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Booking box state
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 7);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(defaultDateStr);
  const [travellers, setTravellers] = useState(2);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setNotFound(false);

    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    getTour(slug)
      .then((data) => {
        if (isMounted) {
          if (!data) {
            setNotFound(true);
          } else {
            setTour(data);
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setNotFound(true);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tour) return;
    const params = new URLSearchParams({
      tour: tour.slug,
      startDate: startDate,
      travellers: travellers.toString()
    });
    navigate(`/checkout?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="max-w-[1120px] mx-auto px-5 py-12 animate-pulse space-y-6">
        <div className="h-4 bg-[#DCE5E4]/50 w-32 rounded" />
        <div className="h-64 bg-[#DCE5E4]/60 rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-8 bg-[#DCE5E4]/60 rounded w-1/2" />
            <div className="h-20 bg-[#DCE5E4]/40 rounded" />
          </div>
          <div className="h-72 bg-[#DCE5E4]/50 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (notFound || !tour) {
    return (
      <div className="max-w-[1120px] mx-auto px-5 py-20 text-center">
        <div className="bg-white rounded-2xl border border-[#DCE5E4] p-12 max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#F5F8F7] border border-[#DCE5E4] flex items-center justify-center mx-auto text-[#C0392B]">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#12263A]" style={{ fontFamily: 'var(--font-heading)' }}>
            Tour not found
          </h2>
          <p className="text-xs text-[#5B6B7A]">
            The itinerary you are looking for does not exist or may have been retired.
          </p>
          <Link
            to="/tours"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1B8A8F] hover:bg-[#157175] px-4 py-2.5 rounded-[10px] focus-ring"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Browse all tours</span>
          </Link>
        </div>
      </div>
    );
  }

  const basePricePerPerson = tour.priceFrom;
  const estimatedSubtotal = basePricePerPerson * travellers;
  const estimatedTax = Math.round(estimatedSubtotal * 0.05);
  const estimatedTotal = estimatedSubtotal + estimatedTax;

  return (
    <div className="max-w-[1120px] mx-auto px-5 py-6 min-w-0">
      {/* Breadcrumb Back Link */}
      <div className="mb-4">
        <Link
          to="/tours"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B6B7A] hover:text-[#1B8A8F] focus-ring py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Tours</span>
        </Link>
      </div>

      {/* Tour Gradient Banner */}
      <div
        className="rounded-2xl p-6 sm:p-10 text-white relative overflow-hidden mb-8"
        style={{ background: tour.gradient }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-xs tracking-wider uppercase font-semibold text-white/90 mb-3">
            <span className="bg-black/25 backdrop-blur-xs px-2.5 py-1 rounded-[8px]">
              {tour.theme}
            </span>
            <span>·</span>
            <span>{tour.durationNights} Nights / {tour.durationNights + 1} Days</span>
          </div>

          <h1
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {tour.title}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm text-white/90 font-medium">
            <MapPin className="w-4 h-4 shrink-0 text-[#F2A93B]" />
            <span>{tour.route}</span>
          </div>
        </div>
      </div>

      {/* 2-Column Split: Details on Left, Sticky Booking Box on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column (2 Cols wide) */}
        <div className="lg:col-span-2 space-y-10">
          {/* Summary */}
          <section className="bg-white rounded-2xl border border-[#DCE5E4] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-[#12263A] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Tour Overview
            </h2>
            <p className="text-sm text-[#5B6B7A] leading-relaxed">
              {tour.summary}
            </p>

            <div className="mt-6 pt-6 border-t border-[#DCE5E4] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#5B6B7A]">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-[#5B6B7A]">Duration</span>
                <span className="font-semibold text-[#12263A] text-sm">{tour.durationNights} Nights</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-[#5B6B7A]">Theme</span>
                <span className="font-semibold text-[#12263A] text-sm">{tour.theme}</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-[#5B6B7A]">Starting From</span>
                <span className="font-semibold text-[#12263A] text-sm tabular-nums">{formatINR(tour.priceFrom)}</span>
              </div>
            </div>
          </section>

          {/* Day-by-Day Itinerary List */}
          <section className="bg-white rounded-2xl border border-[#DCE5E4] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#12263A]" style={{ fontFamily: 'var(--font-heading)' }}>
                Day-by-Day Itinerary
              </h2>
              <span className="text-xs text-[#5B6B7A] font-medium">
                {tour.itinerary.length} Days Detailed
              </span>
            </div>

            <ol className="space-y-6 list-none p-0">
              {tour.itinerary.map((item) => (
                <li key={item.day} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 rounded-[10px] bg-[#12263A] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      D{item.day}
                    </span>
                    <div className="w-0.5 flex-1 bg-[#DCE5E4] my-2" />
                  </div>

                  <div className="pb-4 flex-1">
                    <h3 className="text-base font-bold text-[#12263A]" style={{ fontFamily: 'var(--font-heading)' }}>
                      Day {item.day}: {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#5B6B7A] leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Inclusions List */}
          <section className="bg-white rounded-2xl border border-[#DCE5E4] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-[#12263A] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              What’s Included
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#5B6B7A]">
              {tour.inclusions.map((inc, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#1B8A8F] shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-[#DCE5E4] flex items-center gap-3 text-xs text-[#5B6B7A]">
              <ShieldCheck className="w-4 h-4 text-[#1B8A8F] shrink-0" />
              <span>Wayfold Guarantee: Verified sanitised private vehicles, accredited drivers, 24/7 route support.</span>
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Booking Box on Desktop */}
        <div className="lg:sticky lg:top-20">
          <div className="bg-white rounded-2xl border border-[#DCE5E4] p-6 shadow-xs">
            <div className="pb-4 border-b border-[#DCE5E4]">
              <div className="text-xs text-[#5B6B7A]">Price per person</div>
              <div className="text-2xl font-extrabold text-[#12263A] tabular-nums mt-0.5">
                {formatINR(tour.priceFrom)}
                <span className="text-xs font-normal text-[#5B6B7A] ml-1">/ adult</span>
              </div>
            </div>

            <form onSubmit={handleBookNow} className="mt-5 space-y-4">
              <div>
                <label htmlFor="tour-start-date" className="block text-xs font-semibold text-[#12263A] mb-1.5">
                  Travel Start Date
                </label>
                <div className="relative">
                  <input
                    id="tour-start-date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="tour-travellers" className="block text-xs font-semibold text-[#12263A] mb-1.5">
                  Number of Travellers
                </label>
                <select
                  id="tour-travellers"
                  value={travellers}
                  onChange={(e) => setTravellers(Number(e.target.value))}
                  className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
                >
                  <option value={1}>1 Traveller (Solo)</option>
                  <option value={2}>2 Travellers (Double)</option>
                  <option value={3}>3 Travellers</option>
                  <option value={4}>4 Travellers</option>
                  <option value={5}>5 Travellers</option>
                  <option value={6}>6 Travellers (Group)</option>
                </select>
              </div>

              {/* Price Calculation Summary */}
              <div className="p-3.5 bg-[#F5F8F7] rounded-xl border border-[#DCE5E4] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#5B6B7A]">
                  <span>{formatINR(tour.priceFrom)} × {travellers} traveller{travellers > 1 ? 's' : ''}</span>
                  <span className="text-[#12263A] font-semibold tabular-nums">{formatINR(estimatedSubtotal)}</span>
                </div>
                <div className="flex justify-between text-[#5B6B7A]">
                  <span>GST &amp; state tourism tax (5%)</span>
                  <span className="text-[#12263A] font-semibold tabular-nums">{formatINR(estimatedTax)}</span>
                </div>
                <div className="pt-2 border-t border-[#DCE5E4] flex justify-between font-bold text-[#12263A] text-sm">
                  <span>Estimated Total</span>
                  <span className="tabular-nums text-[#1B8A8F]">{formatINR(estimatedTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold text-white bg-[#1B8A8F] hover:bg-[#157175] active:bg-[#0f5558] rounded-[10px] transition-colors focus-ring"
              >
                Book this tour
              </button>

              <div className="text-[11px] text-center text-[#5B6B7A] leading-tight">
                No credit card needed to review itinerary. Free date changes up to 7 days before.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
