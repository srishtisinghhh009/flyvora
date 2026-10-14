import { Tour, Coupon, Booking } from '../types';

export const TOURS: Tour[] = [
  {
    slug: 'kerala-backwaters',
    title: 'Kerala Backwaters',
    theme: 'Beach',
    route: 'Kochi → Alleppey → Marari → Kochi',
    durationNights: 5,
    priceFrom: 24900,
    gradient: 'linear-gradient(135deg, #0d5f63 0%, #1B8A8F 50%, #44A08D 100%)',
    summary: 'Glide along tranquil emerald canals on a traditional thatched houseboat, savour freshly caught Karimeen fish curries, and unwind at quiet coastal coconut groves in Marari.',
    inclusions: [
      '5 nights boutique stay & private air-conditioned houseboat',
      'Daily authentic Kerala breakfasts and houseboat full-board meals',
      'Chauffeur-driven private cab for Kochi-Alleppey transfers',
      'Sunset country canoe excursion into shallow village canals',
      'All toll taxes, parking, and driver allowances'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kochi & Heritage Fort Walk',
        details: 'Land at Cochin International Airport. Check into your heritage hotel in Fort Kochi, visit the iconic Chinese fishing nets, and enjoy an evening Kathakali cultural presentation.'
      },
      {
        day: 2,
        title: 'Board Houseboat in Alleppey',
        details: 'Drive south through paddy corridors to Punnamada jetty. Embark on your private traditional kettuvallam houseboat, cruising tranquil backwaters with fresh coconut welcome drinks.'
      },
      {
        day: 3,
        title: 'Marari Beach Relaxation & Artisanal Coir Villages',
        details: 'Disembark at Alleppey and transfer to serene Marari beach resort. Walk through coir-making hamlets, watch fishermen pull nets, and watch the sun dip into the Arabian Sea.'
      }
    ]
  },
  {
    slug: 'ladakh-circuit',
    title: 'Ladakh Circuit',
    theme: 'Hills',
    route: 'Leh → Nubra Valley → Pangong Tso → Leh',
    durationNights: 7,
    priceFrom: 38500,
    gradient: 'linear-gradient(135deg, #1b3554 0%, #2A5298 50%, #4E79A7 100%)',
    summary: 'Traverse high Himalayan passes, cross Khardung La at 17,582 ft, ride Bactrian camels in cold dunes of Hunder, and gaze across the turquoise waters of Pangong Lake.',
    inclusions: [
      '7 nights heated hotel & alpine lakeside luxury tent stays',
      'Buffet breakfast and hearty dinner daily',
      'Private 4x4 SUV with oxygen cylinder & experienced high-altitude driver',
      'Inner Line Permits and environmental ecological entry fees',
      'Guided monastery tours at Thiksey, Diskit, and Hemis'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Acclimatization in Leh & Shanti Stupa',
        details: 'Arrive at Kushok Bakula Rimpochee Airport. Rest completely for mandatory altitude acclimatization. In late afternoon, visit Shanti Stupa for panoramic twilight views over Leh town.'
      },
      {
        day: 2,
        title: 'Khardung La Pass to Nubra Valley',
        details: 'Ascend the dramatic hairpin turns of Khardung La pass. Descend into the picturesque Nubra Valley, visiting Diskit monastery with its 106-foot Maitreya Buddha statue and Hunder dunes.'
      },
      {
        day: 3,
        title: 'Pangong Tso Lake via Shyok Riverbed',
        details: 'Drive along the rugged Shyok river canyon to the mesmerizing Pangong Lake at 14,270 feet. Witness breathtaking color shifts in the water from deep sapphire to jade green.'
      }
    ]
  },
  {
    slug: 'rajasthan-royal-trail',
    title: 'Rajasthan Royal Trail',
    theme: 'Culture',
    route: 'Jaipur → Jodhpur → Udaipur',
    durationNights: 6,
    priceFrom: 29800,
    gradient: 'linear-gradient(135deg, #7A281E 0%, #C0392B 45%, #F2A93B 100%)',
    summary: 'Step through carved sandstone gateways of Amer Fort, gaze upon blue-washed alleyways from Mehrangarh, and cruise Lake Pichola beneath the white balconies of Udaipur City Palace.',
    inclusions: [
      '6 nights in heritage havelis and regal boutique properties',
      'Daily royal Rajasthani breakfasts and special dinner at Lake Pichola',
      'Dedicated AC sedan transport with professional chauffeur',
      'Skip-the-line entries and government-certified local historians',
      'Handcrafted block-printing masterclass in Sanganer'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Pink City Grandeur: Amer Fort & Hawa Mahal',
        details: 'Morning exploration of Amer Fort atop the Aravalli hills. Stop for photographs at the honeycomb facade of Hawa Mahal and tour the City Palace royal residence.'
      },
      {
        day: 2,
        title: 'The Blue City & Imposing Mehrangarh',
        details: 'Drive across the Thar fringe to Jodhpur. Ascend to Mehrangarh Fort towering 400 feet above the cobalt blue houses of the old quarter, followed by a walk through Clock Tower market.'
      },
      {
        day: 3,
        title: 'Ranakpur Marble Temples to Romantic Udaipur',
        details: 'En route to Udaipur, stop at the 15th-century Ranakpur Jain temple featuring 1,444 uniquely carved marble pillars. Arrive at Udaipur for sunset boat ride on Lake Pichola.'
      }
    ]
  },
  {
    slug: 'jim-corbett-safari',
    title: 'Jim Corbett Safari',
    theme: 'Wildlife',
    route: 'Ramnagar → Dhikala / Bijrani → Ramnagar',
    durationNights: 3,
    priceFrom: 14200,
    gradient: 'linear-gradient(135deg, #1C3B2B 0%, #2E6B4A 50%, #689F38 100%)',
    summary: 'Track royal Bengal tigers and wild elephant herds across Sal forests and grassland riverbeds in India’s oldest national park nestled along the foothills of the Himalayas.',
    inclusions: [
      '3 nights forest riverside resort with all meals included',
      '2 open-top 4x4 Gypsy jungle safaris in core Bijrani/Jhirna zones',
      'State forest department permits and dedicated naturalist guide',
      'Round-trip station transfers from Ramnagar railway station',
      'Evening campfire session with wildlife documentary screening'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Riverside Check-in & Kosi Nature Walk',
        details: 'Arrive at Ramnagar and transfer to your riverside lodge along the Kosi River. Afternoon guided birdwatching walk through riverine patches spotting kingfishers and hornbills.'
      },
      {
        day: 2,
        title: 'Dawn Safari in Bijrani Core Zone',
        details: 'Early 5:30 AM departure into the core safari zone. Track fresh tiger pugmarks, observe herds of chital deer, sambar, and wild Asian elephants roaming the open grassland riverbeds.'
      },
      {
        day: 3,
        title: 'Dhikala Fringe Exploration & Corbett Museum',
        details: 'Afternoon safari along the reservoir grasslands. Later visit the heritage bungalow of Jim Corbett at Kaladhungi and Garjiya Devi temple perched on a large rock in Kosi River.'
      }
    ]
  },
  {
    slug: 'goa-coast',
    title: 'Goa Coast',
    theme: 'Beach',
    route: 'Panaji → Candolim → Palolem → Panaji',
    durationNights: 4,
    priceFrom: 18600,
    gradient: 'linear-gradient(135deg, #094754 0%, #136F84 50%, #E39B3B 100%)',
    summary: 'From Portuguese pastel villas of Fontainhas to secluded golden crescent beaches in South Goa, immerse yourself in coastal susegad, seaside shacks, and spice farm feasts.',
    inclusions: [
      '4 nights seaside boutique resort accommodation',
      'Daily continental & Goan breakfasts',
      'Private vehicle for North & South Goa excursions',
      'Guided culinary & heritage walking tour of Fontainhas Latin Quarter',
      'Traditional Goan spice plantation tour with buffet lunch'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Old Goa Churches & Fontainhas Heritage Walk',
        details: 'Arrive in Goa. Visit Basilica of Bom Jesus and Se Cathedral, followed by an afternoon walking tour through the colorful Portuguese Latin Quarter of Fontainhas in Panjim.'
      },
      {
        day: 2,
        title: 'Coastal Forts & Sunset at Vagator',
        details: 'Explore historic Fort Aguada lighthouse overlooking Sinquerim beach. Head north towards Chapora Fort for golden hour ocean views, followed by dinner at a seaside cliff restaurant.'
      },
      {
        day: 3,
        title: 'South Goa Serenity: Butterfly Beach & Palolem',
        details: 'Journey to the pristine shores of Palolem and take an artisanal boat to Butterfly Beach and Honeymoon Island, spotting dolphins playing in the tranquil bay.'
      }
    ]
  },
  {
    slug: 'manali-and-kasol',
    title: 'Manali and Kasol',
    theme: 'Hills',
    route: 'Kullu → Manali → Solang → Kasol → Manikaran',
    durationNights: 5,
    priceFrom: 21400,
    gradient: 'linear-gradient(135deg, #1C2F3E 0%, #2E536F 50%, #4FA3A5 100%)',
    summary: 'Breathe pine-scented mountain air in Old Manali, cross Atal Tunnel to snow-capped peaks, and hike along the rushing turquoise Parvati River in magical Kasol.',
    inclusions: [
      '5 nights wooden alpine cottages and riverside camps',
      'Daily mountain buffet breakfasts & dinners',
      'Private cab for all transfers and sightseeing throughout Himachal',
      'Permits and excursions for Atal Tunnel & Solang Valley',
      'Guided riverside hike to Chalal village and Manikaran hot springs visit'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Manali & Old Manali Cafes',
        details: 'Arrive via Kullu or Volvo coach. Settle into cedar forest cottages, visit Hadimba Temple built in 1553, and spend relaxed evening discovering quaint indie cafes in Old Manali.'
      },
      {
        day: 2,
        title: 'Solang Valley & Atal Tunnel into Lahaul',
        details: 'Drive up to Solang Valley for panoramic valley views. Pass through the historic 9.02 km Atal Tunnel emerging into the stark, breathtaking landscapes of Sissu in Lahaul Valley.'
      },
      {
        day: 3,
        title: 'Parvati Valley & Kasol Riverside Trail',
        details: 'Drive down towards the emerald Parvati Valley. Check into riverside stays in Kasol, hike the suspension bridge trail to peaceful Chalal, and visit sacred natural springs at Manikaran.'
      }
    ]
  },
  {
    slug: 'varanasi-and-ayodhya',
    title: 'Varanasi and Ayodhya',
    theme: 'Culture',
    route: 'Varanasi → Sarnath → Ayodhya → Varanasi',
    durationNights: 4,
    priceFrom: 16900,
    gradient: 'linear-gradient(135deg, #4A192C 0%, #872341 50%, #F2A93B 100%)',
    summary: 'Witness the eternal Ganga Aarti from a wooden riverboat, walk the ancient stone ghats of Kashi, learn Buddhist roots at Sarnath, and visit the sacred riverfronts of Ayodhya.',
    inclusions: [
      '4 nights heritage hotel stays near the ghats and in Ayodhya',
      'Daily vegetarian breakfast and traditional Banarasi street food tasting',
      'Private boat rides for morning Subah-e-Banaras and evening Ganga Aarti',
      'AC private car transfers between Varanasi and Ayodhya',
      'Special temple darshan arrangements and expert cultural guide'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Evening Ganga Aarti from Private Boat',
        details: 'Arrive at Lal Bahadur Shastri Airport in Varanasi. In the evening, board a wooden hand-rowed boat at Dashashwamedh Ghat to experience the spellbinding Ganga Aarti ceremony.'
      },
      {
        day: 2,
        title: 'Subah-e-Banaras Ghats & Sarnath Deer Park',
        details: 'Dawn boat ride past Assi, Manikarnika, and Harishchandra ghats. Afternoon visit to Sarnath where Lord Buddha gave his first sermon, including the Dhamek Stupa and museum.'
      },
      {
        day: 3,
        title: 'Sacred Temples of Ayodhya & Saryu Aarti',
        details: 'Morning scenic drive to Ayodhya. Visit Shri Ram Janmabhoomi temple complex, Hanuman Garhi, and Kanak Bhawan. Conclude the evening at the illuminated Ram Ki Paidi on the Saryu River.'
      }
    ]
  },
  {
    slug: 'kaziranga-wild',
    title: 'Kaziranga Wild',
    theme: 'Wildlife',
    route: 'Guwahati → Kaziranga → Orchid Park → Guwahati',
    durationNights: 4,
    priceFrom: 19700,
    gradient: 'linear-gradient(135deg, #13382C 0%, #1E5C45 50%, #D4A338 100%)',
    summary: 'Discover the world sanctuary of the endangered Greater One-horned Rhinoceros in the lush Brahmaputra floodplains, alongside wild water buffalo and vibrant indigenous orchids.',
    inclusions: [
      '4 nights eco-lodge accommodation in Kaziranga & Guwahati',
      'All meals at Kaziranga eco-lodge featuring traditional Assamese thalis',
      '2 open Jeep safaris in Bagori (Western) and Kohora (Central) ranges',
      'Guwahati to Kaziranga private AC transfers',
      'Entry tickets to Kaziranga National Orchid and Biodiversity Park'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Guwahati to Tea Gardens of Kaziranga',
        details: 'Land in Guwahati and drive through Assam tea plantations along NH715 to Kaziranga. Check into an eco-resort and enjoy traditional Bihu folk dance and cultural performance.'
      },
      {
        day: 2,
        title: 'Rhino Safari in Western Range (Bagori)',
        details: 'Embark on a morning Jeep safari into Bagori range, renowned for close sightings of Indian one-horned rhinos, swamp deer, and Asian water buffaloes grazing in marshlands.'
      },
      {
        day: 3,
        title: 'Central Kohora Safari & National Orchid Park',
        details: 'Afternoon safari across Kohora range looking for wild elephants and elusive royal Bengal tigers. Visit the Kaziranga Orchid Park housing over 500 indigenous orchid species.'
      }
    ]
  }
];

