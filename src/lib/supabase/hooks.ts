
import { useEffect, useState } from 'react';
import { supabase } from './client';
import { Profile, MarketUpdate } from './types';
import { getCurrentProfile } from './queries';

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getCurrentProfile();
        setProfile(data);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to load profile'));
      } finally {
        setLoading(false);
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        loadProfile();
      } else if (event === 'SIGNED_OUT') {
        setProfile(null);
      }
    });

    loadProfile();

    return () => subscription.unsubscribe();
  }, []);

  return { profile, loading, error };
}

export function useMarketUpdatesSubscription(callback: (update: MarketUpdate) => void) {
  useEffect(() => {
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
          callback(payload.new as MarketUpdate);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [callback]);
}
