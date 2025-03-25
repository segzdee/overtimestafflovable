
interface CategoryGroup {
  group: string;
  items: string[];
}

export const CATEGORIES: Record<string, CategoryGroup[]> = {
  "shift-worker": [
    {
      group: "Hospitality",
      items: ["Bartender", "Waiter/Waitress", "Chef", "Host/Hostess", "Barista", "Food Runner"]
    },
    {
      group: "Retail",
      items: ["Sales Associate", "Cashier", "Stock Clerk", "Visual Merchandiser", "Customer Service"]
    },
    {
      group: "Events",
      items: ["Event Staff", "Security", "Catering", "Usher", "Ticket Attendant"]
    }
  ],
  "company": [
    {
      group: "Hospitality",
      items: ["Restaurant", "Hotel", "Cafe", "Bar", "Catering Service"]
    },
    {
      group: "Retail",
      items: ["Department Store", "Boutique", "Supermarket", "Shopping Mall", "Specialty Store"]
    },
    {
      group: "Events",
      items: ["Concert Venue", "Conference Center", "Exhibition Hall", "Sports Arena", "Theater"]
    }
  ],
  "agency": [
    {
      group: "Staffing Type",
      items: ["Hospitality Staffing", "Retail Staffing", "Event Staffing", "General Labor", "Mixed Staffing"]
    }
  ]
};
