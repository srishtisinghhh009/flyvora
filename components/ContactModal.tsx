import React, { useState } from 'react';
import { X, CheckCircle2, ShieldAlert, Send, Phone, Mail, MapPin, Calendar, MessageSquare } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDestination?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultDestination = ''
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [destination, setDestination] = useState(defaultDestination);
  const [dates, setDates] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your full name.';
    if (!contact.trim()) errs.contact = 'Please provide your email address or phone number.';
    if (!message.trim()) errs.message = 'Please provide a brief message or requirements.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setContact('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 relative my-6 flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-700 bg-white/80 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close contact dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Travel Photography Banner (Stacks vertically on mobile) */}
        <div className="md:w-5/12 relative bg-slate-900 min-h-[200px] md:min-h-full">
          <img
            src="/assets/images/dest_rajasthan_heritage_1791892028463.jpg"
            alt="Majestic Amber Palace in Rajasthan"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block">
              Flyvora Travel Concierge
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display leading-tight">
              Personalized India Journeys
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Connect with experienced travel specialists for bespoke Rajasthan palace circuits, Himalayan expeditions, and South India backwater cruises.
            </p>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          {submitted ? (
            <div className="py-8 text-center space-y-4 my-auto">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Enquiry Received!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. Your enquiry for <strong>{destination || 'India exploration'}</strong> has been simulated.
              </p>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 max-w-sm mx-auto">
                <strong>Frontend Demo Notice:</strong> This is a frontend demo interface. No data was transmitted to an external mail server or CRM.
              </div>
              <button
                onClick={handleResetAndClose}
                className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-[#FF5500] rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <div>
                <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider block">
                  Trip Enquiry & Support
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-display">
                  Talk to a Travel Specialist
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your preferred travel details below and our team will get in touch.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Aarav Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#FF5500]"
                  />
                  {errors.name && <span className="text-[11px] text-red-500 block">{errors.name}</span>}
                </div>

                {/* Contact (Email or phone) */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Email Address or Phone *</label>
                  <input
                    type="text"
                    placeholder="e.g. name@example.com or +91 98765 43210"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#FF5500]"
                  />
                  {errors.contact && <span className="text-[11px] text-red-500 block">{errors.contact}</span>}
                </div>

                {/* Destination & Travel Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Destination of Interest</label>
                    <input
                      type="text"
                      placeholder="e.g. Rajasthan, Kerala, Kashmir"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#FF5500]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Tentative Dates</label>
                    <input
                      type="text"
                      placeholder="e.g. Nov 2026, 5 Days"
                      value={dates}
                      onChange={(e) => setDates(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#FF5500]"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Message / Requirements *</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about the number of travelers, style preferences, or any specific requests..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#FF5500]"
                  />
                  {errors.message && <span className="text-[11px] text-red-500 block">{errors.message}</span>}
                </div>

                {/* Disclaimer */}
                <div className="text-[10px] text-slate-400 italic">
                  Note: This enquiry is a frontend demo until a production backend or email API is connected.
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#FF5500] via-[#FF7700] to-[#FF3D00] hover:from-[#e64d00] hover:to-[#e63700] rounded-lg shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Trip Enquiry (Demo)</span>
                </button>
              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
