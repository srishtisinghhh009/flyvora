import React, { useState, useMemo } from 'react';
import { Hotel } from '../types';
import { HOTELS } from '../data/hotels';
import { 
  Search, 
  Star, 
  MapPin, 
  Check, 
  Heart, 
  ShieldAlert, 
  ArrowRight, 
  X, 
  Building, 
  Coffee, 
  Wifi, 
  Sparkles, 
  Calendar, 
  Users, 
  SlidersHorizontal,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface HotelsPageProps {
  onBookHotelDemo: (hotel: Hotel, roomType: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (item: any) => void;
}

export const HotelsPage: React.FC<HotelsPageProps> = ({
  onBookHotelDemo,
  wishlistIds,
  onToggleWishlist
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');
  
  // Dates & Guests for real-time stay calculation
  const [checkInDate, setCheckInDate] = useState('2026-11-15');
  const [checkOutDate, setCheckOutDate] = useState('2026-11-18');
  const [guestsCount, setGuestsCount] = useState(2);
  const [roomsCount, setRoomsCount] = useState(1);

  const [selectedHotelDetail, setSelectedHotelDetail] = useState<Hotel | null>(null);

  // Calculate nights
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

  // Unique cities
  const cities = useMemo(() => {
    return ['All', ...Array.from(new Set(HOTELS.map(h => h.city))).sort()];
  }, []);

  const hotelTypes = useMemo(() => {
    return ['All', ...Array.from(new Set(HOTELS.map(h => h.type)))];
  }, []);

  const filteredHotels = useMemo(() => {
    let list = HOTELS.filter(hotel => {
      const matchSearch = 
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.amenities.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCity = cityFilter === 'All' || hotel.city.toLowerCase().includes(cityFilter.toLowerCase());
      const matchType = typeFilter === 'All' || hotel.type === typeFilter;
      const matchPrice = hotel.pricePerNight <= maxPrice;

      return matchSearch && matchCity && matchType && matchPrice;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [searchQuery, cityFilter, typeFilter, maxPrice, sortBy]);

  return (
    <div className="py-10 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0088FF] uppercase tracking-widest mb-1.5">
              <Building className="w-3.5 h-3.5" />
              <span>Handpicked Luxury Stays & Heritage Forts</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Hotels & Stays Across India
            </h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              From 250-year-old Rajput fortresses and Arabian sea pool villas to serene Kerala backwater houseboats.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Verified Luxury Standards · Complimentary High Tea & Breakfast</span>
          </div>
        </div>

        {/* Demo Experience Notice */}
        <div className="p-3.5 bg-blue-50/80 border border-blue-200/80 rounded-2xl flex items-center gap-3 text-xs text-blue-900 shadow-xs">
          <ShieldAlert className="w-4 h-4 text-[#0088FF] shrink-0" />
          <span>
            <strong>Demo Reservation Flow:</strong> Room rates and availability are live illustrative quotes. Submitting an enquiry triggers a simulated reservation confirmation with full booking voucher details without charging cards.
          </span>
        </div>

        {/* Stay Parameters Strip (Check-in, Check-out, Guests) */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Search input */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Search className="w-3 h-3 text-[#0088FF]" />
                Destination / Hotel Name
              </label>
              <input
                type="text"
                placeholder="e.g. Rambagh, Jaipur, Kerala..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0088FF] text-slate-800"
              />
            </div>

            {/* Check-in & Check-out */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#0088FF]" />
                Check-in / Check-out ({numberOfNights} Nights)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full py-2 px-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0088FF] text-slate-800"
                />
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full py-2 px-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0088FF] text-slate-800"
                />
              </div>
            </div>

            {/* Guests & Rooms */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Users className="w-3 h-3 text-[#0088FF]" />
                Guests & Rooms
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full py-2 px-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0088FF] text-slate-800"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={6}>6+ Guests</option>
                </select>
                <select
                  value={roomsCount}
                  onChange={(e) => setRoomsCount(Number(e.target.value))}
                  className="w-full py-2 px-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0088FF] text-slate-800"
                >
                  <option value={1}>1 Room</option>
                  <option value={2}>2 Rooms</option>
                  <option value={3}>3 Rooms</option>
                </select>
              </div>
            </div>

            {/* Max Price Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <span>Max Nightly Rate</span>
                <span className="text-[#0088FF] font-black">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="60000"
                step="2000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#0088FF] cursor-pointer mt-2"
              />
            </div>

          </div>

          {/* Secondary filter chips & sort */}
          <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Property types chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" />
                Style:
              </span>
              {hotelTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    typeFilter === type
                      ? 'bg-[#0088FF] text-white shadow-xs font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {type === 'All' ? 'All Styles' : type}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-slate-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-1 px-3 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-[#0088FF]"
              >
                <option value="recommended">Recommended & Curated</option>
                <option value="rating">Highest Guest Rating</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

          </div>

        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-slate-200">
              <Building className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="text-base font-bold text-slate-800">No matching hotels found</h3>
              <p className="text-xs text-slate-500 mt-1">Try raising your price ceiling or selecting all destinations.</p>
              <button
                onClick={() => { setSearchQuery(''); setCityFilter('All'); setTypeFilter('All'); setMaxPrice(60000); }}
                className="mt-3 px-4 py-2 text-xs font-bold text-[#0088FF] bg-blue-50 rounded-xl hover:bg-blue-100 cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredHotels.map((hotel) => {
              const isWishlisted = wishlistIds.includes(hotel.id);
              const totalStayPrice = hotel.pricePerNight * numberOfNights * roomsCount;

              return (
                <div
                  key={hotel.id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group justify-between"
                >
                  {/* Top Photo Section */}
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                      
                      {/* Wishlist button */}
                      <button
                        onClick={() => onToggleWishlist({ 
                          id: hotel.id, 
                          type: 'hotel', 
                          title: hotel.name, 
                          subtitle: `${hotel.city}, ${hotel.state}`, 
                          image: hotel.image, 
                          price: hotel.pricePerNight 
                        })}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors shadow-xs cursor-pointer ${
                          isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 hover:bg-white text-slate-700'
                        }`}
                        aria-label="Save hotel"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>

                      {/* Property Type Badge */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[11px] font-bold text-slate-900 shadow-xs">
                        {hotel.type}
                      </div>

                      {/* City location over image */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="text-xs font-semibold flex items-center gap-1 drop-shadow-sm">
                          <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
                          <span>{hotel.city}, {hotel.state}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hotel Details Body */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0088FF] transition-colors font-display">
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
                        {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                          <span 
                            key={idx} 
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 text-[11px] text-slate-600 border border-slate-100"
                          >
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>{amenity}</span>
                          </span>
                        ))}
                      </div>

                      {/* Room Tier Preview */}
                      <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 text-xs">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Standard Room:
                        </div>
                        <div className="font-semibold text-slate-800">
                          {hotel.roomTypes[0]?.name || 'Deluxe Room'}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {hotel.roomTypes[0]?.description}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Strip & Actions */}
                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-slate-100 flex items-end justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Nightly Rate</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-black text-slate-900">
                            ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[11px] text-slate-500">/ night</span>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-semibold block">
                          ₹{totalStayPrice.toLocaleString('en-IN')} for {numberOfNights} {numberOfNights === 1 ? 'night' : 'nights'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedHotelDetail(hotel)}
                          className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                        >
                          View Rooms
                        </button>
                        <button
                          onClick={() => onBookHotelDemo(hotel, hotel.roomTypes[0]?.name || 'Deluxe Room')}
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

        {/* Detailed Hotel Modal */}
        {selectedHotelDetail && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
            <div 
              className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 relative my-6 max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Header Bar */}
              <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#0088FF]">
                    {selectedHotelDetail.type}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs font-semibold text-slate-600">
                    {selectedHotelDetail.city}, {selectedHotelDetail.state}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedHotelDetail(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1 p-6 space-y-6">
                
                {/* Photo & Title Banner */}
                <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-900">
                  <img
                    src={selectedHotelDetail.image}
                    alt={selectedHotelDetail.name}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/30" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 text-xs text-amber-300 mb-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold">{selectedHotelDetail.rating} / 5.0</span>
                      <span className="text-slate-300">({selectedHotelDetail.reviewsCount} verified reviews)</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
                      {selectedHotelDetail.name}
                    </h2>
                    <p className="text-xs text-slate-200 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
                      {selectedHotelDetail.locationDescription}
                    </p>
                  </div>
                </div>

                {/* Amenities Grid */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Signature Inclusions & Facilities
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700">
                    {selectedHotelDetail.amenities.map((am, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-medium">{am}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Room Tiers Comparison */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Available Room Categories ({numberOfNights} Nights: {checkInDate} to {checkOutDate})
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {selectedHotelDetail.roomTypes.map((room) => {
                      const roomTotal = room.price * numberOfNights * roomsCount;

                      return (
                        <div 
                          key={room.name} 
                          className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all bg-white hover:bg-blue-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
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
                            <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                              <span>Max {guestsCount} Guests</span>
                              <span>·</span>
                              <span>Free Cancellation before 48h</span>
                            </div>
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
                                onBookHotelDemo(selectedHotelDetail, room.name);
                                setSelectedHotelDetail(null);
                              }}
                              className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0088FF] to-[#00A3FF] hover:from-[#0077e6] hover:to-[#0092e6] rounded-xl shadow-xs transition-all cursor-pointer active:scale-95"
                            >
                              Reserve This Room
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Hotel Policies */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500 space-y-1">
                  <div className="font-bold text-slate-700 mb-1">Stay Policies & Guest Advice:</div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div><strong>Check-in:</strong> 2:00 PM onwards</div>
                    <div><strong>Check-out:</strong> 12:00 PM noon</div>
                    <div><strong>Government ID:</strong> Aadhaar / Passport required at check-in</div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
