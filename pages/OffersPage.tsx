import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCoupons } from '../services/api';
import { Coupon } from '../types';
import { CouponCard } from '../components/CouponCard';
import { Tag, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export const OffersPage: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getCoupons()
      .then((data) => {
        if (isMounted) {
          setCoupons(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-[1120px] mx-auto px-5 py-8 min-w-0">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-[#5B6B7A] mb-2 font-medium">
          <Tag className="w-3.5 h-3.5 text-[#1B8A8F]" />
          <span>Exclusive Promotions</span>
          <span>·</span>
          <span>Verified Deals</span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-extrabold text-[#12263A]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Travel Offers &amp; Promo Codes
        </h1>
        <p className="mt-2 text-sm text-[#5B6B7A] max-w-2xl leading-relaxed">
          Copy your preferred coupon code and enter it during checkout to receive direct fare reductions on all Indian itineraries.
        </p>
      </div>

      {/* Coupons List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#DCE5E4] h-48 animate-pulse p-6" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {coupons.map((coupon) => (
            <CouponCard key={coupon.code} coupon={coupon} />
          ))}
        </div>
      )}

      {/* How to use Promo Codes Guide */}
      <section className="bg-white rounded-2xl border border-[#DCE5E4] p-6 sm:p-8 mt-12">
        <h2 className="text-xl font-bold text-[#12263A] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          How to Redeem Wayfold Coupons
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#5B6B7A]">
          <div className="p-4 bg-[#F5F8F7] rounded-xl border border-[#DCE5E4]">
            <div className="font-bold text-[#12263A] text-sm mb-1">1. Copy Code</div>
            <p>Click the "Copy Code" button next to any active promo code above to save it to your clipboard.</p>
          </div>

          <div className="p-4 bg-[#F5F8F7] rounded-xl border border-[#DCE5E4]">
            <div className="font-bold text-[#12263A] text-sm mb-1">2. Select Your Tour</div>
            <p>Choose an eligible itinerary and pick your departure date and travellers on the tour detail page.</p>
          </div>

          <div className="p-4 bg-[#F5F8F7] rounded-xl border border-[#DCE5E4]">
            <div className="font-bold text-[#12263A] text-sm mb-1">3. Apply at Checkout</div>
            <p>Paste the coupon in the checkout price summary and click "Apply" to instantly update the net total.</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#DCE5E4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-[#5B6B7A]">
            Looking for customized group or corporate trip discounts?
          </div>
          <Link
            to="/tours"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1B8A8F] hover:bg-[#157175] px-4 py-2.5 rounded-[10px] focus-ring"
          >
            <span>Browse All Tours</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
