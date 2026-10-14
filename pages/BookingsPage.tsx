import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBookings, cancelBooking } from '../services/api';
import { Booking, BookingStatus } from '../types';
import { formatINR, formatDate } from '../utils/format';
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Compass,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cancel Confirmation Modal / Action State
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelFeedback, setCancelFeedback] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getBookings()
      .then((data) => {
        if (isMounted) {
          setBookings(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Failed to load bookings. Please try again.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleConfirmCancel = async () => {
    if (!bookingToCancel) return;
    setCancelling(true);
    setCancelFeedback(null);

    try {
      const updated = await cancelBooking(bookingToCancel.id);
      setBookings((prev) =>
        prev.map((b) => (b.id === updated.id ? updated : b))
      );
      setCancelFeedback(`Booking ${bookingToCancel.id} has been cancelled successfully.`);
      setBookingToCancel(null);
    } catch (err) {
      setCancelFeedback('Failed to cancel booking. Please try again.');
    } finally {
      setCancelling(false);
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-[8px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Confirmed</span>
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-[8px]">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B6B7A] bg-[#F5F8F7] border border-[#DCE5E4] px-2.5 py-0.5 rounded-[8px]">
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancelled</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-[1120px] mx-auto px-5 py-8 min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#5B6B7A] mb-2 font-medium">
            <Compass className="w-3.5 h-3.5 text-[#1B8A8F]" />
            <span>Trip History</span>
            <span>·</span>
            <span>Customer Portal</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-[#12263A]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            My Bookings
          </h1>
          <p className="mt-2 text-sm text-[#5B6B7A] leading-relaxed">
            Manage your confirmed itineraries, review driver contacts, or modify travel plans.
          </p>
        </div>

        <Link
          to="/tours"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1B8A8F] hover:bg-[#157175] px-4 py-2.5 rounded-[10px] transition-colors focus-ring shrink-0"
        >
          <span>Book Another Tour</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {cancelFeedback && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
          <span>{cancelFeedback}</span>
          <button
            type="button"
            onClick={() => setCancelFeedback(null)}
            className="font-bold underline text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#DCE5E4] h-40 animate-pulse p-6" />
          ))}
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl border border-[#DCE5E4] p-10 text-center">
          <p className="text-sm font-semibold text-[#C0392B]">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 text-xs font-semibold px-4 py-2 bg-[#1B8A8F] text-white rounded-[10px]"
          >
            Reload Bookings
          </button>
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#DCE5E4] p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#F5F8F7] border border-[#DCE5E4] flex items-center justify-center mx-auto text-[#5B6B7A]">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#12263A]" style={{ fontFamily: 'var(--font-heading)' }}>
              No bookings yet
            </h3>
            <p className="mt-1 text-xs text-[#5B6B7A]">
              You haven't reserved any Indian holiday tours. Explore our verified circuits to begin.
            </p>
          </div>
          <Link
            to="/tours"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1B8A8F] hover:bg-[#157175] px-4 py-2.5 rounded-[10px] focus-ring"
          >
            <span>Explore Tours</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl border border-[#DCE5E4] p-5 sm:p-6 transition-all hover:border-[#1B8A8F]/40"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#DCE5E4]">
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-xs font-mono font-bold text-[#12263A]">
                      {booking.id}
                    </span>
                    {getStatusBadge(booking.status)}
                  </div>

                  <h3
                    className="text-lg font-bold text-[#12263A]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    <Link to={`/tours/${booking.tourSlug}`} className="hover:text-[#1B8A8F] transition-colors focus-ring">
                      {booking.tourTitle}
                    </Link>
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#5B6B7A] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#1B8A8F]" />
                    <span>{booking.route}</span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <div className="text-[11px] text-[#5B6B7A]">Amount Paid</div>
                  <div className="text-lg font-bold text-[#12263A] tabular-nums">
                    {formatINR(booking.totalAmount)}
                  </div>
                  {booking.couponCode && (
                    <div className="text-[11px] text-emerald-700 font-medium">
                      Coupon: {booking.couponCode}
                    </div>
                  )}
                </div>
              </div>

              {/* Booking Metadata Row */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#5B6B7A]">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[#5B6B7A]">Departure</span>
                  <span className="font-semibold text-[#12263A]">{formatDate(booking.startDate)}</span>
                </div>

                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[#5B6B7A]">Travellers</span>
                  <span className="font-semibold text-[#12263A]">
                    {booking.travellers} Person{booking.travellers > 1 ? 's' : ''}
                  </span>
                </div>

                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[#5B6B7A]">Lead Guest</span>
                  <span className="font-semibold text-[#12263A] truncate block">{booking.travellerName}</span>
                </div>

                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[#5B6B7A]">Actions</span>
                  {booking.status !== 'Cancelled' ? (
                    <button
                      type="button"
                      onClick={() => setBookingToCancel(booking)}
                      className="text-xs font-semibold text-[#C0392B] hover:underline focus-ring"
                    >
                      Cancel Booking
                    </button>
                  ) : (
                    <span className="text-xs text-[#5B6B7A] italic">Refund processed</span>
                  )}
                </div>
              </div>

              {booking.specialRequests && (
                <div className="mt-3 pt-3 border-t border-[#DCE5E4] text-[11px] text-[#5B6B7A]">
                  <span className="font-medium text-[#12263A]">Requests:</span> {booking.specialRequests}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Cancel Confirmation Dialog Modal */}
      {bookingToCancel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#12263A]/40 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-dialog-title"
        >
          <div className="bg-white rounded-2xl border border-[#DCE5E4] max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-[#C0392B]">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-[#C0392B]" />
              </div>
              <div>
                <h3 id="cancel-dialog-title" className="text-base font-bold text-[#12263A]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Cancel this booking?
                </h3>
                <p className="text-xs text-[#5B6B7A]">
                  Booking ID: {bookingToCancel.id}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#5B6B7A] leading-relaxed">
              Are you sure you want to cancel your reservation for{' '}
              <strong className="text-[#12263A]">{bookingToCancel.tourTitle}</strong> on{' '}
              {formatDate(bookingToCancel.startDate)}? In accordance with Wayfold policy, no cancellation fee applies up to 7 days before.
            </p>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#DCE5E4]">
              <button
                type="button"
                onClick={() => setBookingToCancel(null)}
                disabled={cancelling}
                className="px-4 py-2 text-xs font-semibold text-[#12263A] bg-[#F5F8F7] hover:bg-white border border-[#DCE5E4] rounded-[10px] focus-ring"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                disabled={cancelling}
                className="px-4 py-2 text-xs font-bold text-white bg-[#C0392B] hover:bg-[#a92b20] rounded-[10px] focus-ring disabled:opacity-60"
              >
                {cancelling ? 'Cancelling...' : 'Yes, Cancel Reservation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
