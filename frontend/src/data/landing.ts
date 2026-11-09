// src/data/landing.ts
// Centralized mock data isolated for easy replacement with Laravel RESTful API endpoints

export interface ProvinceOption {
  id: number;
  name: string;
  nameKh: string;
  count: number;
}

export interface PopularDestination {
  id: number;
  name: string;
  nameKh: string;
  tagline: string;
  taglineKh: string;
  count: number;
  image: string;
  popularSpots: string[];
}

export type MotorcycleCategory = 'scooter' | 'semi-auto' | 'manual' | 'dirt_bike';

export interface LandingMotorcycle {
  id: number;
  name: string;
  category: MotorcycleCategory;
  categoryLabel: string;
  categoryLabelKh: string;
  pricePerDay: number;
  rating: number;
  reviewCount: number;
  pickupLocation: string;
  pickupLocationKh: string;
  province: string;
  image: string;
  transmission: string;
  engine: string;
  helmetsIncluded: number;
  isPopular?: boolean;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  titleKh: string;
  description: string;
  descriptionKh: string;
  iconName: 'Search' | 'CalendarCheck' | 'Send' | 'KeyRound';
}

export interface FeatureItem {
  id: number;
  title: string;
  titleKh: string;
  description: string;
  descriptionKh: string;
  iconName: 'ShieldCheck' | 'DollarSign' | 'MapPin' | 'CalendarClock' | 'CreditCard' | 'Bot';
}

export interface TestimonialItem {
  id: number;
  name: string;
  country: string;
  countryFlag: string;
  avatar: string;
  rating: number;
  date: string;
  motorcycle: string;
  review: string;
  reviewKh: string;
}

export interface FAQItem {
  id: number;
  question: string;
  questionKh: string;
  answer: string;
  answerKh: string;
  category: 'documents' | 'deposit' | 'insurance' | 'cancellation' | 'fuel' | 'helmets' | 'pickup';
}

export const CAMBODIA_PROVINCES_LIST: ProvinceOption[] = [
  { id: 1, name: "Phnom Penh", nameKh: "រាជធានីភ្នំពេញ", count: 142 },
  { id: 2, name: "Siem Reap", nameKh: "ខេត្តសៀមរាប", count: 185 },
  { id: 3, name: "Sihanoukville", nameKh: "ខេត្តព្រះសីហនុ", count: 64 },
  { id: 4, name: "Kampot", nameKh: "ខេត្តកំពត", count: 78 },
  { id: 5, name: "Battambang", nameKh: "ខេត្តបាត់ដំបង", count: 32 },
  { id: 6, name: "Kep", nameKh: "ខេត្តកែប", count: 21 },
  { id: 7, name: "Koh Kong", nameKh: "ខេត្តកោះកុង", count: 19 },
  { id: 8, name: "Mondulkiri", nameKh: "ខេត្តមណ្ឌលគិរី", count: 18 },
  { id: 9, name: "Ratanakiri", nameKh: "ខេត្តរតនគិរី", count: 14 },
  { id: 10, name: "Kandal", nameKh: "ខេត្តកណ្តាល", count: 25 },
  { id: 11, name: "Kampong Cham", nameKh: "ខេត្តកំពង់ចាម", count: 16 },
  { id: 12, name: "Kampong Chhnang", nameKh: "ខេត្តកំពង់ឆ្នាំង", count: 9 },
  { id: 13, name: "Kampong Speu", nameKh: "ខេត្តកំពង់ស្ពឺ", count: 12 },
  { id: 14, name: "Kampong Thom", nameKh: "ខេត្តកំពង់ធំ", count: 11 },
  { id: 15, name: "Kratie", nameKh: "ខេត្តក្រចេះ", count: 10 },
  { id: 16, name: "Preah Vihear", nameKh: "ខេត្តព្រះវិហារ", count: 8 },
  { id: 17, name: "Prey Veng", nameKh: "ខេត្តព្រៃវែង", count: 7 },
  { id: 18, name: "Pursat", nameKh: "ខេត្តពោធិ៍សាត់", count: 12 },
  { id: 19, name: "Stung Treng", nameKh: "ខេត្តស្ទឹងត្រែង", count: 6 },
  { id: 20, name: "Svay Rieng", nameKh: "ខេត្តស្វាយរៀង", count: 5 },
  { id: 21, name: "Takeo", nameKh: "ខេត្តតាកែវ", count: 14 },
  { id: 22, name: "Oddar Meanchey", nameKh: "ខេត្តឧត្តរមានជ័យ", count: 6 },
  { id: 23, name: "Pailin", nameKh: "ខេត្តប៉ៃលិន", count: 8 },
  { id: 24, name: "Banteay Meanchey", nameKh: "ខេត្តបន្ទាយមានជ័យ", count: 15 },
  { id: 25, name: "Tboung Khmum", nameKh: "ខេត្តត្បូងឃ្មុំ", count: 7 },
];

