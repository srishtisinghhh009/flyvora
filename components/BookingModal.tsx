import React, { useState } from 'react';
import { X, CheckCircle2, ShieldAlert, ArrowRight, User, Mail, Phone, Calendar, Users, DollarSign, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    title: string;
    type: string;
    subtext?: string;
    pricePerUnit?: number;
    image?: string;
  } | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  bookingData
}) => {
  const [step, setStep] = useState<'details' | 'review' | 'confirmed'>('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState('2026-11-15');
  const [travelersCount, setTravelersCount] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen || !bookingData) return null;

  const basePrice = bookingData.pricePerUnit || 15000;
  const subtotal = basePrice * travelersCount;
  const gstTax = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + gstTax;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please enter traveler full name.';
    if (!email.trim() || !email.includes('@')) errs.email = 'Please enter a valid email address.';
    if (!phone.trim()) errs.phone = 'Please enter a mobile contact number.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStep('review');
    }
  };

  const handleConfirmDemo = () => {
    setStep('confirmed');
  };

  const handleClose = () => {
    setStep('details');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 relative my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-800 bg-white/80 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white border-b border-slate-800">
          <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">
            Demo Travel Reservation & Enquiry
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display mt-0.5">
            {bookingData.title}
          </h2>
          {bookingData.subtext && (
            <p className="text-xs text-slate-300 mt-1">{bookingData.subtext}</p>
          )}

          {/* Step indicator */}
          <div className="flex items-center gap-2 mt-4 text-xs font-medium">
            <span className={`px-2.5 py-1 rounded-full ${step === 'details' ? 'bg-[#FF5500] text-white' : 'bg-white/20 text-slate-300'}`}>
              1. Traveler Details
            </span>
            <span className="text-slate-600">→</span>
            <span className={`px-2.5 py-1 rounded-full ${step === 'review' ? 'bg-[#FF5500] text-white' : 'bg-white/20 text-slate-300'}`}>
              2. Review & Confirm
            </span>
            <span className="text-slate-600">→</span>
            <span className={`px-2.5 py-1 rounded-full ${step === 'confirmed' ? 'bg-emerald-600 text-white' : 'bg-white/20 text-slate-300'}`}>
              3. Demo Confirmation
            </span>
          </div>
        </div>

        {/* Notice Banner */}
        <div className="p-3 bg-amber-50/90 border-b border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Frontend Demo Only:</strong> No financial transaction or payment card is requested. Submitting this flow generates a simulated confirmation.
          </span>
        </div>

        {/* Step 1: Details */}
        {step === 'details' && (
          <form onSubmit={handleProceedToReview} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Lead Traveler Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Priya Iyer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#FF5500]"
                />
                {errors.name && <span className="text-[11px] text-red-500">{errors.name}</span>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Email Address *</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#FF5500]"
                />
                {errors.email && <span className="text-[11px] text-red-500">{errors.email}</span>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#FF5500]"
                />
                {errors.phone && <span className="text-[11px] text-red-500">{errors.phone}</span>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Travel Date</label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#FF5500]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Number of Travelers</label>
              <input
                type="number"
                min="1"
                max="20"
                value={travelersCount}
                onChange={(e) => setTravelersCount(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#FF5500] tabular-nums"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Special Notes or Room Preferences</label>
              <textarea
                rows={2}
                placeholder="Vegetarian meals, ground floor room, airport pickup timing, etc."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#FF5500]"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Estimated Subtotal: <strong className="text-slate-900 tabular-nums">₹{subtotal.toLocaleString('en-IN')}</strong>
              </div>

              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-[#FF5500] rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Continue to Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Review */}
        {step === 'review' && (
          <div className="p-6 space-y-5">
            <h3 className="text-sm font-bold text-slate-900">Review Reservation Summary</h3>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Item:</span>
                <span className="font-bold text-slate-900">{bookingData.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Lead Traveler:</span>
                <span className="font-semibold text-slate-800">{name} ({phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Travelers:</span>
                <span className="font-semibold text-slate-800">{travelDate} · {travelersCount} Travelers</span>
              </div>
              {specialRequests && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Special Notes:</span>
                  <span className="font-semibold text-slate-800">{specialRequests}</span>
                </div>
              )}
            </div>

            {/* Price breakdown table */}
            <div className="p-4 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Base Rate (₹{basePrice.toLocaleString('en-IN')} × {travelersCount}):</span>
                <span className="font-semibold tabular-nums text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & GST (5%):</span>
                <span className="font-semibold tabular-nums text-slate-800">₹{gstTax.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                <span>Total Indicative Amount:</span>
                <span className="tabular-nums text-base text-[#FF5500]">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
              >
                ← Back to Edit
              </button>

              <button
                type="button"
                onClick={handleConfirmDemo}
                className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3D00] hover:from-[#e64d00] rounded-lg shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Confirm Demo Booking</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 'confirmed' && (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                Demo Reservation Verified
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-display mt-1">
                Booking Reference: #FLY-{Math.floor(100000 + Math.random() * 900000)}
              </h3>
              <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto">
                A simulated confirmation was logged for <strong>{name}</strong> for <strong>{bookingData.title}</strong> on <strong>{travelDate}</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 max-w-md mx-auto text-left space-y-1">
              <div><strong>Status:</strong> Demo Prototype Confirmation</div>
              <div><strong>Payment:</strong> ₹0 charged (frontend-only environment)</div>
              <div><strong>Email Dispatch:</strong> Stored locally in prototype memory</div>
            </div>

            <button
              onClick={handleClose}
              className="px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-[#FF5500] rounded-lg transition-colors"
            >
              Return to Platform
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
