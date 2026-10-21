import React, { useState } from 'react';
import { ArrowRight, Car, Clock, Navigation } from 'lucide-react';
import { POPULAR_ROUTES } from '../data/transport';
import { TaxiQuoteForm } from './TaxiQuoteForm';

interface TransportPageProps {
  /** Kept only so App.tsx still compiles. No longer used. */
  onEnquireTaxiDemo?: (details: any) => void;
}

export const TransportPage: React.FC<TransportPageProps> = () => {
  // Clicking a popular route pre-fills the form. `formKey` remounts the form with the new values.
  const [route, setRoute] = useState<{ from: string; to: string; key: number }>({
    from: '',
    to: '',
    key: 0
  });

  const pickRoute = (from: string, to: string) => {
    setRoute(prev => ({ from, to, key: prev.key + 1 }));
    document.getElementById('taxi-quote-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      <header className="max-w-2xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#FF5500] mb-2">
          <Car className="w-4 h-4" aria-hidden="true" />
          Taxi and transfers
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-slate-900 mb-3">
          Request a taxi quote
        </h1>
        <p className="text-slate-600">
          Instant taxi booking in the Flyvora app is coming soon. For now, send us your
          trip details and we will arrange a local driver. We'll share the final price
          within 1 hour.
        </p>
      </header>

      <div className="grid lg:grid-cols-5 gap-8 items-start">
        <div id="taxi-quote-form" className="lg:col-span-3 scroll-mt-24">
          <TaxiQuoteForm
            key={route.key}
            initialPickup={route.from}
            initialDrop={route.to}
          />
        </div>

        <aside className="lg:col-span-2" aria-labelledby="popular-routes-heading">
          <h2 id="popular-routes-heading" className="font-display text-xl font-bold text-slate-900 mb-1">
            Popular routes
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            Pick a route to fill in the form. Distance and drive time are approximate.
          </p>
          <ul className="space-y-2">
            {POPULAR_ROUTES.map(r => (
              <li key={`${r.from}-${r.to}`}>
                <button
                  type="button"
                  onClick={() => pickRoute(r.from, r.to)}
                  className="w-full flex items-center justify-between gap-3 text-left bg-white border border-slate-200/90 rounded-2xl px-4 py-3 hover:border-[#FF5500] hover:shadow-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF5500]"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    {r.from}
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                    {r.to}
                  </span>
                  <span className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
                    <span className="flex items-center gap-1">
                      <Navigation className="w-3 h-3" aria-hidden="true" />
                      {r.distanceKm} km
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {r.duration}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};