export const TRUST_METRICS = [
  { value: "500+", label: "Verified Motorcycles", labelKh: "ម៉ូតូផ្ទៀងផ្ទាត់រួច" },
  { value: "25", label: "Provinces Covered", labelKh: "រាជធានី-ខេត្តទូទាំងប្រទេស" },
  { value: "4.8/5", label: "Average Rider Rating", labelKh: "ពិន្ទុវាយតម្លៃមធ្យម" },
  { value: "100%", label: "Free Helmets Included", labelKh: "មួកសុវត្ថិភាពឥតគិតថ្លៃ" },
];

export const NAV_LINKS = [
  { label: "Home", labelKh: "ទំព័រដើម", href: "/" },
  { label: "Browse Motorcycles", labelKh: "ស្វែងរកម៉ូតូ", href: "/motorcycles" },
  { label: "How It Works", labelKh: "របៀបជួល", href: "#how-it-works" },
  { label: "About Us", labelKh: "អំពីយើង", href: "/about" },
  { label: "Contact Us", labelKh: "ទំនាក់ទំនង", href: "/contact" },
];

// Popular Provinces / Destinations
export const POPULAR_DESTINATIONS: PopularDestination[] = [
  {
    id: 1,
    name: "Phnom Penh",
    nameKh: "រាជធានីភ្នំពេញ",
    tagline: "Vibrant capital, riverside cafes & royal landmarks",
    taglineKh: "រាជធានីដ៏អ៊ូអរ មាត់ទន្លេ និងកន្លែងប្រវត្តិសាស្ត្រ",
    count: 142,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    popularSpots: ["Riverside (Sisowath)", "BKK1", "Toul Tom Poung", "Bassac Lane"]
  },
  {
    id: 2,
    name: "Siem Reap",
    nameKh: "ខេត្តសៀមរាប",
    tagline: "Gateway to Angkor Wat sunrise and ancient temple loops",
    taglineKh: "ច្រកទ្វារទៅកាន់ប្រាសាទអង្គរវត្ត និងទេសភាពប្រវត្តិសាស្ត្រ",
    count: 185,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    popularSpots: ["Angkor Grand Circuit", "Pub Street", "Kulen Mountain", "Tonle Sap"]
  },
  {
    id: 3,
    name: "Sihanoukville",
    nameKh: "ខេត្តព្រះសីហនុ",
    tagline: "Coastal cruising, tropical islands & seaside roads",
    taglineKh: "ឆ្នេរសមុទ្រ ផ្លូវមាត់កោះ និងកំពង់ផែកោះរ៉ុង",
    count: 64,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    popularSpots: ["Otres Beach", "Koh Rong Ferry Pier", "Independence Beach", "Ream Park"]
  },
  {
    id: 4,
    name: "Kampot",
    nameKh: "ខេត្តកំពត",
    tagline: "Bokor mountain cloud ride, pepper plantations & quiet river",
    taglineKh: "ជិះម៉ូតូឡើងភ្នំបូកគោ មើលចម្ការម្រេច និងដងព្រែកស្ងប់ស្ងាត់",
    count: 78,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    popularSpots: ["Bokor Hill Station", "Green Cathedral River Loop", "Pepper Farms", "Old Market Bridge"]
  },
  {
    id: 5,
    name: "Kep",
    nameKh: "ខេត្តកែប",
    tagline: "Crab market cruises, coastal national park & sunset bends",
    taglineKh: "ផ្សារក្តាមឆ្ងាញ់ ឧទ្យានជាតិកែប និងផ្លូវកោងមើលថ្ងៃលិច",
    count: 21,
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
    popularSpots: ["Kep Crab Market", "Kep National Park Loop", "Angkaul Beach", "Sailing Club"]
  },
  {
    id: 6,
    name: "Mondulkiri",
    nameKh: "ខេត្តមណ្ឌលគិរី",
    tagline: "Pine hills, cool highland breezes & elephant jungle trails",
    taglineKh: "ភ្នំស្រល់ ខ្យល់ត្រជាក់បែបខ្ពង់រាប និងទឹកធ្លាក់ប៊ូស្រា",
    count: 18,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    popularSpots: ["Bousra Waterfall", "Sea Forest Lookout", "Doh Kramom Hill", "Sen Monorom"]
  },
  {
    id: 7,
    name: "Battambang",
    nameKh: "ខេត្តបាត់ដំបង",
    tagline: "Colonial alleys, bamboo train & millions of bats at dusk",
    taglineKh: "ផ្ទះសម័យអាណានិគម រថភ្លើងឫស្សី និងល្អាងសត្វប្រចៀវភ្នំសំពៅ",
    count: 32,
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    popularSpots: ["Phnom Sampeau Bat Cave", "Bamboo Train", "Ek Phnom", "Sangkae River Walk"]
  }
];

