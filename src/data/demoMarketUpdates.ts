
import { MarketUpdate } from '../types/marketUpdate';

export const demoUpdates: MarketUpdate[] = [
  // Europe
  {
    id: '1',
    type: 'URGENT',
    title: 'Head Chef Required - Immediate Start',
    location: 'The Grand Resort & Spa',
    rate: '€45/hr',
    highlight: true,
    created_at: new Date().toISOString(),
    region: 'Paris, France',
    currency: 'EUR',
    original_rate: 45,
    currency_rate: 1,
    urgency_level: 'high'
  },
  {
    id: '2',
    type: 'SWAP',
    title: 'Bartender Evening Shift Available',
    location: 'Skyline Lounge',
    rate: '€30/hr',
    highlight: false,
    created_at: new Date().toISOString(),
    region: 'Berlin, Germany',
    currency: 'EUR',
    original_rate: 30,
    currency_rate: 1,
    urgency_level: 'medium'
  },
  {
    id: '3',
    type: 'URGENT',
    title: 'Sous Chef Needed - 5* Hotel',
    location: 'Luxury Palace Hotel',
    rate: '€40/hr',
    highlight: true,
    created_at: new Date().toISOString(),
    region: 'Amsterdam, Netherlands',
    currency: 'EUR',
    original_rate: 40,
    currency_rate: 1,
    urgency_level: 'high'
  },
  
  // Middle East
  {
    id: '4',
    type: 'PREMIUM',
    title: 'Executive Pastry Chef',
    location: 'Royal Dining Group',
    rate: 'AED200/hr',
    highlight: true,
    created_at: new Date().toISOString(),
    region: 'Dubai, UAE',
    currency: 'AED',
    original_rate: 200,
    currency_rate: 4.1,
    urgency_level: 'medium'
  },
  {
    id: '5',
    type: 'SWAP',
    title: 'Server Brunch Shift Available',
    location: 'Beach Club Resort',
    rate: 'QAR100/hr',
    highlight: false,
    created_at: new Date().toISOString(),
    region: 'Doha, Qatar',
    currency: 'QAR',
    original_rate: 100,
    currency_rate: 3.65,
    urgency_level: 'medium'
  },
  {
    id: '6',
    type: 'URGENT',
    title: 'Restaurant Manager Emergency',
    location: 'Fine Dining Restaurant',
    rate: 'SAR150/hr',
    highlight: true,
    created_at: new Date().toISOString(),
    region: 'Riyadh, Saudi Arabia',
    currency: 'SAR',
    original_rate: 150,
    currency_rate: 3.75,
    urgency_level: 'high'
  },
  
  // Asia Pacific
  {
    id: '7',
    type: 'PREMIUM',
    title: 'Head Sommelier Position',
    location: 'Michelin Star Restaurant',
    rate: 'S$60/hr',
    highlight: true,
    created_at: new Date().toISOString(),
    region: 'Singapore',
    currency: 'SGD',
    original_rate: 60,
    currency_rate: 1.35,
    urgency_level: 'medium'
  },
  {
    id: '8',
    type: 'PREMIUM',
    title: 'F&B Director',
    location: 'International Hotel Chain',
    rate: 'HK$425/hr',
    highlight: true,
    created_at: new Date().toISOString(),
    region: 'Hong Kong',
    currency: 'HKD',
    original_rate: 425,
    currency_rate: 7.8,
    urgency_level: 'medium'
  },
  {
    id: '9',
    type: 'SWAP',
    title: 'Barista Morning Shift Trade',
    location: 'Specialty Coffee House',
    rate: 'AU$35/hr',
    highlight: false,
    created_at: new Date().toISOString(),
    region: 'Sydney, Australia',
    currency: 'AUD',
    original_rate: 35,
    currency_rate: 1.5,
    urgency_level: 'low'
  },
  
  // North America
  {
    id: '10',
    type: 'URGENT',
    title: 'Senior Chef de Partie',
    location: 'Boutique Hotel Restaurant',
    rate: '$40/hr',
    highlight: true,
    created_at: new Date().toISOString(),
    region: 'New York, USA',
    currency: 'USD',
    original_rate: 40,
    currency_rate: 1,
    urgency_level: 'high'
  },
  {
    id: '11',
    type: 'URGENT',
    title: 'Executive Chef - Luxury Hotel',
    location: 'Marriott Hotel & Spa',
    rate: 'CA$45/hr',
    highlight: true,
    created_at: new Date().toISOString(),
    region: 'Toronto, Canada',
    currency: 'CAD',
    original_rate: 45,
    currency_rate: 1.35,
    urgency_level: 'high'
  },
  {
    id: '12',
    type: 'PREMIUM',
    title: 'F&B Manager - 5-Star Resort',
    location: 'Azure Beach Resort',
    rate: 'MX$750/hr',
    highlight: true,
    created_at: new Date().toISOString(),
    region: 'Cancun, Mexico',
    currency: 'MXN',
    original_rate: 750,
    currency_rate: 20,
    urgency_level: 'medium'
  },
  
  // South America
  {
    id: '13',
    type: 'SWAP',
    title: 'Head Bartender - Cocktail Bar',
    location: 'The Thirsty Barracuda',
    rate: 'R$200/hr',
    highlight: false,
    created_at: new Date().toISOString(),
    region: 'Rio de Janeiro, Brazil',
    currency: 'BRL',
    original_rate: 200,
    currency_rate: 5.5,
    urgency_level: 'medium'
  },
  {
    id: '14',
    type: 'URGENT',
    title: 'Sous Chef - Fine Dining Restaurant',
    location: 'Casa del Mar',
    rate: 'AR$15000/hr',
    highlight: true,
    created_at: new Date().toISOString(),
    region: 'Buenos Aires, Argentina',
    currency: 'ARS',
    original_rate: 15000,
    currency_rate: 350,
    urgency_level: 'high'
  },
  
  // Africa
  {
    id: '15',
    type: 'PREMIUM',
    title: 'Head Sommelier - Fine Dining',
    location: 'The Cape View',
    rate: 'R650/hr',
    highlight: true,
    created_at: new Date().toISOString(),
    region: 'Cape Town, South Africa',
    currency: 'ZAR',
    original_rate: 650,
    currency_rate: 18,
    urgency_level: 'medium'
  },
  {
    id: '16',
    type: 'SWAP',
    title: 'Restaurant Manager - Urgent Cover',
    location: 'Luxor Resort & Casino',
    rate: 'E£650/hr',
    highlight: false,
    created_at: new Date().toISOString(),
    region: 'Cairo, Egypt',
    currency: 'EGP',
    original_rate: 650,
    currency_rate: 30.8,
    urgency_level: 'medium'
  },
  
  // Additional Asian Markets
  {
    id: '17',
    type: 'URGENT',
    title: 'Sushi Master - Japanese Restaurant',
    location: 'Sakura Fine Dining',
    rate: '¥6000/hr',
    highlight: true,
    created_at: new Date().toISOString(),
    region: 'Tokyo, Japan',
    currency: 'JPY',
    original_rate: 6000,
    currency_rate: 150,
    urgency_level: 'high'
  },
  {
    id: '18',
    type: 'PREMIUM',
    title: 'Pastry Chef - 5-Star Hotel',
    location: 'Grand Hotel Peninsula',
    rate: '₹3000/hr',
    highlight: true,
    created_at: new Date().toISOString(),
    region: 'Mumbai, India',
    currency: 'INR',
    original_rate: 3000,
    currency_rate: 83,
    urgency_level: 'medium'
  },
  {
    id: '19',
    type: 'SWAP',
    title: 'Head Waiter - Luxury Restaurant',
    location: 'Riverside Gourmet',
    rate: '฿1200/hr',
    highlight: false,
    created_at: new Date().toISOString(),
    region: 'Bangkok, Thailand',
    currency: 'THB',
    original_rate: 1200,
    currency_rate: 35,
    urgency_level: 'low'
  },
  
  // Additional European Markets
  {
    id: '20',
    type: 'URGENT',
    title: 'Executive Head Chef - Michelin Restaurant',
    location: 'Nordic Fine Dining',
    rate: 'kr450/hr',
    highlight: true,
    created_at: new Date().toISOString(),
    region: 'Stockholm, Sweden',
    currency: 'SEK',
    original_rate: 450,
    currency_rate: 10.5,
    urgency_level: 'high'
  }
];
