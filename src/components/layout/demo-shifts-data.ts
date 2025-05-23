
// Demo shift data for testing and UI development
export const demoShifts = [
  {
    id: 'demo-1',
    type: 'URGENT',
    title: 'Senior Bartender Needed',
    location: 'Grand Hotel & Resort',
    region: 'North America',
    rate: '$35/hr',
    urgency_level: 'high',
    highlight: true,
    isNew: false,
    isUpdating: false,
    timestamp: Date.now() - 1200000 // 20 minutes ago
  },
  {
    id: 'demo-2',
    type: 'PREMIUM',
    title: 'Event Host - Corporate Gala',
    location: 'City Convention Center',
    region: 'North America',
    rate: '$30/hr',
    urgency_level: 'medium',
    highlight: true,
    isNew: false,
    isUpdating: false,
    timestamp: Date.now() - 3600000 // 1 hour ago
  },
  {
    id: 'demo-3',
    type: 'SWAP',
    title: 'Wait Staff - Friday Night Shift',
    location: 'Oceanview Restaurant',
    region: 'North America',
    rate: '$25/hr',
    urgency_level: 'medium',
    highlight: false,
    isNew: false,
    isUpdating: false,
    timestamp: Date.now() - 7200000 // 2 hours ago
  },
  {
    id: 'demo-4',
    type: 'REGULAR',
    title: 'Kitchen Assistant',
    location: 'Downtown Bistro',
    region: 'Europe',
    rate: '€22/hr',
    urgency_level: 'low',
    highlight: false,
    isNew: false,
    isUpdating: false,
    timestamp: Date.now() - 14400000 // 4 hours ago
  },
  {
    id: 'demo-5',
    type: 'URGENT',
    title: 'Concierge Needed Immediately',
    location: 'Luxury Plaza Hotel',
    region: 'Europe',
    rate: '£28/hr',
    urgency_level: 'high',
    highlight: true,
    isNew: true,
    isUpdating: false,
    timestamp: Date.now() - 900000 // 15 minutes ago
  },
  {
    id: 'demo-6',
    type: 'PREMIUM',
    title: 'VIP Server - Private Event',
    location: 'Celebrity Mansion',
    region: 'Asia Pacific',
    rate: '$40/hr',
    urgency_level: 'medium',
    highlight: true,
    isNew: true,
    isUpdating: false,
    timestamp: Date.now() - 1800000 // 30 minutes ago
  },
  {
    id: 'demo-7',
    type: 'REGULAR',
    title: 'Housekeeping Staff',
    location: 'Beach Resort',
    region: 'Asia Pacific',
    rate: '$22/hr',
    urgency_level: 'low',
    highlight: false,
    isNew: false,
    isUpdating: false,
    timestamp: Date.now() - 10800000 // 3 hours ago
  },
  {
    id: 'demo-8',
    type: 'SWAP',
    title: 'Front Desk Agent - Weekend',
    location: 'Business Hotel',
    region: 'Middle East',
    rate: '$26/hr',
    urgency_level: 'medium',
    highlight: false,
    isNew: false,
    isUpdating: false,
    timestamp: Date.now() - 5400000 // 1.5 hours ago
  }
];

export default demoShifts;