// Featured Motorcycles (6-8 items covering all categories)
export const FEATURED_MOTORCYCLES: LandingMotorcycle[] = [
  {
    id: 1,
    name: "Honda Scoopy 110cc",
    category: "scooter",
    categoryLabel: "Automatic Scooter",
    categoryLabelKh: "ម៉ូតូអូតូ",
    pricePerDay: 8,
    rating: 4.9,
    reviewCount: 68,
    pickupLocation: "Wat Bo, Siem Reap",
    pickupLocationKh: "វត្តបូព៌, ក្រុងសៀមរាប",
    province: "Siem Reap",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    transmission: "Automatic",
    engine: "110cc eSP Fuel Injection",
    helmetsIncluded: 2,
    isPopular: true
  },
  {
    id: 2,
    name: "Honda Click 125cc",
    category: "scooter",
    categoryLabel: "Automatic Scooter",
    categoryLabelKh: "ម៉ូតូអូតូ",
    pricePerDay: 10,
    rating: 4.8,
    reviewCount: 92,
    pickupLocation: "BKK1, Phnom Penh",
    pickupLocationKh: "បឹងកេងកង១, ភ្នំពេញ",
    province: "Phnom Penh",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
    transmission: "Automatic",
    engine: "125cc Liquid-Cooled",
    helmetsIncluded: 2,
    isPopular: true
  },
  {
    id: 3,
    name: "Honda ADV 160",
    category: "scooter",
    categoryLabel: "Adventure Scooter",
    categoryLabelKh: "ម៉ូតូផ្សងព្រេងអូតូ",
    pricePerDay: 18,
    rating: 5.0,
    reviewCount: 45,
    pickupLocation: "Old Market, Kampot",
    pickupLocationKh: "ផ្សារចាស់, ក្រុងកំពត",
    province: "Kampot",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    transmission: "Automatic with ABS",
    engine: "160cc eSP+ 4-Valve",
    helmetsIncluded: 2,
    isPopular: true
  },
  {
    id: 4,
    name: "Honda CRF 250 Rally",
    category: "dirt_bike",
    categoryLabel: "Dual-Sport / Dirt Bike",
    categoryLabelKh: "ម៉ូតូកែច្នៃផ្លូវលំបាក",
    pricePerDay: 32,
    rating: 4.95,
    reviewCount: 38,
    pickupLocation: "Riverside, Phnom Penh",
    pickupLocationKh: "មាត់ទន្លេ, ភ្នំពេញ",
    province: "Phnom Penh",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
    transmission: "6-Speed Manual",
    engine: "250cc DOHC Liquid-Cooled",
    helmetsIncluded: 2,
    isPopular: true
  },
  {
    id: 5,
    name: "Honda Wave 110i",
    category: "semi-auto",
    categoryLabel: "Semi-Automatic",
    categoryLabelKh: "ម៉ូតូលេខជើងសន្សំសំចៃ",
    pricePerDay: 7,
    rating: 4.75,
    reviewCount: 114,
    pickupLocation: "Night Market, Siem Reap",
    pickupLocationKh: "ផ្សាររាត្រី, សៀមរាប",
    province: "Siem Reap",
    image: "https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?auto=format&fit=crop&w=800&q=80",
    transmission: "4-Speed Semi-Auto (No Clutch)",
    engine: "110cc PGM-FI Ultra Fuel Saver",
    helmetsIncluded: 2
  },
  {
    id: 6,
    name: "Honda CB500X Adventure",
    category: "manual",
    categoryLabel: "Adventure Touring",
    categoryLabelKh: "ម៉ូតូធំទេសចរណ៍",
    pricePerDay: 45,
    rating: 5.0,
    reviewCount: 29,
    pickupLocation: "Toul Tom Poung (Russian Market)",
    pickupLocationKh: "ទួលទំពូង, ភ្នំពេញ",
    province: "Phnom Penh",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=800&q=80",
    transmission: "6-Speed Manual with Slipper Clutch",
    engine: "471cc Twin-Cylinder",
    helmetsIncluded: 2
  },
  {
    id: 7,
    name: "Yamaha NVX 155 VVA",
    category: "scooter",
    categoryLabel: "Sport Scooter",
    categoryLabelKh: "ម៉ូតូស្ព័រអូតូ",
    pricePerDay: 15,
    rating: 4.85,
    reviewCount: 51,
    pickupLocation: "Otres Beach, Sihanoukville",
    pickupLocationKh: "ឆ្នេរអូរត្រេស, ព្រះសីហនុ",
    province: "Sihanoukville",
    image: "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=800&q=80",
    transmission: "Automatic with ABS & Smart Key",
    engine: "155cc Liquid-Cooled VVA",
    helmetsIncluded: 2
  },
  {
    id: 8,
    name: "Kawasaki KLX 150BF",
    category: "dirt_bike",
    categoryLabel: "Off-Road Trail",
    categoryLabelKh: "ម៉ូតូឡើងព្រៃ Off-Road",
    pricePerDay: 22,
    rating: 4.9,
    reviewCount: 34,
    pickupLocation: "Downtown, Battambang",
    pickupLocationKh: "កណ្តាលក្រុង, បាត់ដំបង",
    province: "Battambang",
    image: "https://images.unsplash.com/photo-1558981420-87aa9dad1c89?auto=format&fit=crop&w=800&q=80",
    transmission: "5-Speed Manual",
    engine: "144cc Air-Cooled High-Torque",
    helmetsIncluded: 2
  }
];

