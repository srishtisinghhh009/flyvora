import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Building, Compass, Car, Train, Search, Info } from 'lucide-react';

type SearchTab = 'tours' | 'flights' | 'hotels' | 'cabs' | 'trains';

export const SearchCard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SearchTab>('tours');
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  // Tours Form State
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('any');
  const [budget, setBudget] = useState('any');

  // Flights Form State
  const [flightFrom, setFlightFrom] = useState('New Delhi (DEL)');
  const [flightTo, setFlightTo] = useState('Goa (GOI)');
  const [flightDate, setFlightDate] = useState('');
  const [flightTravellers, setFlightTravellers] = useState('1');

  // Hotels Form State
  const [hotelCity, setHotelCity] = useState('Udaipur');
  const [hotelCheckIn, setHotelCheckIn] = useState('');
  const [hotelCheckOut, setHotelCheckOut] = useState('');
  const [hotelGuests, setHotelGuests] = useState('2');

  // Cabs Form State
  const [cabPickup, setCabPickup] = useState('Dehradun Airport');
  const [cabDrop, setCabDrop] = useState('Mussoorie Mall Road');
  const [cabDate, setCabDate] = useState('');
  const [cabType, setCabType] = useState('Sedan');

  // Trains Form State
  const [trainFrom, setTrainFrom] = useState('New Delhi (NDLS)');
  const [trainTo, setTrainTo] = useState('Varanasi Jn (BSB)');
  const [trainDate, setTrainDate] = useState('');
  const [trainClass, setTrainClass] = useState('Vande Bharat / 3A');

  const handleTabChange = (tab: SearchTab) => {
    setActiveTab(tab);
    if (tab !== 'tours') {
      setDemoNotice(`${tab.charAt(0).toUpperCase() + tab.slice(1)} booking is in preview demo mode. For active booking and payments, please explore our Curated Tours.`);
    } else {
      setDemoNotice(null);
    }
  };

  const handleTourSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination.trim()) params.append('query', destination.trim());
    if (duration !== 'any') params.append('duration', duration);
    if (budget !== 'any') params.append('maxBudget', budget);
    navigate(`/tours?${params.toString()}`);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoNotice(
      `Direct ${activeTab} ticketing is currently in demo preview mode. You can view all live holiday packages in the Tours section.`
    );
  };

  return (
    <div className="relative z-20 bg-white rounded-2xl border border-[#DCE5E4] shadow-[0_16px_36px_rgba(18,38,58,0.12)] p-4 sm:p-6 transition-all">
      {/* Search Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-5 border-b border-[#DCE5E4]" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'tours'}
          onClick={() => handleTabChange('tours')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-[10px] whitespace-nowrap transition-colors focus-ring ${
            activeTab === 'tours'
              ? 'bg-[#1B8A8F] text-white shadow-xs'
              : 'text-[#5B6B7A] hover:text-[#12263A] hover:bg-[#F5F8F7]'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Tours</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'flights'}
          onClick={() => handleTabChange('flights')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-[10px] whitespace-nowrap transition-colors focus-ring ${
            activeTab === 'flights'
              ? 'bg-[#1B8A8F] text-white shadow-xs'
              : 'text-[#5B6B7A] hover:text-[#12263A] hover:bg-[#F5F8F7]'
          }`}
        >
          <Plane className="w-4 h-4" />
          <span>Flights</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'hotels'}
          onClick={() => handleTabChange('hotels')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-[10px] whitespace-nowrap transition-colors focus-ring ${
            activeTab === 'hotels'
              ? 'bg-[#1B8A8F] text-white shadow-xs'
              : 'text-[#5B6B7A] hover:text-[#12263A] hover:bg-[#F5F8F7]'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Hotels</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'cabs'}
          onClick={() => handleTabChange('cabs')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-[10px] whitespace-nowrap transition-colors focus-ring ${
            activeTab === 'cabs'
              ? 'bg-[#1B8A8F] text-white shadow-xs'
              : 'text-[#5B6B7A] hover:text-[#12263A] hover:bg-[#F5F8F7]'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>Cabs</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'trains'}
          onClick={() => handleTabChange('trains')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-[10px] whitespace-nowrap transition-colors focus-ring ${
            activeTab === 'trains'
              ? 'bg-[#1B8A8F] text-white shadow-xs'
              : 'text-[#5B6B7A] hover:text-[#12263A] hover:bg-[#F5F8F7]'
          }`}
        >
          <Train className="w-4 h-4" />
          <span>Trains</span>
        </button>
      </div>

      {/* Demo Notice Banner for non-tours */}
      {demoNotice && (
        <div className="mb-4 p-3 bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] flex items-center justify-between gap-3 text-xs text-[#5B6B7A]">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#1B8A8F] shrink-0" />
            <span>{demoNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => handleTabChange('tours')}
            className="text-xs font-bold text-[#1B8A8F] hover:underline whitespace-nowrap"
          >
            Switch to Tours
          </button>
        </div>
      )}

      {/* Tours Search Tab */}
      {activeTab === 'tours' && (
        <form onSubmit={handleTourSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label htmlFor="search-destination" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Destination / Region
            </label>
            <input
              id="search-destination"
              type="text"
              placeholder="e.g. Kerala, Ladakh, Rajasthan"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            />
          </div>

          <div>
            <label htmlFor="search-date" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Approx. Start Date
            </label>
            <input
              id="search-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            />
          </div>

          <div>
            <label htmlFor="search-duration" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Trip Duration
            </label>
            <select
              id="search-duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            >
              <option value="any">Any Duration</option>
              <option value="short">Short Getaway (3–4 Nights)</option>
              <option value="medium">Classic Trip (5–6 Nights)</option>
              <option value="long">Extended Journey (7+ Nights)</option>
            </select>
          </div>

          <div>
            <label htmlFor="search-budget" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Budget per Person
            </label>
            <select
              id="search-budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            >
              <option value="any">Any Budget</option>
              <option value="18000">Under ₹18,000</option>
              <option value="25000">Under ₹25,000</option>
              <option value="40000">Under ₹40,000</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full h-[38px] flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#1B8A8F] hover:bg-[#157175] active:bg-[#0f5558] rounded-[10px] transition-colors focus-ring"
            >
              <Search className="w-4 h-4" />
              <span>Find Tours</span>
            </button>
          </div>
        </form>
      )}

      {/* Flights Search Tab */}
      {activeTab === 'flights' && (
        <form onSubmit={handleDemoSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label htmlFor="flight-from" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              From
            </label>
            <input
              id="flight-from"
              type="text"
              value={flightFrom}
              onChange={(e) => setFlightFrom(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            />
          </div>
          <div>
            <label htmlFor="flight-to" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              To
            </label>
            <input
              id="flight-to"
              type="text"
              value={flightTo}
              onChange={(e) => setFlightTo(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            />
          </div>
          <div>
            <label htmlFor="flight-date" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Departure Date
            </label>
            <input
              id="flight-date"
              type="date"
              value={flightDate}
              onChange={(e) => setFlightDate(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            />
          </div>
          <div>
            <label htmlFor="flight-travellers" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Travellers
            </label>
            <select
              id="flight-travellers"
              value={flightTravellers}
              onChange={(e) => setFlightTravellers(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            >
              <option value="1">1 Adult (Economy)</option>
              <option value="2">2 Adults (Economy)</option>
              <option value="3">3+ Adults (Family)</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full h-[38px] flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#12263A] hover:bg-[#1f3750] rounded-[10px] transition-colors focus-ring"
            >
              <Search className="w-4 h-4" />
              <span>Search Flights (Demo)</span>
            </button>
          </div>
        </form>
      )}

      {/* Hotels Search Tab */}
      {activeTab === 'hotels' && (
        <form onSubmit={handleDemoSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label htmlFor="hotel-city" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              City or Landmark
            </label>
            <input
              id="hotel-city"
              type="text"
              value={hotelCity}
              onChange={(e) => setHotelCity(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            />
          </div>
          <div>
            <label htmlFor="hotel-checkin" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Check-in
            </label>
            <input
              id="hotel-checkin"
              type="date"
              value={hotelCheckIn}
              onChange={(e) => setHotelCheckIn(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            />
          </div>
          <div>
            <label htmlFor="hotel-checkout" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Check-out
            </label>
            <input
              id="hotel-checkout"
              type="date"
              value={hotelCheckOut}
              onChange={(e) => setHotelCheckOut(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            />
          </div>
          <div>
            <label htmlFor="hotel-guests" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Guests
            </label>
            <select
              id="hotel-guests"
              value={hotelGuests}
              onChange={(e) => setHotelGuests(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            >
              <option value="1">1 Room, 1 Guest</option>
              <option value="2">1 Room, 2 Guests</option>
              <option value="4">2 Rooms, 4 Guests</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full h-[38px] flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#12263A] hover:bg-[#1f3750] rounded-[10px] transition-colors focus-ring"
            >
              <Search className="w-4 h-4" />
              <span>Search Hotels (Demo)</span>
            </button>
          </div>
        </form>
      )}

      {/* Cabs Search Tab */}
      {activeTab === 'cabs' && (
        <form onSubmit={handleDemoSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label htmlFor="cab-pickup" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Pickup Point
            </label>
            <input
              id="cab-pickup"
              type="text"
              value={cabPickup}
              onChange={(e) => setCabPickup(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            />
          </div>
          <div>
            <label htmlFor="cab-drop" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Drop Location
            </label>
            <input
              id="cab-drop"
              type="text"
              value={cabDrop}
              onChange={(e) => setCabDrop(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            />
          </div>
          <div>
            <label htmlFor="cab-date" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Pickup Date & Time
            </label>
            <input
              id="cab-date"
              type="date"
              value={cabDate}
              onChange={(e) => setCabDate(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            />
          </div>
          <div>
            <label htmlFor="cab-type" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Cab Type
            </label>
            <select
              id="cab-type"
              value={cabType}
              onChange={(e) => setCabType(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            >
              <option value="Sedan">Dzire / Etios (Sedan)</option>
              <option value="SUV">Innova / Ertiga (6-Seater)</option>
              <option value="Luxury">Camry / Crysta Exec</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full h-[38px] flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#12263A] hover:bg-[#1f3750] rounded-[10px] transition-colors focus-ring"
            >
              <Search className="w-4 h-4" />
              <span>Book Cab (Demo)</span>
            </button>
          </div>
        </form>
      )}

      {/* Trains Search Tab */}
      {activeTab === 'trains' && (
        <form onSubmit={handleDemoSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label htmlFor="train-from" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              From Station
            </label>
            <input
              id="train-from"
              type="text"
              value={trainFrom}
              onChange={(e) => setTrainFrom(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            />
          </div>
          <div>
            <label htmlFor="train-to" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              To Station
            </label>
            <input
              id="train-to"
              type="text"
              value={trainTo}
              onChange={(e) => setTrainTo(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            />
          </div>
          <div>
            <label htmlFor="train-date" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Journey Date
            </label>
            <input
              id="train-date"
              type="date"
              value={trainDate}
              onChange={(e) => setTrainDate(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            />
          </div>
          <div>
            <label htmlFor="train-class" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Class
            </label>
            <select
              id="train-class"
              value={trainClass}
              onChange={(e) => setTrainClass(e.target.value)}
              className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] px-3.5 py-2.5 focus-ring"
            >
              <option value="Vande Bharat / 3A">Vande Bharat / AC 3 Tier</option>
              <option value="2A">AC 2 Tier (2A)</option>
              <option value="1A">First AC (1A)</option>
              <option value="EC">Executive Chair Car (EC)</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full h-[38px] flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#12263A] hover:bg-[#1f3750] rounded-[10px] transition-colors focus-ring"
            >
              <Search className="w-4 h-4" />
              <span>Search Trains (Demo)</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
