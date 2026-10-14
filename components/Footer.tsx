import React, { useState } from 'react';
import { Logo } from './Logo';
import { PageTab } from '../types';
import { ArrowRight, Mail, ShieldCheck, Heart, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenSearch: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenSearch }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setNewsletterDone(true);
      setTimeout(() => {
        setNewsletterDone(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter / Dispatch Bar */}
        <div className="bg-slate-800/80 rounded-2xl p-6 sm:p-8 border border-slate-700/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-lg">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
              Curated Travel Dispatch
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              Get Seasonal India Travel Guides & Festival Dates
            </h3>
            <p className="text-xs text-slate-300">
              Receive handpicked seasonal recommendations for Pushkar Camel Fair, Hemis Ladakh festival, and winter Himalayan trails.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="flex-1 max-w-md">
            {newsletterDone ? (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you! You are subscribed to Flyvora Travel Dispatches.</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#FF5500]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3D00] hover:from-[#e64d00] rounded-lg transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* 4-Column Navigation Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/95 inline-block p-2 rounded-xl">
              <Logo size="sm" />
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Flyvora is an India-wide travel discovery and trip-planning platform. Helping domestic and international voyagers explore destinations, compare verified hotels, calculate transparent taxi fares, and build custom itineraries.
            </p>
            <div className="text-[11px] text-slate-500 space-y-1">
              <div>📍 Registered Hub: New Delhi 110001, India</div>
              <div>⚡ Prototype Status: Frontend preview & interactive planner</div>
            </div>
          </div>

          {/* Col 2: Destinations by Region */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Explore by Region
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => setActiveTab('destinations')} className="hover:text-white transition-colors">
                  North India (Himalayas & Forts)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('destinations')} className="hover:text-white transition-colors">
                  South India (Backwaters & Temples)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('destinations')} className="hover:text-white transition-colors">
                  West India (Goa & Rajasthan)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('destinations')} className="hover:text-white transition-colors">
                  East & Northeast (Tea Hills & Roots)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('destinations')} className="hover:text-white transition-colors">
                  Spiritual Corridors (Kashi & Haridwar)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Stays */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Planning & Services
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => setActiveTab('planner')} className="hover:text-white transition-colors">
                  Custom Day-by-Day Trip Planner
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('budget')} className="hover:text-white transition-colors">
                  Live Budget Tracker
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('hotels')} className="hover:text-white transition-colors">
                  Heritage Palaces & Stays
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tours')} className="hover:text-white transition-colors">
                  Curated Tour Packages
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('transport')} className="hover:text-white transition-colors">
                  Outstation Taxi & Transfers
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('guides')} className="hover:text-white transition-colors">
                  Editorial Travel Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              About & Trust
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors">
                  About Flyvora
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-white transition-colors">
                  Contact Specialist Desk
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <span className="text-slate-500">Terms & Conditions (Demo)</span>
              </li>
              <li>
                <span className="text-slate-500">Privacy & Cookie Policy</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Flyvora. All rights reserved. Built for discerning Indian and global voyagers.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Transparent Fare Estimates</span>
            </span>
            <span>·</span>
            <span className="text-slate-400">30+ States Represented</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
