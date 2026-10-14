/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageTab, Destination, Hotel, TourPackage, WishlistItem } from './types';
import { DESTINATIONS } from './data/destinations';
import { HOTELS } from './data/hotels';
import { TOURS } from './data/tours';
import { TRAVEL_GUIDES } from './data/guides';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DestinationCard } from './components/DestinationCard';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { DestinationsPage } from './components/DestinationsPage';
import { HotelsPage } from './components/HotelsPage';
import { ToursPage } from './components/ToursPage';
import { TransportPage } from './components/TransportPage';
import { TravelGuidesPage } from './components/TravelGuidesPage';
import { TripPlanner } from './components/TripPlanner';
import { BudgetTracker } from './components/BudgetTracker';
import { AboutContactPage } from './components/AboutContactPage';
import { ExploreIndiaDiscovery } from './components/ExploreIndiaDiscovery';
import { HowFlyvoraWorks } from './components/HowFlyvoraWorks';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { BookingModal } from './components/BookingModal';
import { SearchModal } from './components/SearchModal';
import { PlutoAssistant } from './components/PlutoAssistant';
import { PlutoWelcomePopup } from './components/PlutoWelcomePopup';
import { WhatsAppContactCard } from './components/WhatsAppContactCard';
import { FloatingControls } from './components/FloatingControls';
import { TourPackageFloatingTeaser } from './components/TourPackageFloatingTeaser';
import { TourDiscoveryModal } from './components/TourDiscoveryModal';
import { HomepageThreeServices } from './components/HomepageThreeServices';
import { HomepageHotelsSection } from './components/HomepageHotelsSection';
import { HomepageTaxiSection } from './components/HomepageTaxiSection';

// Icons
import { Compass, Sparkles, MapPin, ArrowRight, ShieldCheck, Star, Calendar, Car, Building, BookOpen, Heart } from 'lucide-react';

const PAGE_PATHS: Record<PageTab, string> = {
  home: '/',
  destinations: '/destinations',
  hotels: '/hotels',
  tours: '/tours',
  transport: '/transport',
  guides: '/guides',
  planner: '/planner',
  budget: '/budget',
  about: '/about',
  contact: '/contact'
};

