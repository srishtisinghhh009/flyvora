import { Hotel } from '../types';

export const HOTELS: Hotel[] = [
  {
    id: 'oberoi-amarvilas-agra',
    name: 'The Oberoi Amarvilas',
    city: 'Agra',
    state: 'Uttar Pradesh',
    region: 'North',
    type: 'Luxury Heritage Resort',
    rating: 4.9,
    reviewsCount: 1780,
    pricePerNight: 36000,
    image: '/assets/images/dest_rajasthan_heritage_1791892028463.jpg',
    locationDescription: 'Taj East Gate Road, Agra — Located just 600 meters from the Taj Mahal with unobstructed monument views from every room and private golf buggy transfers.',
    amenities: ['Private Taj Mahal Balcony Views', 'Oberoi Spa & Ayurvedic Therapies', 'Tiered Pool with Moorish Arches', 'Fine Dining Esphahan Restaurant', 'Butler Service', 'Complimentary Golf Cart to Taj Gate'],
    roomTypes: [
      { name: 'Premier Room with Taj View', price: 36000, description: 'Direct uninterrupted vista of the Taj Mahal, teak wood floors, marble bath, 450 sq.ft.' },
      { name: 'Deluxe Suite with Private Balcony', price: 58000, description: 'Open-air private terrace overlooking monument gardens, butler pantry, living salon.' },
      { name: 'Kohinoor Presidential Suite', price: 125000, description: 'Grand octagonal dining salon, private sundeck, master suite with gold-leaf ceiling.' }
    ],
    nearbyAttractions: ['Taj Mahal (600m)', 'Agra Fort (3.5 km)', 'Mehtab Bagh (7 km)'],
    checkInOutInfo: 'Check-in: 2:00 PM · Check-out: 12:00 PM noon · Early baggage drop available'
  },
  {
    id: 'lebua-lucknow-heritage',
    name: 'Lebua Lucknow (Saraca Estate)',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    region: 'North',
    type: 'Heritage Boutique Haveli',
    rating: 4.8,
    reviewsCount: 920,
    pricePerNight: 11500,
    image: '/assets/images/dest_rajasthan_heritage_1791892028463.jpg',
    locationDescription: 'Mall Avenue, Lucknow — 1936 Art Deco bungalow transformed into an Awadhi boutique oasis with courtyards, traditional verandahs, and lush lawns.',
    amenities: ['1936 Heritage Architecture', 'Azrak Awadhi Fine Dining', 'Outdoor Swimming Pool', 'Curated Old City Culinary Walks', 'High Tea in Courtyard', 'Library Lounge'],
    roomTypes: [
      { name: 'Deluxe Courtyard Room', price: 11500, description: 'High ceilings, period furniture, view of the inner courtyard and frangipani trees, 350 sq.ft.' },
      { name: 'Heritage Verandah Suite', price: 17000, description: 'Spacious colonial suite with access to expansive open verandah and dressing chamber.' }
    ],
    nearbyAttractions: ['Hazratganj (1.5 km)', 'Bara Imambara (5 km)', 'British Residency (3.8 km)'],
    checkInOutInfo: 'Check-in: 2:00 PM · Check-out: 11:30 AM'
  },
  {
    id: 'imperial-new-delhi',
    name: 'The Imperial New Delhi',
    city: 'Delhi and New Delhi',
    state: 'Delhi',
    region: 'North',
    type: 'Colonial Heritage Hotel',
    rating: 4.9,
    reviewsCount: 2450,
    pricePerNight: 24000,
    image: '/assets/images/hero_cinematic_india_1791892010717.jpg',
    locationDescription: 'Janpath, Connaught Place, New Delhi — Iconic 1930s Lutyens landmark nestled amidst royal palm gardens, housing over 5,000 museum-quality British-Indian colonial artworks.',
    amenities: ['Imperial Spa & Wellness', 'Historic 1911 Verandah Dining', 'Outdoor Pool surrounded by Palms', 'Art Gallery Concierge Tour', 'Spice Route Southeast Asian Pavilion', 'Heritage Patisserie'],
    roomTypes: [
      { name: 'Imperial Heritage Room', price: 24000, description: 'Polished Burma teak furniture, French linen, Italian marble bathroom with soaking tub, 420 sq.ft.' },
      { name: 'Deco Suite', price: 38000, description: 'Art Deco interiors, curated antique prints, personalized butler service, 750 sq.ft.' }
    ],
    nearbyAttractions: ['Connaught Place (800m)', 'India Gate (2 km)', 'National Museum (1.5 km)'],
    checkInOutInfo: 'Check-in: 2:00 PM · Check-out: 12:00 PM noon'
  },
  {
    id: 'aloha-on-the-ganges-rishikesh',
    name: 'Aloha On The Ganges',
    city: 'Rishikesh',
    state: 'Uttarakhand',
    region: 'North',
    type: 'Riverside Retreat',
    rating: 4.8,
    reviewsCount: 1680,
    pricePerNight: 13500,
    image: '/assets/images/dest_varanasi_ghats_1791892084869.jpg',
    locationDescription: 'Tapovan, Rishikesh — Perched directly on the banks of the sacred Ganges river, 500 meters from Lakshman Jhula with unobstructed emerald river views.',
    amenities: ['Infinity Pool Overlooking the Ganges', 'Ayurvedic Wellness Spa', 'Daily Sunrise Yoga & Meditation', 'Riverside Patio Dining', 'Guided Nature Trails', 'Private Ghat Aarti Access'],
    roomTypes: [
      { name: 'Superior Ganges View Room', price: 13500, description: 'Private balcony facing the roaring turquoise Ganges, king bed, modern mountain decor, 400 sq.ft.' },
      { name: 'Two-Bedroom Family Apartment', price: 24000, description: 'Spacious living room, kitchenette, two en-suite bedrooms, ideal for families.' }
    ],
    nearbyAttractions: ['Lakshman Jhula (500m)', 'Ram Jhula (1.8 km)', 'Triveni Ghat (4.5 km)'],
    checkInOutInfo: 'Check-in: 2:00 PM · Check-out: 11:00 AM'
  },
  {
    id: 'haveli-hari-ganga-haridwar',
    name: 'Haveli Hari Ganga',
    city: 'Haridwar',
    state: 'Uttarakhand',
    region: 'North',
    type: 'Heritage Haveli',
    rating: 4.7,
    reviewsCount: 1340,
    pricePerNight: 9800,
    image: '/assets/images/dest_varanasi_ghats_1791892084869.jpg',
    locationDescription: 'Bazaar Ramghat, Haridwar — A 100-year-old royal Haveli on the holy Ganges banks in old Haridwar with its own private bathing ghat and step access.',
    amenities: ['Private Bathing Ghat for Holy Dip', 'Rooftop Riverfront Restaurant', 'Pure Satvik Dining', 'Daily In-House Evening Bhajan & Aarti', 'Holistic Ayurveda Treatments', 'Baggage Porter Assistance'],
    roomTypes: [
      { name: 'Heritage Ganges Facing Room', price: 9800, description: 'Handcrafted antique beds, stone carved windows overlooking the flowing Ganga, 320 sq.ft.' },
      { name: 'Royal Ganga Suite', price: 15500, description: 'Expansive private balcony with direct view of Har Ki Pauri temple spires.' }
    ],
    nearbyAttractions: ['Har Ki Pauri (350m)', 'Mansa Devi Temple (1.5 km)', 'Moti Bazaar (200m)'],
    checkInOutInfo: 'Check-in: 1:00 PM · Check-out: 11:00 AM · E-rickshaw transfer through old bazaar included'
  },
  {
    id: 'naini-retreat-nainital',
    name: 'The Naini Retreat by Leisure Hotels',
    city: 'Nainital',
    state: 'Uttarakhand',
    region: 'North',
    type: 'Himalayan Retreat',
    rating: 4.8,
    reviewsCount: 1520,
    pricePerNight: 15000,
    image: '/assets/images/dest_himachal_mountains_1791892125589.jpg',
    locationDescription: 'Ayarpatta Slopes, Nainital — Historic summer residence of the Maharaja of Pilibhit, nestled at 6,500 feet among oak and pine slopes overlooking Naini Lake.',
    amenities: ['Panoramic Naini Lake Views', 'Gurney House Colonial Restaurant', 'Evening Live Music & Bonfire', 'Nature Trails with Naturalist', 'Boutique Spa & Steam', 'Complimentary Mall Road Shuttle'],
    roomTypes: [
      { name: 'Palace Heritage Room', price: 15000, description: 'Wood-panelled colonial ambiance, bay windows with mountain views, 380 sq.ft.' },
      { name: 'Lake Front Heritage Suite', price: 22000, description: 'Unobstructed panorama of crescent Naini lake, fireplace, royal memorabilia.' }
    ],
    nearbyAttractions: ['Naini Lake (1.2 km)', 'Snow View Point (2.5 km)', 'Kainchi Dham Ashram (18 km)'],
    checkInOutInfo: 'Check-in: 2:00 PM · Check-out: 11:00 AM'
  },
  {
    id: 'welcomhotel-savoy-mussoorie',
    name: 'Welcomhotel by ITC Hotels, The Savoy',
    city: 'Dehradun and Mussoorie',
    state: 'Uttarakhand',
    region: 'North',
    type: 'Historic Heritage Resort',
    rating: 4.9,
    reviewsCount: 1980,
    pricePerNight: 23500,
    image: '/assets/images/dest_himachal_mountains_1791892125589.jpg',
    locationDescription: 'Library End, Mussoorie — Celebrated 1902 Edwardian historic hill resort perched high above Mussoorie with views across the snow-capped Garhwal Himalayan peaks and Doon Valley.',
    amenities: ['1902 Edwardian Grandeur', 'The Grand Ballroom & Savoy Bar', 'Kaya Kalp Royal Spa', 'Heated Indoor Recreation Arena', 'High Tea on The Savoy Lawns', 'Library & Boardroom'],
    roomTypes: [
      { name: 'Savoy Superior Mountain View', price: 23500, description: 'Hardwood floors, antique furniture, high ceilings, views of mist-clad cedar valleys, 400 sq.ft.' },
      { name: 'Savoy Suite with Private Verandah', price: 39000, description: 'Private glassed balcony with fireplace, panoramic vistas of the Himalayan crest.' }
    ],
    nearbyAttractions: ['Mussoorie Mall Road (400m)', 'Gun Hill (1.2 km)', 'Kempty Falls (14 km)'],
    checkInOutInfo: 'Check-in: 2:00 PM · Check-out: 12:00 PM noon'
  },
  {
    id: 'brijrama-palace-varanasi',
    name: 'BrijRama Palace, Varanasi',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    region: 'North',
    type: 'Heritage Palace',
    rating: 4.9,
    reviewsCount: 2250,
    pricePerNight: 28000,
    image: '/assets/images/dest_varanasi_ghats_1791892084869.jpg',
    locationDescription: 'Darbhanga Ghat, Varanasi — Built in 1812 by the royal house of Nagpur, one of the oldest and most regal palaces directly on the sacred ghats with private bajra boat arrival.',
    amenities: ['Direct Darbhanga Ghat Riverfront', 'Arrive by Royal Wooden Bajra Boat', 'Live Classical Morning Flute & Sitar', 'Chota Moti Mahal Pure Veg Dining', 'Private Ganga Aarti Viewing Terrace', 'Historic Hand-Operated Elevator'],
    roomTypes: [
      { name: 'Nadidhara River View Room', price: 28000, description: 'Direct view of the sacred Ganges and morning sunrise, Banarasi silk wall upholstery, 380 sq.ft.' },
      { name: 'Varuna Grand Heritage Suite', price: 49000, description: 'Original 19th-century arches, royal seating alcove, complimentary private evening boat ride.' }
    ],
    nearbyAttractions: ['Dashashwamedh Ghat (350m)', 'Kashi Vishwanath Corridor (600m)', 'Manikarnika Ghat (900m)'],
    checkInOutInfo: 'Check-in: 2:00 PM · Check-out: 12:00 PM noon · Arrive via luxury boat from Bhainsasur Ghat'
  },
  {
    id: 'rambagh-palace-jaipur',
    name: 'The Rambagh Palace',
    city: 'Jaipur and Udaipur',
    state: 'Rajasthan',
    region: 'North',
    type: 'Heritage Palace',
    rating: 4.9,
    reviewsCount: 1420,
    pricePerNight: 32000,
    image: '/assets/images/dest_rajasthan_heritage_1791892028463.jpg',
    locationDescription: 'Bhawani Singh Road, Jaipur — The former residence of the Maharaja of Jaipur, set in 47 acres of tranquil royal gardens populated by peacocks.',
    amenities: ['Royal Butler Service', 'Jiva Grande Spa', 'Peacock Gardens & Courtyards', 'Indoor & Outdoor Heated Pools', 'Heritage Polo Bar', 'Complimentary High Tea with Bagpipers'],
    roomTypes: [
      { name: 'Palace Room', price: 32000, description: 'Traditional Rajput architecture, four-poster bed, marble bathroom, garden view, 550 sq.ft.' },
      { name: 'Historical Suite', price: 52000, description: 'Arched doorways, antique furniture, private terrace, royal chamber amenities.' },
      { name: 'Grand Presidential Suite', price: 110000, description: 'Once home to the Maharaja, opulent dining salon, private courtyard, 1,800 sq.ft.' }
    ],
    nearbyAttractions: ['City Palace Jaipur (4 km)', 'Hawa Mahal (4.5 km)', 'Amber Fort (12 km)'],
    checkInOutInfo: 'Check-in: 2:00 PM · Check-out: 12:00 PM noon'
  },
  {
    id: 'khyber-resort-gulmarg',
    name: 'The Khyber Himalayan Resort & Spa',
    city: 'Srinagar and Gulmarg',
    state: 'Jammu and Kashmir',
    region: 'North',
    type: 'Alpine Luxury Resort',
    rating: 4.9,
    reviewsCount: 1910,
    pricePerNight: 29000,
    image: '/assets/images/dest_himachal_mountains_1791892125589.jpg',
    locationDescription: 'Gulmarg, Pir Panjal Range — Set at 8,825 feet amidst pristine cedar forests, just a few minutes walk from the world-famous Gulmarg Gondola ski lift.',
    amenities: ['Ski-in Ski-out Gondola Access', 'Heated Indoor Infinity Pool', 'L’Occitane Himalayan Spa', 'Chaikash Tea Lounge with Samovar', 'Noukh Sheesha Lounge', 'Underfloor Heated Rooms'],
    roomTypes: [
      { name: 'Premier Pine View Room', price: 29000, description: 'Underfloor heating, private balcony overlooking snowy pine slopes and Affarwat peaks, 450 sq.ft.' },
      { name: 'Himalayan Luxury Cottage', price: 55000, description: 'Stand-alone cedar cottage with fireplace, private butler, and panoramic snow vistas.' }
    ],
    nearbyAttractions: ['Gulmarg Gondola (400m)', 'Apharwat Peak (cable car)', 'Gulmarg Golf Course (1.5 km)'],
    checkInOutInfo: 'Check-in: 2:00 PM · Check-out: 11:30 AM · Snow chain vehicle transfers available'
  },
  {
    id: 'kumarakom-lake-resort',
    name: 'Kumarakom Lake Resort & Villas',
    city: 'Kerala & Backwaters',
    state: 'Kerala',
    region: 'South',
    type: 'Luxury Backwater Resort',
    rating: 4.9,
    reviewsCount: 1890,
    pricePerNight: 19500,
    image: '/assets/images/dest_kerala_backwaters_1791892057635.jpg',
    locationDescription: 'Vembanad Lakefront, Kumarakom — Set directly on the serene backwaters with a 250-metre meandering lagoon pool and centuries-old ancestral wooden homes.',
    amenities: ['Meandering Pool Access from Verandah', 'Ayurmana Ayurvedic Spa', 'Sunset Houseboat Cruise with Tea', 'Lakeside Seafood Bar', 'Infinity Pool on Vembanad Lake', 'Pottery & Weaving Demonstrations'],
    roomTypes: [
      { name: 'Heritage Villa with Private Pool', price: 19500, description: 'Reconstructed 16th-century ancestral Kerala home with courtyard plunge pool.' },
      { name: 'Meandering Pool Villa', price: 24000, description: 'Direct steps from bedroom veranda into a 250-metre lagoon swimming pool.' }
    ],
    nearbyAttractions: ['Kumarakom Bird Sanctuary (3 km)', 'Alleppey Canals (22 km)', 'Vembanad Lake (on-site)'],
    checkInOutInfo: 'Check-in: 2:00 PM · Check-out: 11:00 AM'
  },
  {
    id: 'w-goa-vagator',
    name: 'W Goa Beachfront Retreat',
    city: 'Goa Beaches',
    state: 'Goa',
    region: 'West',
    type: 'Beachfront Coastal Resort',
    rating: 4.7,
    reviewsCount: 1640,
    pricePerNight: 18500,
    image: '/assets/images/dest_kerala_backwaters_1791892057635.jpg',
    locationDescription: 'Vagator Beach, North Goa — Set beneath the dramatic red cliffs of Chapora Fort directly on the Arabian Sea with direct beach access.',
    amenities: ['Direct Vagator Beach Access', 'Rock Pool Sunset Deck', 'AWAY Spa Treatments', 'FIT Gym & Yoga Lawn', 'Spice Traders Pan-Asian Restaurant', 'Pet Friendly'],
    roomTypes: [
      { name: 'Wonderful Garden Oasis', price: 18500, description: 'Chic modern room with private balcony overlooking tropical coconut palms.' },
      { name: 'WOW Private Plunge Pool Villa', price: 48000, description: 'Stand-alone villa with private walled pool, sundeck, and round-the-clock butler.' }
    ],
    nearbyAttractions: ['Vagator Beach (direct access)', 'Chapora Fort (1 km)', 'Anjuna Flea Market (4 km)'],
    checkInOutInfo: 'Check-in: 3:00 PM · Check-out: 12:00 PM noon'
  }
];
