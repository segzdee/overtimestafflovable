
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
        setUpdates(data);
        setLastUpdateTime(new Date());
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
            setUpdates(prev => [payload.new as MarketUpdate, ...prev.slice(0, -1)]);
            setNewUpdatesCount(prev => prev + 1);
          } else if (payload.eventType === 'DELETE') {
            setUpdates(prev => prev.filter(update => update.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            setUpdates(prev => prev.map(update => 
              update.id === payload.new.id ? payload.new as MarketUpdate : update
            ));
          }
          
          setLastUpdateTime(new Date());
        }
      )
      .subscribe();

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
