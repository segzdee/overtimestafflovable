
export interface StaffMember {
  id: number;
  name: string;
  location: string;
  country: string;
  region: string;
  verified: boolean;
  positions: string[];
  ratings: {
    clientRating: number;
    reliability: number;
    cancellations: number;
    lateArrivals: number;
    swaps: number;
    avgHourlyRate: number;
  };
}

export const mockStaffData: StaffMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "London",
    country: "UK",
    region: "South",
    verified: true,
    positions: ["Hotel Manager", "Event Coordinator"],
    ratings: {
      clientRating: 4.8,
      reliability: 4.7,
      cancellations: 0.2,
      lateArrivals: 0.1,
      swaps: 0.3,
      avgHourlyRate: 35.00
    }
  },
  {
    id: 2,
    name: "David Williams",
    location: "Manchester",
    country: "UK",
    region: "North",
    verified: true,
    positions: ["Chef", "Catering Specialist"],
    ratings: {
      clientRating: 4.5,
      reliability: 4.3,
      cancellations: 0.5,
      lateArrivals: 0.2,
      swaps: 0.1,
      avgHourlyRate: 25.00
    }
  },
  {
    id: 3,
    name: "Michael Brown",
    location: "Birmingham",
    country: "UK",
    region: "West",
    verified: false,
    positions: ["Bartender", "Mixologist"],
    ratings: {
      clientRating: 4.2,
      reliability: 4.0,
      cancellations: 0.8,
      lateArrivals: 0.4,
      swaps: 0.3,
      avgHourlyRate: 20.00
    }
  },
  {
    id: 4,
    name: "Emma Wilson",
    location: "Edinburgh",
    country: "UK",
    region: "North",
    verified: true,
    positions: ["Front Desk Receptionist", "Concierge"],
    ratings: {
      clientRating: 4.9,
      reliability: 4.8,
      cancellations: 0.1,
      lateArrivals: 0.1,
      swaps: 0.1,
      avgHourlyRate: 22.00
    }
  },
  {
    id: 5,
    name: "James Taylor",
    location: "Cardiff",
    country: "UK",
    region: "West",
    verified: true,
    positions: ["Housekeeping Manager", "Room Attendant"],
    ratings: {
      clientRating: 4.7,
      reliability: 4.5,
      cancellations: 0.3,
      lateArrivals: 0.2,
      swaps: 0.2,
      avgHourlyRate: 18.50
    }
  },
  {
    id: 6,
    name: "Sophie Evans",
    location: "Brighton",
    country: "UK",
    region: "South",
    verified: false,
    positions: ["Waiter", "Food Runner"],
    ratings: {
      clientRating: 4.3,
      reliability: 4.1,
      cancellations: 0.6,
      lateArrivals: 0.5,
      swaps: 0.4,
      avgHourlyRate: 15.00
    }
  },
  {
    id: 7,
    name: "Olivia Martin",
    location: "Glasgow",
    country: "UK",
    region: "North",
    verified: true,
    positions: ["Sous Chef", "Pastry Chef"],
    ratings: {
      clientRating: 4.6,
      reliability: 4.4,
      cancellations: 0.3,
      lateArrivals: 0.2,
      swaps: 0.2,
      avgHourlyRate: 28.00
    }
  },
  {
    id: 8,
    name: "Liam Harris",
    location: "Bristol",
    country: "UK",
    region: "South",
    verified: false,
    positions: ["Event Planner", "Banquet Coordinator"],
    ratings: {
      clientRating: 4.1,
      reliability: 3.9,
      cancellations: 0.7,
      lateArrivals: 0.5,
      swaps: 0.4,
      avgHourlyRate: 30.00
    }
  }
];