// How It Works Steps (4 distinct steps)
export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: 1,
    title: "Search & Filter",
    titleKh: "ស្វែងរក និងជ្រើសរើសទីតាំង",
    description: "Choose your destination from 25 Cambodian provinces, pick your rental dates, and filter by scooter, semi-auto, or dirt bike.",
    descriptionKh: "ជ្រើសរើសខេត្តទាំង ២៥ នៅកម្ពុជា កំណត់កាលបរិច្ឆេទ និងជ្រើសរើសប្រភេទម៉ូតូដែលស័ក្តិសមនឹងដំណើររបស់អ្នក។",
    iconName: "Search"
  },
  {
    step: 2,
    title: "Choose & Select Dates",
    titleKh: "ពិនិត្យម៉ូតូ និងតម្លៃពិតប្រាកដ",
    description: "Inspect verified motorcycle photos, engine specs, transparent USD daily rates, owner ratings, and included free helmets.",
    descriptionKh: "មើលរូបភាពពិតៗ កម្លាំងម៉ាស៊ីន តម្លៃគិតជាដុល្លារ ($) គ្មានការលាក់កំបាំង និងការផ្តល់មួកសុវត្ថិភាពឥតគិតថ្លៃ។",
    iconName: "CalendarCheck"
  },
  {
    step: 3,
    title: "Send Booking Request",
    titleKh: "ផ្ញើសំណើកក់ភ្លាមៗ",
    description: "Submit your reservation request in seconds. Chat directly with the local owner and receive instant booking confirmation.",
    descriptionKh: "ផ្ញើសំណើកក់ដោយចំណាយពេលតែប៉ុន្មានវិនាទី។ ជជែកផ្ទាល់ជាមួយម្ចាស់ម៉ូតូ និងទទួលបានការបញ្ជាក់រហ័ស។",
    iconName: "Send"
  },
  {
    step: 4,
    title: "Pick Up & Ride",
    titleKh: "ទទួលម៉ូតូ និងធ្វើដំណើរ",
    description: "Meet the owner at the fixed Google Maps pickup point, quickly inspect your bike, put on your clean helmets, and ride away!",
    descriptionKh: "ជួបម្ចាស់ម៉ូតូនៅទីតាំងផែនទី Google Maps ពិនិត្យម៉ូតូ ពាក់មួកសុវត្ថិភាព និងចាប់ផ្តើមដំណើរកម្សាន្តដោយរីករាយ!",
    iconName: "KeyRound"
  }
];

