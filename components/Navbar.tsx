import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { PageTab } from '../types';
import { 
  Search, 
  Heart, 
  Menu, 
  X, 
  ChevronDown, 
  MapPin, 
  Calendar, 
  Building, 
  Compass, 
  BookOpen, 
  Car, 
  Sparkles,
  PieChart,
  ArrowRight
} from 'lucide-react';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  wishlistCount: number;
  onOpenContactModal: () => void;
}

type DropdownKey = 'destinations' | 'explore' | null;

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenWishlist,
  wishlistCount,
  onOpenContactModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [mobileAccordion, setMobileAccordion] = useState<DropdownKey>(null);
  
  const navContainerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Robust Outside Click & Escape Handlers
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Pause video on reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const handleDropdownToggle = (key: DropdownKey, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdown(key);
  };

  const handleMobileAccordionToggle = (key: DropdownKey, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileAccordion(prev => prev === key ? null : key);
  };

  return (
    <header 
      ref={navContainerRef}
      className={`sticky top-0 z-50 transition-all duration-300 h-20 select-none ${
        isScrolled 
          ? 'shadow-md border-b border-slate-200/90 bg-white/95 backdrop-blur-md' 
          : 'border-b border-slate-200/60 bg-white/90 backdrop-blur-sm'
      }`}
    >
      {/* Cinematic Landscape-Video Background Layer (Click-through safe) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/images/hero_cinematic_india_1791892010717.jpg"
          className="w-full h-full object-cover object-center opacity-25 filter saturate-125 brightness-105 pointer-events-none"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-2408-large.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Semi-Transparent Scrim for Contrast */}
        <div className="absolute inset-0 bg-white/92 backdrop-blur-xs pointer-events-none" />
        
        {/* Brand gradient hairline at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF5500] via-[#00A3FF] to-[#7B2CBF] opacity-70 pointer-events-none" />
      </div>

      {/* Main Top Bar adhering strictly to the 3-Zone Contract */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <div 
          onClick={() => { 
            setActiveTab('home'); 
            setMobileMenuOpen(false); 
            setOpenDropdown(null);
          }}
          className="cursor-pointer shrink-0 transition-opacity hover:opacity-90 py-1"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setActiveTab('home');
              setMobileMenuOpen(false);
              setOpenDropdown(null);
            }
          }}
        >
          <Logo size="md" />
        </div>

        {/* Zone 2: Focused Primary Navigation Links (Trip Planner, Travel Guides, Tour & Packages moved into Explore More) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-slate-700">
          
          {/* 1. Home */}
          <button
            type="button"
            onClick={() => { setActiveTab('home'); setOpenDropdown(null); }}
            className={`whitespace-nowrap transition-colors py-1 hover:text-[#FF5500] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500] rounded-lg px-1.5 ${
              activeTab === 'home' ? 'text-[#FF5500] font-bold border-b-2 border-[#FF5500]' : ''
            }`}
          >
            Home
          </button>

          {/* 2. Destinations Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('destinations')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={openDropdown === 'destinations'}
              onClick={(e) => handleDropdownToggle('destinations', e)}
              className={`inline-flex items-center gap-1 whitespace-nowrap transition-colors py-1 hover:text-[#FF5500] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500] rounded-lg px-1.5 ${
                activeTab === 'destinations' || openDropdown === 'destinations' ? 'text-[#FF5500] font-bold' : ''
              }`}
            >
              <span>Destinations</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'destinations' ? 'rotate-180 text-[#FF5500]' : ''}`} />
            </button>

            {openDropdown === 'destinations' && (
              <div className="absolute top-full left-0 pt-3 w-80 z-[60]">
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-3 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Explore Regions</span>
                    <button 
                      type="button"
                      onClick={() => { setActiveTab('destinations'); setOpenDropdown(null); }}
                      className="text-xs font-bold text-[#FF5500] hover:underline cursor-pointer"
                    >
                      View All 30+ States
                    </button>
                  </div>
                  <div className="p-2 space-y-1">
                    {[
                      { name: 'North India', desc: 'Himalayas, Rajasthan, Agra & Varanasi' },
                      { name: 'South India', desc: 'Kerala Backwaters, Coorg, Hampi' },
                      { name: 'West India', desc: 'Goa Beaches & Heritage Forts' },
                      { name: 'Northeast India', desc: 'Meghalaya Living Bridges & Tea Hills' },
                      { name: 'Spiritual Circuits', desc: 'Kashi Vishwanath, Ayodhya & Haridwar' },
                    ].map((item) => (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => {
                          setActiveTab('destinations');
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-orange-50/60 hover:text-[#FF5500] transition-colors group flex items-start gap-2.5 cursor-pointer"
                      >
                        <MapPin className="w-4 h-4 text-[#FF5500] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-[#FF5500]">{item.name}</div>
                          <div className="text-[11px] text-slate-500">{item.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Hotels */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('hotels');
              setOpenDropdown(null);
            }}
            className={`whitespace-nowrap transition-colors py-1 hover:text-[#0088FF] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0088FF] rounded-lg px-1.5 ${
              activeTab === 'hotels' ? 'text-[#0088FF] font-bold border-b-2 border-[#0088FF]' : ''
            }`}
          >
            Hotels
          </button>

          {/* 4. Transport / Taxi */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('transport');
              setOpenDropdown(null);
            }}
            className={`whitespace-nowrap transition-colors py-1 hover:text-[#FF5500] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500] rounded-lg px-1.5 ${
              activeTab === 'transport' ? 'text-[#FF5500] font-bold border-b-2 border-[#FF5500]' : ''
            }`}
          >
            Transport / Taxi
          </button>

          {/* 5. Explore More (Unified Dropdown containing Tour Packages, Guides, Planner, Budget) */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('explore')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={openDropdown === 'explore'}
              onClick={(e) => handleDropdownToggle('explore', e)}
              className={`inline-flex items-center gap-1 whitespace-nowrap transition-colors py-1 hover:text-[#7B2CBF] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2CBF] rounded-lg px-1.5 ${
                openDropdown === 'explore' || ['tours', 'guides', 'planner', 'budget'].includes(activeTab) ? 'text-[#7B2CBF] font-bold' : ''
              }`}
            >
              <span>Explore More</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'explore' ? 'rotate-180 text-[#7B2CBF]' : ''}`} />
            </button>

            {openDropdown === 'explore' && (
              <div className="absolute top-full left-0 pt-3 w-84 z-[60]">
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-3 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Travel Discovery Tools</span>
                    <span className="text-[10px] font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">All Services</span>
                  </div>
                  <div className="p-2 space-y-1">
                  
                  {/* Tour Packages (Opens Full-screen Tour Discovery Overlay) */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('tours');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50/60 hover:text-[#7B2CBF] transition-colors group flex items-start gap-2.5 cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-[#7B2CBF] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-[#7B2CBF] flex items-center gap-1.5">
                        <span>Tour Packages</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-purple-100 text-[#7B2CBF] font-semibold">Featured</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Curated multi-day journeys with chauffeurs & heritage stays</div>
                    </div>
                  </button>

                  {/* Travel Guides */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('guides');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-cyan-50/60 hover:text-cyan-600 transition-colors group flex items-start gap-2.5 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-cyan-600 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-cyan-600">Travel Guides</div>
                      <div className="text-[11px] text-slate-500">First-timer handbooks, packing lists & cultural tips</div>
                    </div>
                  </button>

                  {/* Trip Planner */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('planner');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-orange-50/60 hover:text-[#FF5500] transition-colors group flex items-start gap-2.5 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#FF5500] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-[#FF5500]">Trip Planner</div>
                      <div className="text-[11px] text-slate-500">Custom day-by-day itinerary architect & route builder</div>
                    </div>
                  </button>

                  {/* Budget Tracker */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('budget');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50/60 hover:text-emerald-600 transition-colors group flex items-start gap-2.5 cursor-pointer"
                  >
                    <PieChart className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-600">Budget Tracker</div>
                      <div className="text-[11px] text-slate-500">Real-time expenditure calculator & cost forecasts</div>
                    </div>
                  </button>

                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 6. About Us */}
          <button
            type="button"
            onClick={() => { setActiveTab('about'); setOpenDropdown(null); }}
            className={`whitespace-nowrap transition-colors py-1 hover:text-slate-900 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded-lg px-1.5 ${
              activeTab === 'about' ? 'text-slate-900 font-bold border-b-2 border-slate-900' : ''
            }`}
          >
            About Us
          </button>

          {/* 7. Contact */}
          <button
            type="button"
            onClick={() => { 
              setActiveTab('contact'); 
              setOpenDropdown(null); 
            }}
            className={`whitespace-nowrap transition-colors py-1 hover:text-[#FF5500] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500] rounded-lg px-1.5 ${
              activeTab === 'contact' ? 'text-[#FF5500] font-bold border-b-2 border-[#FF5500]' : ''
            }`}
          >
            Contact
          </button>

        </nav>

        {/* Zone 3: Action Icons & CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Search Trigger */}
          <button 
            type="button"
            onClick={onOpenSearch}
            aria-label="Search destinations, hotels, or packages"
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500]"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Trigger */}
          <button 
            type="button"
            onClick={onOpenWishlist}
            aria-label="Saved destinations and tours"
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-xl transition-colors relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500]"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold text-white bg-[#FF3D00] rounded-full flex items-center justify-center shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Primary Action: Plan Your Trip CTA */}
          <button
            type="button"
            onClick={() => { setActiveTab('planner'); setOpenDropdown(null); }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#FF5500] via-[#FF7700] to-[#FF3D00] rounded-xl shadow-xs hover:shadow-md hover:from-[#e64d00] hover:to-[#e63700] transition-all whitespace-nowrap active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5500]"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Plan Your Trip</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-xl transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation with Accordion Submenus */}
      {mobileMenuOpen && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200 z-[60] max-h-[82vh] overflow-y-auto"
        >
          
          <button
            type="button"
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
              activeTab === 'home' ? 'bg-orange-50 text-[#FF5500]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Home
          </button>

          {/* Mobile Accordion: Destinations */}
          <div className="rounded-xl border border-slate-100 overflow-hidden bg-white">
            <button
              type="button"
              onClick={(e) => handleMobileAccordionToggle('destinations', e)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 cursor-pointer"
            >
              <span>Destinations</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAccordion === 'destinations' ? 'rotate-180 text-[#FF5500]' : ''}`} />
            </button>
            {mobileAccordion === 'destinations' && (
              <div className="bg-slate-50/80 p-2 space-y-1 text-xs border-t border-slate-100 animate-in fade-in duration-150">
                <button
                  type="button"
                  onClick={() => { setActiveTab('destinations'); setMobileMenuOpen(false); }}
                  className="w-full text-left p-2 rounded-lg font-bold text-[#FF5500] cursor-pointer"
                >
                  Explore All 30+ States →
                </button>
                {['North India', 'South India', 'West India', 'Northeast India', 'Spiritual Circuits'].map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => { setActiveTab('destinations'); setMobileMenuOpen(false); }}
                    className="w-full text-left p-2 rounded-lg text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Direct: Hotels */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('hotels');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
              activeTab === 'hotels' ? 'bg-blue-50 text-[#0088FF]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Hotels
          </button>

          {/* Mobile Direct: Transport / Taxi */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('transport');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
              activeTab === 'transport' ? 'bg-orange-50 text-[#FF5500]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Transport / Taxi
          </button>

          {/* Mobile Accordion: Explore More */}
          <div className="rounded-xl border border-slate-100 overflow-hidden bg-white">
            <button
              type="button"
              onClick={(e) => handleMobileAccordionToggle('explore', e)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 cursor-pointer"
            >
              <span>Explore More</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAccordion === 'explore' ? 'rotate-180 text-[#7B2CBF]' : ''}`} />
            </button>
            {mobileAccordion === 'explore' && (
              <div className="bg-slate-50/80 p-2 space-y-1 text-xs border-t border-slate-100 animate-in fade-in duration-150">
                <button
                  type="button"
                  onClick={() => { 
                    setActiveTab('tours');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-lg font-bold text-[#7B2CBF] flex items-center justify-between cursor-pointer"
                >
                  <span>Tour Packages</span>
                  <span className="text-[10px] bg-purple-100 px-1.5 py-0.5 rounded font-semibold">Featured</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('guides'); setMobileMenuOpen(false); }}
                  className="w-full text-left p-2 rounded-lg text-slate-700 hover:text-cyan-600 cursor-pointer"
                >
                  Travel Guides & Etiquette
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('planner'); setMobileMenuOpen(false); }}
                  className="w-full text-left p-2 rounded-lg text-slate-700 hover:text-[#FF5500] cursor-pointer"
                >
                  Custom Trip Planner
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('budget'); setMobileMenuOpen(false); }}
                  className="w-full text-left p-2 rounded-lg text-slate-700 hover:text-emerald-600 cursor-pointer"
                >
                  Budget & Expense Tracker
                </button>
              </div>
            )}
          </div>

          {/* Mobile Direct: About Us */}
          <button
            type="button"
            onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
              activeTab === 'about' ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            About Us
          </button>

          {/* Mobile Direct: Contact */}
          <button
            type="button"
            onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
              activeTab === 'contact' ? 'bg-orange-50 text-[#FF5500]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Contact
          </button>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab('planner');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3D00] rounded-xl shadow-xs cursor-pointer"
            >
              Plan Your Trip Now
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenContactModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 text-center text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl cursor-pointer"
            >
              Talk to a Travel Specialist
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
