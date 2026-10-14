import React, { useState } from 'react';
import { VEHICLE_OPTIONS, POPULAR_ROUTES, calculateEstimatedFare, VehicleOption } from '../data/transport';
import { 
  Car, 
  Users, 
  Briefcase, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  Plane, 
  Sparkles, 
  ShieldCheck, 
  Navigation,
  PhoneCall
} from 'lucide-react';

interface TransportPageProps {
  onEnquireTaxiDemo: (details: any) => void;
}

const MAJOR_AIRPORTS = [
  { code: 'DEL', name: 'Indira Gandhi International Airport, New Delhi (DEL)', city: 'Delhi NCR' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport, Mumbai (BOM)', city: 'Mumbai' },
  { code: 'BLR', name: 'Kempegowda International Airport, Bengaluru (BLR)', city: 'Bengaluru' },
  { code: 'COK', name: 'Cochin International Airport, Kochi (COK)', city: 'Kochi & Munnar' },
  { code: 'JAI', name: 'Jaipur International Airport, Sanganer (JAI)', city: 'Jaipur' },
  { code: 'GOI', name: 'Dabolim & Mopa (Manohar) Airport, Goa (GOI/GOX)', city: 'Goa' },
  { code: 'VNS', name: 'Lal Bahadur Shastri Airport, Varanasi (VNS)', city: 'Varanasi & Ayodhya' },
  { code: 'IXC', name: 'Shaheed Bhagat Singh Airport, Chandigarh (IXC)', city: 'Chandigarh & Shimla' }
];

export const TransportPage: React.FC<TransportPageProps> = ({ onEnquireTaxiDemo }) => {
  const [serviceType, setServiceType] = useState<'outstation' | 'airport' | 'sightseeing'>('outstation');
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [pickupCity, setPickupCity] = useState('Delhi');
  const [dropCity, setDropCity] = useState('Agra');
  const [travelDate, setTravelDate] = useState('2026-11-15');
  const [pickupTime, setPickupTime] = useState('06:00');
  const [selectedVehicle, setSelectedVehicle] = useState<'hatchback' | 'sedan' | 'suv' | 'luxury'>('sedan');
  const [distanceKm, setDistanceKm] = useState(235);
  const [sightseeingHours, setSightseeingHours] = useState<'8h' | '12h'>('8h');
  const [airportDirection, setAirportDirection] = useState<'to-airport' | 'from-airport'>('from-airport');
  const [selectedAirport, setSelectedAirport] = useState(MAJOR_AIRPORTS[0].name);

  // When picking a popular route
  const handleSelectPopularRoute = (route: typeof POPULAR_ROUTES[0]) => {
    setServiceType('outstation');
    setPickupCity(route.from);
    setDropCity(route.to);
    setDistanceKm(route.distanceKm);
  };

  const fareBreakdown = calculateEstimatedFare(
    selectedVehicle,
    distanceKm,
    tripType,
    serviceType
  );

  const selectedVehicleObj = VEHICLE_OPTIONS.find(v => v.id === selectedVehicle) || VEHICLE_OPTIONS[1];

  const handleEnquire = () => {
    onEnquireTaxiDemo({
      serviceType,
      tripType: serviceType === 'outstation' ? tripType : serviceType,
      pickupCity: serviceType === 'airport' ? (airportDirection === 'from-airport' ? selectedAirport : pickupCity) : pickupCity,
      dropCity: serviceType === 'airport' ? (airportDirection === 'from-airport' ? dropCity : selectedAirport) : dropCity,
      travelDate,
      pickupTime,
      vehicle: selectedVehicleObj.name,
      estimatedFare: fareBreakdown.total,
      distanceKm: serviceType === 'sightseeing' ? (sightseeingHours === '8h' ? 80 : 120) : distanceKm
    });
  };

  return (
    <div className="py-10 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1.5">
              <Car className="w-3.5 h-3.5" />
              <span>Chauffeured Intercity & Sightseeing Cabs</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Taxi & Airport Transfers Across India
            </h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Transparent, fixed-fare outstation cabs, airport pickups, and full-day sightseeing with verified background-checked chauffeurs.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Commercial T-Permit · Zero Surge Guarantee · 24x7 Helpline</span>
          </div>
        </div>

        {/* Honest Demo Notice */}
        <div className="p-3.5 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl flex items-center gap-3 text-xs text-emerald-900 shadow-xs">
          <Info className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            <strong>Demo Fare Calculator:</strong> Estimates reflect realistic highway toll allowances, fuel rates, driver night stay rules, and interstate taxes. Booking simulation produces an instant digital itinerary voucher without financial transaction.
          </span>
        </div>

        {/* Main 2-Column Booking Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form & Route Setup */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            
            {/* Service Type Tabs */}
            <div className="flex rounded-2xl bg-slate-100 p-1.5 gap-1">
              <button
                onClick={() => setServiceType('outstation')}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  serviceType === 'outstation' 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Outstation Taxi
              </button>
              <button
                onClick={() => setServiceType('airport')}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  serviceType === 'airport' 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Airport Transfer
              </button>
              <button
                onClick={() => setServiceType('sightseeing')}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  serviceType === 'sightseeing' 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                City Sightseeing
              </button>
            </div>

            {/* Sub-options for Outstation */}
            {serviceType === 'outstation' && (
              <div className="flex items-center gap-6 p-3 bg-slate-50 rounded-xl text-xs font-bold text-slate-700">
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
                  <span>Round-Trip (Return with Same Cab)</span>
                </label>
              </div>
            )}

            {/* Sub-options for Airport */}
            {serviceType === 'airport' && (
              <div className="space-y-3 p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-6 text-xs font-bold text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="airportDirection"
                      checked={airportDirection === 'from-airport'}
                      onChange={() => setAirportDirection('from-airport')}
                      className="accent-[#0088FF] w-4 h-4 cursor-pointer"
                    />
                    <span>Pickup From Airport (Arrival)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="airportDirection"
                      checked={airportDirection === 'to-airport'}
                      onChange={() => setAirportDirection('to-airport')}
                      className="accent-[#0088FF] w-4 h-4 cursor-pointer"
                    />
                    <span>Drop to Airport (Departure)</span>
                  </label>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Plane className="w-3.5 h-3.5 text-[#0088FF]" />
                    Select Airport
                  </label>
                  <select
                    value={selectedAirport}
                    onChange={(e) => setSelectedAirport(e.target.value)}
                    className="w-full py-2 px-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0088FF] text-slate-800"
                  >
                    {MAJOR_AIRPORTS.map((air) => (
                      <option key={air.code} value={air.name}>
                        {air.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Sub-options for City Sightseeing */}
            {serviceType === 'sightseeing' && (
              <div className="flex items-center gap-4 p-3 bg-purple-50/50 rounded-xl text-xs font-bold text-slate-700 border border-purple-100">
                <span className="text-slate-500">Package:</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sightseeingHours"
                    checked={sightseeingHours === '8h'}
                    onChange={() => { setSightseeingHours('8h'); setDistanceKm(80); }}
                    className="accent-[#7B2CBF] w-4 h-4 cursor-pointer"
                  />
                  <span>8 Hours / 80 Km (Standard City Tour)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sightseeingHours"
                    checked={sightseeingHours === '12h'}
                    onChange={() => { setSightseeingHours('12h'); setDistanceKm(120); }}
                    className="accent-[#7B2CBF] w-4 h-4 cursor-pointer"
                  />
                  <span>12 Hours / 120 Km (Extended Sightseeing)</span>
                </label>
              </div>
            )}

            {/* Pickup & Drop inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>{serviceType === 'airport' && airportDirection === 'from-airport' ? 'Flight Number / Terminal' : 'Pickup Location / City'}</span>
                </label>
                <input
                  type="text"
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                  placeholder="e.g. Connaught Place, New Delhi"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF5500] focus:bg-white text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{serviceType === 'sightseeing' ? 'City / Monuments Covered' : 'Drop Location / City'}</span>
                </label>
                <input
                  type="text"
                  value={dropCity}
                  onChange={(e) => setDropCity(e.target.value)}
                  placeholder="e.g. Agra Taj Mahal Hotel"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF5500] focus:bg-white text-slate-800"
                />
              </div>
            </div>

            {/* Travel Date & Pickup Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#0088FF]" />
                  <span>Pickup Date</span>
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0088FF] focus:bg-white text-slate-800"
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
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#7B2CBF] focus:bg-white text-slate-800"
                />
              </div>
            </div>

            {/* Distance Slider for Outstation */}
            {serviceType === 'outstation' && (
              <div className="space-y-1.5 pt-3 border-t border-slate-100">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">Estimated Highway Distance:</span>
                  <span className="font-extrabold text-[#FF5500] tabular-nums">
                    {distanceKm} km {tripType === 'round-trip' ? `(Round-trip ~${distanceKm * 2} km)` : ''}
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="800"
                  step="10"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  className="w-full accent-[#FF5500] cursor-pointer"
                />
              </div>
            )}

            {/* Popular Shortcut Routes */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Popular Intercity Highway Routes:
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_ROUTES.map((route) => (
                  <button
                    key={`${route.from}-${route.to}`}
                    onClick={() => handleSelectPopularRoute(route)}
                    className="text-xs px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-[#FF5500] hover:border-orange-200 text-slate-700 border border-slate-200/80 transition-colors cursor-pointer"
                  >
                    {route.from} → {route.to} ({route.distanceKm} km)
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Vehicle Selection & Live Fare Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Vehicle Options Selector */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 font-display">Select Vehicle Fleet Tier</h3>
              
              <div className="space-y-2.5">
                {VEHICLE_OPTIONS.map((veh) => {
                  const isSelected = selectedVehicle === veh.id;

                  return (
                    <div
                      key={veh.id}
                      onClick={() => setSelectedVehicle(veh.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#FF5500] bg-orange-50/50 shadow-xs ring-1 ring-[#FF5500]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-sm text-slate-900 font-display">{veh.name}</div>
                        <div className="text-xs font-black text-[#FF5500] tabular-nums">
                          ₹{veh.ratePerKm}/km
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{veh.models}</div>
                      
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>{veh.passengers} Passengers</span>
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                          <span>{veh.luggage} Bags</span>
                        </span>
                        <span>·</span>
                        <span className="text-emerald-700 font-medium">AC Cleaned</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Fare Breakdown Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 font-display">
                  Transparent Fare Breakdown
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                  Fixed Price
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Base Fare & Dispatch:</span>
                  <span className="tabular-nums font-semibold text-slate-800">₹{fareBreakdown.baseAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance Fare (~{distanceKm} km @ ₹{selectedVehicleObj.ratePerKm}/km):</span>
                  <span className="tabular-nums font-semibold text-slate-800">₹{fareBreakdown.distanceAmount.toLocaleString('en-IN')}</span>
                </div>
                {fareBreakdown.driverAllowance > 0 && (
                  <div className="flex justify-between">
                    <span>Driver Night / Outstation Allowance:</span>
                    <span className="tabular-nums font-semibold text-slate-800">₹{fareBreakdown.driverAllowance.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Highway Tolls & Interstate Permit (Est.):</span>
                  <span className="tabular-nums font-semibold text-slate-800">₹{fareBreakdown.estimatedTollStateTax.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500">Total Indicative Fare</span>
                  <div className="text-3xl font-black text-slate-900 tabular-nums">
                    ₹{fareBreakdown.total.toLocaleString('en-IN')}
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">Includes Chauffeur + Fuel</span>
              </div>

              <button
                onClick={handleEnquire}
                className="w-full py-3.5 text-xs font-bold text-white bg-gradient-to-r from-[#FF5500] via-[#FF7700] to-[#FF3D00] hover:from-[#e64d00] hover:to-[#e63700] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                <span>Request Chauffeur Cab (Demo)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Advance Payment Required · Pay Driver Directly</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
