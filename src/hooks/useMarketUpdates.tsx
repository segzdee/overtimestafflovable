
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
  isNew?: boolean; // Added for animation purposes
  isUpdating?: boolean; // Added for animation purposes
}

// Demo data to show immediately
const demoUpdates: MarketUpdate[] = [
  { 
    id: '1',
    type: 'URGENT', 
    title: 'Kitchen Staff Needed', 
    location: 'Downtown', 
    rate: '$35/hr', 
    highlight: true,
    created_at: new Date().toISOString()
  },
  { 
    id: '2',
    type: 'NEW', 
    title: 'Server Position', 
    location: 'Midtown', 
    rate: '$25/hr', 
    highlight: false,
    created_at: new Date().toISOString()
  },
  { 
    id: '3',
    type: 'SWAP', 
    title: 'Bartender Shift', 
    location: 'Upper East', 
    rate: '$30/hr', 
    highlight: false,
    created_at: new Date().toISOString()
  },
  { 
    id: '4',
    type: 'PREMIUM', 
    title: 'Night Manager', 
    location: 'Financial District', 
    rate: '$40/hr', 
    highlight: true,
    created_at: new Date().toISOString()
  },
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
          
          // Update the list based on the type of change
          if (payload.eventType === 'INSERT') {
            setUpdates(prev => [{...payload.new as MarketUpdate, isNew: true}, ...prev.slice(0, -1)]);
            setNewUpdatesCount(prev => prev + 1);
            
            // Remove isNew flag after animation
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
            
            // Remove updating animation after a short delay
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
        const randomUpdate = {
          id: Math.random().toString(),
          type: ['URGENT', 'NEW', 'SWAP', 'PREMIUM'][Math.floor(Math.random() * 4)] as MarketUpdate['type'],
          title: ['Chef Needed', 'Bartender Wanted', 'Server Required', 'Host Position'][Math.floor(Math.random() * 4)],
          location: ['Downtown', 'Uptown', 'Midtown', 'West Side'][Math.floor(Math.random() * 4)],
          rate: `$${Math.floor(Math.random() * 20) + 25}/hr`,
          highlight: Math.random() > 0.7,
          created_at: new Date().toISOString(),
          isNew: true
        };

        setUpdates(prev => [randomUpdate, ...prev.slice(0, -1)]);
        setNewUpdatesCount(prev => prev + 1);
        setLastUpdateTime(new Date());

        // Remove isNew flag after animation
        setTimeout(() => {
          setUpdates(prevUpdates => 
            prevUpdates.map(update => 
              update.id === randomUpdate.id ? { ...update, isNew: false } : update
            )
          );
        }, 300);
      }, 5000); // Update every 5 seconds

      return () => {
        clearInterval(interval);
        supabase.removeChannel(channel);
      };
    }

    // Fetch initial real data
    fetchUpdates();

    // Cleanup subscription
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