export const COUPONS: Coupon[] = [
  {
    code: 'FLY1500',
    title: 'Flat ₹1,500 Off',
    description: 'Save flat ₹1,500 on all curated India tour itineraries.',
    discountType: 'flat',
    discountValue: 1500,
    minSpend: 15000,
    validTill: '31 Oct 2026'
  },
  {
    code: 'HILLS20',
    title: '20% Off Hills Escapes',
    description: 'Get 20% discount on all Hill & Mountain tours (Ladakh, Manali & Kasol).',
    discountType: 'percentage',
    discountValue: 20,
    maxDiscount: 5000,
    minSpend: 20000,
    validTill: '15 Nov 2026',
    applicableTheme: 'Hills'
  },
  {
    code: 'RIDEFREE',
    title: 'Flat ₹1,000 Off Transport',
    description: 'Get flat ₹1,000 instant reduction on any tour booking this season.',
    discountType: 'flat',
    discountValue: 1000,
    minSpend: 10000,
    validTill: '30 Nov 2026'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'WF-78901',
    tourSlug: 'kerala-backwaters',
    tourTitle: 'Kerala Backwaters',
    route: 'Kochi → Alleppey → Marari → Kochi',
    startDate: '2026-11-15',
    durationNights: 5,
    travellers: 2,
    travellerName: 'Aarav Sharma',
    travellerEmail: 'aarav.sharma@example.in',
    travellerPhone: '+91 98765 43210',
    specialRequests: 'Upper deck room on houseboat if available',
    baseFare: 49800,
    taxAmount: 2490,
    discountAmount: 1500,
    couponCode: 'FLY1500',
    totalAmount: 50790,
    status: 'Confirmed',
    createdAt: '2026-10-01T10:30:00Z'
  },
  {
    id: 'WF-78902',
    tourSlug: 'rajasthan-royal-trail',
    tourTitle: 'Rajasthan Royal Trail',
    route: 'Jaipur → Jodhpur → Udaipur',
    startDate: '2026-12-05',
    durationNights: 6,
    travellers: 2,
    travellerName: 'Priya Nambiar',
    travellerEmail: 'priya.n@example.in',
    travellerPhone: '+91 98112 34567',
    specialRequests: 'Vegetarian meals preferred',
    baseFare: 59600,
    taxAmount: 2980,
    discountAmount: 1000,
    couponCode: 'RIDEFREE',
    totalAmount: 61580,
    status: 'Pending',
    createdAt: '2026-10-06T14:15:00Z'
  },
  {
    id: 'WF-78903',
    tourSlug: 'ladakh-circuit',
    tourTitle: 'Ladakh Circuit',
    route: 'Leh → Nubra Valley → Pangong Tso → Leh',
    startDate: '2026-10-20',
    durationNights: 7,
    travellers: 1,
    travellerName: 'Rohan Mehra',
    travellerEmail: 'rohan.mehra@example.in',
    travellerPhone: '+91 97654 32109',
    specialRequests: '',
    baseFare: 38500,
    taxAmount: 1925,
    discountAmount: 5000,
    couponCode: 'HILLS20',
    totalAmount: 35425,
    status: 'Cancelled',
    createdAt: '2026-09-24T09:00:00Z'
  }
];

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Tanvi Deshmukh',
    location: 'Pune',
    trip: 'Kerala Backwaters',
    quote: 'Wayfold handled our houseboat switch seamlessly when rainfall caused river swelling. The driver was punctual and courteous every single morning.'
  },
  {
    id: '2',
    name: 'Kabir & Sanya Sen',
    location: 'Bengaluru',
    trip: 'Ladakh Circuit',
    quote: 'The high-altitude oxygen support in the cab gave us complete peace of mind at Khardung La. Zero hidden surprises on our receipt.'
  },
  {
    id: '3',
    name: 'Vikramaditya Roy',
    location: 'Kolkata',
    trip: 'Rajasthan Royal Trail',
    quote: 'Accurate day-by-day timings and top-tier heritage stays in Jaipur and Udaipur. Booking was instant and customer care answered within two rings.'
  }
];