// Why Choose Motho Rent Features (6 cards)
export const WHY_CHOOSE_US_FEATURES: FeatureItem[] = [
  {
    id: 1,
    title: "Verified Local Owners",
    titleKh: "ម្ចាស់ម៉ូតូក្នុងស្រុកបានផ្ទៀងផ្ទាត់",
    description: "Every bike host is identity-verified with national ID or business license. Reliable bikes maintained and ready for long road trips.",
    descriptionKh: "ម្ចាស់ម៉ូតូនីមួយៗត្រូវបានផ្ទៀងផ្ទាត់អត្តសញ្ញាណត្រឹមត្រូវ ម៉ូតូត្រូវបានថែទាំយ៉ាងយកចិត្តទុកដាក់ និងមានសុវត្ថិភាពខ្ពស់។",
    iconName: "ShieldCheck"
  },
  {
    id: 2,
    title: "Transparent USD Pricing",
    titleKh: "តម្លៃជាប្រាក់ដុល្លារ ($) ច្បាស់លាស់",
    description: "No hidden tourist markups, surprise fees, or currency confusion. What you see is what you pay, starting from $7/day.",
    descriptionKh: "គ្មានការដំឡើងថ្លៃលើភ្ញៀវទេសចរ គ្មានថ្លៃសេវាបង្កប់។ តម្លៃចាប់ផ្តើមពី ៧ ដុល្លារក្នុងមួយថ្ងៃយ៉ាងច្បាស់លាស់។",
    iconName: "DollarSign"
  },
  {
    id: 3,
    title: "Location-Based Search",
    titleKh: "ស្វែងរកតាមទីតាំងជាក់ស្តែង",
    description: "Find bikes right outside your hotel, hostel, or bus terminal with fixed pickup points across Phnom Penh, Siem Reap, and Kampot.",
    descriptionKh: "ស្វែងរកម៉ូតូក្បែរសណ្ឋាគារ ផ្ទះសំណាក់ ឬចំណតរថយន្តក្រុង ជាមួយចំណុចទទួលម៉ូតូជាក់លាក់។",
    iconName: "MapPin"
  },
  {
    id: 4,
    title: "Flexible Booking & Cancellation",
    titleKh: "ការកក់ និងការលុបចោលបត់បែន",
    description: "Plans change on the road. Enjoy hassle-free date adjustments and fair cancellation policies before pickup time.",
    descriptionKh: "គម្រោងធ្វើដំណើរអាចផ្លាស់ប្តូរបានគ្រប់ពេល! អ្នកអាចកែប្រែកាលបរិច្ឆេទ និងលុបចោលបានដោយងាយស្រួល។",
    iconName: "CalendarClock"
  },
  {
    id: 5,
    title: "Secure Cash & Deposit Options",
    titleKh: "ជម្រើសកក់ប្រាក់សុវត្ថិភាព",
    description: "No passport hostage nightmare. Choose between standard passport presentation or a low refundable cash deposit returned at drop-off.",
    descriptionKh: "មិនចាំបាច់បារម្ភរឿងទុកលិខិតឆ្លងដែន! អ្នកអាចជ្រើសរើសការតម្កល់ប្រាក់កក់សមរម្យដែលនឹងប្រគល់ជូនវិញភ្លាមៗ។",
    iconName: "CreditCard"
  },
  {
    id: 6,
    title: "Khmer & English AI Assistant",
    titleKh: "ជំនួយការឆ្លាតវៃ AI ជាភាសាខ្មែរ និងអង់គ្លេស",
    description: "Get instant recommendations on which motorcycle fits your route, budget tips, fuel stops, and road safety advice 24/7.",
    descriptionKh: "ទទួលបានការណែនាំពីម៉ូតូដែលត្រូវនឹងផ្លូវធ្វើដំណើរ ការប៉ាន់ស្មានការចំណាយ និងព័ត៌មានសុវត្ថិភាព ២៤ម៉ោង។",
    iconName: "Bot"
  }
];

// Mock AI Assistant Conversation Preview
export const AI_ASSISTANT_PREVIEW = {
  userQuery: "I'm heading to Kampot for 3 days with a friend on a $20/day budget. We want to ride up Bokor Mountain and visit Kep for seafood. What motorcycle do you recommend?",
  userQueryKh: "ខ្ញុំនិងមិត្តភក្តិចង់ទៅលេងកំពត ៣ថ្ងៃ ជាមួយថវិកា ២០$/ថ្ងៃ។ ចង់ជិះឡើងភ្នំបូកគោ និងទៅញ៉ាំគ្រឿងសមុទ្រនៅកែប។ តើគួរជួលម៉ូតូមួយណា?",
  assistantReply: "For a 2-person trip tackling the winding curves of Bokor Mountain (1,075m elevation) and cruising the scenic coastal road to Kep, I highly recommend the Honda ADV 160 ($18/day) or Honda Click 125 ($10/day). The ADV 160 offers superior dual-rear suspension, ABS braking for mountain switchbacks, and ample under-seat storage for your backpacks. 2 helmets are included free!",
  assistantReplyKh: "សម្រាប់ដំណើរកម្សាន្តគ្នា ២នាក់ឡើងភ្នំបូកគោ (កម្ពស់ ១,០៧៥ ម៉ែត្រ) និងបន្តទៅឆ្នេរកែប ខ្ញុំសូមណែនាំ Honda ADV 160 (តម្លៃ ១៨$/ថ្ងៃ) ឬ Honda Click 125 (តម្លៃ ១០$/ថ្ងៃ)។ ADV 160 មានបូមទន់ស្រួលជិះលើផ្លូវភ្នំ ប្រព័ន្ធហ្វ្រាំង ABS និងឃ្លុបធំទូលាយ។ មួកសុវត្ថិភាព ២ ត្រូវបានផ្តល់ជូនឥតគិតថ្លៃ!",
  recommendedBike: {
    name: "Honda ADV 160 Adventure",
    price: "$18 / day",
    location: "Kampot Riverside Pickup",
    rating: 5.0,
    features: ["Bokor-tested", "ABS brakes", "2 Helmets Included"]
  }
};

