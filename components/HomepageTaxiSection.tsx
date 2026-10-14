import React, { useState } from 'react';
import { 
  Car, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Plane, 
  Sparkles,
  X,
  Phone,
  Mail,
  UserCheck
} from 'lucide-react';

interface HomepageTaxiSectionProps {
  onEnquireTaxiDemo: (details: any) => void;
}

export interface TaxiVehicleCard {
  id: 'hatchback' | 'sedan' | 'suv' | 'premium-suv' | 'tempo';
  name: string;
  models: string;
  passengers: number;
  luggage: number;
  suitableFor: string;
  ratePerKm: number;
  baseFare: number;
  image: string;
}

const VEHICLES: TaxiVehicleCard[] = [
  {
    id: 'hatchback',
    name: 'Economy Hatchback',
    models: 'Maruti WagonR / Swift / Tiago',
    passengers: 4,
    luggage: 2,
    suitableFor: 'Solo travelers, couples & short intra-city hops',
    ratePerKm: 11,
    baseFare: 650,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'sedan',
    name: 'Prime Sedan',
    models: 'Maruti Dzire / Toyota Etios / Honda Amaze',
    passengers: 4,
    luggage: 3,
    suitableFor: 'Comfortable highway travel & business trips',
    ratePerKm: 14,
    baseFare: 900,
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'suv',
    name: 'Spacious Family SUV',
    models: 'Toyota Innova / Maruti Ertiga',
    passengers: 6,
    luggage: 4,
    suitableFor: 'Family trips, luggage & Himalayan mountain climbs',
    ratePerKm: 19,
    baseFare: 1400,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'premium-suv',
    name: 'Premium Luxury SUV',
    models: 'Toyota Innova Crysta / Fortuner',
    passengers: 7,
    luggage: 5,
    suitableFor: 'VIP comfort, executive groups & long road journeys',
    ratePerKm: 24,
    baseFare: 1900,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tempo',
    name: 'Tempo Traveller / Group Van',
    models: 'Force Urbania / 12-16 Seater Luxury Van',
    passengers: 14,
    luggage: 12,
    suitableFor: 'Pilgrimage yatras, wedding guests & group holidays',
    ratePerKm: 32,
    baseFare: 2800,
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80'
  }
];

const POPULAR_HIGHWAYS = [
  { from: 'Delhi', to: 'Agra', distance: 235 },
  { from: 'Delhi', to: 'Jaipur', distance: 280 },
  { from: 'Delhi', to: 'Haridwar / Rishikesh', distance: 240 },
  { from: 'Kathgodam', to: 'Nainital', distance: 35 },
  { from: 'Dehradun', to: 'Mussoorie', distance: 38 },
  { from: 'Lucknow', to: 'Ayodhya', distance: 135 },
  { from: 'Varanasi', to: 'Prayagraj', distance: 125 },
  { from: 'Mumbai', to: 'Pune', distance: 150 }
];

