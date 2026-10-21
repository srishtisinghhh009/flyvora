import React from 'react';
import { Car, Clock, Route, UserCheck } from 'lucide-react';
import { TaxiQuoteForm } from './TaxiQuoteForm';

interface HomepageTaxiSectionProps {
  /** Kept only so App.tsx still compiles. No longer used. */
  onEnquireTaxiDemo?: (details: any) => void;
}

const POINTS = [
  {
    icon: Route,
    title: 'Outstation, one-way and round trips',
    text: 'Tell us where you are going and when. We work out the route with a local driver.'
  },
  {
    icon: Clock,
    title: 'Price within 1 hour',
    text: 'You get a final quote from us instead of a guess from a calculator.'
  },
  {
    icon: UserCheck,
    title: 'Driver details before pickup',
    text: 'We share the driver and vehicle details with you before the trip.'
  }
];

export const HomepageTaxiSection: React.FC<HomepageTaxiSectionProps> = () => {
  return (
    <section
      id="homepage-taxi-section"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24"
    >
      <div className="grid lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FF5500] mb-2">
              <Car className="w-4 h-4" aria-hidden="true" />
              Taxi and transfers
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Request a taxi quote
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Instant taxi booking in the Flyvora app is coming soon. Until then,
              send us your trip details and we will arrange it with a local driver.
            </p>
          </div>

          <ul className="space-y-4">
            {POINTS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#FF5500]">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{title}</p>
                  <p className="text-sm text-slate-600">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <TaxiQuoteForm />
        </div>
      </div>
    </section>
  );
};