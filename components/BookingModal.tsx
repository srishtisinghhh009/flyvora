import React, { useEffect, useId, useRef, useState } from 'react';
import { CheckCircle2, Send, X } from 'lucide-react';
import { cleanIndianPhone, isValidEmail, todayLocal } from '../utils/forms';
import { submitLead } from '../api/leads';

/**
 * Enquiry modal for hotels, tour packages and wishlist items.
 * It keeps the same props as the old booking modal, so App.tsx needs no change.
 * Nothing is booked or paid here: the visitor sends an enquiry and we reply with a confirmed price.
 */

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

export interface EnquiryRequest {
  type: 'enquiry';
  itemTitle: string;
  itemType: string;
  name: string;
  phone: string;
  email: string;
  travelDate: string;
  travelers: number;
  message: string;
}

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'travelDate' | 'travelers', string>>;

const inputClass =
  'w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 ' +
  'placeholder:text-slate-400 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF5500]';
const labelClass = 'block text-xs font-semibold text-slate-700 mb-1.5';

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, bookingData }) => {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<EnquiryRequest | null>(null);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState('');

  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  // App.tsx passes a new onClose function on every render; keep it in a ref so the effect below runs once per open.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Reset the form each time the modal opens for an item.
  useEffect(() => {
    if (isOpen) {
      setName('');
      setPhone('');
      setEmail('');
      setTravelDate('');
      setTravelers(2);
      setMessage('');
      setErrors({});
      setSent(null);
      setSending(false);
      setServerError('');
    }
  }, [isOpen, bookingData?.title]);

  // Escape to close, lock page scroll, move focus in, return focus on close.
  useEffect(() => {
    if (!isOpen) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', onKey);
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 0);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(t);
      returnFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen || !bookingData) return null;

  const isHotel = /hotel/i.test(bookingData.type);
  const guestsLabel = isHotel ? 'Guests' : 'Travelers';
  const dateLabel = isHotel ? 'Check-in date' : 'Preferred travel date';

  const validate = (): Errors => {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = 'Enter your name.';
    if (!cleanIndianPhone(phone)) e.phone = 'Enter a valid 10-digit mobile number.';
    if (email.trim() && !isValidEmail(email)) e.email = 'Enter a valid email address or leave it empty.';
    if (!travelDate) e.travelDate = 'Choose a date.';
    else if (travelDate < todayLocal()) e.travelDate = 'The date cannot be in the past.';
    if (!Number.isFinite(travelers) || travelers < 1 || travelers > 30) {
      e.travelers = `${guestsLabel} must be between 1 and 30.`;
    }
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (sending) return;
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const data: EnquiryRequest = {
      type: 'enquiry',
      itemTitle: bookingData.title,
      itemType: bookingData.type,
      name: name.trim(),
      phone: cleanIndianPhone(phone)!,
      email: email.trim(),
      travelDate,
      travelers,
      message: message.trim()
    };

    setSending(true);
    setServerError('');
    try {
      await submitLead({ ...data, source: 'enquiry-modal' });
      setSent(data);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const err = (f: keyof Errors) =>
    errors[f] ? <p id={id(`${f}-err`)} className="text-xs text-red-600 mt-1">{errors[f]}</p> : null;
  const aria = (f: keyof Errors) => ({
    'aria-invalid': errors[f] ? true : undefined,
    'aria-describedby': errors[f] ? id(`${f}-err`) : undefined
  });

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-slate-900/60 p-0 sm:p-4"
      onMouseDown={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={id('title')}
        className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 p-2 rounded-xl text-slate-500 hover:bg-slate-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF5500]"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {sent ? (
          <div role="status" className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-emerald-600 font-semibold mb-2">
              <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
              Enquiry received
            </div>
            <h2 id={id('title')} className="font-display text-xl font-bold text-slate-900 mb-2">
              Thanks, {sent.name.split(' ')[0]}.
            </h2>
            <p className="text-sm text-slate-600 mb-1">
              We'll contact you shortly on {sent.phone} with availability and the final price for{' '}
              <span className="font-semibold">{sent.itemTitle}</span>.
            </p>
            <p className="text-xs text-slate-500 my-5">
              Nothing has been booked or charged yet. We will confirm availability and the final price first.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-4">
            <div className="pr-8">
              <p className="text-xs font-semibold text-[#FF5500] mb-1">Enquire about</p>
              <h2 id={id('title')} className="font-display text-xl font-bold text-slate-900">
                {bookingData.title}
              </h2>
              {bookingData.subtext && (
                <p className="text-sm text-slate-600 mt-1">{bookingData.subtext}</p>
              )}
              {bookingData.pricePerUnit ? (
                <p className="text-xs text-slate-500 mt-2">
                  Indicative rate from ₹{bookingData.pricePerUnit.toLocaleString('en-IN')}. We confirm the
                  final price and availability after your enquiry.
                </p>
              ) : null}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={id('name')} className={labelClass}>Your name</label>
                <input ref={firstFieldRef} id={id('name')} className={inputClass} value={name}
                  autoComplete="name" onChange={e => setName(e.target.value)} {...aria('name')} />
                {err('name')}
              </div>
              <div>
                <label htmlFor={id('phone')} className={labelClass}>Mobile number</label>
                <input id={id('phone')} className={inputClass} value={phone} type="tel" inputMode="tel"
                  autoComplete="tel" placeholder="98XXXXXXXX" onChange={e => setPhone(e.target.value)}
                  {...aria('phone')} />
                {err('phone')}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={id('email')} className={labelClass}>Email (optional)</label>
                <input id={id('email')} className={inputClass} value={email} type="email"
                  autoComplete="email" onChange={e => setEmail(e.target.value)} {...aria('email')} />
                {err('email')}
              </div>
              <div>
                <label htmlFor={id('date')} className={labelClass}>{dateLabel}</label>
                <input id={id('date')} type="date" className={inputClass} value={travelDate}
                  min={todayLocal()} onChange={e => setTravelDate(e.target.value)} {...aria('travelDate')} />
                {err('travelDate')}
              </div>
              <div>
                <label htmlFor={id('guests')} className={labelClass}>{guestsLabel}</label>
                <input id={id('guests')} type="number" min={1} max={30} className={inputClass}
                  value={travelers} onChange={e => setTravelers(parseInt(e.target.value, 10))}
                  {...aria('travelers')} />
                {err('travelers')}
              </div>
            </div>

            <div>
              <label htmlFor={id('msg')} className={labelClass}>Anything else? (optional)</label>
              <textarea id={id('msg')} rows={3} className={inputClass} value={message}
                placeholder="Room preference, number of nights, special requests..."
                onChange={e => setMessage(e.target.value)} />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FF5500] text-white text-sm font-semibold hover:bg-[#e64d00] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5500]"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              {sending ? 'Sending...' : 'Send enquiry'}
            </button>
            {serverError && (
              <p role="alert" className="text-sm text-red-600">
                {serverError}
              </p>
            )}
            <p className="text-xs text-slate-500">No payment is taken. We reply with availability and a final price.</p>
          </form>
        )}
      </div>
    </div>
  );
};