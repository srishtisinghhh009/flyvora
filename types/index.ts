export type PageTab = 
  | 'home' 
  | 'destinations' 
  | 'hotels' 
  | 'tours' 
  | 'transport' 
  | 'guides' 
  | 'planner' 
  | 'budget' 
  | 'about' 
  | 'contact';

export type IndiaRegion = 'North' | 'South' | 'East' | 'West' | 'Northeast' | 'Central';

export type DestinationCategory = 
  | 'Mountains & Hill Stations'
  | 'Beaches & Islands'
  | 'Heritage & Culture'
  | 'Spiritual Destinations'
  | 'Wildlife & Nature'
  | 'Weekend Getaways'
  | 'Adventure';

export interface Destination {
  id: string;
  name: string;
  state: string;
  region: IndiaRegion;
  category: DestinationCategory;
  tagline: string;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  bestSeason: string;
  idealDuration: string;
  estimatedBudget: {
    budget: string;
    moderate: string;
    luxury: string;
  };
  howToReach: {
    air: string;
    rail: string;
    road: string;
  };
  attractions: string[];
  thingsToDo: string[];
  suggestedItinerary: {
    day: number;
    title: string;
    activities: string;
  }[];
  nearbyPlaces: string[];
  localTransport: string;
  featured?: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  state: string;
  region: IndiaRegion;
  type: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  image: string;
  gallery?: string[];
  amenities: string[];
  roomTypes: {
    name: string;
    price: number;
    description: string;
  }[];
  locationDescription: string;
  nearbyAttractions?: string[];
  checkInOutInfo?: string;
}

export interface TourPackage {
  id: string;
  title: string;
  duration: string;
  destinationsCovered: string[];
  region: IndiaRegion;
  category: string;
  pricePerPerson: number;
  originalPrice?: number;
  image: string;
  gallery?: string[];
  overview?: string;
  rating: number;
  reviewsCount: number;
  inclusions: string[];
  exclusions: string[];
  bestSeason: string;
  hotelDetails?: string;
  transportDetails?: string;
  mealsDetails?: string;
  importantNotes?: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  featured?: boolean;
}

export interface TravelGuide {
  id: string;
  title: string;
  subtitle: string;
  destination: string;
  readTime: string;
  category: string;
  author: string;
  image: string;
  summary: string;
  keyHighlights: string[];
  bestTimeToVisit: string;
  packingList: string[];
  safetyTips: string[];
  culturalEtiquette: string[];
}

export interface TaxiQuote {
  serviceType: 'airport' | 'outstation' | 'sightseeing';
  pickupCity: string;
  dropCity: string;
  travelDate: string;
  pickupTime: string;
  tripType: 'one-way' | 'round-trip';
  vehicleType: 'hatchback' | 'sedan' | 'suv' | 'luxury';
  distanceKm: number;
  estimatedFare: number;
}

export interface ItineraryItem {
  id: string;
  day: number;
  timeSlot: 'Morning' | 'Afternoon' | 'Evening';
  destination: string;
  activity: string;
  notes?: string;
  estimatedCost: number;
}

export interface TripPlan {
  tripTitle: string;
  destinationId: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  travelStyle: 'Budget Backpacker' | 'Balanced Explorer' | 'Luxury Leisure' | 'Family Vacation';
  items: ItineraryItem[];
  travelersCount: number;
}

export interface BudgetExpense {
  id: string;
  category: 'Accommodation' | 'Transport' | 'Food & Dining' | 'Activities & Entry' | 'Shopping & Misc';
  title: string;
  amount: number;
  date?: string;
}

export type TourTheme = 'Beach' | 'Hills' | 'Culture' | 'Wildlife';

export interface Tour {
  slug: string;
  title: string;
  theme: TourTheme;
  route: string;
  durationNights: number;
  priceFrom: number;
  gradient: string;
  summary: string;
  inclusions: string[];
  itinerary: {
    day: number;
    title: string;
    details: string;
  }[];
}

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountType: 'flat' | 'percentage';
  discountValue: number;
  minSpend: number;
  validTill: string;
  maxDiscount?: number;
  applicableTheme?: TourTheme;
}

export type BookingStatus = 'Confirmed' | 'Pending' | 'Cancelled';

export interface Booking {
  id: string;
  tourSlug: string;
  tourTitle: string;
  route: string;
  startDate: string;
  durationNights: number;
  travellers: number;
  travellerName: string;
  travellerEmail: string;
  travellerPhone: string;
  specialRequests: string;
  baseFare: number;
  taxAmount: number;
  discountAmount: number;
  couponCode?: string;
  totalAmount: number;
  status: BookingStatus;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export interface WishlistItem {
  id: string;
  type: 'destination' | 'hotel' | 'tour';
  title: string;
  subtitle: string;
  image: string;
  price?: number;
}