const PATH_PAGES = Object.fromEntries(
  Object.entries(PAGE_PATHS).map(([page, path]) => [path, page])
) as Record<string, PageTab>;

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = PATH_PAGES[location.pathname] || 'home';
  const setActiveTab = (tab: PageTab) => navigate(PAGE_PATHS[tab]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  // Modals state
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPlutoOpen, setIsPlutoOpen] = useState(false);
  const [isPlutoWelcomeDone, setIsPlutoWelcomeDone] = useState(false);
  const [isTourDiscoveryOpen, setIsTourDiscoveryOpen] = useState(false);

  const [bookingModalData, setBookingModalData] = useState<{
    title: string;
    type: string;
    subtext?: string;
    pricePerUnit?: number;
    image?: string;
  } | null>(null);

  // Wishlist state (persisted in localStorage)
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('flyvora_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'jaipur',
        type: 'destination',
        title: 'Jaipur',
        subtitle: 'Rajasthan · Heritage & Culture',
        image: '/assets/images/dest_rajasthan_heritage_1791892028463.jpg'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('flyvora_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Wishlist toggle helper
  const handleToggleWishlist = (item: any) => {
    const id = item.id;
    const exists = wishlist.some(w => w.id === id);

    if (exists) {
      setWishlist(wishlist.filter(w => w.id !== id));
    } else {
      const newItem: WishlistItem = {
        id,
        type: item.pricePerNight ? 'hotel' : item.pricePerPerson ? 'tour' : 'destination',
        title: item.name || item.title,
        subtitle: item.state ? `${item.state} · ${item.region}` : item.duration || item.city,
        image: item.image,
        price: item.pricePerNight || item.pricePerPerson
      };
      setWishlist([...wishlist, newItem]);
    }
  };

  const handleHeroCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setActiveTab('destinations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlanDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    setActiveTab('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToDiscovery = () => {
    const el = document.getElementById('explore-india-discovery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToHotels = () => {
    if (activeTab !== 'home') setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById('homepage-hotels-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleScrollToTaxi = () => {
    if (activeTab !== 'home') setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById('homepage-taxi-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Scroll to top whenever tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    if (!Object.hasOwn(PATH_PAGES, location.pathname)) {
      navigate('/', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-[#fafbfe] text-slate-800 flex flex-col selection:bg-orange-500 selection:text-white">
      
      {/* CHANGE 3: Sticky Landscape-Video Navigation Bar with Fixed Dropdowns */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlist.length}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="flex-1">
        
        {/* TAB 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div className="space-y-16 lg:space-y-24">
            
            {/* CHANGE 1 & CHANGE 2: Ken Burns Hero & 12 Animated Travel Service Tiles Launcher */}
            <Hero
              onSelectCategory={handleHeroCategorySelect}
              setActiveTab={setActiveTab}
              onScrollToDiscovery={handleScrollToDiscovery}
              onOpenTourDiscovery={() => setIsTourDiscoveryOpen(true)}
            />

            {/* CORE SERVICES PILLARS (Requirement 6: Tours, Hotels, Taxi clearly communicated) */}
            <HomepageThreeServices
              onOpenTourDiscovery={() => setIsTourDiscoveryOpen(true)}
              onScrollToHotels={handleScrollToHotels}
              onScrollToTaxi={handleScrollToTaxi}
            />

            {/* DEDICATED HOTELS SECTION ON HOMEPAGE (Requirement 4) */}
            <HomepageHotelsSection
              onBookHotelDemo={(hotel, roomType) => {
                setBookingModalData({
                  title: hotel.name,
                  type: 'Hotel Reservation',
                  subtext: `${roomType} · ${hotel.city}, ${hotel.state}`,
                  pricePerUnit: hotel.pricePerNight,
                  image: hotel.image
                });
              }}
              wishlistIds={wishlist.map(w => w.id)}
              onToggleWishlist={handleToggleWishlist}
              onNavigateToHotelsPage={() => setActiveTab('hotels')}
            />

            {/* DEDICATED TAXI & VEHICLE BOOKING SECTION ON HOMEPAGE (Requirement 5) */}
            <HomepageTaxiSection
              onEnquireTaxiDemo={(details) => {
                setBookingModalData({
                  title: `Taxi Booking: ${details.vehicle}`,
                  type: 'Chauffeur Taxi Transfer',
                  subtext: `${details.pickupLocation} → ${details.dropLocation} on ${details.pickupDate} at ${details.pickupTime}`,
                  pricePerUnit: details.estimatedFare
                });
              }}
            />

            {/* Section 1: Popular Destinations Spotlight */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#FF5500] uppercase tracking-widest mb-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Curated Wonders</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                    Featured Destinations Across India
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Carefully vetted historical palaces, sacred ghats, tranquil backwaters, and high mountain passes.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('destinations')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5500] hover:text-[#e64d00] transition-colors cursor-pointer"
                >
                  <span>Explore All 30+ States</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Destination Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {DESTINATIONS.filter(d => d.featured).slice(0, 6).map((dest) => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    onSelect={(d) => setSelectedDestination(d)}
                    isWishlisted={wishlist.some(w => w.id === dest.id)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            </section>

            {/* CHANGE 6: Premium Destination Discovery Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ExploreIndiaDiscovery
                onSelectDestination={(dest) => setSelectedDestination(dest)}
              />
            </section>

            {/* Section 3: Curated Tour Packages Showcase */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#7B2CBF] uppercase tracking-widest mb-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>All-Inclusive Curated Journeys</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                    Signature Guided Tours & Packages
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Multi-day itineraries with private chauffeured transport, boutique stays, and monument admissions.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsTourDiscoveryOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] hover:from-[#6a24a6] hover:to-[#8c3ecc] rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Explore All Packages</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TOURS.slice(0, 3).map((tour) => (
                  <div
                    key={tour.id}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] font-bold text-slate-900">
                          {tour.duration}
                        </div>
                      </div>
                      <div className="p-5 space-y-2">
                        <div className="flex items-center gap-2 text-[11px] text-purple-700 font-semibold">
                          <span>{tour.category}</span>
                          <span>·</span>
                          <span>Best: {tour.bestSeason}</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#7B2CBF] transition-colors line-clamp-2">
                          {tour.title}
                        </h3>
                        <p className="text-xs text-slate-500">
                          Route: {tour.destinationsCovered.join(' → ')}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block">From</span>
                        <span className="text-base font-extrabold text-slate-900 tabular-nums">
                          ₹{tour.pricePerPerson.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-slate-400"> / person</span>
                      </div>
                      <button
                        onClick={() => {
                          setIsTourDiscoveryOpen(true);
                        }}
                        className="px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-[#7B2CBF] rounded-xl transition-colors cursor-pointer"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: Trip Planner & Budget Feature Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest">
                    <Sparkles className="w-4 h-4" />
                    <span>Precision Travel Engineering</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
                    Custom Day-by-Day Itinerary Builder & Live Budget Forecaster
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                    Take the guesswork out of Indian travel. Select any region, tailor activities for morning, afternoon, and evening, and watch your total accommodation, transit, meal, and sightseeing expenses update live with daily burn rate indicators.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => setActiveTab('planner')}
                      className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#FF5500] via-[#FF7700] to-[#FF3D00] hover:from-[#e64d00] rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Open Trip Planner</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab('budget')}
                      className="px-5 py-2.5 text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all cursor-pointer"
                    >
                      Live Budget Calculator
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                  <div className="text-xs font-bold text-orange-300 uppercase tracking-wider">
                    Sample Trip Breakdown
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>4 Days Golden Triangle</span>
                      <span className="font-bold text-white">2 Travelers</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
                      <div className="w-[45%] bg-[#FF5500]" />
                      <div className="w-[25%] bg-[#0088FF]" />
                      <div className="w-[20%] bg-[#7B2CBF]" />
                      <div className="w-[10%] bg-emerald-500" />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                      <span>Stays 45%</span>
                      <span>Transit 25%</span>
                      <span>Meals 20%</span>
                      <span>Entry 10%</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                    <span className="text-xs text-slate-300">Estimated Target:</span>
                    <span className="text-lg font-black text-orange-400 tabular-nums">₹48,500</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Editorial Guides Preview */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Travel Intelligence</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                    Editorial Travel Guides & Tips
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    First-time travel advice, packing checklists, temple etiquette, and route timing.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('guides')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <span>Read All Guides</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TRAVEL_GUIDES.map((guide) => (
                  <div
                    key={guide.id}
                    onClick={() => setActiveTab('guides')}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-xl transition-all cursor-pointer space-y-3 group"
                  >
                    <div className="text-[11px] font-bold text-[#FF5500] uppercase tracking-wider">
                      {guide.category} · {guide.readTime}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#FF5500] transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {guide.summary}
                    </p>
                    <div className="text-xs font-semibold text-[#0088FF] flex items-center gap-1 pt-1">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CHANGE 8: How Flyvora Works & Signature Routes (Replacing Fake Reviews Section) */}
            <HowFlyvoraWorks setActiveTab={setActiveTab} />

            {/* Section 8: Why Flyvora Trust Pillars */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
                <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider">
                  The Flyvora Standard
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  Why Discerning Travelers Choose Flyvora
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FF5500] flex items-center justify-center font-bold">
                    01
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Transparent Distance & Fare Formulas
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    No opaque surge markups. Our taxi and transit calculators disclose per-km vehicle baselines, driver night allowances, and state toll benchmarks.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0088FF] flex items-center justify-center font-bold">
                    02
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Pan-India Depth Across All States
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Beyond standard tourist triangles, we catalog living root bridges in Meghalaya, ruins in Hampi, Buddhist trails in Sikkim, and coffee mist in Coorg.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7B2CBF] flex items-center justify-center font-bold">
                    03
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Day-by-Day Itinerary Customization
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Personalize your travel pacing, save your plans locally in your browser, and print clean trip roadmaps without signing up or hidden fees.
                  </p>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* TAB 2: DESTINATIONS */}
        {activeTab === 'destinations' && (
          <DestinationsPage
            onSelectDestination={(d) => setSelectedDestination(d)}
            wishlistIds={wishlist.map(w => w.id)}
            onToggleWishlist={handleToggleWishlist}
            initialQuery={searchQuery}
            initialCategory={selectedCategory}
          />
        )}

        {/* TAB 3: HOTELS */}
        {activeTab === 'hotels' && (
          <HotelsPage
            onBookHotelDemo={(hotel, roomType) => {
              setBookingModalData({
                title: `${hotel.name} — ${roomType}`,
                type: 'Hotel Reservation',
                subtext: `Located in ${hotel.city}, ${hotel.state}`,
                pricePerUnit: hotel.pricePerNight,
                image: hotel.image
              });
            }}
            wishlistIds={wishlist.map(w => w.id)}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {/* TAB 4: TOURS & PACKAGES */}
        {activeTab === 'tours' && (
          <ToursPage
            onBookTourDemo={(tour) => {
              setBookingModalData({
                title: tour.title,
                type: 'Tour Package',
                subtext: `${tour.duration} · Route: ${tour.destinationsCovered.join(' → ')}`,
                pricePerUnit: tour.pricePerPerson,
                image: tour.image
              });
            }}
            wishlistIds={wishlist.map(w => w.id)}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {/* TAB 5: TAXI & TRANSPORT */}
        {activeTab === 'transport' && (
          <TransportPage
            onEnquireTaxiDemo={(details) => {
              setBookingModalData({
                title: `${details.vehicle} (${details.serviceType.toUpperCase()})`,
                type: 'Taxi Transfer',
                subtext: `${details.pickupCity} → ${details.dropCity} (${details.distanceKm} km on ${details.travelDate} at ${details.pickupTime})`,
                pricePerUnit: details.estimatedFare
              });
            }}
          />
        )}

        {/* TAB 6: TRAVEL GUIDES */}
        {activeTab === 'guides' && (
          <TravelGuidesPage />
        )}

        {/* TAB 7: TRIP PLANNER */}
        {activeTab === 'planner' && (
          <TripPlanner
            initialDestination={selectedDestination}
            onNavigateToBudget={() => setActiveTab('budget')}
          />
        )}

        {/* TAB 8: BUDGET TRACKER */}
        {activeTab === 'budget' && (
          <BudgetTracker />
        )}

        {/* TAB 9: ABOUT & CONTACT */}
        {(activeTab === 'about' || activeTab === 'contact') && (
          <AboutContactPage />
        )}

      </main>

      {/* Global Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* FLOATING CONTROLS & ASSISTANT */}
      <FloatingControls
        onOpenPluto={() => setIsPlutoOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        isPlutoOpen={isPlutoOpen}
      />

      {/* CHANGE 4: Pluto First-Visit Introduction with Luminous Orbit Ring */}
      <PlutoWelcomePopup
        onOpenFullAssistant={() => setIsPlutoOpen(true)}
        onNavigateTab={(tab) => setActiveTab(tab)}
        onDismissed={() => setIsPlutoWelcomeDone(true)}
      />

      {/* Full Pluto Interactive Chat Assistant */}
      <PlutoAssistant
        isOpen={isPlutoOpen}
        onClose={() => setIsPlutoOpen(false)}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      {/* CHANGE 5: Scroll-Triggered WhatsApp Contact Card (Appears after Pluto intro is dismissed) */}
      <WhatsAppContactCard
        canShow={isPlutoWelcomeDone}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Floating Tour Packages Promotional Teaser (Bottom-left, scroll-triggered, dismissible) */}
      <TourPackageFloatingTeaser
        onOpenTourDiscovery={() => setIsTourDiscoveryOpen(true)}
        canShow={activeTab === 'home'}
      />

      {/* Full-Screen Tour Packages Discovery Modal */}
      <TourDiscoveryModal
        isOpen={isTourDiscoveryOpen}
        onClose={() => setIsTourDiscoveryOpen(false)}
        onBookTourDemo={(tour) => {
          setBookingModalData({
            title: tour.title,
            type: 'Tour Package',
            subtext: `${tour.duration} · Route: ${tour.destinationsCovered.join(' → ')}`,
            pricePerUnit: tour.pricePerPerson,
            image: tour.image
          });
        }}
        wishlistIds={wishlist.map(w => w.id)}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* MODALS & DRAWERS */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        defaultDestination={selectedDestination?.name || ''}
      />

      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        isWishlisted={selectedDestination ? wishlist.some(w => w.id === selectedDestination.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onPlanTrip={handlePlanDestination}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlist}
        onRemoveItem={(id) => setWishlist(wishlist.filter(w => w.id !== id))}
        onClearAll={() => setWishlist([])}
        onBookItemDemo={(item) => {
          setBookingModalData({
            title: item.title,
            type: item.type,
            subtext: item.subtitle,
            pricePerUnit: item.price || 12000,
            image: item.image
          });
        }}
      />

      <BookingModal
        isOpen={!!bookingModalData}
        onClose={() => setBookingModalData(null)}
        bookingData={bookingModalData}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectDestination={(d) => setSelectedDestination(d)}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

    </div>
  );
}
