import React, { useState } from 'react';
import { Coupon } from '../types';
import { Copy, Check, Tag } from 'lucide-react';
import { formatINR } from '../utils/format';

interface CouponCardProps {
  coupon: Coupon;
  onApply?: (code: string) => void;
}

export const CouponCard: React.FC<CouponCardProps> = ({ coupon, onApply }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
      if (onApply) onApply(coupon.code);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DCE5E4] p-5 flex flex-col justify-between transition-colors hover:border-[#1B8A8F]/40">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold text-[#1B8A8F] tracking-wide flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            <span>{coupon.title}</span>
          </span>
          <span className="text-[11px] text-[#5B6B7A]">Valid till {coupon.validTill}</span>
        </div>

        <p className="text-xs text-[#5B6B7A] leading-relaxed mb-4">
          {coupon.description}
        </p>

        <div className="text-[11px] text-[#5B6B7A] space-y-1 mb-4">
          <div>Min. Order: <span className="font-semibold text-[#12263A] tabular-nums">{formatINR(coupon.minSpend)}</span></div>
          {coupon.applicableTheme && (
            <div>Category: <span className="font-semibold text-[#12263A]">{coupon.applicableTheme} Tours</span></div>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-[#DCE5E4] flex items-center justify-between gap-3">
        <code className="text-xs font-mono font-bold tracking-wider text-[#12263A] bg-[#F5F8F7] px-2.5 py-1.5 rounded-[8px] border border-[#DCE5E4]">
          {coupon.code}
        </code>

        <button
          type="button"
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-[10px] transition-colors focus-ring ${
            copied
              ? 'bg-[#1B8A8F] text-white'
              : 'text-[#1B8A8F] bg-[#F5F8F7] hover:bg-[#eaf1f0] border border-[#DCE5E4]'
          }`}
          aria-label={`Copy discount code ${coupon.code}`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
