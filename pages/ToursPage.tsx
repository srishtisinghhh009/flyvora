import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TourCard } from '../components/TourCard';
import { getTours } from '../services/api';
import { Tour, TourTheme } from '../types';
import { Search, SlidersHorizontal, RotateCcw, Compass } from 'lucide-react';
import { formatINR } from '../utils/format';

const THEME_OPTIONS: Array<'All' | TourTheme> = ['All', 'Beach', 'Hills', 'Culture', 'Wildlife'];

export const ToursPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query params
  const initialTheme = (searchParams.get('theme') as 'All' | TourTheme) || 'All';
  const initialQuery = searchParams.get('query') || '';
  const initialBudget = searchParams.get('maxBudget') ? Number(searchParams.get('maxBudget')) : 45000;
  const initialDuration = searchParams.get('duration') || 'any';
  const initialSort = (searchParams.get('sortBy') as 'price-asc' | 'price-desc' | 'duration') || 'price-asc';

  // State
  const [theme, setTheme] = useState<'All' | TourTheme>(
    THEME_OPTIONS.includes(initialTheme) ? initialTheme : 'All'
  );
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [maxBudget, setMaxBudget] = useState<number>(initialBudget);
  const [durationFilter, setDurationFilter] = useState<string>(initialDuration);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'duration'>(initialSort);

  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sync state to search params
  const updateUrlParams = (
    newTheme: string,
    newQuery: string,
    newBudget: number,
    newDuration: string,
    newSort: string
  ) => {
    const params = new URLSearchParams();
    if (newTheme !== 'All') params.set('theme', newTheme);
    if (newQuery.trim()) params.set('query', newQuery.trim());
    if (newBudget < 45000) params.set('maxBudget', newBudget.toString());
    if (newDuration !== 'any') params.set('duration', newDuration);
    if (newSort !== 'price-asc') params.set('sortBy', newSort);
    setSearchParams(params, { replace: true });
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getTours({
      theme: theme === 'All' ? undefined : theme,
      maxBudget: maxBudget,
      query: searchQuery,
      sortBy: sortBy
    })
      .then((data) => {
        if (isMounted) {
          // If duration filter is selected
          let filtered = data;
          if (durationFilter === 'short') {
            filtered = data.filter((t) => t.durationNights <= 4);
          } else if (durationFilter === 'medium') {
            filtered = data.filter((t) => t.durationNights >= 5 && t.durationNights <= 6);
          } else if (durationFilter === 'long') {
            filtered = data.filter((t) => t.durationNights >= 7);
          }

          setTours(filtered);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError('Failed to fetch tours. Please try again.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [theme, maxBudget, searchQuery, sortBy, durationFilter]);

  const handleClearFilters = () => {
    setTheme('All');
    setSearchQuery('');
    setMaxBudget(45000);
    setDurationFilter('any');
    setSortBy('price-asc');
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  return (
    <div className="max-w-[1120px] mx-auto px-5 py-8 min-w-0">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-[#5B6B7A] mb-2 font-medium">
          <Compass className="w-3.5 h-3.5 text-[#1B8A8F]" />
          <span>Curated Itineraries</span>
          <span>·</span>
          <span>All India</span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-extrabold text-[#12263A]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          All Tours &amp; Journeys
        </h1>
        <p className="mt-2 text-sm text-[#5B6B7A] max-w-2xl leading-relaxed">
          Explore complete packages with authentic private stays, guided cultural trails, and dedicated drivers.
        </p>
      </div>

      {/* Control Bar: Theme Chips & Search Input */}
      <div className="bg-white rounded-2xl border border-[#DCE5E4] p-5 mb-8 space-y-5">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Theme Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1" role="group" aria-label="Tour Theme">
            {THEME_OPTIONS.map((t) => {
              const active = theme === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setTheme(t);
                    updateUrlParams(t, searchQuery, maxBudget, durationFilter, sortBy);
                  }}
                  className={`text-xs font-semibold px-4 py-2 rounded-[10px] whitespace-nowrap transition-colors focus-ring border ${
                    active
                      ? 'bg-[#12263A] text-white border-[#12263A]'
                      : 'bg-[#F5F8F7] text-[#5B6B7A] border-[#DCE5E4] hover:text-[#12263A] hover:bg-white'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {/* Search by text input */}
          <div className="w-full md:w-80">
            <label htmlFor="tour-search-input" className="sr-only">
              Search tours by destination or title
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-[#5B6B7A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="tour-search-input"
                type="text"
                placeholder="Search destination, region..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  updateUrlParams(theme, e.target.value, maxBudget, durationFilter, sortBy);
                }}
                className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] pl-9 pr-3.5 py-2.5 focus-ring"
              />
            </div>
          </div>
        </div>

        {/* Second Row: Secondary Filters (Budget slider, Duration, Sort) */}
        <div className="pt-4 border-t border-[#DCE5E4] grid grid-cols-1 sm:grid-cols-3 gap-5 items-center">
          {/* Budget Filter */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label htmlFor="budget-slider" className="font-semibold text-[#12263A]">
                Max Budget: <span className="text-[#1B8A8F] tabular-nums">{formatINR(maxBudget)}</span>
              </label>
              <span className="text-[11px] text-[#5B6B7A]">Up to ₹45k</span>
            </div>
            <input
              id="budget-slider"
              type="range"
              min="14000"
              max="45000"
              step="1000"
              value={maxBudget}
              onChange={(e) => {
                const val = Number(e.target.value);
                setMaxBudget(val);
                updateUrlParams(theme, searchQuery, val, durationFilter, sortBy);
              }}
              className="w-full accent-[#1B8A8F] cursor-pointer"
            />
          </div>

          {/* Duration Filter */}
          <div>
            <label htmlFor="duration-select" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Duration
            </label>
            <select
              id="duration-select"
              value={durationFilter}
              onChange={(e) => {
                setDurationFilter(e.target.value);
                updateUrlParams(theme, searchQuery, maxBudget, e.target.value, sortBy);
              }}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3 py-2 focus-ring"
            >
              <option value="any">Any Duration</option>
              <option value="short">3–4 Nights (Short)</option>
              <option value="medium">5–6 Nights (Medium)</option>
              <option value="long">7+ Nights (Extended)</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div>
            <label htmlFor="sort-select" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Sort by
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => {
                const val = e.target.value as 'price-asc' | 'price-desc' | 'duration';
                setSortBy(val);
                updateUrlParams(theme, searchQuery, maxBudget, durationFilter, val);
              }}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3 py-2 focus-ring"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration">Duration: Longest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Result Count and Clear Filters link */}
      <div className="flex items-center justify-between mb-6 text-xs text-[#5B6B7A]">
        <div>
          Showing <span className="font-bold text-[#12263A] tabular-nums">{tours.length}</span> verified tour{tours.length === 1 ? '' : 's'}
        </div>

        {(theme !== 'All' || searchQuery || maxBudget < 45000 || durationFilter !== 'any') && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#1B8A8F] hover:text-[#157175] focus-ring"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear filters</span>
          </button>
        )}
      </div>

      {/* Tours Grid or States */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#DCE5E4] h-80 animate-pulse p-4 space-y-4">
              <div className="bg-[#DCE5E4]/60 h-40 rounded-xl" />
              <div className="h-4 bg-[#DCE5E4]/60 rounded w-3/4" />
              <div className="h-3 bg-[#DCE5E4]/40 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl border border-[#DCE5E4] p-10 text-center">
          <p className="text-sm font-semibold text-[#C0392B]">{error}</p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="mt-4 text-xs font-semibold px-4 py-2 bg-[#1B8A8F] text-white rounded-[10px]"
          >
            Reset Filters
          </button>
        </div>
      ) : tours.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#DCE5E4] p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#F5F8F7] border border-[#DCE5E4] flex items-center justify-center mx-auto text-[#5B6B7A]">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#12263A]" style={{ fontFamily: 'var(--font-heading)' }}>
              No matching tours found
            </h3>
            <p className="mt-1 text-xs text-[#5B6B7A]">
              We could not find any itinerary matching your current budget or search query.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClearFilters}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1B8A8F] hover:bg-[#157175] px-4 py-2.5 rounded-[10px] focus-ring"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      )}
    </div>
  );
};
