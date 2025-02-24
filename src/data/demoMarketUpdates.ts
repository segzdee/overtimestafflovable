
import { MarketUpdate } from '../types/marketUpdate';

export const demoUpdates: MarketUpdate[] = [
  {
    id: '1',
    type: 'URGENT',
    title: 'Executive Chef Needed',
    location: 'Luxury Resort',
    rate: '€35/hr',
    highlight: true,
    created_at: new Date().toISOString(),
    region: 'Dubai',
    currency: 'EUR',
    original_rate: 35,
    currency_rate: 1,
    urgency_level: 'high'
  },
  {
    id: '2',
    type: 'NEW',
    title: 'Sommelier Position',
    location: 'Fine Dining Restaurant',
    rate: '€30/hr',
    highlight: false,
    created_at: new Date().toISOString(),
    region: 'Italy',
    currency: 'EUR',
    original_rate: 30,
    currency_rate: 1,
    urgency_level: 'medium'
  },
  {
    id: '3',
    type: 'SWAP',
    title: 'Head Bartender Shift',
    location: 'Beach Club',
    rate: '€40/hr',
    highlight: false,
    created_at: new Date().toISOString(),
    region: 'Malta',
    currency: 'EUR',
    original_rate: 40,
    currency_rate: 1,
    urgency_level: 'low'
  },
  {
    id: '4',
    type: 'PREMIUM',
    title: 'Food & Beverage Director',
    location: 'Boutique Hotel',
    rate: '€45/hr',
    highlight: true,
    created_at: new Date().toISOString(),
    region: 'Spain',
    currency: 'EUR',
    original_rate: 45,
    currency_rate: 1,
    urgency_level: 'high'
  }
];
