import { TourPackage } from '../types';

export const TOURS: TourPackage[] = [
  {
    id: 'rishikesh-mussoorie-escape',
    title: 'Rishikesh and Mussoorie Escape',
    duration: '4 Days / 3 Nights',
    destinationsCovered: ['Rishikesh', 'Dehradun', 'Mussoorie'],
    region: 'North',
    category: 'Hill Stations',
    pricePerPerson: 16800,
    originalPrice: 20500,
    image: '/assets/images/dest_himachal_mountains_1791892125589.jpg',
    gallery: [
      '/assets/images/dest_himachal_mountains_1791892125589.jpg',
      '/assets/images/hero_cinematic_india_1791892010717.jpg'
    ],
    overview: 'Escape to the serene foothills of Garhwal Himalayas. Experience high-octane river rafting and evening Ganga Aarti at Triveni Ghat in Rishikesh, followed by mist-clad colonial walks, Kempty Falls, and scenic Lal Tibba views in the Queen of Hills, Mussoorie.',
    rating: 4.8,
    reviewsCount: 940,
    bestSeason: 'March to June & September to November',
    hotelDetails: 'Stay in 4-star riverside resorts in Rishikesh and heritage view properties on Camel Back Road in Mussoorie.',
    transportDetails: 'Dedicated AC private sedan (Dzire/Etios) for airport/rail transfers, mountain hill driving, and sightseeing.',
    mealsDetails: 'Daily breakfast & dinner included with local Garhwali culinary specialties.',
    importantNotes: [
      'River rafting grade III/IV subject to river water level regulations.',
      'Carry light woollens for Mussoorie evenings even in summer.'
    ],
    inclusions: [
      '3 Nights accommodation in curated 4-star boutique resorts',
      'Daily breakfast & dinner (MAP plan)',
      'Private chauffeured AC vehicle for all transfers and mountain routes',
      'White water river rafting (16 km Shivpuri to Rishikesh)',
      'VIP passes for Parmarth Niketan Ganga Aarti',
      'Cable car ropeway ticket to Gun Hill, Mussoorie'
    ],
    exclusions: [
      'Bungee jumping & zipline fees at Mohan Chatti',
      'Personal adventure insurance and camera entry passes',
      'Lunches and personal shopping expenses'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Rishikesh & Sacred Aarti', description: 'Pickup from Dehradun airport / Haridwar station. Check into riverside resort. Visit Ram Jhula & Lakshman Jhula, followed by sublime evening Ganga Aarti at Triveni Ghat with floating earthen diyas.' },
      { day: 2, title: 'Ganges Rafting & Drive to Mussoorie', description: 'Early morning exciting white-water rafting run through rapids like Roller Coaster and Golf Course. Post lunch, scenic scenic drive up the winding mountains to Mussoorie. Sunset walk along Camel Back Road.' },
      { day: 3, title: 'Kempty Falls, Lal Tibba & Mall Road', description: 'Visit thunderous Kempty Falls and historic George Everest Peak. Afternoon visit to highest viewpoint Lal Tibba in Landour with bakery stop. Evening stroll on the bustling Mall Road.' },
      { day: 4, title: 'Dehradun Sightseeing & Departure', description: 'Descend to Dehradun with stops at Robber’s Cave (Guchhupani) and Forest Research Institute (FRI). Onward departure transfer to airport/railway station.' }
    ],
    featured: true
  },
  {
    id: 'nainital-kainchi-dham-journey',
    title: 'Nainital and Kainchi Dham Journey',
    duration: '3 Days / 2 Nights',
    destinationsCovered: ['Kathgodam', 'Nainital', 'Bhowali', 'Kainchi Dham'],
    region: 'North',
    category: 'Spiritual Journeys',
    pricePerPerson: 13500,
    originalPrice: 16900,
    image: '/assets/images/dest_himachal_mountains_1791892125589.jpg',
    overview: 'A spiritually uplifting and scenic weekend in Kumaon. Seek the peaceful blessings of Neem Karoli Baba at the world-renowned Kainchi Dham Ashram, paired with serene boating on Naini Lake and panoramic views from Snow View Point.',
    rating: 4.9,
    reviewsCount: 1420,
    bestSeason: 'Round the year (pleasant summers & snowy winters)',
    hotelDetails: 'Comfortable 3-star lakeside boutique hotel overlooking Naini Lake.',
    transportDetails: 'Private AC vehicle from Kathgodam/Pantnagar with experienced hill driver.',
    mealsDetails: 'Daily breakfast and wholesome vegetarian dinners included.',
    importantNotes: [
      'Dress modestly when visiting Kainchi Dham Ashram.',
      'Boating life jackets are mandatory on Naini Lake.'
    ],
    inclusions: [
      '2 Nights in lake-facing deluxe room in Nainital',
      'Breakfast and dinner daily',
      'Dedicated AC vehicle throughout the itinerary',
      'Private boat cruise on Naini Lake and Naina Devi temple darshan',
      'Guided excursion and darshan facilitation at Kainchi Dham Neem Karoli Baba Ashram',
      'Toll, state taxes, driver allowance and hill permits'
    ],
    exclusions: [
      'Personal pooja offerings and donation dāna',
      'Ropeway charges to Snow View Point (optional ticket)',
      'Train fare to Kathgodam'
    ],
    itinerary: [
      { day: 1, title: 'Kathgodam to Nainital Lake Town', description: 'Pickup from Kathgodam railway station. Scenic drive ascending through pine forests to Nainital. Check-in, enjoy an afternoon gondola boat ride across emerald Naini Lake, and seek blessings at sacred Maa Naina Devi Temple.' },
      { day: 2, title: 'Sacred Kainchi Dham Pilgrimage', description: 'Early morning spiritual journey to Kainchi Dham nestled in the serene valley near Bhowali. Spend quiet, contemplative hours in prayer, meditation, and temple prasad. Return via Bhimtal lake and Tibetan monastery.' },
      { day: 3, title: 'Snow View & Departure', description: 'Morning cable car to Snow View Point for breathtaking vistas of Nanda Devi and Trishul peaks. Visit local Kumaoni craft market and depart towards Kathgodam.' }
    ],
    featured: true
  },
  {
    id: 'delhi-agra-weekend-tour',
    title: 'Delhi–Agra Weekend Tour',
    duration: '2 Days / 1 Night',
    destinationsCovered: ['Delhi', 'Mathura', 'Agra'],
    region: 'North',
    category: 'Weekend Getaways',
    pricePerPerson: 9500,
    originalPrice: 12000,
    image: '/assets/images/dest_rajasthan_heritage_1791892028463.jpg',
    overview: 'The quintessential quick getaway connecting the nation’s capital to the timeless City of Love. Glide down the Yamuna Expressway in a chauffeured sedan, witness the sunset and sunrise across the marble domes of the Taj Mahal, and explore the red sandstone courts of Agra Fort.',
    rating: 4.8,
    reviewsCount: 2200,
    bestSeason: 'October to March',
    hotelDetails: '4-star hotel close to the Taj East Gate (ITC Mughal or Trident Agra).',
    transportDetails: 'Private air-conditioned sedan with all highway toll receipts and parking covered.',
    mealsDetails: 'Buffet breakfast at the hotel and Mughal specialty welcome lunch.',
    importantNotes: [
      'Taj Mahal remains closed on Fridays.',
      'Battery golf cart shuttles operate inside the monument pedestrian zone.'
    ],
    inclusions: [
      '1 Night in 4-star hotel in Agra with breakfast',
      'Doorstep pickup and drop anywhere in Delhi NCR / Airport',
      'Yamuna Expressway round-trip toll taxes and parking fees',
      'Approved monument historian guide in Agra',
      'Sunset view from Mehtab Bagh gardens across the Yamuna river'
    ],
    exclusions: [
      'Taj Mahal & Agra Fort entry tickets (available on request)',
      'Camera fee and porterage'
    ],
    itinerary: [
      { day: 1, title: 'Delhi to Agra via Yamuna Expressway', description: 'Early 7:00 AM pickup from Delhi. Smooth 3-hour expressway drive to Agra. Check into hotel. Afternoon visit to the imposing Agra Fort. In the golden hour, witness the Taj Mahal from Mehtab Bagh across the river.' },
      { day: 2, title: 'Taj Sunrise, Marble Artisans & Return', description: 'Early sunrise entrance inside the Taj Mahal as marble glows in warm amber hues. Return to hotel for breakfast. Visit marble inlay artisan guild. Smooth afternoon drive back to Delhi.' }
    ],
    featured: true
  },
  {
    id: 'agra-mathura-heritage-trip',
    title: 'Agra and Mathura Heritage Trip',
    duration: '3 Days / 2 Nights',
    destinationsCovered: ['Mathura', 'Vrindavan', 'Agra', 'Fatehpur Sikri'],
    region: 'North',
    category: 'Heritage and Culture',
    pricePerPerson: 14200,
    originalPrice: 17500,
    image: '/assets/images/dest_rajasthan_heritage_1791892028463.jpg',
    overview: 'Immerse in the rich spiritual cradle of Braj Bhoomi and the architectural pinnacle of the Mughal Empire. Experience the devotional fervor of Bankey Bihari and Prem Mandir in Vrindavan, followed by the majestic Taj Mahal and UNESCO ghost city of Fatehpur Sikri.',
    rating: 4.9,
    reviewsCount: 1650,
    bestSeason: 'September to March',
    hotelDetails: 'Stay 1 night in spiritual Vrindavan and 1 night in a heritage hotel in Agra.',
    transportDetails: 'Dedicated AC commercial sedan with verified driver.',
    mealsDetails: 'Vegetarian breakfast and dinner throughout.',
    importantNotes: [
      'Temple timings in Vrindavan close between 12:00 PM and 4:30 PM.',
      'Wear slip-on shoes for ease of entry into temples.'
    ],
    inclusions: [
      '2 Nights accommodation in verified heritage & boutique properties',
      'Daily breakfast and traditional dinner',
      'Private air-conditioned car for entire circuit from Delhi',
      'Special VIP entry facilitation at Prem Mandir light show',
      'Guided walkthrough of Akbar’s abandoned red sandstone capital at Fatehpur Sikri'
    ],
    exclusions: [
      'Personal offerings, prasad, and monument entrance fees',
      'Cycle-rickshaw rides in narrow Vrindavan alleyways'
    ],
    itinerary: [
      { day: 1, title: 'Delhi to Sacred Mathura & Vrindavan', description: 'Depart Delhi for Mathura. Visit Shri Krishna Janmabhoomi temple complex. Proceed to Vrindavan to visit Banke Bihari Ji, ISKCON temple, and the mesmerizing evening musical fountain and light show at Prem Mandir.' },
      { day: 2, title: 'Vrindavan to Agra & Monument Marvels', description: 'Drive to Agra (1.5 hours). Tour the grand imperial halls of Agra Fort, followed by sunset vistas of the Taj Mahal. Evening tour of local brass and leather craft bazaars.' },
      { day: 3, title: 'Sunrise Taj Mahal & Fatehpur Sikri', description: 'Sunrise exploration of the Taj Mahal. Post breakfast, excursion to Akbar’s deserted capital Fatehpur Sikri including the monumental Buland Darwaza and Salim Chishti tomb. Highway return to Delhi.' }
    ]
  },
  {
    id: 'haridwar-spiritual-getaway',
    title: 'Haridwar Spiritual Getaway',
    duration: '3 Days / 2 Nights',
    destinationsCovered: ['Haridwar', 'Kankhal', 'Rishikesh'],
    region: 'North',
    category: 'Spiritual Journeys',
    pricePerPerson: 11900,
    originalPrice: 14500,
    image: '/assets/images/dest_varanasi_ghats_1791892084869.jpg',
    overview: 'Where the sacred Ganges emerges from the Himalayas onto the Indo-Gangetic plains. Witness thousands gather at Har Ki Pauri for the world-famous evening Ganga Aarti, take a holy dip in the crystal waters of the Brahmakund, and ascend by cable car to the hilltop Mansa Devi and Chandi Devi shrines.',
    rating: 4.8,
    reviewsCount: 1980,
    bestSeason: 'Round the year (Peak October to April)',
    hotelDetails: 'Heritage riverside haveli with private ghat access (Haveli Hari Ganga or similar).',
    transportDetails: 'Chauffeured AC car from Delhi NCR or Haridwar station.',
    mealsDetails: 'Pure vegetarian satvik breakfast and dinner included.',
    importantNotes: [
      'Haridwar is a strictly vegetarian and non-alcoholic holy city.',
      'Arrive at Har Ki Pauri by 5:30 PM for prime seating at the evening Aarti.'
    ],
    inclusions: [
      '2 Nights in heritage riverfront haveli with private bathing ghat access',
      'Daily satvik vegetarian breakfast and dinner',
      'Round-trip cable car tickets (Udan Khatola) to Mansa Devi and Chandi Devi',
      'Assisted reserved seating area at Har Ki Pauri Ganga Aarti',
      'Dedicated AC chauffeur-driven transport'
    ],
    exclusions: [
      'Pooja and pandit dakshina',
      'Personal train/flight tickets'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Haridwar & Har Ki Pauri Aarti', description: 'Pickup and check into riverside haveli. Evening witness the grand Ganga Aarti at Har Ki Pauri with chanting bells, burning camphor lamps, and floating flower boats.' },
      { day: 2, title: 'Hilltop Temples & Ashram Walk', description: 'Ropeway ascent to Mansa Devi and Chandi Devi temples overlooking the Shivalik hills. Afternoon walk through historic Kankhal town, visiting Daksheswara Mahadev temple and Shanti Kunj ashram.' },
      { day: 3, title: 'Morning Holy Snan & Return', description: 'Early morning peaceful Ganga snan at private ghat. Savor traditional Haridwar breakfast of hot kachori and jalebi. Departure transfer.' }
    ]
  },
  {
    id: 'lucknow-cultural-experience',
    title: 'Lucknow Cultural Experience',
    duration: '3 Days / 2 Nights',
    destinationsCovered: ['Lucknow City', 'Old Awadh Quarter'],
    region: 'North',
    category: 'Heritage and Culture',
    pricePerPerson: 13900,
    originalPrice: 16500,
    image: '/assets/images/dest_rajasthan_heritage_1791892028463.jpg',
    overview: 'Discover the gracious elegance, labyrinthine architecture, and world-renowned culinary heritage of Awadh. Explore the gravity-defying acoustic marvel of Bara Imambara and its Bhool Bhulaiya maze, marvel at Rumi Darwaza, and indulge in legendary Galouti kebabs and intricate Chikankari embroidery.',
    rating: 4.9,
    reviewsCount: 880,
    bestSeason: 'October to March',
    hotelDetails: 'Stay at heritage boutique property Lebua Lucknow or Taj Mahal Lucknow.',
    transportDetails: 'Private AC sedan with city chauffeur.',
    mealsDetails: 'Breakfast included, with curated Awadhi food tasting walk.',
    importantNotes: [
      'Carry head-covering scarf for visiting Bara and Chhota Imambara.',
      'Bargaining is expected in the old Chowk and Aminabad bazaars.'
    ],
    inclusions: [
      '2 Nights in luxury heritage hotel in Lucknow',
      'Daily gourmet breakfast',
      'Private air-conditioned car for full-day city tours',
      'Expert heritage storyteller guide for Bara Imambara & Bhool Bhulaiya',
      'Curated evening food walk in Hazratganj & Aminabad',
      'Interactive artisan visit to live Chikankari and Zardozi workshops'
    ],
    exclusions: [
      'Monuments entry tickets (bundle available on request)',
      'Alcoholic beverages and personal shopping expenses'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Nawabi Hazratganj', description: 'Airport/station pickup, hotel check-in. Evening architectural walking tour of Victorian Hazratganj, historical colonial buildings, and famous Awadhi tea and chaat.' },
      { day: 2, title: 'Imambara Complex, Bhool Bhulaiya & Chowk Food Walk', description: 'Guided tour of the grand Bara Imambara and its puzzling labyrinth (Bhool Bhulaiya), Rumi Darwaza, and Chhota Imambara. Evening guided gastronomic street food walk in Old Lucknow featuring authentic Galouti Kebabs and Sheermal.' },
      { day: 3, title: 'British Residency & Chikan Craft Artisan Tour', description: 'Morning tour of the 1857 historic British Residency ruins set in tranquil gardens. Visit master Chikankari embroidery artisan centers before departure transfer.' }
    ]
  },
  {
    id: 'kashmir-scenic-holiday',
    title: 'Kashmir Scenic Holiday',
    duration: '6 Days / 5 Nights',
    destinationsCovered: ['Srinagar', 'Gulmarg', 'Pahalgam', 'Sonamarg'],
    region: 'North',
    category: 'Honeymoon Packages',
    pricePerPerson: 29500,
    originalPrice: 35000,
    image: '/assets/images/dest_himachal_mountains_1791892125589.jpg',
    overview: 'Experience paradise on earth. Glide along serene Dal Lake in a wooden shikara, sleep in a hand-carved cedar luxury houseboat, ascend to the highest ski slopes on the Gulmarg Gondola, and wander pine valleys in Pahalgam along the Lidder River.',
    rating: 4.9,
    reviewsCount: 2600,
    bestSeason: 'March to November for green valleys, December to February for snow skiing',
    hotelDetails: '1 Night in luxury Dal Lake houseboat, 2 nights in Srinagar boutique hotel, 2 nights in Pahalgam pine valley resort.',
    transportDetails: 'Private AC Innova Crysta / sedan with specialized Kashmir valley driver.',
    mealsDetails: 'Daily breakfast & authentic Kashmiri dinner including traditional Wazwan course.',
    importantNotes: [
      'Gondola Phase 1 & 2 tickets in Gulmarg must be pre-booked.',
      'Prepaid mobile SIM cards outside J&K do not work (postpaid only).'
    ],
    inclusions: [
      '5 Nights premium accommodation (including 1 night luxury houseboat)',
      'Daily breakfast and traditional Wazwan/North Indian dinner',
      'Private dedicated vehicle for airport transfers and inter-valley excursions',
      'Complimentary 1-hour Shikara ride on Dal Lake visiting floating vegetable market',
      'Gulmarg day tour and Pahalgam scenic Lidder river excursion'
    ],
    exclusions: [
      'Gulmarg Gondola cable car tickets (Phase 1 & Phase 2)',
      'Pony rides in Pahalgam / Gulmarg and snow gear rentals',
      'Flights into Srinagar (SXR)'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Srinagar & Dal Lake Houseboat', description: 'Pickup from Srinagar airport, check-in to hand-carved luxury cedar houseboat on Dal Lake. Relax with sunset Shikara ride around floating gardens and Char Chinar.' },
      { day: 2, title: 'Mughal Gardens & Old Srinagar Craft Bazaars', description: 'Tour historical terraced Mughal Gardens: Shalimar Bagh, Nishat Bagh, and Chashme Shahi. Afternoon visit to Jama Masjid and saffron & walnut spice bazaar.' },
      { day: 3, title: 'Excursion to Alpine Gulmarg', description: 'Scenic drive to Gulmarg (8,825 ft). Ride the world’s second-highest cable car Gondola to Kongdoori and Apharwat Peak for breathtaking Himalayan vistas. Return to Srinagar hotel.' },
      { day: 4, title: 'Srinagar to Valley of Shepherds, Pahalgam', description: 'Drive past saffron fields of Pampore to scenic Pahalgam along the roaring Lidder river. Visit apple orchards and relax in pine forest luxury resort.' },
      { day: 5, title: 'Betaab Valley & Aru Valley Exploration', description: 'Explore scenic Betaab Valley (named after the Bollywood classic) and tranquil Aru alpine village. Evening riverside bonfire and authentic Kashmiri dinner.' },
      { day: 6, title: 'Pahalgam to Srinagar Departure', description: 'Morning breakfast and highway drive back to Srinagar airport for onward flight.' }
    ],
    featured: true
  },
  {
    id: 'rajasthan-heritage-journey',
    title: 'Rajasthan Heritage Journey',
    duration: '7 Days / 6 Nights',
    destinationsCovered: ['Jaipur', 'Jodhpur', 'Pushkar', 'Udaipur'],
    region: 'North',
    category: 'Multi-City Tours',
    pricePerPerson: 32000,
    originalPrice: 38500,
    image: '/assets/images/dest_rajasthan_heritage_1791892028463.jpg',
    overview: 'The grand royal traverse across Rajasthan’s most iconic kingdoms. From the pink facades of Jaipur and sacred Brahma lake of Pushkar to the mighty blue ramparts of Mehrangarh Fort in Jodhpur and romantic island palaces on Lake Pichola in Udaipur.',
    rating: 4.9,
    reviewsCount: 3400,
    bestSeason: 'October to April',
    hotelDetails: 'Heritage havelis and 4-star palace hotels in Jaipur, Jodhpur, and Udaipur.',
    transportDetails: 'Private dedicated AC SUV (Innova Crysta) throughout the entire circuit.',
    mealsDetails: 'Daily breakfast and two signature royal Rajasthani thali dinners.',
    importantNotes: [
      'Comfortable walking shoes recommended for climbing fort cobblestone ramps.',
      'Rajasthan sunny days require sunglasses and sun protection.'
    ],
    inclusions: [
      '6 Nights accommodation in historic heritage properties and palaces',
      'Daily breakfast and royal thali dinner in Jaipur and Udaipur',
      'Dedicated AC chauffeur-driven SUV with all interstate toll and parking fees',
      'Government-licensed heritage monument historians at major forts',
      'Sunset boat ride on Lake Pichola in Udaipur with views of Jag Mandir',
      'Camel ride on the edge of Thar desert near Pushkar'
    ],
    exclusions: [
      'Fort and museum entrance fees (available as an all-in-one pass add-on)',
      'Camera and videography charges',
      'Flights into Jaipur / out of Udaipur'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Pink City Jaipur', description: 'Airport pickup, check into heritage haveli. Visit the astronomical Jantar Mantar observatory and iconic facade of Hawa Mahal. Evening welcome royal dinner.' },
      { day: 2, title: 'Amber Fort, Jal Mahal & Nahargarh', description: 'Morning jeep ride up to grand Amber Fort. Photo stop at water palace Jal Mahal. Sunset panorama of Jaipur from Nahargarh Fort.' },
      { day: 3, title: 'Jaipur to Sacred Pushkar & Blue City Jodhpur', description: 'Scenic drive to Pushkar, visit the rare Lord Brahma Temple and holy ghats. Continue westward to Jodhpur, the Blue City.' },
      { day: 4, title: 'Mehrangarh Fort & Jaswant Thada', description: 'Tour towering Mehrangarh Fort, Jaswant Thada marble cenotaph, and walk the blue-painted old alleys of Navchowkiya.' },
      { day: 5, title: 'Jodhpur to Lake City Udaipur via Ranakpur', description: 'Drive to Udaipur through the Aravali hills with a guided stop at the breathtaking 1,444 intricately carved marble pillars of Ranakpur Jain Temple.' },
      { day: 6, title: 'City Palace Udaipur & Lake Pichola Cruise', description: 'Guided tour of the grand City Palace complex, Saheliyon Ki Bari royal gardens, and a magical sunset motorboat cruise on Lake Pichola.' },
      { day: 7, title: 'Departure from Udaipur', description: 'Morning souvenir shopping in old craft bazaars and transfer to Udaipur Maharana Pratap Airport.' }
    ],
    featured: true
  },
  {
    id: 'golden-triangle-royal',
    title: 'The Royal Golden Triangle: Delhi, Agra & Jaipur',
    duration: '6 Days / 5 Nights',
    destinationsCovered: ['Delhi', 'Agra', 'Fatehpur Sikri', 'Jaipur'],
    region: 'North',
    category: 'Heritage and Culture',
    pricePerPerson: 24500,
    originalPrice: 29900,
    image: '/assets/images/dest_rajasthan_heritage_1791892028463.jpg',
    rating: 4.9,
    reviewsCount: 1840,
    bestSeason: 'October to April',
    overview: 'The essential circuit of India covering the political capital New Delhi, the Mughal splendor of Agra with the Taj Mahal, and the regal Rajput grandeur of Jaipur.',
    hotelDetails: '5 Nights in 4-star and heritage hotels with central locations.',
    transportDetails: 'Private air-conditioned chauffeur-driven vehicle throughout.',
    mealsDetails: 'Daily breakfast & authentic welcome dinner in Jaipur.',
    inclusions: [
      '5 Nights in 4-star & Heritage Hotels',
      'Daily breakfast & authentic welcome dinner in Jaipur',
      'Private air-conditioned chauffeur-driven vehicle throughout',
      'Government-approved English/Hindi speaking monument guides',
      'Sunrise Taj Mahal entry & battery shuttle',
      'Jeep ride up Amber Fort ramparts',
      'Toll taxes, interstate permits & parking'
    ],
    exclusions: [
      'Monument entrance tickets (can be bundled upon request)',
      'Camera & video fees at historical sites',
      'Personal expenses, tips and porterage',
      'Airfare/train fare to Delhi'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Delhi & Heritage Welcome', description: 'Airport pickup, check-in, orientation tour of Humayun Tomb and evening drive past India Gate & Rashtrapati Bhavan.' },
      { day: 2, title: 'Old Delhi & Drive to Agra', description: 'Morning cycle rickshaw tour in Chandni Chowk and Jama Masjid. Afternoon highway drive to Agra via Yamuna Expressway. Sunset Taj view from Mehtab Bagh.' },
      { day: 3, title: 'The Taj Mahal & Ghost City of Fatehpur Sikri', description: 'Breathtaking sunrise visit inside the Taj Mahal. Tour of massive red sandstone Agra Fort. Drive to Jaipur with guided exploration of Fatehpur Sikri and Stepwell.' },
      { day: 4, title: 'Pink City Grand Forts', description: 'Ascend to Amber Fort, visit Panna Meena Kund stepwell, photo stop at water palace Jal Mahal, afternoon City Palace and astronomical Jantar Mantar.' },
      { day: 5, title: 'Royal Crafts & Nahargarh Sunset', description: 'Artisan textile block printing and blue pottery workshop in Sanganer. Evening panoramic sunset high above the city from Nahargarh Fort, followed by traditional Rajasthani dinner.' },
      { day: 6, title: 'Return Journey to Delhi', description: 'Breakfast, morning souvenir shopping in Bapu Bazaar, smooth highway drive back to New Delhi airport for onward flights.' }
    ],
    featured: true
  },
  {
    id: 'kerala-backwaters-munnar-hills',
    title: 'Kerala Enchantment: Munnar Tea Hills & Alleppey Houseboat',
    duration: '5 Days / 4 Nights',
    destinationsCovered: ['Kochi', 'Munnar', 'Alleppey Backwaters'],
    region: 'South',
    category: 'Family Holidays',
    pricePerPerson: 22800,
    originalPrice: 27500,
    image: '/assets/images/dest_kerala_backwaters_1791892057635.jpg',
    rating: 4.9,
    reviewsCount: 2150,
    bestSeason: 'September to May',
    overview: 'Immerse in God’s Own Country with emerald rolling tea plantations in Munnar and private thatched houseboat cruises through palm-fringed backwaters of Alleppey.',
    hotelDetails: '2 Nights in Munnar tea estate resort, 1 night in Alleppey private luxury houseboat, 1 night in Fort Kochi boutique hotel.',
    transportDetails: 'Dedicated AC Sedan transport throughout with English/Malayalam speaking driver.',
    mealsDetails: 'All meals included on the houseboat (freshly cooked Kerala cuisine) and breakfast elsewhere.',
    inclusions: [
      '2 Nights in Munnar tea plantation resort',
      '1 Night in Alleppey private luxury houseboat (all meals)',
      '1 Night in Fort Kochi boutique hotel',
      'All meals on houseboat (freshly cooked Kerala cuisine)',
      'Dedicated AC Sedan transport throughout',
      'Tea garden guided plantation walk & spice farm tour',
      'Sunset Kathakali classical dance show in Kochi'
    ],
    exclusions: [
      'Ayurvedic massage sessions (optional add-on)',
      'Personal laundry & room service',
      'Flights into Kochi (COK)'
    ],
    itinerary: [
      { day: 1, title: 'Kochi to Misty Munnar', description: 'Pickup from Kochi airport, drive through scenic Western Ghats passing Cheeyappara & Valara waterfalls, check-in to Munnar resort amidst rolling tea estates.' },
      { day: 2, title: 'Munnar Tea Trails & Eravikulam', description: 'Visit Eravikulam National Park (home of Nilgiri Tahr), Tata Tea Museum, Mattupetty Dam, and Echo Point.' },
      { day: 3, title: 'Spice Hills to Backwaters Houseboat', description: 'Scenic descent through spice plantations down to Alleppey. Check-in to private traditional Kettuvallam houseboat at 12 PM. Cruise through palm-lined canals with fresh Karimeen fish lunch.' },
      { day: 4, title: 'Coastal Fort Kochi & Colonial Heritage', description: 'Morning village canal ride, disembark at 9:30 AM. Drive to Fort Kochi. Walk past Chinese Fishing Nets, St. Francis Church, Jew Town, evening Kathakali cultural show.' },
      { day: 5, title: 'Departure', description: 'Morning breakfast and transfer to Kochi Airport.' }
    ],
    featured: true
  }
];
