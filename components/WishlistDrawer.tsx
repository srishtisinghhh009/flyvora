import React from 'react';
import { WishlistItem } from '../types';
import { X, Heart, Trash2, ArrowRight, Compass } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: WishlistItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onBookItemDemo: (item: WishlistItem) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearAll,
  onBookItemDemo
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h2 className="text-base font-bold text-slate-900 font-display">
              Saved Journeys & Wishlist
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {items.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl border border-slate-200 bg-white hover:border-orange-200 transition-colors flex gap-3 group"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {item.type}
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 truncate group-hover:text-[#FF5500]">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate">{item.subtitle}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {item.price ? (
                      <span className="text-xs font-bold text-slate-900 tabular-nums">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">Destination</span>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          onBookItemDemo(item);
                          onClose();
                        }}
                        className="text-[11px] font-bold text-[#FF5500] hover:underline"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 space-y-3 text-slate-400">
              <Heart className="w-10 h-10 mx-auto text-slate-300 stroke-[1.5]" />
              <div className="text-sm font-semibold text-slate-700">Your wishlist is empty</div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore destinations, tour packages, or heritage hotels and tap the heart icon to save them for later.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium"
            >
              Clear All Saved
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-[#FF5500] rounded-lg transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
