import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchCard } from '../components/SearchCard';
import { TourCard } from '../components/TourCard';
import { CouponCard } from '../components/CouponCard';
import { NewsletterSection } from '../components/NewsletterSection';
import { getTours, getCoupons } from '../services/api';
import { Tour, Coupon, TourTheme } from '../types';
import { TESTIMONIALS } from '../data/mockData';
import {
  CalendarSync,
  Receipt,
  Headphones,
  Compass,
  ArrowRight,
  ShieldCheck,
  Quote
} from 'lucide-react';

const THEME_FILTERS: Array<'All' | TourTheme> = ['All', 'Beach', 'Hills', 'Culture', 'Wildlife'];

export const HomePage: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<'All' | TourTheme>('All');
  const [loadingTours, setLoadingTours] = useState(true);
  const [loadingCoupons, setLoadingCoupons] = useState(true);
  const [errorTours, setErrorTours] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoadingTours(true);
    getTours()
      .then((data) => {
        if (isMounted) {
          setTours(data);
          setLoadingTours(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setErrorTours('Failed to load tours. Please refresh.');
          setLoadingTours(false);
        }
      });

    getCoupons()
      .then((data) => {
        if (isMounted) {
          setCoupons(data);
          setLoadingCoupons(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoadingCoupons(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredTours = selectedTheme === 'All'
    ? tours.slice(0, 4)
    : tours.filter((t) => t.theme === selectedTheme).slice(0, 4);

  return (
    <div className="min-w-0">
      {/* Hero Section on Deep Navy */}
      <section className="relative bg-[#12263A] text-white pt-16 pb-28 sm:pb-36 overflow-hidden">
        {/* Subtle geometric grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:32px_32px]"
          aria-hidden="true"
        />

        <div className="relative max-w-[1120px] mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[10px] bg-white/10 border border-white/15 text-xs text-[#F2A93B] font-semibold mb-6">
            <Compass className="w-3.5 h-3.5 text-[#F2A93B]" />
            <span>India Tour &amp; Travel Booking</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-[1.1] text-balance"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Plan the whole trip in one place
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#DCE5E4]/85 max-w-xl mx-auto leading-relaxed">
            Handpicked Indian journeys, transparent fares, and effortless bookings from the high Himalayas to tropical backwaters.
          </p>
        </div>

        {/* Mountain Zigzag Line Divider at Bottom of Hero */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none" aria-hidden="true">
          <svg
            className="w-full h-8 sm:h-12 text-[#F5F8F7]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            {/* Distinctive jagged mountain peaks and passes */}
            <path d="M0,120 L0,80 L75,35 L140,75 L210,18 L310,95 L420,12 L510,70 L620,25 L730,90 L850,15 L950,85 L1060,28 L1140,65 L1200,40 L1200,120 Z" />
          </svg>
        </div>
      </section>

      {/* Overlapping Search Card Container */}
      <section className="-mt-16 sm:-mt-20 max-w-[1120px] mx-auto px-5 mb-16 relative z-30" aria-label="Search travel">
        <SearchCard />
      </section>

      {/* Main Content Sections */}
      <div className="max-w-[1120px] mx-auto px-5 space-y-20">
        {/* Section 1: Tours Worth Taking */}
        <section aria-labelledby="tours-heading">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2
                id="tours-heading"
                className="text-2xl sm:text-3xl font-bold text-[#12263A]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Tours worth taking
              </h2>
              <p className="text-xs sm:text-sm text-[#5B6B7A] mt-1">
                Verified multi-day itineraries designed with native guides, private cabs, and heritage stays.
              </p>
            </div>

            <Link
              to="/tours"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B8A8F] hover:text-[#157175] focus-ring group"
            >
              <span>See all tours</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Theme Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6" role="group" aria-label="Filter tours by theme">
            {THEME_FILTERS.map((theme) => {
              const isSelected = selectedTheme === theme;
              return (
                <button
                  key={theme}
                  type="button"
                  onClick={() => setSelectedTheme(theme)}
                  className={`text-xs font-semibold px-4 py-2 rounded-[10px] whitespace-nowrap transition-colors focus-ring border ${
                    isSelected
                      ? 'bg-[#12263A] text-white border-[#12263A]'
                      : 'bg-white text-[#5B6B7A] border-[#DCE5E4] hover:text-[#12263A] hover:bg-[#F5F8F7]'
                  }`}
                >
                  {theme}
                </button>
              );
            })}
          </div>

          {/* Tours Grid */}
          {loadingTours ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#DCE5E4] h-80 animate-pulse p-4 space-y-4">
                  <div className="bg-[#DCE5E4]/60 h-40 rounded-xl" />
                  <div className="h-4 bg-[#DCE5E4]/60 rounded w-3/4" />
                  <div className="h-3 bg-[#DCE5E4]/40 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : errorTours ? (
            <div className="bg-white rounded-2xl border border-[#DCE5E4] p-8 text-center">
              <p className="text-sm text-[#C0392B] font-medium">{errorTours}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-3 text-xs font-semibold text-[#1B8A8F] hover:underline"
              >
                Try reloading
              </button>
            </div>
          ) : filteredTours.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#DCE5E4] p-10 text-center text-sm text-[#5B6B7A]">
              No tours found for theme "{selectedTheme}".
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTours.map((tour) => (
                <TourCard key={tour.slug} tour={tour} />
              ))}
            </div>
          )}
        </section>

        {/* Section 2: Offers This Month */}
        <section aria-labelledby="offers-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2
                id="offers-heading"
                className="text-2xl sm:text-3xl font-bold text-[#12263A]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Offers this month
              </h2>
              <p className="text-xs sm:text-sm text-[#5B6B7A] mt-1">
                Seasonal promo coupons for immediate discounts at checkout.
              </p>
            </div>

            <Link
              to="/offers"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B8A8F] hover:text-[#157175] focus-ring group"
            >
              <span>View all offers</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {loadingCoupons ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#DCE5E4] h-44 animate-pulse p-5" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coupons.map((coupon) => (
                <CouponCard key={coupon.code} coupon={coupon} />
              ))}
            </div>
          )}
        </section>

        {/* Section 3: Why Wayfold */}
        <section aria-labelledby="why-heading" className="bg-white rounded-2xl border border-[#DCE5E4] p-8 sm:p-10">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2
              id="why-heading"
              className="text-2xl sm:text-3xl font-bold text-[#12263A]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Why Wayfold
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6B7A] mt-2">
              We eliminate disjointed bookings, deceptive surge fees, and unreachable call centers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Point 1: One Itinerary */}
            <div className="p-4 rounded-xl bg-[#F5F8F7] border border-[#DCE5E4] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-[10px] bg-white border border-[#DCE5E4] flex items-center justify-center text-[#1B8A8F] mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#12263A]" style={{ fontFamily: 'var(--font-heading)' }}>
                  One itinerary
                </h3>
                <p className="mt-2 text-xs text-[#5B6B7A] leading-relaxed">
                  Your boutique stay, chauffeur transfer, and local guide unified under one master itinerary and single contact.
                </p>
              </div>
            </div>

            {/* Point 2: Clear Pricing */}
            <div className="p-4 rounded-xl bg-[#F5F8F7] border border-[#DCE5E4] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-[10px] bg-white border border-[#DCE5E4] flex items-center justify-center text-[#1B8A8F] mb-4">
                  <Receipt className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#12263A]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Clear pricing
                </h3>
                <p className="mt-2 text-xs text-[#5B6B7A] leading-relaxed">
                  Transparent itemized breakdown with standard 5% GST and toll taxes included. No last-second surprise additions.
                </p>
              </div>
            </div>

            {/* Point 3: Free Date Changes */}
            <div className="p-4 rounded-xl bg-[#F5F8F7] border border-[#DCE5E4] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-[10px] bg-white border border-[#DCE5E4] flex items-center justify-center text-[#1B8A8F] mb-4">
                  <CalendarSync className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#12263A]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Free date changes
                </h3>
                <p className="mt-2 text-xs text-[#5B6B7A] leading-relaxed">
                  Reschedule your start date up to 7 days prior to journey commencement with zero penalty or administrative fee.
                </p>
              </div>
            </div>

            {/* Point 4: Human Support 7am-11pm */}
            <div className="p-4 rounded-xl bg-[#F5F8F7] border border-[#DCE5E4] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-[10px] bg-white border border-[#DCE5E4] flex items-center justify-center text-[#1B8A8F] mb-4">
                  <Headphones className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#12263A]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Human support 7am–11pm
                </h3>
                <p className="mt-2 text-xs text-[#5B6B7A] leading-relaxed">
                  Direct phone access to dedicated trip coordinators based in India who know local road conditions and weather.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: How Booking Works */}
        <section aria-labelledby="how-heading">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2
              id="how-heading"
              className="text-2xl sm:text-3xl font-bold text-[#12263A]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              How booking works
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6B7A] mt-2">
              From discovering authentic circuits to returning home, your journey follows four straightforward steps.
            </p>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0">
            {/* Step 1 */}
            <li className="bg-white rounded-2xl border border-[#DCE5E4] p-6 relative">
              <span className="text-xs font-mono font-bold text-[#1B8A8F] bg-[#F5F8F7] px-2.5 py-1 rounded-[6px] border border-[#DCE5E4]">
                Step 01
              </span>
              <h3 className="text-lg font-bold text-[#12263A] mt-4 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Search
              </h3>
              <p className="text-xs text-[#5B6B7A] leading-relaxed">
                Choose your desired Indian region, travel dates, and group size using our intuitive search filter.
              </p>
            </li>

            {/* Step 2 */}
            <li className="bg-white rounded-2xl border border-[#DCE5E4] p-6 relative">
              <span className="text-xs font-mono font-bold text-[#1B8A8F] bg-[#F5F8F7] px-2.5 py-1 rounded-[6px] border border-[#DCE5E4]">
                Step 02
              </span>
              <h3 className="text-lg font-bold text-[#12263A] mt-4 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Compare
              </h3>
              <p className="text-xs text-[#5B6B7A] leading-relaxed">
                Review transparent day-by-day itineraries, exact hotel tiers, inclusions, and verified guest feedback.
              </p>
            </li>

            {/* Step 3 */}
            <li className="bg-white rounded-2xl border border-[#DCE5E4] p-6 relative">
              <span className="text-xs font-mono font-bold text-[#1B8A8F] bg-[#F5F8F7] px-2.5 py-1 rounded-[6px] border border-[#DCE5E4]">
                Step 03
              </span>
              <h3 className="text-lg font-bold text-[#12263A] mt-4 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Pay securely
              </h3>
              <p className="text-xs text-[#5B6B7A] leading-relaxed">
                Apply your discount coupon and complete payment via instant booking confirmation with instant receipts.
              </p>
            </li>

            {/* Step 4 */}
            <li className="bg-white rounded-2xl border border-[#DCE5E4] p-6 relative">
              <span className="text-xs font-mono font-bold text-[#1B8A8F] bg-[#F5F8F7] px-2.5 py-1 rounded-[6px] border border-[#DCE5E4]">
                Step 04
              </span>
              <h3 className="text-lg font-bold text-[#12263A] mt-4 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Travel
              </h3>
              <p className="text-xs text-[#5B6B7A] leading-relaxed">
                Meet your assigned chauffeur at the airport or station and enjoy complete on-ground support throughout.
              </p>
            </li>
          </ol>
        </section>

        {/* Section 5: Recent Trips (Customer Quotes) */}
        <section aria-labelledby="reviews-heading" className="bg-[#12263A] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-xl mx-auto text-center mb-10">
            <h2
              id="reviews-heading"
              className="text-2xl sm:text-3xl font-bold text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Recent trips
            </h2>
            <p className="text-xs sm:text-sm text-[#DCE5E4]/80 mt-2">
              Verified feedback from travelers who booked Indian journeys with Wayfold this season.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-between backdrop-blur-xs">
                <div>
                  <Quote className="w-5 h-5 text-[#F2A93B] mb-3 opacity-80" />
                  <p className="text-xs sm:text-sm text-[#DCE5E4] leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-xs">
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-[11px] text-[#DCE5E4]/70">
                    {t.location} · {t.trip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Newsletter Signup */}
        <NewsletterSection />
      </div>
    </div>
  );
};
