
import { supabase } from "@/lib/supabase/client";
import { executeWithConnectionRetry } from "@/lib/robust-connection-handler";

// Common utility functions for authentication operations
export const getProfileByUserId = async (userId: string) => {
  return executeWithConnectionRetry(
    async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
        
      if (error) throw error;
      if (!data) throw new Error('User profile not found');
      
      return data;
    },
    {
      maxRetries: 3,
      criticalOperation: true
    }
  );
};

export const getNotificationPreferences = async (userId: string) => {
  return executeWithConnectionRetry(
    async () => {
      const { data, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
        
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    {
      maxRetries: 3,
      criticalOperation: false
    }
  );
};