export const HomepageTaxiSection: React.FC<HomepageTaxiSectionProps> = ({ onEnquireTaxiDemo }) => {
  // Service category
  const [serviceType, setServiceType] = useState<'outstation' | 'airport' | 'sightseeing' | 'local'>('outstation');
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  
  // Locations & Dates
  const [pickupLocation, setPickupLocation] = useState('Delhi NCR');
  const [dropLocation, setDropLocation] = useState('Agra (Taj Mahal)');
  const [pickupDate, setPickupDate] = useState('2026-11-15');
  const [pickupTime, setPickupTime] = useState('06:30');
  const [returnDate, setReturnDate] = useState('2026-11-17');
  
  // Passengers & Luggage
  const [passengers, setPassengers] = useState(3);
  const [luggageBags, setLuggageBags] = useState(2);
  const [distanceKm, setDistanceKm] = useState(235);
  
  // Selected Vehicle
  const [selectedVehicleId, setSelectedVehicleId] = useState<TaxiVehicleCard['id']>('sedan');

  // Modal enquiry flow state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [specialNote, setSpecialNote] = useState('');

  const selectedVehicle = VEHICLES.find(v => v.id === selectedVehicleId) || VEHICLES[1];

  // Dynamic Fare Calculation
  const estimatedFare = React.useMemo(() => {
    let effectiveDist = distanceKm;
    if (tripType === 'round-trip' && serviceType === 'outstation') {
      effectiveDist = distanceKm * 1.85;
    } else if (serviceType === 'sightseeing') {
      effectiveDist = 80;
    } else if (serviceType === 'local') {
      effectiveDist = 40;
    }

    const distCost = Math.round(effectiveDist * selectedVehicle.ratePerKm);
    const tollTaxes = Math.round(distanceKm * 2.1);
    const driverAllowance = (tripType === 'round-trip' || distanceKm > 180) ? 450 : 0;
    const total = selectedVehicle.baseFare + distCost + tollTaxes + driverAllowance;

    return {
      baseFare: selectedVehicle.baseFare,
      distCost,
      tollTaxes,
      driverAllowance,
      total
    };
  }, [distanceKm, tripType, serviceType, selectedVehicle]);

  const handleSelectHighway = (route: typeof POPULAR_HIGHWAYS[0]) => {
    setPickupLocation(route.from);
    setDropLocation(route.to);
    setDistanceKm(route.distance);
  };

  const handleOpenBookingModal = () => {
    if (!pickupLocation.trim() || !dropLocation.trim()) {
      alert('Please specify your pickup and destination locations.');
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) {
      return;
    }
    setEnquirySuccess(true);
    onEnquireTaxiDemo({
      serviceType,
      tripType: serviceType === 'outstation' ? tripType : serviceType,
      pickupLocation,
      dropLocation,
      pickupDate,
      pickupTime,
      returnDate: tripType === 'round-trip' ? returnDate : undefined,
      vehicle: selectedVehicle.name,
      estimatedFare: estimatedFare.total,
      passengers,
      luggageBags,
      userName,
      userPhone
    });
  };

  return (
    <section id="homepage-taxi-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#FF5500] uppercase tracking-widest mb-1.5">
            <Car className="w-3.5 h-3.5" />
            <span>Chauffeured Outstation & Local Cabs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Taxi & Vehicle Booking Across India
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Book sanitized, air-conditioned intercity outstation cabs, one-way drops, airport transfers, and full-day sightseeing with professional commercial drivers.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Zero Advance · Transparent Tolls · 24x7 Support</span>
        </div>
      </div>

      {/* Main 2-Column Booking Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form with dynamic one-way vs round-trip fields */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-orange-200/90 shadow-sm space-y-6">
          
          {/* Service Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1.5 bg-slate-100 rounded-2xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setServiceType('outstation')}
              className={`py-2 px-2 rounded-xl transition-all cursor-pointer ${
                serviceType === 'outstation' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Outstation Trips
            </button>
            <button
              type="button"
              onClick={() => setServiceType('airport')}
              className={`py-2 px-2 rounded-xl transition-all cursor-pointer ${
                serviceType === 'airport' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Airport Transfer
            </button>
            <button
              type="button"
              onClick={() => setServiceType('sightseeing')}
              className={`py-2 px-2 rounded-xl transition-all cursor-pointer ${
                serviceType === 'sightseeing' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sightseeing (8h)
            </button>
            <button
              type="button"
              onClick={() => setServiceType('local')}
              className={`py-2 px-2 rounded-xl transition-all cursor-pointer ${
                serviceType === 'local' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Local City Ride
            </button>
          </div>

          {/* One-Way vs Round-Trip Toggle */}
          {serviceType === 'outstation' && (
            <div className="flex items-center gap-6 p-3 bg-orange-50/60 rounded-xl text-xs font-bold text-slate-800 border border-orange-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  checked={tripType === 'one-way'}
                  onChange={() => setTripType('one-way')}
                  className="accent-[#FF5500] w-4 h-4 cursor-pointer"
                />
                <span>One-Way Intercity Drop</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  checked={tripType === 'round-trip'}
                  onChange={() => setTripType('round-trip')}
                  className="accent-[#FF5500] w-4 h-4 cursor-pointer"
                />
                <span>Round-Trip (Return with Same Chauffeur)</span>
              </label>
            </div>
          )}

          {/* Locations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
                <span>Pickup City / Location</span>
              </label>
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="e.g. Connaught Place, New Delhi"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF5500] text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Destination City / Drop</span>
              </label>
              <input
                type="text"
                value={dropLocation}
                onChange={(e) => setDropLocation(e.target.value)}
                placeholder="e.g. Agra, Jaipur, Haridwar"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF5500] text-slate-800"
              />
            </div>
          </div>

          {/* Dynamic Dates: Shows Return Date ONLY for Round-Trip */}
          <div className={`grid grid-cols-1 ${tripType === 'round-trip' && serviceType === 'outstation' ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-4`}>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0088FF]" />
                <span>Pickup Date</span>
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#7B2CBF]" />
                <span>Pickup Time</span>
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
              />
            </div>

            {/* RETURN DATE (Shown conditionally for round trips) */}
            {tripType === 'round-trip' && serviceType === 'outstation' && (
              <div className="space-y-1.5 animate-in fade-in duration-200">
                <label className="text-xs font-bold text-[#FF5500] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Return Date (Round-Trip)</span>
                </label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-orange-50/50 border border-orange-200 rounded-xl text-slate-800 font-semibold"
                />
              </div>
            )}

          </div>

          {/* Passengers & Luggage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span>Number of Passengers</span>
              </label>
              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
              >
                <option value={1}>1 Passenger</option>
                <option value={2}>2 Passengers</option>
                <option value={3}>3 Passengers</option>
                <option value={4}>4 Passengers</option>
                <option value={6}>5 – 6 Passengers (SUV Recommended)</option>
                <option value={12}>7 – 14 Passengers (Tempo / Van)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                <span>Luggage Bags</span>
              </label>
              <select
                value={luggageBags}
                onChange={(e) => setLuggageBags(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
              >
                <option value={1}>1 Small Bag</option>
                <option value={2}>2 Medium Suitcases</option>
                <option value={4}>3 – 4 Suitcases</option>
                <option value={8}>5+ Large Suitcases</option>
              </select>
            </div>
          </div>

          {/* Distance Slider (Outstation) */}
          {serviceType === 'outstation' && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Estimated Distance:</span>
                <span className="font-extrabold text-[#FF5500] tabular-nums">
                  {distanceKm} km {tripType === 'round-trip' ? `(Round-trip ~${distanceKm * 2} km)` : ''}
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="750"
                step="10"
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="w-full accent-[#FF5500] cursor-pointer"
              />
            </div>
          )}

          {/* Quick-Select Highway Corridors */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Quick Select Highway Routes:
            </span>
            <div className="flex flex-wrap gap-2">
              {POPULAR_HIGHWAYS.map((route) => (
                <button
                  key={`${route.from}-${route.to}`}
                  type="button"
                  onClick={() => handleSelectHighway(route)}
                  className="text-xs px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-[#FF5500] hover:border-orange-200 text-slate-700 border border-slate-200/80 transition-colors cursor-pointer"
                >
                  {route.from} → {route.to} ({route.distance} km)
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Vehicle Cards & Live Fare Summary */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Vehicle Category Cards per Section 5 */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 font-display">
              Choose Vehicle Fleet Tier
            </h3>

            <div className="space-y-2.5">
              {VEHICLES.map((veh) => {
                const isSelected = selectedVehicleId === veh.id;

                return (
                  <div
                    key={veh.id}
                    onClick={() => setSelectedVehicleId(veh.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-[#FF5500] bg-orange-50/50 shadow-xs ring-1 ring-[#FF5500]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900 font-display">{veh.name}</span>
                        <span className="text-xs font-black text-[#FF5500] tabular-nums">₹{veh.ratePerKm}/km</span>
                      </div>
                      <div className="text-[11px] text-slate-500">{veh.models}</div>
                      <div className="text-[10px] text-slate-400">{veh.suitableFor}</div>
                      
                      <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-slate-400" />
                          <span>{veh.passengers} Seats</span>
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3 text-slate-400" />
                          <span>{veh.luggage} Bags</span>
                        </span>
                        <span>·</span>
                        <span className="text-emerald-700 font-medium">AC Verified</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVehicleId(veh.id);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                        isSelected 
                          ? 'bg-[#FF5500] text-white shadow-xs' 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Fare Breakdown & Book Action */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900 font-display">
                Indicative Fare Summary
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                Transparent Rate
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Selected Vehicle:</span>
                <span className="font-semibold text-slate-900">{selectedVehicle.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Trip Type:</span>
                <span className="font-semibold text-slate-900 capitalize">{tripType} {serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span>Distance Fare ({distanceKm} km @ ₹{selectedVehicle.ratePerKm}/km):</span>
                <span className="tabular-nums font-semibold text-slate-900">₹{estimatedFare.distCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Base Dispatch & Sanitization:</span>
                <span className="tabular-nums font-semibold text-slate-900">₹{estimatedFare.baseFare.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Est. Highway Tolls & Interstate Permit:</span>
                <span className="tabular-nums font-semibold text-slate-900">₹{estimatedFare.tollTaxes.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Indicative Quote</span>
                <div className="text-3xl font-black text-slate-900 tabular-nums">
                  ₹{estimatedFare.total.toLocaleString('en-IN')}
                </div>
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">Tolls & Fuel Included</span>
            </div>

            <button
              type="button"
              onClick={handleOpenBookingModal}
              className="w-full py-3.5 text-xs font-bold text-white bg-gradient-to-r from-[#FF5500] via-[#FF7700] to-[#FF3D00] hover:from-[#e64d00] hover:to-[#e63700] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              <span>Submit Taxi Booking Enquiry (Demo)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>No pre-payment required · Pay driver at completion of trip</span>
            </div>
          </div>

        </div>

      </div>

      {/* Taxi Enquiry / Demo Reservation Modal (Section 5 Flow) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF5500] flex items-center justify-center">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-display">
                    {enquirySuccess ? 'Taxi Enquiry Confirmed' : 'Confirm Taxi Booking Enquiry'}
                  </h4>
                  <span className="text-[11px] text-slate-500">Frontend Demo Reservation</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => { setIsModalOpen(false); setEnquirySuccess(false); }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {enquirySuccess ? (
              <div className="p-6 sm:p-8 space-y-4 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-slate-900 font-display">
                    Enquiry Submitted Successfully!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Your ride request for <strong>{selectedVehicle.name}</strong> from <strong>{pickupLocation}</strong> to <strong>{dropLocation}</strong> has been logged in this demo session.
                  </p>
                </div>

                {/* Summary voucher box */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Pickup Date & Time:</span>
                    <span className="font-semibold text-slate-900">{pickupDate} at {pickupTime}</span>
                  </div>
                  {tripType === 'round-trip' && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Return Date:</span>
                      <span className="font-semibold text-slate-900">{returnDate}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-500">Lead Passenger:</span>
                    <span className="font-semibold text-slate-900">{userName} ({userPhone})</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 font-bold">
                    <span>Estimated Fare:</span>
                    <span className="text-[#FF5500]">₹{estimatedFare.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 text-left">
                  <strong>Notice:</strong> This is an interactive frontend prototype demonstrating Flyvora's booking UX. No live chauffeur dispatch or credit card charge took place.
                </div>

                <button
                  type="button"
                  onClick={() => { setIsModalOpen(false); setEnquirySuccess(false); }}
                  className="w-full py-2.5 text-xs font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmEnquiry} className="p-6 space-y-4">
                
                {/* Trip Recap Box */}
                <div className="p-3.5 bg-orange-50/70 rounded-2xl border border-orange-100 text-xs space-y-1.5">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{pickupLocation} → {dropLocation}</span>
                    <span className="text-[#FF5500]">₹{estimatedFare.total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    {selectedVehicle.name} · {pickupDate} at {pickupTime} {tripType === 'round-trip' ? `(Return: ${returnDate})` : '(One-Way)'}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Passenger Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Srishti Singh"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF5500] text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Mobile Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF5500] text-slate-800"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Email Address (Optional)</label>
                      <input
                        type="email"
                        placeholder="srishti@example.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF5500] text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Special Pickup Notes / Flight Number</label>
                    <input
                      type="text"
                      placeholder="e.g. Flight 6E-204 arriving at Terminal 3, extra luggage"
                      value={specialNote}
                      onChange={(e) => setSpecialNote(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF5500] text-slate-800"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 text-xs font-bold text-white bg-gradient-to-r from-[#FF5500] via-[#FF7700] to-[#FF3D00] hover:from-[#e64d00] hover:to-[#e63700] rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Submit Booking Enquiry (Demo Confirmation)
                  </button>
                  <span className="text-[10px] text-slate-400 block text-center mt-1.5">
                    No payment needed · Validated locally in your browser
                  </span>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
