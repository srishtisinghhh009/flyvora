import React, { useId, useState } from 'react';
import { CheckCircle2, MessageCircle, Send } from 'lucide-react';

/**
 * WhatsApp number that receives quote requests.
 * Format: country code + number, digits only. Example: '919876543210'
 * TODO: replace the placeholder below with your real number.
 */
export const WHATSAPP_NUMBER = '91XXXXXXXXXX';

export interface TaxiQuoteRequest {
  type: 'taxi';
  name: string;
  phone: string;
  pickupCity: string;
  dropCity: string;
  travelDate: string;
  pickupTime: string;
  passengers: number;
  vehicleType: string;
  message: string;
}

interface TaxiQuoteFormProps {
  /** Pre-fill pickup/drop (used by the popular routes list). */
  initialPickup?: string;
  initialDrop?: string;
  /** Called after a valid submit. Later this is where the API call goes. */
  onSubmitted?: (data: TaxiQuoteRequest) => void;
}

const VEHICLE_CHOICES = [
  { value: 'any', label: 'Not sure, suggest one' },
  { value: 'hatchback', label: 'Economy Hatchback (up to 4)' },
  { value: 'sedan', label: 'Sedan (up to 4)' },
  { value: 'suv', label: 'Family SUV (up to 6)' },
  { value: 'premium-suv', label: 'Premium SUV (up to 7)' },
  { value: 'tempo', label: 'Tempo Traveller (up to 14)' }
];

type FormErrors = Partial<Record<'name' | 'phone' | 'pickupCity' | 'dropCity' | 'travelDate' | 'passengers', string>>;

function todayLocal(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Accepts 10-digit Indian mobile numbers, with or without +91 / 0. */
function cleanIndianPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');
  const ten = digits.length === 12 && digits.startsWith('91') ? digits.slice(2)
    : digits.length === 11 && digits.startsWith('0') ? digits.slice(1)
    : digits;
  return /^[6-9]\d{9}$/.test(ten) ? ten : null;
}

const inputClass =
  'w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 ' +
  'placeholder:text-slate-400 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF5500]';
const labelClass = 'block text-xs font-semibold text-slate-700 mb-1.5';

