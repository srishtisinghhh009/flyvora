import React, { useState } from 'react';
import { Logo } from './Logo';
import { ShieldCheck, MapPin, Mail, Phone, Clock, HelpCircle, CheckCircle2, Send, AlertCircle, Compass, Heart } from 'lucide-react';

export const AboutContactPage: React.FC = () => {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      q: "What is Flyvora and how does it help travelers in India?",
      a: "Flyvora is an India-wide travel discovery and trip-planning platform. We curate verified destination intelligence, handpicked heritage hotels, transparent outstation taxi calculations, and an interactive day-by-day itinerary builder with real-time budget forecasting."
    },
    {
      q: "Can I make live paid hotel or tour bookings right now?",
      a: "Currently, Flyvora is in active frontend demonstration and pilot preview. All rates, room categories, and tour itineraries shown are representative market benchmarks. Enquiries submitted simulate the reservation process without charging any financial payment."
    },
    {
      q: "How are taxi fares calculated on the Transport page?",
      a: "Taxi fares are computed using an open distance formula based on verified highway route kilometres, standard vehicle per-km rates (e.g. ₹14/km for Sedans, ₹20/km for Innova SUVs), driver daily outstation allowances, and average state border/toll fees."
    },
    {
      q: "Which states and union territories in India are covered?",
      a: "Flyvora covers all 28 states and 8 Union Territories—from Himachal Pradesh and Ladakh in the north, to Tamil Nadu and Kerala in the south, Rajasthan and Gujarat in the west, and Meghalaya, Sikkim, and Assam in the northeast."
    },
    {
      q: "How does the custom Trip Planner work?",
      a: "The Trip Planner lets you choose your target destination, duration in days, and travel style. You can add or reorder activities by time of day, specify estimated entry/ticket costs, and save your plan directly in your browser or print an offline summary."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="py-12 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FF5500] uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" />
              <span>About Flyvora — Explore More</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Unveiling India with Passion, Precision, and Cultural Depth
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              India is a subcontinent of boundless grandeur—home to 42 UNESCO World Heritage sites, 22 official languages, thousands of culinary nuances, and landscapes stretching from frozen Himalayan passes to Arabian Sea palm groves.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Flyvora was conceived to bridge the gap between fragmented travel blogs, opaque taxi fares, and complex tour packages. We provide an authentic, editorial, and interactive discovery engine where travelers can plan memorable journeys with transparent budget guidance.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="text-2xl font-black text-slate-900 font-display">30+</div>
                <div className="text-xs text-slate-500 mt-0.5">States & Union Territories Catalogued</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="text-2xl font-black text-[#FF5500] font-display">100%</div>
                <div className="text-xs text-slate-500 mt-0.5">Transparent Fare Logic</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-[4/3] bg-slate-100">
              <img
                src="/assets/images/dest_varanasi_ghats_1791892084869.jpg"
                alt="Atmospheric Ganga Aarti ceremony in Varanasi"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#0088FF] uppercase tracking-wider">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpen === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    <span className="text-slate-400 font-normal shrink-0 text-lg">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Form & Channel Information */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider">
                Get in Touch
              </span>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Flyvora Travel Desk
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Have questions about a customized route, corporate group tour, or want to partner as a heritage property host? Send us a note.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Registered Office</div>
                  <div className="text-slate-500">Connaught Place, New Delhi 110001, India</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#0088FF] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Working Hours</div>
                  <div className="text-slate-500">Monday – Saturday: 09:30 AM to 07:30 PM IST</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Electronic Support Desk</div>
                  <div className="text-slate-500">concierge@flyvora.in (Demo Channel)</div>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 leading-relaxed">
              <strong>Platform Notice:</strong> Live customer support lines are connected during active production deployments. Please use this demo enquiry form for preview testing.
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-8 text-center bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Message Transmitted (Demo)</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you, {formData.name}. In a connected production environment, your ticket would be dispatched to a Flyvora travel concierge specialist.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-4 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Singh"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#FF5500]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#FF5500]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Custom Rajasthan 7-day tour with chauffeur"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#FF5500]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we assist your journey?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#FF5500]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-bold text-white bg-slate-900 hover:bg-[#FF5500] rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message (Demo)</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
