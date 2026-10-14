import { Tour, Coupon, Booking } from '../types';
import { TOURS, COUPONS, INITIAL_BOOKINGS } from '../data/mockData';

const STORAGE_BOOKINGS_KEY = 'wayfold_bookings_store';

// Helper to get persisted bookings from localStorage
function getStoredBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_BOOKINGS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_BOOKINGS;
  }
}

function saveStoredBookings(bookings: Booking[]) {
  try {
    localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));
  } catch (err) {
    console.error('Failed to save bookings to localStorage', err);
  }
}

/**
 * Fetch all tours with optional filtering and sorting.
 * Replace with:
 * return fetch(`${import.meta.env.VITE_API_URL || ''}/api/tours?${new URLSearchParams(filters as any)}`).then(res => res.json());
 */
export async function getTours(filters?: {
  theme?: string;
  maxBudget?: number;
  query?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'duration';
}): Promise<Tour[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 280));

  let results = [...TOURS];

  if (filters?.theme && filters.theme.toLowerCase() !== 'all') {
    results = results.filter(
      (t) => t.theme.toLowerCase() === filters.theme?.toLowerCase()
    );
  }

  if (filters?.maxBudget && filters.maxBudget > 0) {
    results = results.filter((t) => t.priceFrom <= filters.maxBudget!);
  }

  if (filters?.query && filters.query.trim().length > 0) {
    const q = filters.query.toLowerCase().trim();
    results = results.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.route.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.theme.toLowerCase().includes(q)
    );
  }

  if (filters?.sortBy) {
    if (filters.sortBy === 'price-asc') {
      results.sort((a, b) => a.priceFrom - b.priceFrom);
    } else if (filters.sortBy === 'price-desc') {
      results.sort((a, b) => b.priceFrom - a.priceFrom);
    } else if (filters.sortBy === 'duration') {
      results.sort((a, b) => b.durationNights - a.durationNights);
    }
  }

  return results;
}

/**
 * Fetch a single tour by its unique slug.
 * Replace with:
 * return fetch(`${import.meta.env.VITE_API_URL || ''}/api/tours/${slug}`).then(res => res.json());
 */
export async function getTour(slug: string): Promise<Tour | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const tour = TOURS.find((t) => t.slug === slug);
  return tour || null;
}

/**
 * Fetch available coupons.
 * Replace with:
 * return fetch(`${import.meta.env.VITE_API_URL || ''}/api/coupons`).then(res => res.json());
 */
export async function getCoupons(): Promise<Coupon[]> {
  await new Promise((resolve) => setTimeout(resolve, 180));
  return [...COUPONS];
}

/**
 * Validate and apply a discount coupon against cart value and tour details.
 * Replace with:
 * return fetch(`${import.meta.env.VITE_API_URL || ''}/api/coupons/apply`, { method: 'POST', body: JSON.stringify({ code, cartTotal, tourTheme }) }).then(res => res.json());
 */
export async function applyCoupon(
  code: string,
  cartTotal: number,
  tourTheme?: string
): Promise<{
  valid: boolean;
  discountAmount: number;
  message: string;
  coupon?: Coupon;
}> {
  await new Promise((resolve) => setTimeout(resolve, 220));

  const cleanCode = code.trim().toUpperCase();
  const coupon = COUPONS.find((c) => c.code.toUpperCase() === cleanCode);

  if (!coupon) {
    return {
      valid: false,
      discountAmount: 0,
      message: `Coupon "${cleanCode}" is invalid or does not exist.`
    };
  }

  if (cartTotal < coupon.minSpend) {
    return {
      valid: false,
      discountAmount: 0,
      message: `Minimum order value of ₹${coupon.minSpend.toLocaleString('en-IN')} required for ${coupon.code}.`
    };
  }

  if (coupon.applicableTheme && tourTheme && coupon.applicableTheme.toLowerCase() !== tourTheme.toLowerCase()) {
    return {
      valid: false,
      discountAmount: 0,
      message: `Coupon ${coupon.code} is valid only for ${coupon.applicableTheme} tours.`
    };
  }

  let calculatedDiscount = 0;
  if (coupon.discountType === 'flat') {
    calculatedDiscount = coupon.discountValue;
  } else if (coupon.discountType === 'percentage') {
    calculatedDiscount = Math.round((cartTotal * coupon.discountValue) / 100);
    if (coupon.maxDiscount && calculatedDiscount > coupon.maxDiscount) {
      calculatedDiscount = coupon.maxDiscount;
    }
  }

  // Discount cannot exceed cart value
  calculatedDiscount = Math.min(calculatedDiscount, cartTotal);

  return {
    valid: true,
    discountAmount: calculatedDiscount,
    message: `Coupon ${coupon.code} applied successfully!`,
    coupon
  };
}

/**
 * Create a new travel booking.
 * Replace with:
 * return fetch(`${import.meta.env.VITE_API_URL || ''}/api/bookings`, { method: 'POST', body: JSON.stringify(bookingData) }).then(res => res.json());
 */
export async function createBooking(
  bookingData: Omit<Booking, 'id' | 'status' | 'createdAt'>
): Promise<Booking> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const newId = `WF-${Math.floor(10000 + Math.random() * 90000)}`;
  const newBooking: Booking = {
    ...bookingData,
    id: newId,
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  const current = getStoredBookings();
  const updated = [newBooking, ...current];
  saveStoredBookings(updated);

  return newBooking;
}

/**
 * Fetch all user bookings.
 * Replace with:
 * return fetch(`${import.meta.env.VITE_API_URL || ''}/api/bookings`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json());
 */
export async function getBookings(): Promise<Booking[]> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return getStoredBookings();
}

/**
 * Cancel an active booking with confirmation.
 * Replace with:
 * return fetch(`${import.meta.env.VITE_API_URL || ''}/api/bookings/${id}/cancel`, { method: 'POST' }).then(res => res.json());
 */
export async function cancelBooking(id: string): Promise<Booking> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const current = getStoredBookings();
  const targetIndex = current.findIndex((b) => b.id === id);

  if (targetIndex === -1) {
    throw new Error('Booking not found');
  }

  const updatedBooking: Booking = {
    ...current[targetIndex],
    status: 'Cancelled'
  };

  current[targetIndex] = updatedBooking;
  saveStoredBookings(current);

  return updatedBooking;
}