export const TaxiQuoteForm: React.FC<TaxiQuoteFormProps> = ({
  initialPickup = '',
  initialDrop = '',
  onSubmitted
}) => {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupCity, setPickupCity] = useState(initialPickup);
  const [dropCity, setDropCity] = useState(initialDrop);
  const [travelDate, setTravelDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [passengers, setPassengers] = useState(2);
  const [vehicleType, setVehicleType] = useState('any');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<TaxiQuoteRequest | null>(null);

  const validate = (needContact: boolean): FormErrors => {
    const e: FormErrors = {};
    if (needContact && name.trim().length < 2) e.name = 'Enter your name.';
    if (needContact && !cleanIndianPhone(phone)) e.phone = 'Enter a valid 10-digit mobile number.';
    if (!pickupCity.trim()) e.pickupCity = 'Enter the pickup city.';
    if (!dropCity.trim()) e.dropCity = 'Enter the drop city.';
    if (!travelDate) e.travelDate = 'Choose a travel date.';
    else if (travelDate < todayLocal()) e.travelDate = 'Travel date cannot be in the past.';
    if (!Number.isFinite(passengers) || passengers < 1 || passengers > 14) {
      e.passengers = 'Passengers must be between 1 and 14.';
    }
    return e;
  };

  const vehicleLabel = VEHICLE_CHOICES.find(v => v.value === vehicleType)?.label ?? vehicleType;

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate(true);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const data: TaxiQuoteRequest = {
      type: 'taxi',
      name: name.trim(),
      phone: cleanIndianPhone(phone)!,
      pickupCity: pickupCity.trim(),
      dropCity: dropCity.trim(),
      travelDate,
      pickupTime,
      passengers,
      vehicleType,
      message: message.trim()
    };

    // Temporary: no backend yet. Replace with an API call later.
    console.log('Taxi quote request', data);
    onSubmitted?.(data);
    setSubmitted(data);
  };

  const handleWhatsApp = () => {
    const e = validate(false);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const lines = [
      'Hi Flyvora, I need a taxi quote.',
      `From: ${pickupCity.trim()}`,
      `To: ${dropCity.trim()}`,
      `Date: ${travelDate}${pickupTime ? ` at ${pickupTime}` : ''}`,
      `Passengers: ${passengers}`,
      `Vehicle: ${vehicleLabel}`
    ];
    if (name.trim()) lines.push(`Name: ${name.trim()}`);
    if (message.trim()) lines.push(`Note: ${message.trim()}`);

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const resetForm = () => {
    setSubmitted(null);
    setErrors({});
    setTravelDate('');
    setPickupTime('');
    setMessage('');
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="bg-white border border-emerald-200 rounded-2xl p-6 sm:p-8 shadow-sm"
      >
        <div className="flex items-center gap-2 text-emerald-600 font-semibold mb-2">
          <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
          Request received
        </div>
        <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
          Thanks, {submitted.name.split(' ')[0]}.
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          We'll share the final price within 1 hour.
        </p>
        <dl className="text-sm text-slate-700 space-y-1 mb-5">
          <div><dt className="inline font-semibold">Route: </dt><dd className="inline">{submitted.pickupCity} to {submitted.dropCity}</dd></div>
          <div><dt className="inline font-semibold">Date: </dt><dd className="inline">{submitted.travelDate}{submitted.pickupTime ? ` at ${submitted.pickupTime}` : ''}</dd></div>
          <div><dt className="inline font-semibold">Passengers: </dt><dd className="inline">{submitted.passengers}</dd></div>
        </dl>
        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-5">
          Demo notice: this request is not saved anywhere yet. Use the WhatsApp button to reach us for now.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="text-sm font-semibold text-[#FF5500] hover:underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF5500] rounded"
        >
          Send another request
        </button>
      </div>
    );
  }

  const err = (field: keyof FormErrors) =>
    errors[field] ? (
      <p id={id(`${field}-err`)} className="text-xs text-red-600 mt-1">{errors[field]}</p>
    ) : null;
  const aria = (field: keyof FormErrors) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? id(`${field}-err`) : undefined
  });

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-sm space-y-4"
      aria-label="Request a taxi quote"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={id('name')} className={labelClass}>Your name</label>
          <input id={id('name')} className={inputClass} value={name} autoComplete="name"
            onChange={e => setName(e.target.value)} {...aria('name')} />
          {err('name')}
        </div>
        <div>
          <label htmlFor={id('phone')} className={labelClass}>Mobile number</label>
          <input id={id('phone')} className={inputClass} value={phone} type="tel" inputMode="tel"
            autoComplete="tel" placeholder="98XXXXXXXX" onChange={e => setPhone(e.target.value)} {...aria('phone')} />
          {err('phone')}
        </div>
        <div>
          <label htmlFor={id('pickup')} className={labelClass}>Pickup city</label>
          <input id={id('pickup')} className={inputClass} value={pickupCity} placeholder="e.g. Delhi"
            onChange={e => setPickupCity(e.target.value)} {...aria('pickupCity')} />
          {err('pickupCity')}
        </div>
        <div>
          <label htmlFor={id('drop')} className={labelClass}>Drop city</label>
          <input id={id('drop')} className={inputClass} value={dropCity} placeholder="e.g. Agra"
            onChange={e => setDropCity(e.target.value)} {...aria('dropCity')} />
          {err('dropCity')}
        </div>
        <div>
          <label htmlFor={id('date')} className={labelClass}>Travel date</label>
          <input id={id('date')} type="date" className={inputClass} value={travelDate} min={todayLocal()}
            onChange={e => setTravelDate(e.target.value)} {...aria('travelDate')} />
          {err('travelDate')}
        </div>
        <div>
          <label htmlFor={id('time')} className={labelClass}>Pickup time (optional)</label>
          <input id={id('time')} type="time" className={inputClass} value={pickupTime}
            onChange={e => setPickupTime(e.target.value)} />
        </div>
        <div>
          <label htmlFor={id('pax')} className={labelClass}>Passengers</label>
          <input id={id('pax')} type="number" min={1} max={14} className={inputClass} value={passengers}
            onChange={e => setPassengers(parseInt(e.target.value, 10))} {...aria('passengers')} />
          {err('passengers')}
        </div>
        <div>
          <label htmlFor={id('vehicle')} className={labelClass}>Vehicle</label>
          <select id={id('vehicle')} className={inputClass} value={vehicleType}
            onChange={e => setVehicleType(e.target.value)}>
            {VEHICLE_CHOICES.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={id('msg')} className={labelClass}>Anything else? (optional)</label>
        <textarea id={id('msg')} rows={3} className={inputClass} value={message}
          placeholder="Luggage, stops on the way, child seat, return date..."
          onChange={e => setMessage(e.target.value)} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FF5500] text-white text-sm font-semibold hover:bg-[#e64d00] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5500]"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
          Request a quote
        </button>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#059669] text-white text-sm font-semibold hover:bg-[#047857] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#059669]"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          Get quote on WhatsApp
        </button>
      </div>
      <p className="text-xs text-slate-500">We'll share the final price within 1 hour.</p>
    </form>
  );
};