export interface PlutoQAPair {
  keywords: string[];
  question: string;
  answer: string;
  actionText?: string;
  actionTab?: string;
  relatedSuggestions?: string[];
}

export const PLUTO_SUGGESTED_PROMPTS = [
  "Recommend hill stations for summer in India",
  "How does the Flyvora Trip Planner work?",
  "What is the difference between Tour Packages and Trip Planner?",
  "How to book a taxi from Delhi to Agra?",
  "Suggest a 4-day budget trip in Rajasthan",
  "What are the best spiritual destinations in India?"
];

export const PLUTO_KNOWLEDGE_BASE: PlutoQAPair[] = [
  {
    keywords: ['hill', 'summer', 'mountain', 'snow', 'manali', 'himachal', 'kashmir', 'shimla'],
    question: "Which are the best hill stations for summer?",
    answer: "For summer escapes (April to June), top destinations include:\n1. **Manali & Solang Valley (Himachal)**: Crisp alpine air, Beas river, and snow views through Atal Tunnel.\n2. **Srinagar & Gulmarg (Kashmir)**: Mughal gardens and Asia's highest Gondola ride.\n3. **Coorg & Munnar (South India)**: Rolling emerald tea plantations and misty mornings.\n\nYou can explore detailed guides, hotel stays, and weather seasons on our Destinations page.",
    actionText: "Explore Mountain Destinations",
    actionTab: "destinations",
    relatedSuggestions: ["Best time to visit Manali", "How do budget estimates work?", "Suggest a 4-day budget trip"]
  },
  {
    keywords: ['difference', 'planner', 'tour', 'packages', 'versus', 'custom'],
    question: "What is the difference between Tour Packages and Trip Planner?",
    answer: "• **Tour Packages**: Handcrafted, all-inclusive journeys with fixed itineraries, verified 4-star stays, dedicated chauffeur vehicle, and daily activities.\n• **Trip Planner**: An interactive custom tool where YOU choose the destinations, days, and travel style, build a day-by-day plan, and calculate your budget breakdown in real-time.",
    actionText: "Open Custom Trip Planner",
    actionTab: "planner",
    relatedSuggestions: ["How does budget tracking work?", "View Tour Packages", "Recommend destinations"]
  },
  {
    keywords: ['taxi', 'cab', 'delhi to agra', 'outstation', 'transport', 'car', 'fare'],
    question: "How do I check taxi fares from Delhi to Agra or outstation?",
    answer: "On our **Taxi & Transport** section, you can select Airport Transfers, Outstation Cabs, or City Sightseeing. For Delhi to Agra (approx. 235 km via Yamuna Expressway), an AC Sedan starts from ~₹4,190 including fuel and estimated tolls. Please note that Flyvora provides transparent frontend demo estimates before booking.",
    actionText: "Calculate Taxi Fare",
    actionTab: "transport",
    relatedSuggestions: ["What is the difference between Sedan and SUV?", "What is included in Tour Packages?"]
  },
  {
    keywords: ['rajasthan', 'jaipur', 'udaipur', 'budget', '4-day', 'heritage'],
    question: "Can you suggest a 4-day trip in Rajasthan?",
    answer: "Here is a classic 4-Day Royal Rajasthan route:\n• **Day 1 (Jaipur)**: City Palace, Jantar Mantar, sunset at Nahargarh.\n• **Day 2 (Jaipur)**: Amber Fort, Panna Meena Kund stepwell, Bapu Bazaar textiles.\n• **Day 3 (Drive to Udaipur via Pushkar)**: Holy lake in Pushkar, evening lakeside walk in Udaipur.\n• **Day 4 (Udaipur)**: City Palace Museum, Lake Pichola boat cruise, and Bagore Ki Haveli folk dance.\n\nEstimated budget: ₹12,000 to ₹18,000 per person.",
    actionText: "View Rajasthan Destination Guide",
    actionTab: "destinations",
    relatedSuggestions: ["Recommend hill stations for summer in India", "How does budget tracking work?"]
  },
  {
    keywords: ['spiritual', 'varanasi', 'kashi', 'ayodhya', 'haridwar', 'rishikesh', 'temple'],
    question: "What are the top spiritual destinations in India?",
    answer: "The spiritual heart of India includes:\n1. **Varanasi (Kashi)**: Timeless Ganga Aarti and Kashi Vishwanath temple corridor.\n2. **Ayodhya**: Sacred Saryu River and the new Shri Ram Janmabhoomi Mandir.\n3. **Rishikesh & Haridwar**: Himalayan ashrams, yoga retreats, and holy Ganga Sangam.\n4. **Amritsar**: The Golden Temple with its 24/7 peaceful community Langar.\n\nWe also feature a specialized 5-Day Divine Yatra tour package covering Kashi, Ayodhya, and Prayagraj.",
    actionText: "View Divine Yatra Tour",
    actionTab: "tours",
    relatedSuggestions: ["How do I book a tour demo?", "Explore Varanasi Guide"]
  },
  {
    keywords: ['budget', 'tracker', 'calculator', 'cost', 'expense', 'how much'],
    question: "How does the Budget Tracker work?",
    answer: "The Flyvora Budget Tracker lets you set a target budget and breaks expenses into 5 transparent categories: Accommodation, Transport, Food, Activities, and Shopping/Misc. As you adjust your days or categories, real-time calculations show your total spent, remaining funds, and daily burn rate.",
    actionText: "Open Budget Tracker",
    actionTab: "budget",
    relatedSuggestions: ["How does the Trip Planner work?", "Recommend hill stations"]
  }
];

export function findPlutoAnswer(userInput: string): PlutoQAPair {
  const query = userInput.toLowerCase();
  
  for (const item of PLUTO_KNOWLEDGE_BASE) {
    const match = item.keywords.some(kw => query.includes(kw));
    if (match) {
      return item;
    }
  }

  // Fallback answer
  return {
    keywords: [],
    question: userInput,
    answer: `Thank you for your question about "${userInput}". Flyvora offers India-wide curated coverage for over 30 states and territories, handpicked heritage hotels, customizable tour packages, and a live budget tracker. Would you like me to guide you to our destination guides or the trip planner?`,
    actionText: "Browse Destinations",
    actionTab: "destinations",
    relatedSuggestions: [
      "Recommend hill stations for summer in India",
      "What is the difference between Tour Packages and Trip Planner?",
      "How does the Budget Tracker work?"
    ]
  };
}
