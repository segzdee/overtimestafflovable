
import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";

// Types for our market updates
export interface MarketUpdate {
  id: string;
  type: 'URGENT' | 'NEW' | 'SWAP' | 'PREMIUM';
  title: string;
  location: string;
  rate: string;
  highlight: boolean;
  created_at: string;
  isNew?: boolean;
  isUpdating?: boolean;
}

// Global demo data
const demoUpdates: MarketUpdate[] = [
  { 
    id: '1',
    type: 'URGENT', 
    title: 'Executive Chef - Fine Dining', 
    location: 'Dubai, UAE', 
    rate: '$45/hr', 
    highlight: true,
    created_at: new Date().toISOString()
  },
  { 
    id: '2',
    type: 'NEW', 
    title: 'Sommelier', 
    location: 'Valletta, Malta', 
    rate: '€35/hr', 
    highlight: false,
    created_at: new Date().toISOString()
  },
  { 
    id: '3',
    type: 'SWAP', 
    title: 'Head Bartender', 
    location: 'Barcelona, Spain', 
    rate: '€32/hr', 
    highlight: false,
    created_at: new Date().toISOString()
  },
  { 
    id: '4',
    type: 'PREMIUM', 
    title: 'Restaurant Manager', 
    location: 'Cape Town, South Africa', 
    rate: 'R450/hr', 
    highlight: true,
    created_at: new Date().toISOString()
  },
  { 
    id: '5',
    type: 'URGENT', 
    title: 'Pastry Chef', 
    location: 'Milan, Italy', 
    rate: '€38/hr', 
    highlight: true,
    created_at: new Date().toISOString()
  },
  { 
    id: '6',
    type: 'NEW', 
    title: 'Events Coordinator', 
    location: 'Toronto, Canada', 
    rate: 'C$40/hr', 
    highlight: false,
    created_at: new Date().toISOString()
  },
  { 
    id: '7',
    type: 'PREMIUM', 
    title: 'Sushi Master Chef', 
    location: 'New York, USA', 
    rate: '$55/hr', 
    highlight: true,
    created_at: new Date().toISOString()
  },
  { 
    id: '8',
    type: 'SWAP', 
    title: 'Hospitality Manager', 
    location: 'London, UK', 
    rate: '£35/hr', 
    highlight: false,
    created_at: new Date().toISOString()
  }
];

export function useMarketUpdates() {
  const [updates, setUpdates] = useState<MarketUpdate[]>(demoUpdates);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [newUpdatesCount, setNewUpdatesCount] = useState(0);

  useEffect(() => {
    // Initial fetch of real data
    const fetchUpdates = async () => {
      const { data, error } = await supabase
        .from('market_updates')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8);

      if (data && !error) {
        setUpdates(data.map(update => ({ ...update, isNew: true })));
        setLastUpdateTime(new Date());

        // Remove isNew flag after animation
        setTimeout(() => {
          setUpdates(prevUpdates => 
            prevUpdates.map(update => ({ ...update, isNew: false }))
          );
        }, 300);
      }
    };

    // Set up real-time subscription
    const channel = supabase
      .channel('market-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'market_updates'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          
          if (payload.eventType === 'INSERT') {
            setUpdates(prev => [{...payload.new as MarketUpdate, isNew: true}, ...prev.slice(0, -1)]);
            setNewUpdatesCount(prev => prev + 1);
            
            setTimeout(() => {
              setUpdates(prevUpdates => 
                prevUpdates.map(update => 
                  update.id === payload.new.id ? { ...update, isNew: false } : update
                )
              );
            }, 300);
          } else if (payload.eventType === 'DELETE') {
            setUpdates(prev => prev.filter(update => update.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            setUpdates(prev => prev.map(update => {
              if (update.id === payload.new.id) {
                return { 
                  ...payload.new as MarketUpdate, 
                  isUpdating: true 
                };
              }
              return update;
            }));
            
            setTimeout(() => {
              setUpdates(prevUpdates => 
                prevUpdates.map(update => 
                  update.id === payload.new.id ? { ...update, isUpdating: false } : update
                )
              );
            }, 300);
          }
          
          setLastUpdateTime(new Date());
        }
      )
      .subscribe();

    // Simulate real-time updates for demo purposes (only in development)
    if (process.env.NODE_ENV === 'development') {
      const interval = setInterval(() => {
        const locations = [
          { city: 'Dubai', country: 'UAE', currency: '$' },
          { city: 'Valletta', country: 'Malta', currency: '€' },
          { city: 'Barcelona', country: 'Spain', currency: '€' },
          { city: 'Cape Town', country: 'South Africa', currency: 'R' },
          { city: 'Milan', country: 'Italy', currency: '€' },
          { city: 'Toronto', country: 'Canada', currency: 'C$' },
          { city: 'New York', country: 'USA', currency: '$' },
          { city: 'London', country: 'UK', currency: '£' },
          { city: 'Paris', country: 'France', currency: '€' },
          { city: 'Amsterdam', country: 'Netherlands', currency: '€' }
        ];
        
        const roles = [
          'Executive Chef',
          'Sommelier',
          'Head Bartender',
          'Restaurant Manager',
          'Pastry Chef',
          'Events Coordinator',
          'Sushi Master',
          'Hospitality Manager',
          'Fine Dining Server',
          'Mixologist'
        ];

        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        const randomRole = roles[Math.floor(Math.random() * roles.length)];
        const randomRate = Math.floor(Math.random() * 30) + 30;

        const randomUpdate = {
          id: Math.random().toString(),
          type: ['URGENT', 'NEW', 'SWAP', 'PREMIUM'][Math.floor(Math.random() * 4)] as MarketUpdate['type'],
          title: randomRole,
          location: `${randomLocation.city}, ${randomLocation.country}`,
          rate: `${randomLocation.currency}${randomRate}/hr`,
          highlight: Math.random() > 0.7,
          created_at: new Date().toISOString(),
          isNew: true
        };

        setUpdates(prev => [randomUpdate, ...prev.slice(0, -1)]);
        setNewUpdatesCount(prev => prev + 1);
        setLastUpdateTime(new Date());

        setTimeout(() => {
          setUpdates(prevUpdates => 
            prevUpdates.map(update => 
              update.id === randomUpdate.id ? { ...update, isNew: false } : update
            )
          );
        }, 300);
      }, 5000);

      return () => {
        clearInterval(interval);
        supabase.removeChannel(channel);
      };
    }

    fetchUpdates();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    updates,
    lastUpdateTime,
    newUpdatesCount
  };
}
