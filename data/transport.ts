export interface VehicleOption {
  id: 'hatchback' | 'sedan' | 'suv' | 'luxury';
  name: string;
  models: string;
  passengers: number;
  luggage: number;
  ratePerKm: number;
  baseFare: number;
  tagline: string;
  ac: boolean;
}

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'hatchback',
    name: 'Economy Hatchback',
    models: 'Maruti Swift / WagonR / Tiago',
    passengers: 4,
    luggage: 2,
    ratePerKm: 11,
    baseFare: 650,
    tagline: 'Pocket-friendly rides for couples or solo travelers',
    ac: true
  },
  {
    id: 'sedan',
    name: 'Comfort Sedan',
    models: 'Maruti Dzire / Toyota Etios / Amaze',
    passengers: 4,
    luggage: 3,
    ratePerKm: 14,
    baseFare: 900,
    tagline: 'Smooth highway comfort with spacious boot space',
    ac: true
  },
  {
    id: 'suv',
    name: 'Prime SUV',
    models: 'Toyota Innova Crysta / Maruti Ertiga',
    passengers: 6,
    luggage: 5,
    ratePerKm: 20,
    baseFare: 1400,
    tagline: 'Spacious legroom and supreme ride comfort for families & mountain routes',
    ac: true
  },
  {
    id: 'luxury',
    name: 'Luxury Executive Van',
    models: 'Force Urbania / Toyota Vellfire / Tempo Traveller',
    passengers: 12,
    luggage: 10,
    ratePerKm: 32,
    baseFare: 2800,
    tagline: 'Premium captain seats, ambient lighting for large families and luxury groups',
    ac: true
  }
];

export const POPULAR_ROUTES = [
  { from: 'Delhi', to: 'Agra', distanceKm: 235, duration: '3.5 hrs' },
  { from: 'Delhi', to: 'Jaipur', distanceKm: 280, duration: '4.5 hrs' },
  { from: 'Delhi', to: 'Rishikesh', distanceKm: 240, duration: '5 hrs' },
  { from: 'Chandigarh', to: 'Manali', distanceKm: 290, duration: '7.5 hrs' },
  { from: 'Kochi Airport', to: 'Munnar', distanceKm: 110, duration: '3.5 hrs' },
  { from: 'Kochi Airport', to: 'Alleppey', distanceKm: 85, duration: '2.5 hrs' },
  { from: 'Jaipur', to: 'Udaipur', distanceKm: 390, duration: '6.5 hrs' },
  { from: 'Varanasi', to: 'Ayodhya', distanceKm: 205, duration: '4 hrs' },
  { from: 'Bengaluru', to: 'Coorg', distanceKm: 250, duration: '5 hrs' },
  { from: 'Mumbai', to: 'Pune', distanceKm: 150, duration: '3 hrs' }
];

export function calculateEstimatedFare(
  vehicleType: 'hatchback' | 'sedan' | 'suv' | 'luxury',
  distanceKm: number,
  tripType: 'one-way' | 'round-trip',
  serviceType: 'airport' | 'outstation' | 'sightseeing'
): {
  baseAmount: number;
  distanceAmount: number;
  driverAllowance: number;
  estimatedTollStateTax: number;
  total: number;
} {
  const vehicle = VEHICLE_OPTIONS.find(v => v.id === vehicleType) || VEHICLE_OPTIONS[1];
  const effectiveDistance = tripType === 'round-trip' ? distanceKm * 1.8 : distanceKm;

  let base = vehicle.baseFare;
  if (serviceType === 'sightseeing') {
    // 8 hr / 80km package base
    base = vehicle.baseFare * 2.2;
  }

  const distanceAmount = Math.round(effectiveDistance * vehicle.ratePerKm);
  const driverAllowance = tripType === 'round-trip' || distanceKm > 200 ? 400 : 0;
  const estimatedTollStateTax = Math.round(distanceKm * 2.2);

  const total = base + distanceAmount + driverAllowance + estimatedTollStateTax;

  return {
    baseAmount: base,
    distanceAmount,
    driverAllowance,
    estimatedTollStateTax,
    total
  };
}
