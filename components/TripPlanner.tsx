import React, { useState, useEffect } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { TripPlan, ItineraryItem, Destination } from '../types';
import { Calendar, MapPin, Plus, Trash2, Save, Printer, Sparkles, CheckCircle2, DollarSign, Clock, ArrowRight } from 'lucide-react';

interface TripPlannerProps {
  initialDestination?: Destination | null;
  onNavigateToBudget?: () => void;
}

export const TripPlanner: React.FC<TripPlannerProps> = ({ initialDestination, onNavigateToBudget }) => {
  const [selectedDestId, setSelectedDestId] = useState<string>(initialDestination?.id || 'jaipur');
  const [durationDays, setDurationDays] = useState<number>(3);
  const [travelStyle, setTravelStyle] = useState<'Budget Backpacker' | 'Balanced Explorer' | 'Luxury Leisure' | 'Family Vacation'>('Balanced Explorer');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [startDate, setStartDate] = useState<string>('2026-11-01');
  const [savedSuccessMsg, setSavedSuccessMsg] = useState(false);

  const currentDestination = DESTINATIONS.find(d => d.id === selectedDestId) || DESTINATIONS[0];

  // Initialize or load itinerary items from localStorage
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>(() => {
    const saved = localStorage.getItem('flyvora_active_trip');
    if (saved) {
      try {
        const parsed: TripPlan = JSON.parse(saved);
        if (parsed.items && parsed.items.length > 0) return parsed.items;
      } catch (e) {
        // fallback
      }
    }
    // Default seeded from destination suggestedItinerary
    return [
      { id: 'item-1', day: 1, timeSlot: 'Morning', destination: 'Amber Fort', activity: 'Explore palace courtyards & Panna Meena Kund stepwell', estimatedCost: 1200 },
      { id: 'item-2', day: 1, timeSlot: 'Afternoon', destination: 'City Palace', activity: 'Mubarak Mahal museum & royal armory tour', estimatedCost: 800 },
      { day: 1, id: 'item-3', timeSlot: 'Evening', destination: 'Nahargarh Fort', activity: 'Sunset panoramic view over Jaipur city and dinner', estimatedCost: 1500 },
      { day: 2, id: 'item-4', timeSlot: 'Morning', destination: 'Hawa Mahal & Johari Bazaar', activity: 'Photo stop at Palace of Winds and gem bazaar walk', estimatedCost: 500 }
    ];
  });

  // When selected destination changes, auto-load suggested itinerary if wanted
  const handleDestinationChange = (destId: string) => {
    setSelectedDestId(destId);
    const dest = DESTINATIONS.find(d => d.id === destId);
    if (dest) {
      const newItems: ItineraryItem[] = dest.suggestedItinerary.flatMap((sug) => [
        {
          id: `item-${dest.id}-${sug.day}-1`,
          day: sug.day,
          timeSlot: 'Morning',
          destination: dest.name,
          activity: sug.activities,
          estimatedCost: travelStyle === 'Budget Backpacker' ? 600 : travelStyle === 'Luxury Leisure' ? 2500 : 1200
        }
      ]);
      setItineraryItems(newItems);
    }
  };

  // Add new activity to day
  const handleAddActivity = (dayNumber: number) => {
    const newItem: ItineraryItem = {
      id: `item-${Date.now()}`,
      day: dayNumber,
      timeSlot: 'Afternoon',
      destination: currentDestination.name,
      activity: 'Custom excursion or dining stop',
      estimatedCost: 800
    };
    setItineraryItems([...itineraryItems, newItem]);
  };

  const handleRemoveActivity = (itemId: string) => {
    setItineraryItems(itineraryItems.filter(i => i.id !== itemId));
  };

  const handleUpdateActivity = (itemId: string, field: keyof ItineraryItem, value: any) => {
    setItineraryItems(itineraryItems.map(item => {
      if (item.id === itemId) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  // Save to local storage
  const handleSaveItinerary = () => {
    const plan: TripPlan = {
      tripTitle: `${currentDestination.name} Exploration`,
      destinationId: selectedDestId,
      startDate,
      endDate: startDate,
      durationDays,
      travelStyle,
      items: itineraryItems,
      travelersCount
    };
    localStorage.setItem('flyvora_active_trip', JSON.stringify(plan));
    setSavedSuccessMsg(true);
    setTimeout(() => setSavedSuccessMsg(false), 3000);
  };

  // Print/Export
  const handlePrint = () => {
    window.print();
  };

  const totalEstimatedCost = itineraryItems.reduce((acc, curr) => acc + (curr.estimatedCost * travelersCount), 0);

  return (
    <div className="py-10 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FF5500] uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Day-by-Day Builder</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Build Your Custom Indian Itinerary
            </h1>
            <p className="text-sm text-slate-600 mt-2">
              Select your travel style, organize activities per day, and save or export your personalized travel roadmap.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveItinerary}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savedSuccessMsg ? 'Plan Saved!' : 'Save Plan Locally'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export / Print</span>
            </button>
          </div>
        </div>

        {savedSuccessMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-semibold animate-in fade-in duration-150">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Itinerary successfully saved to your browser session! You can return to it anytime.</span>
          </div>
        )}

        {/* Step-by-Step Settings Configuration Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* 1. Destination */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>Primary Destination</span>
            </label>
            <select
              value={selectedDestId}
              onChange={(e) => handleDestinationChange(e.target.value)}
              className="w-full py-2 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#FF5500] text-slate-900 font-medium"
            >
              {DESTINATIONS.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.state})</option>
              ))}
            </select>
          </div>

          {/* 2. Duration Days */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#0088FF]" />
              <span>Duration (Days)</span>
            </label>
            <select
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full py-2 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#FF5500] text-slate-900 font-medium"
            >
              {[2, 3, 4, 5, 6, 7].map(num => (
                <option key={num} value={num}>{num} Days Journey</option>
              ))}
            </select>
          </div>

          {/* 3. Travel Style */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#7B2CBF]" />
              <span>Travel Style</span>
            </label>
            <select
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value as any)}
              className="w-full py-2 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#FF5500] text-slate-900 font-medium"
            >
              <option value="Budget Backpacker">Budget Backpacker</option>
              <option value="Balanced Explorer">Balanced Explorer</option>
              <option value="Luxury Leisure">Luxury Leisure</option>
              <option value="Family Vacation">Family Vacation</option>
            </select>
          </div>

          {/* 4. Travelers Count */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Number of Travelers</span>
            </label>
            <input
              type="number"
              min="1"
              max="15"
              value={travelersCount}
              onChange={(e) => setTravelersCount(Math.max(1, Number(e.target.value)))}
              className="w-full py-2 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#FF5500] text-slate-900 font-medium"
            />
          </div>

        </div>

        {/* Days & Activities Builder */}
        <div className="space-y-6">
          {Array.from({ length: durationDays }, (_, i) => i + 1).map((dayNum) => {
            const dayItems = itineraryItems.filter(item => item.day === dayNum);

            return (
              <div key={dayNum} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                
                {/* Day Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#FF5500] font-bold text-sm flex items-center justify-center">
                      {dayNum}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Day {dayNum} in {currentDestination.name}
                      </h3>
                      <span className="text-[11px] text-slate-500">
                        {dayItems.length} planned activities
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddActivity(dayNum)}
                    className="px-3 py-1.5 text-xs font-semibold text-[#FF5500] hover:text-[#e64d00] bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Activity</span>
                  </button>
                </div>

                {/* Day Activity List */}
                {dayItems.length > 0 ? (
                  <div className="space-y-3">
                    {dayItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-slate-300 transition-colors"
                      >
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                          {/* Time slot */}
                          <div className="sm:col-span-3">
                            <select
                              value={item.timeSlot}
                              onChange={(e) => handleUpdateActivity(item.id, 'timeSlot', e.target.value)}
                              className="text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded px-2 py-1 w-full"
                            >
                              <option value="Morning">Morning</option>
                              <option value="Afternoon">Afternoon</option>
                              <option value="Evening">Evening</option>
                            </select>
                          </div>

                          {/* Activity Description */}
                          <div className="sm:col-span-6">
                            <input
                              type="text"
                              value={item.activity}
                              onChange={(e) => handleUpdateActivity(item.id, 'activity', e.target.value)}
                              className="w-full text-xs text-slate-900 bg-white border border-slate-200 rounded px-2.5 py-1 focus:ring-1 focus:ring-[#FF5500]"
                            />
                          </div>

                          {/* Estimated Cost per person */}
                          <div className="sm:col-span-3 flex items-center gap-1.5">
                            <span className="text-[11px] text-slate-400">₹</span>
                            <input
                              type="number"
                              value={item.estimatedCost}
                              onChange={(e) => handleUpdateActivity(item.id, 'estimatedCost', Number(e.target.value))}
                              className="w-20 text-xs tabular-nums text-slate-800 bg-white border border-slate-200 rounded px-2 py-1"
                            />
                            <span className="text-[10px] text-slate-400">/person</span>
                          </div>
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={() => handleRemoveActivity(item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded hover:bg-slate-200 transition-colors self-end sm:self-auto"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                    No activities yet for Day {dayNum}. Click "Add Activity" above to add places or meals.
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Live Trip Summary & Budget Tracker Link */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Estimated Activities Cost</span>
            <div className="text-2xl font-black text-slate-900 tabular-nums">
              ₹{totalEstimatedCost.toLocaleString('en-IN')}{' '}
              <span className="text-xs font-normal text-slate-500">for {travelersCount} travelers</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Includes sightseeing tickets, local guides, and food estimates.
            </div>
          </div>

          {onNavigateToBudget && (
            <button
              onClick={onNavigateToBudget}
              className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0088FF] to-[#00A3FF] hover:from-[#0077e6] rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>Manage Detailed Trip Budget</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