// Owner CTA Benefits
export const OWNER_BENEFITS = [
  {
    title: "Earn Extra Income",
    titleKh: "បង្កើនចំណូលបន្ថែម",
    description: "Monetize your idle motorcycle. Top hosts earn between $250 and $800+ monthly renting to tourists.",
    descriptionKh: "រកប្រាក់ចំណូលពីម៉ូតូដែលអ្នកមិនសូវជិះ។ ម្ចាស់ម៉ូតូអាចរកបានចាប់ពី ២៥០ ដល់ ៨០០ ដុល្លារក្នុងមួយខែ។"
  },
  {
    title: "You Control Prices & Availability",
    titleKh: "កំណត់តម្លៃ និងកាលវិភាគដោយខ្លួនឯង",
    description: "Set your own daily rates, block personal riding dates on your calendar, and accept only requests you feel comfortable with.",
    descriptionKh: "អ្នកជាអ្នកកំណត់តម្លៃជួលក្នុងមួយថ្ងៃ កំណត់ថ្ងៃដែលទំនេរ និងជ្រើសរើសភ្ញៀវដែលអ្នកពេញចិត្ត។"
  },
  {
    title: "All-in-One Host Dashboard",
    titleKh: "ផ្ទាំងគ្រប់គ្រងងាយស្រួលប្រើ",
    description: "Track active reservations, inspect renter verification IDs, communicate via chat, and record deposit handovers smoothly.",
    descriptionKh: "តាមដានការកក់ ពិនិត្យអត្តសញ្ញាណអ្នកជួល ជជែកផ្ទាល់ និងកត់ត្រាប្រាក់កក់បានយ៉ាងងាយស្រួល។"
  }
];

// Customer Reviews / Testimonials
export const CUSTOMER_REVIEWS: TestimonialItem[] = [
  {
    id: 1,
    name: "Marcus Vance",
    country: "Australia",
    countryFlag: "🇦🇺",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "February 2026",
    motorcycle: "Honda ADV 160 (Kampot)",
    review: "Rented an ADV 160 for 4 days to explore Bokor Mountain and Kep. The pickup was right in Kampot center. Super clean helmets, full tank of fuel, and no passport hostage! Will definitely use Motho Rent next time I'm in Cambodia.",
    reviewKh: "បានជួលម៉ូតូ ADV 160 រយៈពេល ៤ថ្ងៃទៅលេងភ្នំបូកគោ និងកែប។ ទទួលម៉ូតូនៅកណ្តាលក្រុងកំពត។ មួកសុវត្ថិភាពស្អាត សាំងពេញធុង និងមិនមានការដកហូតលិខិតឆ្លងដែនឡើយ!"
  },
  {
    id: 2,
    name: "Camille Durand",
    country: "France",
    countryFlag: "🇫🇷",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "January 2026",
    motorcycle: "Honda Scoopy 110 (Siem Reap)",
    review: "The easiest way to visit the Angkor temples! Rented a Honda Scoopy for $8/day. We caught the sunrise at Angkor Wat before the big tour buses arrived. The owner answered all my WhatsApp questions in minutes.",
    reviewKh: "ជាជម្រើសដ៏ល្អបំផុតសម្រាប់ដើរលេងប្រាសាទអង្គរវត្ត! ជួល Scoopy តម្លៃត្រឹមតែ ៨$/ថ្ងៃ។ មើលថ្ងៃរះទាន់ពេលមុនឡានក្រុងទេសចរណ៍មកដល់។ ម្ចាស់ម៉ូតូរួសរាយរាក់ទាក់ខ្លាំងណាស់។"
  },
  {
    id: 3,
    name: "Liam O'Connor",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "March 2026",
    motorcycle: "Honda CRF 250 Rally (Phnom Penh)",
    review: "Booked a CRF 250 for a week-long ride through the Cardamom Mountains to Koh Kong. The bike was mechanically pristine, chain properly lubed, brand new knobby tires. Transparent pricing with no surprises.",
    reviewKh: "បានកក់ CRF 250 សម្រាប់ជិះកាត់ជួរភ្នំក្រវាញទៅកោះកុង។ ម៉ូតូដំណើរការល្អឥតខ្ចោះ ច្រវាក់និងសំបកកង់ថ្មីស្អាត។ តម្លៃច្បាស់លាស់ គ្មានការបូកបន្ថែមអ្វីទាំងអស់។"
  },
  {
    id: 4,
    name: "Elena Rostova",
    country: "Germany",
    countryFlag: "🇩🇪",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "March 2026",
    motorcycle: "Honda Click 125 (Phnom Penh)",
    review: "I love that I can browse all available bikes and prices across Cambodia without being forced to create an account first. When I was ready to book, the process took less than 2 minutes. Highly recommend!",
    reviewKh: "ខ្ញុំចូលចិត្តខ្លាំងណាស់ត្រង់ថាយើងអាចមើលម៉ូតូ និងតម្លៃគ្រប់ខេត្តទាំងអស់ដោយមិនបាច់បង្ខំឱ្យបង្កើតគណនីមុន។ ពេលចង់កក់ ប្រើពេលមិនដល់ ២នាទីផង!"
  }
];

