import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailTrimmed = email.trim();
    if (!emailTrimmed) {
      setError('Please provide an email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      setError('Please enter a valid email address (e.g., traveler@example.com).');
      return;
    }

    setSubmitted(true);
  };

  return (
    <section className="bg-white rounded-2xl border border-[#DCE5E4] p-8 md:p-10 my-16 text-center max-w-3xl mx-auto">
      <div className="max-w-xl mx-auto">
        <h3
          className="text-2xl font-bold text-[#12263A]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Curated India routes delivered monthly
        </h3>
        <p className="mt-2 text-sm text-[#5B6B7A] leading-relaxed">
          Receive seasonal permits updates, new offbeat hill trails, and member discounts once every month. No spam, ever.
        </p>

        {submitted ? (
          <div className="mt-6 p-4 bg-[#F5F8F7] border border-[#1B8A8F]/30 rounded-2xl text-center space-y-1.5 animate-in fade-in duration-300">
            <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#1B8A8F]">
              <CheckCircle2 className="w-5 h-5" />
              <span>You are subscribed to Wayfold Journal</span>
            </div>
            <p className="text-xs text-[#5B6B7A]">
              We have sent a confirmation note to <span className="font-semibold text-[#12263A]">{email}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-2">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="flex-1 text-left">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#5B6B7A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] pl-10 pr-3.5 py-3 focus-ring"
                    aria-invalid={!!error}
                    aria-describedby={error ? 'newsletter-error' : undefined}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="text-xs font-bold text-white bg-[#1B8A8F] hover:bg-[#157175] active:bg-[#0f5558] px-5 py-3 rounded-[10px] transition-colors focus-ring shrink-0"
              >
                Subscribe
              </button>
            </div>

            {error && (
              <p id="newsletter-error" className="text-xs text-[#C0392B] text-left pt-1">
                {error}
              </p>
            )}

            <p className="text-[11px] text-[#5B6B7A] text-left pt-1">
              By subscribing, you agree to receive editorial travel alerts. You can unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
