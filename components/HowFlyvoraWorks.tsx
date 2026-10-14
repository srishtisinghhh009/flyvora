import React from 'react';
import { PageTab } from '../types';
import { 
  Compass, 
  Calendar, 
  Car, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  CreditCard, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface HowFlyvoraWorksProps {
  setActiveTab: (tab: PageTab) => void;
}

export const HowFlyvoraWorks: React.FC<HowFlyvoraWorksProps> = ({ setActiveTab }) => {
  const threeSteps = [
    {
      step: '01',
      title: 'Discover & Select Destination',
      desc: 'Browse 30+ Indian states organized by mountains, heritage forts, spiritual ghats, and backwater coasts with verified season timing.',
      badgeColor: 'bg-orange-100 text-[#FF5500]',
      actionText: 'Browse 30+ States',
      actionTab: 'destinations' as PageTab
    },
    {
      step: '02',
      title: 'Build Day-by-Day Schedule',
      desc: 'Organize morning, afternoon, and evening excursions, customize pacing for families or couples, and save itineraries locally.',
      badgeColor: 'bg-blue-100 text-[#0088FF]',
      actionText: 'Open Trip Planner',
      actionTab: 'planner' as PageTab
    },
    {
      step: '03',
      title: 'Forecast Real-Time Costs',
      desc: 'Track transparent per-km highway taxi rates, heritage room tiers, and monument admission permits with live daily burn rates.',
      badgeColor: 'bg-purple-100 text-[#7B2CBF]',
      actionText: 'Calculate Budget',
      actionTab: 'budget' as PageTab
    }
  ];

  const signatureRoutes = [
    {
      id: 'golden-triangle',
      name: 'The Royal Golden Triangle',
      stops: 'Delhi → Agra → Fatehpur Sikri → Jaipur',
      duration: '6 Days · 5 Nights',
      distance: 'Approx. 480 km (Yamuna & Delhi-Mumbai Expressways)',
      highlight: 'Sunrise Taj Mahal, Amber Fort ramparts, and Old Delhi heritage street food.',
      tag: 'Heritage & Culture'
    },
    {
      id: 'kerala-trail',
      name: 'Kerala Backwaters & Western Ghats',
      stops: 'Kochi → Munnar Hills → Alleppey Canals',
      duration: '5 Days · 4 Nights',
      distance: 'Approx. 270 km (Ghat mountain roads & coastal NH66)',
      highlight: 'Emerald tea plantation trails, traditional wooden houseboat cruise, and Kathakali arts.',
      tag: 'Nature & Stays'
    },
    {
      id: 'himalayan-circuit',
      name: 'Himalayan Valleys & Alpine Tunnel',
      stops: 'Chandigarh → Shimla → Kullu → Manali → Sissu',
      duration: '6 Days · 5 Nights',
      distance: 'Approx. 390 km (4-lane Kiratpur expressway & hill routes)',
      highlight: 'Cedar forest nature trails, Atal Tunnel Rohtang, and Beas river rapids.',
      tag: 'Adventure & Mountains'
    },
    {
      id: 'spiritual-yatra',
      name: 'Sacred Ganga & Divine Yatra',
      stops: 'Varanasi → Prayagraj Sangam → Ayodhya',
      duration: '5 Days · 4 Nights',
      distance: 'Approx. 325 km (Purvanchal corridor)',
      highlight: 'Dashashwamedh evening Maha Aarti, holy Triveni Sangam, and Shri Ram Janmabhoomi.',
      tag: 'Spiritual'
    }
  ];

  const travelChecklist = [
    {
      title: 'Digital Payments & Small Cash',
      desc: 'UPI is accepted by 95% of vendors in India; keep small ₹10–₹100 notes for temple offerings, toll plazas, and porterage.'
    },
    {
      title: 'Temple Sanctum Etiquette',
      desc: 'Dress respectfully covering knees and shoulders. Slip-on footwear is recommended for effortless removal outside sacred plinths.'
    },
    {
      title: 'Intercity Train & Cab Bookings',
      desc: 'Book premium Vande Bharat or Shatabdi express trains 2–4 weeks in advance; for hill routes, book chauffeured SUVs for high clearance.'
    },
    {
      title: 'Seasonal Packing Discipline',
      desc: 'North India winters (Dec–Feb) require warm layers for morning fog; hill stations require rainproof jackets during monsoons.'
    }
  ];

  return (
    <section className="py-16 bg-white border-y border-slate-100 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Part 1: How Flyvora Works (3 Steps) */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider">
              Planning Made Effortless
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Build Your Indian Journey in Three Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Clear architecture that transforms fragmented travel research into an actionable, budgeted trip plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {threeSteps.map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-lg hover:border-orange-200 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-xl ${item.badgeColor} flex items-center justify-center font-extrabold text-sm font-display`}>
                    {item.step}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60">
                  <button
                    onClick={() => setActiveTab(item.actionTab)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5500] hover:text-[#e64d00] transition-colors"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Signature Travel Routes */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-[#0088FF] uppercase tracking-wider">
                Proven Highway & Rail Corridors
              </span>
              <h2 className="text-2xl font-bold text-slate-900 font-display mt-0.5">
                Popular Indian Travel Routes & Pacing
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('tours')}
              className="text-xs font-bold text-[#0088FF] hover:underline"
            >
              View Tour Itineraries →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {signatureRoutes.map((route) => (
              <div
                key={route.id}
                className="p-5 rounded-2xl border border-slate-200/80 bg-white hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#FF5500] uppercase tracking-wider">
                    {route.tag}
                  </span>
                  <span className="font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {route.duration}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {route.name}
                </h3>

                <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0088FF] shrink-0" />
                  <span>{route.stops}</span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {route.highlight}
                </p>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                  {route.distance}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 3: Pre-Trip Planning Checklist */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Essential Indian Travel Planning Checklist
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {travelChecklist.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200/70 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
