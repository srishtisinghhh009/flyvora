import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-[1120px] mx-auto px-5 py-24 flex items-center justify-center text-center">
      <div className="bg-white rounded-2xl border border-[#DCE5E4] p-10 max-w-md w-full space-y-5">
        <div className="w-14 h-14 rounded-full bg-[#F5F8F7] border border-[#DCE5E4] flex items-center justify-center mx-auto text-[#1B8A8F]">
          <Compass className="w-7 h-7" />
        </div>

        <div>
          <div className="text-xs font-mono font-bold text-[#1B8A8F] mb-1">404 ERROR</div>
          <h1
            className="text-2xl font-extrabold text-[#12263A]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Page not found
          </h1>
          <p className="mt-2 text-xs text-[#5B6B7A] leading-relaxed">
            The trail you are following does not seem to lead anywhere. Check the URL or return to our travel circuits.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-[#1B8A8F] hover:bg-[#157175] px-4 py-2.5 rounded-[10px] focus-ring"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/tours"
            className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#12263A] bg-[#F5F8F7] hover:bg-white border border-[#DCE5E4] px-4 py-2.5 rounded-[10px] focus-ring"
          >
            <span>Explore Tours</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
