
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
  region: string;
  currency: string;
  original_rate: number;
  currency_rate: number;
  urgency_level: 'low' | 'medium' | 'high';
  isNew?: boolean;
  isUpdating?: boolean;
}

const REGIONS = ['USA', 'Dubai', 'Malta', 'South Africa', 'Italy', 'Spain', 'Canada', 'Europe'];

// Demo data to show immediately
const demoUpdates: MarketUpdate[] = [
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
  },
];

export function useMarketUpdates() {
  const [updates, setUpdates] = useState<MarketUpdate[]>(demoUpdates);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [newUpdatesCount, setNewUpdatesCount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('EUR');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({
    EUR: 1,
    USD: 1.1,
    GBP: 0.86,
    AED: 4.04,
    ZAR: 20.65,
    CAD: 1.48
  });

  const formatRate = (original: number, currency: string): string => {
    const rate = original * exchangeRates[currency];
    const symbol = currency === 'EUR' ? '€' : 
                  currency === 'USD' ? '$' :
                  currency === 'GBP' ? '£' :
                  currency === 'AED' ? 'AED ' :
                  currency === 'ZAR' ? 'R ' :
                  currency === 'CAD' ? 'C$' : '';
    return `${symbol}${Math.round(rate)}/hr`;
  };

  useEffect(() => {
    // Initial fetch of real data
    const fetchUpdates = async () => {
      const { data, error } = await supabase
        .from('market_updates')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8);

      if (data && !error) {
        const formattedData = data.map(update => ({
          ...update,
          isNew: true,
          rate: formatRate(update.original_rate, selectedCurrency)
        }));
        setUpdates(formattedData);
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
            const newUpdate = {
              ...payload.new as MarketUpdate,
              isNew: true,
              rate: formatRate(payload.new.original_rate, selectedCurrency)
            };
            setUpdates(prev => [newUpdate, ...prev.slice(0, -1)]);
            setNewUpdatesCount(prev => prev + 1);
            
            setTimeout(() => {
              setUpdates(prevUpdates => 
                prevUpdates.map(update => 
                  update.id === payload.new.id ? { ...update, isNew: false } : update
                )
              );
            }, 300);
          } else if (payload.eventType === 'UPDATE') {
            setUpdates(prev => prev.map(update => {
              if (update.id === payload.new.id) {
                return { 
                  ...payload.new as MarketUpdate,
                  isUpdating: true,
                  rate: formatRate(payload.new.original_rate, selectedCurrency)
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
        const randomUpdate = {
          id: Math.random().toString(),
          type: ['URGENT', 'NEW', 'SWAP', 'PREMIUM'][Math.floor(Math.random() * 4)] as MarketUpdate['type'],
          title: ['Head Chef', 'Sommelier', 'Restaurant Manager', 'Executive Sous Chef'][Math.floor(Math.random() * 4)],
          location: ['Luxury Hotel', 'Fine Dining', 'Resort & Spa', 'Boutique Restaurant'][Math.floor(Math.random() * 4)],
          region: REGIONS[Math.floor(Math.random() * REGIONS.length)],
          original_rate: Math.floor(Math.random() * 30) + 25,
          currency: 'EUR',
          currency_rate: 1,
          highlight: Math.random() > 0.7,
          created_at: new Date().toISOString(),
          urgency_level: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
          isNew: true
        };

        const formattedUpdate = {
          ...randomUpdate,
          rate: formatRate(randomUpdate.original_rate, selectedCurrency)
        };

        setUpdates(prev => [formattedUpdate, ...prev.slice(0, -1)]);
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
  }, [selectedCurrency]);

  return {
    updates,
    lastUpdateTime,
    newUpdatesCount,
    selectedCurrency,
    setSelectedCurrency,
    exchangeRates
  };
}