// FAQ Accordion (8 questions covering legal, deposit, helmets, insurance, cancellation, fuel, pickup/return)
export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    category: "documents",
    question: "Do I need a Cambodian motorcycle driving license to rent a scooter?",
    questionKh: "តើខ្ញុំត្រូវការប័ណ្ណបើកបរម៉ូតូកម្ពុជាដែរឬទេ ដើម្បីជួលម៉ូតូអូតូ?",
    answer: "Under Cambodian traffic law, tourists and foreigners riding scooters and motorcycles under 125cc (such as Honda Scoopy, Click, or Wave) do not require a local Cambodian driving license. For larger adventure bikes (150cc and above), an International Driving Permit (IDP) with motorcycle endorsement (Class A) is recommended.",
    answerKh: "យោងតាមច្បាប់ចរាចរណ៍ផ្លូវគោកកម្ពុជា ភ្ញៀវទេសចរដែលបើកបរម៉ូតូក្រោម 125cc (ដូចជា Scoopy, Click ឬ Wave) មិនតម្រូវឱ្យមានប័ណ្ណបើកបរក្នុងស្រុកឡើយ។ ចំពោះម៉ូតូធំចាប់ពី 150cc ឡើងទៅ ការមានប័ណ្ណបើកបរអន្តរជាតិ (IDP) ត្រូវបានណែនាំ។"
  },
  {
    id: 2,
    category: "deposit",
    question: "What deposit is required when picking up the motorcycle?",
    questionKh: "តើត្រូវការប្រាក់កក់ ឬឯកសារអ្វីខ្លះនៅពេលទទួលម៉ូតូ?",
    answer: "To protect both parties, owners typically request either: (A) leaving your original passport in secure host custody during the rental, OR (B) a refundable cash deposit (typically $50 to $150 USD depending on the motorcycle value) alongside a photo of your passport. Cash deposits are returned in full immediately upon safe vehicle return.",
    answerKh: "ដើម្បីសុវត្ថិភាពទាំងសងខាង ម្ចាស់ម៉ូតូជាទូទៅស្នើសុំ៖ (ក) ផ្ញើលិខិតឆ្លងដែនដើម ឬ (ខ) តម្កល់ប្រាក់កក់ជាសាច់ប្រាក់ (ប្រហែល ៥០$ ទៅ ១៥០$ អាស្រ័យលើតម្លៃម៉ូតូ) រួមជាមួយរូបថតលិខិតឆ្លងដែន។ ប្រាក់កក់នឹងត្រូវប្រគល់ជូនវិញពេញលេញភ្លាមៗពេលប្រគល់ម៉ូតូវិញ។"
  },
  {
    id: 3,
    category: "helmets",
    question: "Are helmets included with the rental?",
    questionKh: "តើមានការផ្តល់មួកសុវត្ថិភាពជូនដែរឬទេ?",
    answer: "Yes, 100%! Every motorcycle booked through Motho Rent includes up to 2 clean, sanitized helmets (one for the rider and one for the passenger) at zero extra charge. Wearing a strapped helmet is strictly required by Cambodian law.",
    answerKh: "បាទ/ចាស! រាល់ការជួលម៉ូតូតាមរយៈ Motho Rent រួមបញ្ចូលមួកសុវត្ថិភាពស្អាតរហូតដល់ ២ (សម្រាប់អ្នកបើក និងអ្នករួមដំណើរ) ដោយឥតគិតថ្លៃ។ ការពាក់មួកសុវត្ថិភាពជាកាតព្វកិច្ចច្បាប់នៅកម្ពុជា។"
  },
  {
    id: 4,
    category: "insurance",
    question: "What happens if I get a flat tire or mechanical issue during my rental?",
    questionKh: "តើមានអ្វីកើតឡើងប្រសិនបើបែកកង់ ឬម៉ូតូមានបញ្ហាកំឡុងពេលជិះ?",
    answer: "Motorcycle repair shops ('Cheang Moto') are ubiquitous throughout Cambodia and can be found every few kilometers in towns and countryside. Verified owners provide active phone/WhatsApp contact for guidance. Standard puncture repairs cost $1-$2 and routine maintenance costs are promptly reimbursed by owners upon presentation of receipt.",
    answerKh: "កន្លែងជួសជុលម៉ូតូ (ជាងម៉ូតូ) មាននៅគ្រប់ទីកន្លែងទូទាំងប្រទេសកម្ពុជា។ ម្ចាស់ម៉ូតូមានលេខទូរស័ព្ទ/WhatsApp សម្រាប់ទំនាក់ទំនង ២៤ម៉ោង។ ការប៉ះកង់ចំណាយត្រឹមតែ ១-២ ដុល្លារប៉ុណ្ណោះ ហើយម្ចាស់ម៉ូតូនឹងទូទាត់សងវិញចំពោះការជួសជុលទូទៅ។"
  },
  {
    id: 5,
    category: "fuel",
    question: "How does the fuel policy work?",
    questionKh: "តើគោលការណ៍ចាក់ប្រេងសាំងដំណើរការដូចម្តេច?",
    answer: "Motho Rent operates on a fair 'Like-for-Like' fuel policy. The motorcycle is handed over to you with a recorded fuel level (typically 1/2 to full tank), and you return it with the same level. Major stations (PTT, Total, Tela, Caltex) accept USD and Cambodian Riel.",
    answerKh: "យើងអនុវត្តគោលការណ៍សាំង 'ទទួលកម្រិតណា ប្រគល់កម្រិតនោះ'។ ម៉ូតូត្រូវបានប្រគល់ជូនជាមួយកម្រិតសាំងជាក់លាក់ ហើយអ្នកគ្រាន់តែចាក់បំពេញមកវិញក្នុងកម្រិតដូចគ្នា។ ការ៉ាស់សាំងធំៗទទួលទាំងប្រាក់ដុល្លារ និងប្រាក់រៀល។"
  },
  {
    id: 6,
    category: "cancellation",
    question: "Can I cancel or change my booking dates?",
    questionKh: "តើខ្ញុំអាចលុបចោល ឬកែប្រែកាលបរិច្ឆេទទទួលម៉ូតូបានទេ?",
    answer: "Yes. You can request date adjustments or cancel your booking free of charge up to 24 hours prior to the scheduled pickup time by contacting your host directly through your reservation dashboard or support line.",
    answerKh: "បាន! អ្នកអាចស្នើសុំកែប្រែកាលបរិច្ឆេទ ឬលុបចោលការកក់ដោយឥតគិតថ្លៃរហូតដល់ ២៤ម៉ោង មុនពេលទទួលម៉ូតូ តាមរយៈផ្ទាំងគ្រប់គ្រងការកក់របស់អ្នក។"
  },
  {
    id: 7,
    category: "pickup",
    question: "Where do I pick up and return the motorcycle?",
    questionKh: "តើខ្ញុំត្រូវទៅទទួល និងប្រគល់ម៉ូតូនៅឯណា?",
    answer: "Each listing has a fixed Google Maps pickup point (such as near Pub Street in Siem Reap, Riverside in Phnom Penh, or the Old Market in Kampot). Many owners also offer convenient hotel drop-off and pickup for a small convenience fee ($2–$4).",
    answerKh: "ម៉ូតូនីមួយៗមានចំណុចទីតាំងផែនទី Google Maps ច្បាស់លាស់ (ដូចជាក្បែរ Pub Street សៀមរាប, មាត់ទន្លេភ្នំពេញ ឬផ្សារចាស់កំពត)។ ម្ចាស់មួយចំនួនក៏មានសេវាដឹកជញ្ជូនដល់សណ្ឋាគារផងដែរ។"
  },
  {
    id: 8,
    category: "documents",
    question: "Can I browse motorcycles and check prices without creating an account?",
    questionKh: "តើខ្ញុំអាចមើលម៉ូតូ និងតម្លៃដោយមិនបាច់បង្កើតគណនីបានទេ?",
    answer: "Absolutely! Motho Rent is 100% open for exploration. You can freely browse all 25 provinces, view prices, photos, owner ratings, and map locations with zero commitment. You only sign in when you are ready to send a booking request or message an owner.",
    answerKh: "ពិតជាបាន ១០០%! លោកអ្នកអាចស្វែងរកម៉ូតូ មើលតម្លៃ រូបថត និងទីតាំងផែនទីក្នុងខេត្តទាំង ២៥ ដោយសេរី។ លោកអ្នកត្រូវការ Login តែនៅពេលដែលសម្រេចចិត្តផ្ញើសំណើកក់ប៉ុណ្ណោះ។"
  }
];
