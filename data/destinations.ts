import { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    region: 'North',
    category: 'Heritage & Culture',
    tagline: 'The Pink City of Royal Palaces & Grand Forts',
    description: 'Immerse yourself in centuries of Rajput splendour, opulent palaces, vibrant bazaars, and UNESCO World Heritage hill forts perched above rugged Aravalli ridges.',
    image: '/assets/images/dest_rajasthan_heritage_1791892028463.jpg',
    rating: 4.8,
    reviewsCount: 3840,
    bestSeason: 'October to March (Pleasant 18°C–25°C)',
    idealDuration: '3 to 4 Days',
    estimatedBudget: {
      budget: '₹2,000 – ₹3,500 / day',
      moderate: '₹4,500 – ₹8,000 / day',
      luxury: '₹12,000+ / day'
    },
    howToReach: {
      air: 'Jaipur International Airport (JAI), 12 km from city center with regular direct flights from Delhi, Mumbai, Bengaluru.',
      rail: 'Jaipur Junction (JP) is a major hub connected by Shatabdi and Vande Bharat Express.',
      road: 'Well-connected via NH48 and Delhi-Mumbai Expressway (approx. 4.5 hours from Delhi).'
    },
    attractions: ['Amber Fort & Maota Lake', 'Hawa Mahal (Palace of Winds)', 'City Palace & Museum', 'Jantar Mantar Observatory', 'Nahargarh Fort Sunset Point', 'Johari & Bapu Bazaar'],
    thingsToDo: ['Watch sunrise over Amer Fort from a hot air balloon', 'Sample authentic Pyaaz Kachori & Dal Baati Churma at Laxmi Mishthan Bhandar', 'Shop handcrafted blue pottery and block-printed textiles', 'Attend the evening Sound & Light show at Amber'],
    suggestedItinerary: [
      { day: 1, title: 'Walled City Wonders', activities: 'Explore City Palace, Jantar Mantar, photo stop at Hawa Mahal, evening stroll in Johari Bazaar.' },
      { day: 2, title: 'Grand Forts of Amer', activities: 'Morning exploration of Amber Palace, stepwell of Panna Meena Ka Kund, and sunset at Nahargarh Fort.' },
      { day: 3, title: 'Heritage & Craftsmanship', activities: 'Visit Jaigarh Fort (world largest cannon), Albert Hall Museum, and artisan textile shopping in Sanganer.' }
    ],
    nearbyPlaces: ['Pushkar (145 km)', 'Ajmer (135 km)', 'Ranthambore (180 km)', 'Shekhawati (140 km)'],
    localTransport: 'Pre-paid autos, app-cabs (Uber/Ola), e-rickshaws in the old city, and Jaipur Metro.',
    featured: true
  },
  {
    id: 'alleppey',
    name: 'Alleppey (Alappuzha)',
    state: 'Kerala',
    region: 'South',
    category: 'Beaches & Islands',
    tagline: 'The Serene Venice of the East & Backwaters',
    description: 'Drift along emerald palm-fringed canals, serene lagoons, and expansive paddy fields on a traditional thatched Kettuvallam houseboat.',
    image: '/assets/images/dest_kerala_backwaters_1791892057635.jpg',
    rating: 4.9,
    reviewsCount: 4210,
    bestSeason: 'September to March (Crisp breeze, soothing waters)',
    idealDuration: '2 to 3 Days',
    estimatedBudget: {
      budget: '₹2,500 – ₹4,000 / day',
      moderate: '₹6,000 – ₹10,000 / day',
      luxury: '₹15,000+ / day'
    },
    howToReach: {
      air: 'Cochin International Airport (COK), approximately 75 km (2 hours scenic drive).',
      rail: 'Alappuzha Railway Station (ALLP) connects major South Indian lines.',
      road: 'Scenic coastal highway NH66 connects Kochi, Trivandrum, and Kollam.'
    },
    attractions: ['Vembanad Lake', 'Punnamada Lake (Nehru Trophy track)', 'Marari Beach', 'Alleppey Lighthouse', 'Kuttanad Below-Sea-Level Farming', 'Pathiramanal Island'],
    thingsToDo: ['Overnight private houseboat cruise with freshly cooked Karimeen Pollichathu', 'Kayaking at sunrise through narrow village backwater canals', 'Ayurvedic rejuvenating massage at a traditional wellness centre', 'Sunset walk along serene Marari beach.'],
    suggestedItinerary: [
      { day: 1, title: 'Houseboat Embarkation', activities: 'Board luxury houseboat at Punnamada, sail through serene backwaters, observe village life, sunset on Vembanad Lake.' },
      { day: 2, title: 'Village Exploration & Beach', activities: 'Morning canoe tour through narrow canals, visit local coir factory, afternoon relaxation at Marari Beach.' }
    ],
    nearbyPlaces: ['Kochi (53 km)', 'Kumarakom (32 km)', 'Varkala (118 km)', 'Munnar (160 km)'],
    localTransport: 'Government water ferries (very affordable), Shikara motorized boats, auto-rickshaws.',
    featured: true
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    region: 'North',
    category: 'Spiritual Destinations',
    tagline: 'The Eternal Spiritual Capital of India',
    description: 'One of the oldest continually inhabited cities on Earth, where timeless rituals, mystical riverfront ghats, sacred temples, and soul-stirring Ganga Aarti unfold along the sacred river.',
    image: '/assets/images/dest_varanasi_ghats_1791892084869.jpg',
    rating: 4.9,
    reviewsCount: 5120,
    bestSeason: 'October to March (Pleasant winter mornings with river mist)',
    idealDuration: '3 to 4 Days',
    estimatedBudget: {
      budget: '₹1,800 – ₹3,000 / day',
      moderate: '₹4,000 – ₹7,000 / day',
      luxury: '₹10,000+ / day'
    },
    howToReach: {
      air: 'Lal Bahadur Shastri Airport (VNS), 25 km from the city with daily direct flights.',
      rail: 'Varanasi Junction (BSB) & Pt. Deen Dayal Upadhyaya Junction (DDU) are major national hubs.',
      road: 'Connected via Purvanchal Expressway and NH19.'
    },
    attractions: ['Dashashwamedh Ghat', 'Kashi Vishwanath Corridor & Temple', 'Assi Ghat Sunrise', 'Manikarnika Ghat', 'Sarnath (Deer Park & Dhamek Stupa)', 'Banaras Hindu University (BHU)'],
    thingsToDo: ['Attend the mesmerizing evening Maha Aarti from a wooden boat', 'Early morning sunrise boat ride witnessing ghat rituals', 'Taste authentic Banarasi Paan, Malaiyo (winter sweet), and Tamatar Chaat', 'Discover heritage handloom weaving in Madanpura for pure Banarasi silk sarees'],
    suggestedItinerary: [
      { day: 1, title: 'Ghats & The Sacred Ganga', activities: 'Morning boat ride along 84 ghats, darshan at Kashi Vishwanath temple corridor, evening Grand Ganga Aarti at Dashashwamedh.' },
      { day: 2, title: 'Buddhist Heritage at Sarnath', activities: 'Excursion to Sarnath where Buddha gave his first sermon, visit archaeological museum, Ashoka Pillar.' },
      { day: 3, title: 'Old City Alleyways & Gastronomy', activities: 'Walking tour through ancient narrow gallis, Vishwanath Gali shopping, tasting lassi at Blue Lassi and street chaat.' }
    ],
    nearbyPlaces: ['Sarnath (10 km)', 'Prayagraj (120 km)', 'Ayodhya (200 km)', 'Chunar Fort (40 km)'],
    localTransport: 'Walking (best for ghats & lanes), cycle rickshaws, e-rickshaws, and wooden rowboats.',
    featured: true
  },
  {
    id: 'manali',
    name: 'Manali & Solang',
    state: 'Himachal Pradesh',
    region: 'North',
    category: 'Mountains & Hill Stations',
    tagline: 'High Alpine Valleys, Cedar Forests & Adventure Gateway',
    description: 'Nestled on the banks of the Beas River, Manali offers snow-capped Himalayan peaks, roaring rapids, apple orchards, and the thrilling gateway to Rohtang Pass and Ladakh.',
    image: '/assets/images/dest_himachal_mountains_1791892125589.jpg',
    rating: 4.8,
    reviewsCount: 3950,
    bestSeason: 'March to June (Pleasant weather) & Dec to Feb (Snowfall)',
    idealDuration: '4 to 5 Days',
    estimatedBudget: {
      budget: '₹2,200 – ₹3,800 / day',
      moderate: '₹5,000 – ₹9,000 / day',
      luxury: '₹14,000+ / day'
    },
    howToReach: {
      air: 'Bhuntar Airport (KUU), 50 km away. Chandigarh Airport (IXC) is 310 km with broad flight connectivity.',
      rail: 'Broad gauge railway till Chandigarh or Ambala, followed by luxury Volvo bus or taxi.',
      road: 'Well-maintained Himalayan highway (Kiratpur-Manali 4-lane expressway).'
    },
    attractions: ['Solang Valley', 'Atal Tunnel (Rohtang)', 'Hadimba Devi Temple', 'Old Manali cafes', 'Jogini Waterfalls', 'Vashisht Hot Sulphur Springs'],
    thingsToDo: ['Paragliding and zorbing in Solang Valley', 'Drive through the engineering wonder Atal Tunnel into Sissu Valley', 'Trek to Jogini Waterfalls through fragrant pine trails', 'Chill at bohemian music cafes in Old Manali'],
    suggestedItinerary: [
      { day: 1, title: 'Heritage & Old Manali', activities: 'Visit centuries-old Hadimba wooden temple, Manu Temple, stroll through cedar forest in Van Vihar, cafe dinner.' },
      { day: 2, title: 'High Altitude Solang & Atal Tunnel', activities: 'Adventure sports in Solang Valley, drive through Atal Tunnel to scenic Lahaul valley (Sissu waterfall).' },
      { day: 3, title: 'Waterfalls & Hot Springs', activities: 'Trek to Jogini Falls, dip in Vashisht natural hot springs, shopping on Mall Road for Himachali shawls.' }
    ],
    nearbyPlaces: ['Kasol & Parvati Valley (75 km)', 'Naggar Castle (21 km)', 'Spiti Valley (195 km)', 'Shimla (240 km)'],
    localTransport: 'Local union taxis for Solang/Rohtang tours, auto-rickshaws for town transit, walking.',
    featured: true
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh & Haridwar',
    state: 'Uttarakhand',
    region: 'North',
    category: 'Spiritual Destinations',
    tagline: 'Yoga Capital of the World on the Himalayan Foothills',
    description: 'Where the pristine emerald Ganges rushes out of the Himalayas into peaceful valleys, renowned worldwide for authentic yoga ashrams, Ganga Aarti, and thrilling whitewater rafting.',
    image: '/assets/images/hero_cinematic_india_1791892010717.jpg',
    rating: 4.8,
    reviewsCount: 4620,
    bestSeason: 'September to April (Ideal for rafting, camping, and yoga)',
    idealDuration: '3 to 4 Days',
    estimatedBudget: {
      budget: '₹1,800 – ₹3,200 / day',
      moderate: '₹4,000 – ₹7,500 / day',
      luxury: '₹12,000+ / day'
    },
    howToReach: {
      air: 'Jolly Grant Airport, Dehradun (DED), only 21 km away (35 mins).',
      rail: 'Yog Nagari Rishikesh (YNRK) & Haridwar Railway Station (HW).',
      road: 'Delhi-Meerut Expressway and NH334 (4 to 5 hours from Delhi).'
    },
    attractions: ['Ram Jhula & Laxman Jhula', 'Parmarth Niketan Ganga Aarti', 'Triveni Ghat', 'Beatles Ashram (Chaurasi Kutia)', 'Neer Garh Waterfall', 'Shivpuri Rafting Hub'],
    thingsToDo: ['16 km whitewater river rafting through grade III rapids', 'Experience evening Aarti with chanting lamps at Parmarth Niketan', 'Attend morning yoga and sound bowl healing session', 'Cliff jumping and riverside camping under starlit skies'],
    suggestedItinerary: [
      { day: 1, title: 'Ashrams & Riverside Peace', activities: 'Walk across Ram Jhula, visit historical Beatles Ashram, evening Aarti at Parmarth Niketan.' },
      { day: 2, title: 'Adrenaline & Rapids', activities: 'Morning whitewater rafting from Shivpuri, riverside beach lunch, hike to Neer Garh waterfall.' },
      { day: 3, title: 'Wellness & Sunset', activities: 'Sunrise meditation session, explore local organic organic cafes, sunset walk along Tapovan promenade.' }
    ],
    nearbyPlaces: ['Haridwar (25 km)', 'Dehradun (45 km)', 'Mussoorie (75 km)', 'Kainchi Dham & Nainital (240 km)'],
    localTransport: 'Shared Vikram tempos, scooters on rent, e-rickshaws, and walking across pedestrian suspension bridges.',
    featured: true
  },
  {
    id: 'srinagar',
    name: 'Srinagar & Gulmarg',
    state: 'Jammu & Kashmir',
    region: 'North',
    category: 'Mountains & Hill Stations',
    tagline: 'Paradise on Earth: Dal Lake Houseboats & Powder Snow',
    description: 'Fabled paradise of carved cedar houseboats on Dal Lake, Mughal terraced flower gardens, scenic shikara boat rides, and world-class ski meadows in Gulmarg.',
    image: '/assets/images/hero_cinematic_india_1791892010717.jpg',
    rating: 4.9,
    reviewsCount: 3670,
    bestSeason: 'April to October (Gardens & greenery) & Dec to Feb (Snow Gulmarg)',
    idealDuration: '5 to 6 Days',
    estimatedBudget: {
      budget: '₹2,800 – ₹4,500 / day',
      moderate: '₹6,500 – ₹11,000 / day',
      luxury: '₹18,000+ / day'
    },
    howToReach: {
      air: 'Sheikh ul-Alam International Airport Srinagar (SXR) with frequent flights.',
      rail: 'Udhampur/Banihal/Jammu Tawi railway line, connecting soon via Chenab rail bridge.',
      road: 'NH44 passing through the engineering marvel Qazigund-Banihal Tunnel.'
    },
    attractions: ['Dal Lake & Nigeen Lake', 'Gulmarg Gondola (World highest cable car)', 'Shalimar & Nishat Mughal Gardens', 'Pahalgam Betaab Valley', 'Old City Jamia Masjid & Hazratbal'],
    thingsToDo: ['Stay in a hand-carved heritage wooden houseboat on tranquil Nigeen Lake', 'Early morning floating vegetable market shikara tour', 'Ride Gulmarg Gondola Phase 2 to 14,000 ft alpine snow bowl', 'Taste traditional 36-course Wazwan feast & saffron Kahwa tea'],
    suggestedItinerary: [
      { day: 1, title: 'Dal Lake & Floating Life', activities: 'Check-in to Dal Lake houseboat, afternoon Shikara ride past floating gardens and Char Chinar.' },
      { day: 2, title: 'Gulmarg Alpine Wonder', activities: 'Day excursion to Gulmarg, ride Gondola to Apharwat peak snowline, sledge rides and golf course views.' },
      { day: 3, title: 'Mughal Splendour & Heritage', activities: 'Tour Nishat Bagh, Shalimar Bagh, Pari Mahal viewpoint, and shop authentic Pashmina shawls.' }
    ],
    nearbyPlaces: ['Gulmarg (50 km)', 'Pahalgam (90 km)', 'Sonamarg (80 km)', 'Doodhpathri (42 km)'],
    localTransport: 'Shikara boats for waterways, tourist taxis, prepaid airport cabs.',
    featured: true
  },
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    region: 'West',
    category: 'Beaches & Islands',
    tagline: 'Sun-Kissed Beaches, Portuguese Architecture & Coastal Rhythm',
    description: 'Golden beaches, swaying coconut groves, 16th-century Portuguese cathedrals, bohemian night markets, and world-class beach shacks along the Arabian Sea.',
    image: '/assets/images/dest_kerala_backwaters_1791892057635.jpg',
    rating: 4.8,
    reviewsCount: 6300,
    bestSeason: 'November to March (Pleasant sunshine and breezy evenings)',
    idealDuration: '4 to 5 Days',
    estimatedBudget: {
      budget: '₹2,500 – ₹4,000 / day',
      moderate: '₹5,500 – ₹9,500 / day',
      luxury: '₹15,000+ / day'
    },
    howToReach: {
      air: 'Goa Dabolim Airport (GOI) and Manohar International Airport Mopa (GOX).',
      rail: 'Madgaon (MAO) and Thivim (THVM) Railway Stations with Vande Bharat connections.',
      road: 'Scenic Mumbai-Goa Highway (NH66).'
    },
    attractions: ['Basilica of Bom Jesus (UNESCO)', 'Palolem & Agonda Beaches (South)', 'Anjuna & Vagator Cliffs (North)', 'Fontainhas Latin Quarter', 'Dudhsagar Waterfalls', 'Fort Aguada'],
    thingsToDo: ['Walk colorful pastel Portuguese lanes of Fontainhas in Panaji', 'Sunset cruise on Mandovi River with Goan folk performances', 'Water sports at Calangute/Baga (jet ski, parasailing)', 'Feast on authentic Goan fish curry thali and bebinca dessert'],
    suggestedItinerary: [
      { day: 1, title: 'Heritage & Latin Quarter', activities: 'Explore Old Goa churches (Bom Jesus, Se Cathedral), walk heritage Fontainhas, sunset dinner in Panaji.' },
      { day: 2, title: 'North Goa Coast & Forts', activities: 'Visit Chapora Fort, Vagator beach, Anjuna flea market, lively seaside dining at sunset.' },
      { day: 3, title: 'South Goa Serenity', activities: 'Relax on crescent-shaped Palolem beach, boat tour to Butterfly Beach, seafood lunch.' }
    ],
    nearbyPlaces: ['Gokarna (140 km)', 'Dudhsagar Waterfalls (60 km)', 'Dandeli (120 km)'],
    localTransport: 'Self-drive rental scooters and cars, GoaMiles app cabs, local tourist taxis.',
    featured: true
  },
  {
    id: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    region: 'North',
    category: 'Heritage & Culture',
    tagline: 'Home of the World-Wonder Taj Mahal & Mughal Splendour',
    description: 'Behold the ethereal white marble Taj Mahal, monumental Agra Fort, and the abandoned sandstone city of Fatehpur Sikri.',
    image: '/assets/images/dest_rajasthan_heritage_1791892028463.jpg',
    rating: 4.9,
    reviewsCount: 7100,
    bestSeason: 'October to March (Clear skies, cool weather)',
    idealDuration: '2 to 3 Days',
    estimatedBudget: {
      budget: '₹2,000 – ₹3,500 / day',
      moderate: '₹4,500 – ₹8,000 / day',
      luxury: '₹14,000+ / day'
    },
    howToReach: {
      air: 'Agra Airport (AGR) has select flights; Delhi IGI Airport (DEL) is 210 km (2.5 hours on Yamuna Expressway).',
      rail: 'Agra Cantt (AGC) is a superfast corridor served by Gatimaan & Vande Bharat.',
      road: 'Connected by Yamuna Expressway and Agra-Lucknow Expressway.'
    },
    attractions: ['Taj Mahal at Sunrise', 'Agra Fort (UNESCO)', 'Fatehpur Sikri', 'Mehtab Bagh (Taj Sunset View)', 'Itmad-ud-Daulah (Baby Taj)', 'Sadar Bazaar'],
    thingsToDo: ['Watch the changing sunrise hues on the white marble dome of the Taj Mahal', 'Taste melt-in-the-mouth authentic Agra Petha in varied flavours', 'Explore marble inlay artisan workshops demonstrating Pietra Dura craft', 'View the Taj Mahal across the Yamuna river from Mehtab Bagh at sunset'],
    suggestedItinerary: [
      { day: 1, title: 'The Jewel of Agra', activities: 'Early sunrise entrance to Taj Mahal, tour massive Agra Fort, sunset view of Taj from Mehtab Bagh.' },
      { day: 2, title: 'Ghost City of Fatehpur Sikri', activities: 'Half-day tour to Emperor Akbar capital at Fatehpur Sikri, Buland Darwaza, Jama Masjid.' }
    ],
    nearbyPlaces: ['Mathura & Vrindavan (55 km)', 'Bharatpur Bird Sanctuary (55 km)', 'Delhi (210 km)'],
    localTransport: 'Battery-operated eco rickshaws around Taj precinct, auto-rickshaws, app cabs.',
    featured: false
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    region: 'North',
    category: 'Heritage & Culture',
    tagline: 'The Romantic City of Lakes & White Marble Palaces',
    description: 'Surrounded by shimmering lakes and the purple ridges of the Aravalli hills, Udaipur is celebrated for its floating Lake Palace, grand City Palace, and royal Mewar hospitality.',
    image: '/assets/images/dest_rajasthan_heritage_1791892028463.jpg',
    rating: 4.9,
    reviewsCount: 4890,
    bestSeason: 'September to March (Pleasant weather, sparkling lakes)',
    idealDuration: '3 to 4 Days',
    estimatedBudget: {
      budget: '₹2,400 – ₹3,800 / day',
      moderate: '₹5,500 – ₹9,500 / day',
      luxury: '₹18,000+ / day'
    },
    howToReach: {
      air: 'Maharana Pratap Airport (UDR), 22 km from the old city.',
      rail: 'Udaipur City Railway Station (UDZ) connected to Delhi, Mumbai, Jaipur.',
      road: 'Golden Quadrilateral NH48, luxury bus connections.'
    },
    attractions: ['City Palace Complex', 'Lake Pichola & Jag Mandir', 'Taj Lake Palace', 'Saheliyon Ki Bari', 'Jagdish Temple', 'Monsoon Palace (Sajjangarh)'],
    thingsToDo: ['Sunset boat cruise on Lake Pichola past illuminated palaces', 'Attend the evening Dharohar folk dance show at Bagore Ki Haveli', 'Rooftop dinner overlooking glowing waters of Lake Pichola', 'Sunset panoramic view from high Sajjangarh Monsoon Palace'],
    suggestedItinerary: [
      { day: 1, title: 'Royal Mewar Palace', activities: 'Tour opulent City Palace, Jagdish Temple, sunset boat cruise on Lake Pichola, Bagore Ki Haveli folk show.' },
      { day: 2, title: 'Lakes & Gardens', activities: 'Visit Saheliyon Ki Bari, Fateh Sagar Lake, drive up to Sajjangarh Monsoon Palace for sunset views.' },
      { day: 3, title: 'Art & Artisan Villages', activities: 'Shilpgram arts & crafts village, miniature painting workshops, heritage dining.' }
    ],
    nearbyPlaces: ['Kumbhalgarh Fort (85 km)', 'Ranakpur Jain Temples (93 km)', 'Chittorgarh Fort (115 km)'],
    localTransport: 'Auto-rickshaws, app cabs, walking in old city, lake boats.',
    featured: true
  },
  {
    id: 'coorg',
    name: 'Coorg (Kodagu)',
    state: 'Karnataka',
    region: 'South',
    category: 'Mountains & Hill Stations',
    tagline: 'The Scotland of India: Coffee Plantations & Misty Hills',
    description: 'Misty hills covered in emerald coffee and cardamom estates, cascading waterfalls, Tibetan monastery at Bylakuppe, and warm Kodava hospitality.',
    image: '/assets/images/dest_himachal_mountains_1791892125589.jpg',
    rating: 4.7,
    reviewsCount: 3120,
    bestSeason: 'October to March (Pleasant) & July to Sep (Lush Monsoons)',
    idealDuration: '3 to 4 Days',
    estimatedBudget: {
      budget: '₹2,000 – ₹3,500 / day',
      moderate: '₹4,500 – ₹8,000 / day',
      luxury: '₹12,000+ / day'
    },
    howToReach: {
      air: 'Kannur Airport (CNN, 90 km) or Mangalore Airport (IXE, 140 km), Bengaluru Airport is 260 km.',
      rail: 'Mysuru Junction (MYS, 120 km) is the nearest railway head.',
      road: 'Scenic state highways connecting Mysuru, Bengaluru, and Mangalore.'
    },
    attractions: ['Abbey Falls', 'Raja Seat Sunset Point', 'Dubare Elephant Camp', 'Namdroling Golden Temple (Bylakuppe)', 'Talakaveri (Cauvery origin)', 'Mandalpatti Peak'],
    thingsToDo: ['Stay in an authentic plantation homestay surrounded by coffee aroma', '4x4 jeep safari up Mandalpatti for misty cloud views', 'Taste traditional Pandi Curry with soft rice Akki Rotti', 'River rafting in Barapole river during monsoon'],
    suggestedItinerary: [
      { day: 1, title: 'Coffee & Monasteries', activities: 'Visit Golden Temple Tibetan monastery at Bylakuppe, Dubare Elephant Camp, check-in to coffee estate.' },
      { day: 2, title: 'Waterfalls & Viewpoints', activities: 'Hike to Abbey Falls, explore Madikeri Fort, sunset at Raja Seat garden.' },
      { day: 3, title: 'Mandalpatti Adventure', activities: 'Jeep safari to Mandalpatti viewpoint, coffee tasting tour, spice shopping in Madikeri.' }
    ],
    nearbyPlaces: ['Mysuru (120 km)', 'Wayanad (110 km)', 'Bekal (130 km)'],
    localTransport: 'Hired tourist taxis or rental cars are essential due to plantation spread.',
    featured: false
  },
  {
    id: 'darjeeling',
    name: 'Darjeeling & Gangtok',
    state: 'West Bengal & Sikkim',
    region: 'East',
    category: 'Mountains & Hill Stations',
    tagline: 'Queen of the Hills, Himalayan Toy Train & Kanchenjunga',
    description: 'Savour panoramic views of the mighty Mount Kanchenjunga, world-famous orthodox tea gardens, the historic UNESCO Himalayan Toy Train, and serene Buddhist monasteries.',
    image: '/assets/images/dest_himachal_mountains_1791892125589.jpg',
    rating: 4.8,
    reviewsCount: 3410,
    bestSeason: 'March to May (Spring blooms) & October to December (Clear skies)',
    idealDuration: '5 to 6 Days',
    estimatedBudget: {
      budget: '₹2,200 – ₹3,800 / day',
      moderate: '₹5,000 – ₹8,500 / day',
      luxury: '₹13,000+ / day'
    },
    howToReach: {
      air: 'Bagdogra Airport (IXB), 70 km (3 hours mountain drive).',
      rail: 'New Jalpaiguri Railway Station (NJP) connects to Kolkata, Delhi, and Guwahati.',
      road: 'Hill cart road and NH10 through scenic Teesta river valley.'
    },
    attractions: ['Tiger Hill Sunrise over Kanchenjunga', 'Darjeeling Himalayan Railway (Toy Train)', 'Batasia Loop & War Memorial', 'Happy Valley Tea Estate', 'Himalayan Mountaineering Institute (HMI)', 'Ghum Monastery'],
    thingsToDo: ['Watch the first rays of sunrise turn Mt Kanchenjunga into molten gold at Tiger Hill', 'Ride the steam-hauled UNESCO Toy Train between Darjeeling and Ghum', 'Fresh single-estate Darjeeling Muscatel tea tasting', 'Savour steaming hot chicken momos and thukpa at Mall Road'],
    suggestedItinerary: [
      { day: 1, title: 'Arrive in the Clouds', activities: 'Drive from Bagdogra, check-in to heritage colonial hotel, evening walk along Chowrasta Mall.' },
      { day: 2, title: 'Tiger Hill & Heritage Ride', activities: '4 AM sunrise at Tiger Hill, Batasia Loop, ride Toy Train, visit Ghum Monastery.' },
      { day: 3, title: 'Tea & Mountaineering', activities: 'Tour Happy Valley Tea Estate, Himalayan Mountaineering Institute, Padmaja Naidu Himalayan Zoo.' }
    ],
    nearbyPlaces: ['Gangtok (98 km)', 'Kalimpong (50 km)', 'Pelling (72 km)', 'Mirik (49 km)'],
    localTransport: 'Shared mountain jeeps, local tourist taxis, walking along pedestrian mall.',
    featured: false
  },
  {
    id: 'delhi',
    name: 'New Delhi & Old Delhi',
    state: 'Delhi (NCT)',
    region: 'North',
    category: 'Heritage & Culture',
    tagline: 'The Grand National Capital: From Mughal Eras to Modern Avenues',
    description: 'A captivating tapestry of centuries-old empires and modern vibrancy, featuring UNESCO monuments, bustling bazaars, broad tree-lined avenues, and world-renowned culinary heritage.',
    image: '/assets/images/hero_cinematic_india_1791892010717.jpg',
    rating: 4.7,
    reviewsCount: 6800,
    bestSeason: 'October to March (Crisp pleasant winters)',
    idealDuration: '3 to 4 Days',
    estimatedBudget: {
      budget: '₹2,000 – ₹3,500 / day',
      moderate: '₹4,500 – ₹8,000 / day',
      luxury: '₹15,000+ / day'
    },
    howToReach: {
      air: 'Indira Gandhi International Airport (DEL), India primary aviation gateway.',
      rail: 'New Delhi (NDLS), Old Delhi (DLI), Hazrat Nizamuddin (NZM) with countrywide express lines.',
      road: 'Extensive expressways (Eastern Peripheral, Yamuna, Delhi-Mumbai).'
    },
    attractions: ['Red Fort (Lal Qila)', 'Qutub Minar Complex', 'Humayun Tomb', 'India Gate & Kartavya Path', 'Chandni Chowk & Jama Masjid', 'Lotus Temple', 'Akshardham Temple'],
    thingsToDo: ['Cycle rickshaw heritage food trail through Chandni Chowk Paranthe Wali Gali', 'Evening illumination walk along India Gate & Kartavya Path', 'Browse handicraft stalls and regional state foods at Dilli Haat', 'Marvel at the sandstone Islamic symmetry of Humayun Tomb'],
    suggestedItinerary: [
      { day: 1, title: 'Imperial Delhi', activities: 'Morning visit to Humayun Tomb, Qutub Minar, drive past Rashtrapati Bhavan, sunset at India Gate.' },
      { day: 2, title: 'Mughal Capital', activities: 'Red Fort exploration, Jama Masjid, food walk through Chandni Chowk, Karim or Aslam Butter Chicken.' },
      { day: 3, title: 'Modern Arts & Craft', activities: 'National Gallery of Modern Art (NGMA), Lotus Temple, Dilli Haat handicraft shopping.' }
    ],
    nearbyPlaces: ['Agra (210 km)', 'Jaipur (280 km)', 'Neemrana Fort (125 km)', 'Kurukshetra (160 km)'],
    localTransport: 'World-class Delhi Metro (fast & air-conditioned), app cabs (Uber/Ola), auto-rickshaws.',
    featured: false
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    state: 'Punjab',
    region: 'North',
    category: 'Spiritual Destinations',
    tagline: 'The Golden Temple, Sacred Peace & Patriotic Valor',
    description: 'Home of the breathtaking Golden Temple (Harmandir Sahib), where millions partake in the 24/7 free community Langar, historical Jallianwala Bagh, and the high-energy Wagah Border ceremony.',
    image: '/assets/images/dest_varanasi_ghats_1791892084869.jpg',
    rating: 4.9,
    reviewsCount: 5200,
    bestSeason: 'October to March (Pleasant cool temperatures)',
    idealDuration: '2 to 3 Days',
    estimatedBudget: {
      budget: '₹1,600 – ₹2,800 / day',
      moderate: '₹3,500 – ₹6,500 / day',
      luxury: '₹10,000+ / day'
    },
    howToReach: {
      air: 'Sri Guru Ram Dass Jee International Airport (ATQ), 11 km from city.',
      rail: 'Amritsar Junction (ASR) connected by Shatabdi and Vande Bharat Express.',
      road: 'Grand Trunk Road (NH44), luxury coach connections from Delhi and Chandigarh.'
    },
    attractions: ['Harmandir Sahib (Golden Temple)', 'Jallianwala Bagh Memorial', 'Attari-Wagah Border Beating Retreat', 'Gobindgarh Fort', 'Partition Museum'],
    thingsToDo: ['Experience peaceful night darshan at the Golden Temple as hymns echo over the holy Amrit Sarovar', 'Volunteer in the Mega Langar kitchen serving 100,000 people daily', 'Witness the electric patriotism at Wagah Border ceremony', 'Feast on authentic Amritsari Kulcha with melting butter and thick lassi'],
    suggestedItinerary: [
      { day: 1, title: 'Golden Temple & Freedom History', activities: 'Morning darshan at Harmandir Sahib, Langar lunch, solemn visit to Jallianwala Bagh, Partition Museum.' },
      { day: 2, title: 'Wagah Border & Punjabi Heritage', activities: 'Afternoon drive to Attari-Wagah Border retreat ceremony, evening dinner at historic Kesar Da Dhaba.' }
    ],
    nearbyPlaces: ['Chandigarh (230 km)', 'Dharamshala (200 km)', 'Dalhousie (190 km)'],
    localTransport: 'Free SGPC shuttle buses from station, e-rickshaws, app cabs.',
    featured: false
  },
  {
    id: 'shillong',
    name: 'Shillong & Cherrapunji',
    state: 'Meghalaya',
    region: 'Northeast',
    category: 'Adventure',
    tagline: 'Abode of the Clouds, Living Root Bridges & Crystal Rivers',
    description: 'Explore the ethereal green hills of Meghalaya, mystical living root bridges woven by Khasi tribes, dramatic waterfalls plunging into deep gorges, and crystal-clear waters of Umngot River at Dawki.',
    image: '/assets/images/dest_kerala_backwaters_1791892057635.jpg',
    rating: 4.9,
    reviewsCount: 2980,
    bestSeason: 'October to April (Pleasant weather, clear water in Dawki)',
    idealDuration: '4 to 5 Days',
    estimatedBudget: {
      budget: '₹2,500 – ₹4,000 / day',
      moderate: '₹5,500 – ₹9,000 / day',
      luxury: '₹14,000+ / day'
    },
    howToReach: {
      air: 'Guwahati Airport (GAU), 125 km (approx. 3.5 hours scenic drive) or Shillong Airport (SHL).',
      rail: 'Guwahati Railway Station (GHY) is the major Northeast hub.',
      road: 'Smooth 4-lane highway connecting Guwahati and Shillong.'
    },
    attractions: ['Double Decker Living Root Bridge (Nongriat)', 'Nohkalikai Falls', 'Dawki Umngot River Boat Ride', 'Mawlynnong (Cleanest Village in Asia)', 'Umiam Lake', 'Laitlum Canyons'],
    thingsToDo: ['Trek down 3,000 stone stairs to the sacred living root bridges of Cherrapunji', 'Glide over glass-like transparent waters in wooden canoes on Dawki River', 'Stand at the edge of the mystical mist at Laitlum Canyons', 'Experience live indie music culture in Shillong cozy rock cafes'],
    suggestedItinerary: [
      { day: 1, title: 'Pine City of Shillong', activities: 'Drive past scenic Umiam Lake, check-in to Shillong, explore Police Bazar, sunset at Ward Lake.' },
      { day: 2, title: 'Waterfalls of Cherrapunji', activities: 'Day tour to Cherrapunji (Sohra), visit Nohkalikai Falls, Mawsmai limestone cave, Seven Sisters Falls.' },
      { day: 3, title: 'Living Root Bridges', activities: 'Trek to Nongriat double-decker living root bridge, swim in natural turquoise pools.' },
      { day: 4, title: 'Crystal River & Cleanest Village', activities: 'Boat ride on crystal clear Dawki river, visit Mawlynnong village, return to Shillong.' }
    ],
    nearbyPlaces: ['Kaziranga National Park (240 km)', 'Guwahati (100 km)', 'Tawang (Arunachal, 480 km)'],
    localTransport: 'Hired tourist SUVs (essential for mountain ghats), local shared black-and-yellow Maruti 800 cabs.',
    featured: true
  },
  {
    id: 'hampi',
    name: 'Hampi',
    state: 'Karnataka',
    region: 'South',
    category: 'Heritage & Culture',
    tagline: 'The Lost Boulder-Strewn Empire of Vijayanagara',
    description: 'A UNESCO World Heritage surreal wonderland of giant granite boulder-strewn landscapes, colossal ruins of the 14th-century Vijayanagara Empire, and sacred riverside stone temples.',
    image: '/assets/images/dest_rajasthan_heritage_1791892028463.jpg',
    rating: 4.8,
    reviewsCount: 3340,
    bestSeason: 'October to March (Cool breezes over the boulders)',
    idealDuration: '3 to 4 Days',
    estimatedBudget: {
      budget: '₹1,800 – ₹3,000 / day',
      moderate: '₹4,000 – ₹7,000 / day',
      luxury: '₹12,000+ / day'
    },
    howToReach: {
      air: 'Jindal Vijayanagar Airport Vidyanagar (VDY, 35 km) or Hubli (HBX, 145 km), Bengaluru is 350 km.',
      rail: 'Hosapete Junction (HPT, 13 km) with daily train links.',
      road: 'NH48 and NH50 expressways from Bengaluru and Hyderabad.'
    },
    attractions: ['Virupaksha Temple', 'Vijaya Vittala Temple & Stone Chariot', 'Lotus Mahal & Elephant Stables', 'Matanga Hill Sunrise', 'Tungabhadra River Coracle Ride', 'Anegundi (Hippie Island)'],
    thingsToDo: ['Watch sunrise turn golden across the ancient ruins from the summit of Matanga Hill', 'Cross the swirling Tungabhadra River on a traditional round wicker coracle boat', 'Rent a bicycle or moped to cruise along ruins and coconut palm grooves', 'Marvel at the musical pillars of the Vijaya Vittala temple complex'],
    suggestedItinerary: [
      { day: 1, title: 'Sacred Centre', activities: 'Visit active 7th-century Virupaksha Temple, Hemakuta hill sunset, Tungabhadra riverfront walking trail.' },
      { day: 2, title: 'Royal Enclosure & Stone Chariot', activities: 'Explore Royal Centre, Lotus Mahal, Elephant Stables, and the iconic Stone Chariot at Vittala Temple.' },
      { day: 3, title: 'Across the River to Anegundi', activities: 'Coracle boat to Anegundi, hike Anjanadri hill (birthplace of Hanuman), chill at Sanapur lake.' }
    ],
    nearbyPlaces: ['Badami Caves (140 km)', 'Pattadakal & Aihole (135 km)', 'Gokarna (310 km)'],
    localTransport: 'Rental bicycles, mopeds/scooters, auto-rickshaws, and coracle river boats.',
    featured: false
  },
  {
    id: 'nainital',
    name: 'Nainital',
    state: 'Uttarakhand',
    region: 'North',
    category: 'Mountains & Hill Stations',
    tagline: 'The Lake District of the Kumaon Himalayas',
    description: 'Set in a valley containing an eye-shaped emerald lake, surrounded by towering pine and oak peaks, with scenic mountain cable cars and colonial heritage.',
    image: '/assets/images/hero_cinematic_india_1791892010717.jpg',
    rating: 4.8,
    reviewsCount: 3820,
    bestSeason: 'March to June & September to November',
    idealDuration: '2 to 3 Days',
    estimatedBudget: {
      budget: '₹2,000 – ₹3,500 / day',
      moderate: '₹4,500 – ₹7,500 / day',
      luxury: '₹12,000+ / day'
    },
    howToReach: {
      air: 'Pantnagar Airport (PGH), 70 km away.',
      rail: 'Kathgodam Railway Station (KGM), 35 km with Shatabdi & overnight trains from Delhi.',
      road: 'Smooth highway via NH9 and Rampur-Kathgodam road (approx. 6 hrs from Delhi).'
    },
    attractions: ['Naini Lake & Yacht Boating', 'Naina Devi Temple', 'Snow View Point & Ropeway', 'Mall Road & Tibetan Market', 'Tiffin Top (Dorothy Seat)', 'Pangot Bird Sanctuary'],
    thingsToDo: ['Peaceful paddle or rowing boat ride on Naini Lake surrounded by green hills', 'Ropeway cable car ride up to Snow View for panoramic Himalayan vista', 'Taste local Kumaoni Bal Mithai & Singori sweets', 'Evening heritage stroll along Mallital and Tallital'],
    suggestedItinerary: [
      { day: 1, title: 'Lake & Naina Devi', activities: 'Arrive via Kathgodam, boat ride across Naini Lake, seek blessings at sacred Naina Devi Temple, evening Mall Road walk.' },
      { day: 2, title: 'Viewpoints & Nature', activities: 'Cable car to Snow View Point, horse ride or hike up to Tiffin Top, visit Cave Garden.' }
    ],
    nearbyPlaces: ['Kainchi Dham (18 km)', 'Bhimtal (22 km)', 'Mukteshwar (50 km)', 'Ranikhet (55 km)'],
    localTransport: 'Manual rowing boats on lake, shared taxis, town auto-rickshaws, walking along pedestrian mall.',
    featured: true
  },
  {
    id: 'kainchi-dham',
    name: 'Kainchi Dham',
    state: 'Uttarakhand',
    region: 'North',
    category: 'Spiritual Destinations',
    tagline: 'Sacred Ashram of Neem Karoli Baba in Kumaon Valley',
    description: 'A serene Himalayan sanctuary nestled between two verdant hills, world-renowned as the spiritual hermitage of the revered mystic Neem Karoli Baba (Maharaj-ji), visited by seekers worldwide.',
    image: '/assets/images/dest_varanasi_ghats_1791892084869.jpg',
    rating: 4.9,
    reviewsCount: 4610,
    bestSeason: 'Round the Year (Major Bhandara on June 15th)',
    idealDuration: '1 to 2 Days',
    estimatedBudget: {
      budget: '₹1,500 – ₹2,800 / day',
      moderate: '₹3,500 – ₹6,000 / day',
      luxury: '₹9,000+ / day'
    },
    howToReach: {
      air: 'Pantnagar Airport (PGH), 75 km away.',
      rail: 'Kathgodam Railway Station (KGM), 38 km from Kainchi.',
      road: 'Located on the Bhowali-Almora National Highway (18 km from Nainital).'
    },
    attractions: ['Neem Karoli Baba Ashram Sanctum', 'Hanuman Ji Mandir', 'Sacred Kumaon River Stream', 'Bhandara Pavilion', 'Bhowali Fruit Market'],
    thingsToDo: ['Participate in early morning and evening Hanuman Chalisa recitations', 'Meditate in the serene sanctum of Maharaj-ji surrounded by forested mountain valley', 'Receive sacred Prasad (Chana & Halwa)', 'Combine with a peaceful stay in nearby Bhowali or Mukteshwar'],
    suggestedItinerary: [
      { day: 1, title: 'Spiritual Darshan & Meditation', activities: 'Morning drive from Kathgodam/Nainital, spend tranquil hours in the Ashram courtyard, attend evening Aarti, overnight stay in nearby hill homestay.' }
    ],
    nearbyPlaces: ['Nainital (18 km)', 'Bhimtal (20 km)', 'Almora (45 km)', 'Jageshwar Dham (80 km)'],
    localTransport: 'Hired taxis from Kathgodam/Nainital, shared jeeps along Bhowali-Almora route.',
    featured: true
  },
  {
    id: 'mussoorie',
    name: 'Mussoorie',
    state: 'Uttarakhand',
    region: 'North',
    category: 'Mountains & Hill Stations',
    tagline: 'The Queen of the Hills overlooking Doon Valley',
    description: 'Perched high in the Garhwal Himalayan foothills, Mussoorie charms with sweeping views of the Doon Valley, colonial architecture, misty pine ridges, and cascading waterfalls.',
    image: '/assets/images/dest_himachal_mountains_1791892125589.jpg',
    rating: 4.8,
    reviewsCount: 3990,
    bestSeason: 'April to June & September to November',
    idealDuration: '2 to 3 Days',
    estimatedBudget: {
      budget: '₹2,200 – ₹3,600 / day',
      moderate: '₹4,500 – ₹8,000 / day',
      luxury: '₹14,000+ / day'
    },
    howToReach: {
      air: 'Jolly Grant Airport Dehradun (DED), 55 km away.',
      rail: 'Dehradun Railway Station (DDN), 34 km with Vande Bharat and Shatabdi from Delhi.',
      road: 'Smooth winding mountain road from Dehradun (approx. 1.2 hours drive).'
    },
    attractions: ['Kempty Falls', 'Gun Hill Point & Ropeway', 'Camel Back Road', 'George Everest Peak & Observatory', 'Lal Tibba (Highest Point in Landour)', 'Char Dukan & Landour Bakehouse'],
    thingsToDo: ['Hike along silent pine-fringed trails of Landour to George Everest peak', 'Ropeway ride to Gun Hill for sunset overlooking Kedarnath range', 'Sip hot cocoa and apple pie at legendary Landour Bakehouse', 'Walk Camel Back Road for misty valley vistas'],
    suggestedItinerary: [
      { day: 1, title: 'Mall Road & Gun Hill', activities: 'Arrive from Dehradun, check-in to hillside resort, cable car to Gun Hill sunset, dinner on Mall Road.' },
      { day: 2, title: 'Landour & George Everest', activities: 'Morning exploration of colonial Landour, Char Dukan, hike up to George Everest House with 360-degree Himalayan views, visit Kempty Falls.' }
    ],
    nearbyPlaces: ['Dhanaulti (32 km)', 'Dehradun (34 km)', 'Rishikesh (75 km)', 'Kanatal (45 km)'],
    localTransport: 'Tourist taxis, walking along pedestrian Mall Road and Landour trails.',
    featured: true
  }
];

