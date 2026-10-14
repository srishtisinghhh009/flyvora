import React, { useState, useMemo } from 'react';
import { Hotel } from '../types';
import { HOTELS } from '../data/hotels';
import { 
  Building, 
  Search, 
  Calendar, 
  Users, 
  Star, 
  MapPin, 
  Check, 
  Heart, 
  ArrowRight, 
  ShieldAlert, 
  SlidersHorizontal,
  X,
  CheckCircle2,
  Clock,
  Navigation
} from 'lucide-react';

interface HomepageHotelsSectionProps {
  onBookHotelDemo: (hotel: Hotel, roomType: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (item: any) => void;
  onNavigateToHotelsPage?: () => void;
}

const CITY_OPTIONS = [
  'All Destinations',
  'Agra',
  'Lucknow',
  'Delhi and New Delhi',
  'Rishikesh',
  'Haridwar',
  'Nainital',
  'Dehradun and Mussoorie',
  'Varanasi',
  'Jaipur and Udaipur',
  'Srinagar and Gulmarg'
];

export const HomepageHotelsSection: React.FC<HomepageHotelsSectionProps> = ({
  onBookHotelDemo,
  wishlistIds,
  onToggleWishlist,
  onNavigateToHotelsPage
}) => {
  const [searchCity, setSearchCity] = useState('All Destinations');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [selectedAmenity, setSelectedAmenity] = useState('All');
  const [maxPrice, setMaxPrice] = useState(50000);

  // Check-in & out dates
  const [checkInDate, setCheckInDate] = useState('2026-11-15');
  const [checkOutDate, setCheckOutDate] = useState('2026-11-18');
  const [guestsCount, setGuestsCount] = useState(2);
  const [roomsCount, setRoomsCount] = useState(1);

  // Selected hotel for detail modal
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  // Nights calculation
  const numberOfNights = useMemo(() => {
    try {
      const d1 = new Date(checkInDate);
      const d2 = new Date(checkOutDate);
      const diffTime = d2.getTime() - d1.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 3;
    }
  }, [checkInDate, checkOutDate]);

  const hotelStyles = useMemo(() => {
    return ['All', ...Array.from(new Set(HOTELS.map(h => h.type)))];
  }, []);

  const amenitiesList = useMemo(() => {
    return ['All', 'Spa', 'Pool', 'Ghat', 'Butler', 'Views', 'Yoga'];
  }, []);

  const filteredHotels = useMemo(() => {
    return HOTELS.filter(hotel => {
      const matchCity = 
        searchCity === 'All Destinations' || 
        hotel.city.toLowerCase().includes(searchCity.toLowerCase()) ||
        searchCity.toLowerCase().includes(hotel.city.toLowerCase());

      const matchQuery = 
        !searchQuery ||
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.state.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStyle = selectedStyle === 'All' || hotel.type === selectedStyle;

      const matchAmenity = 
        selectedAmenity === 'All' || 
        hotel.amenities.some(a => a.toLowerCase().includes(selectedAmenity.toLowerCase()));

      const matchPrice = hotel.pricePerNight <= maxPrice;

      return matchCity && matchQuery && matchStyle && matchAmenity && matchPrice;
    });
  }, [searchCity, searchQuery, selectedStyle, selectedAmenity, maxPrice]);

  return (
    <section id="homepage-hotels-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0088FF] uppercase tracking-widest mb-1.5">
            <Building className="w-3.5 h-3.5" />
            <span>Handpicked Palaces & Luxury Stays</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Hotels & Stays in Top Indian Destinations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Explore heritage Rajput fortresses, sacred Ganges riverside havelis, colonial hill estates in Mussoorie, and alpine cedar retreats in Gulmarg.
          </p>
        </div>

        {onNavigateToHotelsPage && (
          <button
            onClick={onNavigateToHotelsPage}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0088FF] hover:text-[#0077e6] transition-colors cursor-pointer shrink-0"
          >
            <span>Browse All Hotels Across India</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Interactive Hotel Search & Filter Box */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-blue-200/90 shadow-sm space-y-4">
        
        {/* Top Search Inputs Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Destination / City Select */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#0088FF]" />
              Destination / City
            </label>
            <select
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="w-full py-2.5 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0088FF] text-slate-800"
            >
              {CITY_OPTIONS.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Hotel Name or Keyword */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Search className="w-3 h-3 text-[#0088FF]" />
              Hotel Name / Landmark
            </label>
            <input
              type="text"
              placeholder="e.g. Amarvilas, Savoy, BrijRama..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0088FF] text-slate-800"
            />
          </div>

          {/* Dates */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#0088FF]" />
              Dates ({numberOfNights} Nights)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full py-2 px-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
              />
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full py-2 px-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
              />
            </div>
          </div>

          {/* Guests & Max Rate */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <span>Max Nightly Rate</span>
              <span className="text-[#0088FF] font-black">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="8000"
              max="50000"
              step="2000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#0088FF] cursor-pointer mt-2"
            />
          </div>

        </div>

        {/* Filter Chips Strip (Style & Key Amenities) */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" />
              Category:
            </span>
            {hotelStyles.slice(0, 5).map(style => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`px-3 py-1 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedStyle === style 
                    ? 'bg-[#0088FF] text-white font-bold shadow-xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {style === 'All' ? 'All Categories' : style}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-semibold">Amenity:</span>
            {amenitiesList.slice(0, 5).map(am => (
              <button
                key={am}
                onClick={() => setSelectedAmenity(am)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedAmenity === am 
                    ? 'bg-slate-900 text-white font-bold' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {am}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.length === 0 ? (
          <div className="col-span-full py-14 text-center bg-white rounded-3xl border border-dashed border-slate-200">
            <Building className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-800">No hotels matched your filters</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the destination to "All Destinations" or increasing your nightly budget.</p>
            <button
              onClick={() => { setSearchCity('All Destinations'); setSearchQuery(''); setSelectedStyle('All'); setSelectedAmenity('All'); setMaxPrice(50000); }}
              className="mt-3 px-4 py-2 text-xs font-bold text-[#0088FF] bg-blue-50 rounded-xl hover:bg-blue-100 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredHotels.slice(0, 6).map((hotel) => {
            const isWishlisted = wishlistIds.includes(hotel.id);
            const totalEstimatedCost = hotel.pricePerNight * numberOfNights * roomsCount;

            return (
              <div
                key={hotel.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Hotel Photo */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
                    
                    {/* Wishlist toggle */}
                    <button
                      onClick={() => onToggleWishlist({
                        id: hotel.id,
                        type: 'hotel',
                        title: hotel.name,
                        subtitle: `${hotel.city}, ${hotel.state}`,
                        image: hotel.image,
                        price: hotel.pricePerNight
                      })}
                      aria-label="Save hotel to wishlist"
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors shadow-xs cursor-pointer ${
                        isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 hover:bg-white text-slate-700'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[11px] font-bold text-slate-900 shadow-xs">
                      {hotel.type}
                    </div>

                    {/* Location on bottom of image */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-xs font-semibold flex items-center gap-1 drop-shadow-sm">
                        <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
                        <span>{hotel.city}, {hotel.state}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0088FF] transition-colors font-display line-clamp-1">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-lg shrink-0">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{hotel.rating}</span>
                        <span className="text-[10px] text-amber-700">({hotel.reviewsCount})</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {hotel.locationDescription}
                    </p>

                    {/* Amenities chips */}
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {hotel.amenities.slice(0, 3).map((am, i) => (
                        <span 
                          key={i} 
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-50 text-[11px] text-slate-600 border border-slate-100"
                        >
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>{am}</span>
                        </span>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Price and Action Bar */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-end justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Indicative Nightly Rate</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-slate-900">
                          ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-slate-500">/ night</span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-semibold block">
                        ₹{totalEstimatedCost.toLocaleString('en-IN')} for {numberOfNights} {numberOfNights === 1 ? 'night' : 'nights'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedHotel(hotel)}
                        className="px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => onBookHotelDemo(hotel, hotel.roomTypes[0]?.name || 'Standard Room')}
                        className="px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0088FF] to-[#00A3FF] hover:from-[#0077e6] hover:to-[#0092e6] rounded-xl shadow-xs transition-all cursor-pointer active:scale-95"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Hotel Detail Modal (Section 4 Experience) */}
      {selectedHotel && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div 
            className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 relative my-6 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#0088FF]">
                  {selectedHotel.type}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs font-semibold text-slate-600">
                  {selectedHotel.city}, {selectedHotel.state}
                </span>
              </div>

              <button
                onClick={() => setSelectedHotel(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable details */}
            <div className="overflow-y-auto flex-1 p-6 space-y-6">
              
              {/* Photo & Title Banner */}
              <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={selectedHotel.image}
                  alt={selectedHotel.name}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/30" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs text-amber-300 mb-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">{selectedHotel.rating} / 5.0</span>
                    <span className="text-slate-300">({selectedHotel.reviewsCount} reviews)</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
                    {selectedHotel.name}
                  </h2>
                  <p className="text-xs text-slate-200 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
                    {selectedHotel.locationDescription}
                  </p>
                </div>
              </div>

              {/* Amenities Grid */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Available Hotel Amenities & Services
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700">
                  {selectedHotel.amenities.map((am, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium">{am}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Tiers Comparison */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Available Room Tiers ({numberOfNights} Nights)
                </h3>
                
                <div className="space-y-3">
                  {selectedHotel.roomTypes.map((room) => {
                    const roomTotal = room.price * numberOfNights * roomsCount;

                    return (
                      <div 
                        key={room.name}
                        className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-extrabold text-slate-900 font-display">{room.name}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Free Breakfast Included
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                            {room.description}
                          </p>
                        </div>

                        <div className="flex items-center sm:flex-col sm:items-end justify-between shrink-0 gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                          <div className="text-right">
                            <div className="text-lg font-black text-slate-900">
                              ₹{room.price.toLocaleString('en-IN')} 
                              <span className="text-xs text-slate-400 font-normal"> / night</span>
                            </div>
                            <span className="text-[11px] text-slate-500 block">
                              Total: ₹{roomTotal.toLocaleString('en-IN')} (incl. taxes)
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              setSelectedHotel(null);
                              onBookHotelDemo(selectedHotel, room.name);
                            }}
                            className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0088FF] to-[#00A3FF] hover:from-[#0077e6] hover:to-[#0092e6] rounded-xl shadow-xs transition-all cursor-pointer active:scale-95"
                          >
                            Reserve Demo
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Nearby Attractions & Info */}
              {selectedHotel.nearbyAttractions && selectedHotel.nearbyAttractions.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-[#0088FF]" />
                    Nearby Attractions:
                  </h3>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {selectedHotel.nearbyAttractions.map((att, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-medium">
                        {att}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Policies & Disclaimers */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-1">
                <div className="font-bold text-slate-700 mb-0.5">Stay Policies:</div>
                <p>{selectedHotel.checkInOutInfo || 'Check-in: 2:00 PM · Check-out: 12:00 PM noon · Aadhaar / Passport required at check-in'}</p>
                <p className="text-[11px] text-slate-400 pt-1">
                  * Representative demo quotes. Reservations placed trigger simulated vouchers without charging payment instruments.
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
