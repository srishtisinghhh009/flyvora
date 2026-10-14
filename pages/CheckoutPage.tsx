import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTour, applyCoupon, createBooking, getTours } from '../services/api';
import { Tour, Coupon, Booking } from '../types';
import { formatINR, formatDate } from '../utils/format';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Tag,
  ArrowRight,
  AlertCircle,
  Calendar,
  Users,
  MapPin,
  Lock
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const tourSlug = searchParams.get('tour') || 'kerala-backwaters';
  const paramStartDate = searchParams.get('startDate') || '';
  const paramTravellers = Number(searchParams.get('travellers')) || 2;

  const [tour, setTour] = useState<Tour | null>(null);
  const [loadingTour, setLoadingTour] = useState(true);

  // Form State
  const [travellerName, setTravellerName] = useState(user?.name || '');
  const [travellerEmail, setTravellerEmail] = useState(user?.email || '');
  const [travellerPhone, setTravellerPhone] = useState('+91 98765 43210');
  const [startDate, setStartDate] = useState(
    paramStartDate ||
      new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
  );
  const [travellers, setTravellers] = useState(paramTravellers);
  const [specialRequests, setSpecialRequests] = useState('');

  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [validatingCoupon, setValidatingCoupon] = useState(false);

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoadingTour(true);
    getTour(tourSlug)
      .then((data) => {
        if (isMounted) {
          if (data) {
            setTour(data);
          } else {
            // fallback to first available tour
            getTours().then((all) => {
              if (isMounted && all.length > 0) setTour(all[0]);
            });
          }
          setLoadingTour(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoadingTour(false);
      });

    return () => {
      isMounted = false;
    };
  }, [tourSlug]);

  // Recalculate coupon if travellers change
  useEffect(() => {
    if (appliedCoupon && tour) {
      const baseFare = tour.priceFrom * travellers;
      let disc = 0;
      if (appliedCoupon.discountType === 'flat') {
        disc = appliedCoupon.discountValue;
      } else if (appliedCoupon.discountType === 'percentage') {
        disc = Math.round((baseFare * appliedCoupon.discountValue) / 100);
        if (appliedCoupon.maxDiscount && disc > appliedCoupon.maxDiscount) {
          disc = appliedCoupon.maxDiscount;
        }
      }
      setDiscountAmount(Math.min(disc, baseFare));
    }
  }, [travellers, appliedCoupon, tour]);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponMessage(null);
    if (!couponCode.trim()) return;

    if (!tour) return;
    const baseFare = tour.priceFrom * travellers;

    setValidatingCoupon(true);
    const result = await applyCoupon(couponCode, baseFare, tour.theme);
    setValidatingCoupon(false);

    if (result.valid) {
      setAppliedCoupon(result.coupon || null);
      setDiscountAmount(result.discountAmount);
      setCouponMessage({ type: 'success', text: result.message });
    } else {
      setAppliedCoupon(null);
      setDiscountAmount(0);
      setCouponMessage({ type: 'error', text: result.message });
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setCouponMessage(null);
  };

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!tour) {
      setFormError('No tour selected for booking.');
      return;
    }

    if (!travellerName.trim() || !travellerEmail.trim() || !travellerPhone.trim()) {
      setFormError('Please fill in all primary traveller contact fields.');
      return;
    }

    if (!travellerEmail.includes('@')) {
      setFormError('Please enter a valid traveller email address.');
      return;
    }

    setSubmitting(true);

    const baseFare = tour.priceFrom * travellers;
    const taxAmount = Math.round(baseFare * 0.05);
    const totalAmount = Math.max(0, baseFare + taxAmount - discountAmount);

    try {
      const newBooking = await createBooking({
        tourSlug: tour.slug,
        tourTitle: tour.title,
        route: tour.route,
        startDate: startDate,
        durationNights: tour.durationNights,
        travellers: travellers,
        travellerName: travellerName.trim(),
        travellerEmail: travellerEmail.trim(),
        travellerPhone: travellerPhone.trim(),
        specialRequests: specialRequests.trim(),
        baseFare: baseFare,
        taxAmount: taxAmount,
        discountAmount: discountAmount,
        couponCode: appliedCoupon ? appliedCoupon.code : undefined,
        totalAmount: totalAmount
      });

      setConfirmedBooking(newBooking);
      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
      setFormError('Failed to process mock payment. Please try again.');
    }
  };

  if (loadingTour) {
    return (
      <div className="max-w-[1120px] mx-auto px-5 py-12 animate-pulse space-y-6">
        <div className="h-8 bg-[#DCE5E4]/60 w-64 rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-[#DCE5E4]/40 rounded-2xl" />
          <div className="h-96 bg-[#DCE5E4]/40 rounded-2xl" />
        </div>
      </div>
    );
  }

  // Confirmed booking state
  if (confirmedBooking) {
    return (
      <div className="max-w-[1120px] mx-auto px-5 py-12 min-w-0">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-[#DCE5E4] p-8 sm:p-10 shadow-xs text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#1B8A8F]/10 text-[#1B8A8F] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold text-[#1B8A8F] bg-[#F5F8F7] px-3 py-1 rounded-[8px] border border-[#DCE5E4]">
              Booking ID: {confirmedBooking.id}
            </span>
            <h1
              className="text-2xl sm:text-3xl font-extrabold text-[#12263A] mt-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Booking Confirmed!
            </h1>
            <p className="text-xs sm:text-sm text-[#5B6B7A] mt-2">
              Thank you, {confirmedBooking.travellerName}. Your itinerary and confirmation receipt have been sent to{' '}
              <span className="font-semibold text-[#12263A]">{confirmedBooking.travellerEmail}</span>.
            </p>
          </div>

          <div className="bg-[#F5F8F7] rounded-xl border border-[#DCE5E4] p-5 text-left space-y-3 text-xs">
            <div className="flex justify-between pb-3 border-b border-[#DCE5E4]">
              <span className="text-[#5B6B7A]">Tour</span>
              <span className="font-bold text-[#12263A]">{confirmedBooking.tourTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5B6B7A]">Route</span>
              <span className="font-medium text-[#12263A]">{confirmedBooking.route}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5B6B7A]">Departure Date</span>
              <span className="font-medium text-[#12263A]">{formatDate(confirmedBooking.startDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5B6B7A]">Travellers</span>
              <span className="font-medium text-[#12263A]">{confirmedBooking.travellers} Person{confirmedBooking.travellers > 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-[#DCE5E4] text-sm font-bold text-[#12263A]">
              <span>Amount Paid</span>
              <span className="text-[#1B8A8F] tabular-nums">{formatINR(confirmedBooking.totalAmount)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              type="button"
              onClick={() => navigate('/bookings')}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#1B8A8F] hover:bg-[#157175] rounded-[10px] transition-colors focus-ring"
            >
              View My Bookings
            </button>
            <Link
              to="/tours"
              className="px-6 py-2.5 text-xs font-bold text-[#12263A] bg-[#F5F8F7] hover:bg-white border border-[#DCE5E4] rounded-[10px] transition-colors focus-ring"
            >
              Browse More Tours
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="max-w-[1120px] mx-auto px-5 py-16 text-center">
        <p className="text-sm text-[#5B6B7A]">No tour selected for checkout.</p>
        <Link to="/tours" className="mt-4 inline-block text-xs font-bold text-[#1B8A8F]">
          Browse available tours
        </Link>
      </div>
    );
  }

  const baseFare = tour.priceFrom * travellers;
  const taxAmount = Math.round(baseFare * 0.05);
  const totalAmount = Math.max(0, baseFare + taxAmount - discountAmount);

  return (
    <div className="max-w-[1120px] mx-auto px-5 py-8 min-w-0">
      {/* Page Title */}
      <div className="mb-8">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#12263A]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Review &amp; Complete Booking
        </h1>
        <p className="text-xs sm:text-sm text-[#5B6B7A] mt-1">
          Lock in your dates with verified pricing and zero cancellation fee up to 7 days before.
        </p>
      </div>

      {formError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[10px] flex items-center gap-3 text-xs text-[#C0392B]">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Traveller details form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Selected Tour Summary banner */}
          <div className="bg-white rounded-2xl border border-[#DCE5E4] p-5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <div className="text-xs text-[#1B8A8F] font-bold uppercase tracking-wider">
                {tour.theme} Tour · {tour.durationNights} Nights
              </div>
              <h2 className="text-lg font-bold text-[#12263A] mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
                {tour.title}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-[#5B6B7A] mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#1B8A8F]" />
                <span>{tour.route}</span>
              </div>
            </div>

            <Link
              to={`/tours/${tour.slug}`}
              className="text-xs font-semibold text-[#1B8A8F] hover:underline whitespace-nowrap"
            >
              Modify Tour
            </Link>
          </div>

          {/* Traveller Form */}
          <div className="bg-white rounded-2xl border border-[#DCE5E4] p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#12263A] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Primary Traveller Information
            </h2>

            <form onSubmit={handlePayNow} id="checkout-form" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lead-name" className="block text-xs font-semibold text-[#12263A] mb-1.5">
                    Full Name (as per Govt ID)
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    required
                    value={travellerName}
                    onChange={(e) => setTravellerName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
                  />
                </div>

                <div>
                  <label htmlFor="lead-email" className="block text-xs font-semibold text-[#12263A] mb-1.5">
                    Email Address (for vouchers)
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    required
                    value={travellerEmail}
                    onChange={(e) => setTravellerEmail(e.target.value)}
                    placeholder="aarav@example.com"
                    className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lead-phone" className="block text-xs font-semibold text-[#12263A] mb-1.5">
                    Mobile Number (WhatsApp enabled)
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    required
                    value={travellerPhone}
                    onChange={(e) => setTravellerPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
                  />
                </div>

                <div>
                  <label htmlFor="checkout-date" className="block text-xs font-semibold text-[#12263A] mb-1.5">
                    Trip Start Date
                  </label>
                  <input
                    id="checkout-date"
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="checkout-travellers" className="block text-xs font-semibold text-[#12263A] mb-1.5">
                  Number of Travellers
                </label>
                <select
                  id="checkout-travellers"
                  value={travellers}
                  onChange={(e) => setTravellers(Number(e.target.value))}
                  className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
                >
                  <option value={1}>1 Adult (Solo traveller)</option>
                  <option value={2}>2 Adults (Couple / Double)</option>
                  <option value={3}>3 Adults</option>
                  <option value={4}>4 Adults (Family / Group)</option>
                  <option value={5}>5 Adults</option>
                  <option value={6}>6 Adults</option>
                </select>
              </div>

              <div>
                <label htmlFor="special-requests" className="block text-xs font-semibold text-[#12263A] mb-1.5">
                  Special Requests / Dietary Preferences (Optional)
                </label>
                <textarea
                  id="special-requests"
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Vegetarian thali, ground floor room, child car seat..."
                  className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring resize-none"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Coupon Input & Price Summary & Pay Now */}
        <div className="space-y-6">
          {/* Coupon Box */}
          <div className="bg-white rounded-2xl border border-[#DCE5E4] p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#12263A] mb-3 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#1B8A8F]" />
              <span>Promo Code</span>
            </h3>

            {appliedCoupon ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-[10px] flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-emerald-800">
                    {appliedCoupon.code} Applied
                  </div>
                  <div className="text-[11px] text-emerald-700">
                    Saved {formatINR(discountAmount)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="text-xs font-semibold text-emerald-800 hover:text-red-700 focus-ring px-2 py-1"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <div className="flex gap-2">
                  <label htmlFor="coupon-input" className="sr-only">
                    Coupon Code
                  </label>
                  <input
                    id="coupon-input"
                    type="text"
                    placeholder="e.g. FLY1500"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 text-xs font-mono font-semibold uppercase text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3 py-2 focus-ring"
                  />
                  <button
                    type="submit"
                    disabled={validatingCoupon}
                    className="text-xs font-bold text-white bg-[#12263A] hover:bg-[#1f3750] px-4 py-2 rounded-[10px] transition-colors focus-ring shrink-0"
                  >
                    {validatingCoupon ? 'Checking...' : 'Apply'}
                  </button>
                </div>

                {couponMessage && (
                  <p
                    className={`text-xs ${
                      couponMessage.type === 'success' ? 'text-emerald-700' : 'text-[#C0392B]'
                    }`}
                  >
                    {couponMessage.text}
                  </p>
                )}

                <div className="text-[11px] text-[#5B6B7A]">
                  Try code <span className="font-mono font-semibold text-[#12263A]">FLY1500</span> or{' '}
                  <span className="font-mono font-semibold text-[#12263A]">RIDEFREE</span>
                </div>
              </form>
            )}
          </div>

          {/* Price Summary */}
          <div className="bg-white rounded-2xl border border-[#DCE5E4] p-6 shadow-xs">
            <h3 className="text-sm font-bold text-[#12263A] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Fare Breakdown
            </h3>

            <div className="space-y-2.5 text-xs text-[#5B6B7A]">
              <div className="flex justify-between">
                <span>Base Fare ({formatINR(tour.priceFrom)} × {travellers})</span>
                <span className="text-[#12263A] font-semibold tabular-nums">{formatINR(baseFare)}</span>
              </div>

              <div className="flex justify-between">
                <span>GST &amp; Tourism Taxes (5%)</span>
                <span className="text-[#12263A] font-semibold tabular-nums">{formatINR(taxAmount)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span className="tabular-nums">- {formatINR(discountAmount)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-[#DCE5E4] flex justify-between items-baseline text-base font-bold text-[#12263A]">
                <span>Total Payable</span>
                <span className="text-xl text-[#1B8A8F] tabular-nums font-extrabold">
                  {formatINR(totalAmount)}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DCE5E4]">
              <button
                type="submit"
                form="checkout-form"
                disabled={submitting}
                className="w-full py-3.5 text-xs font-bold text-white bg-[#1B8A8F] hover:bg-[#157175] active:bg-[#0f5558] rounded-[10px] transition-colors focus-ring flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{submitting ? 'Confirming Booking...' : `Pay ${formatINR(totalAmount)}`}</span>
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#5B6B7A]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1B8A8F]" />
                <span>Simulated 256-bit secure gateway · Instant confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
