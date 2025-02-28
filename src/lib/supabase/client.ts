
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qdyyfxgonldvghrtjhnn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeXlmeGdvbmxkdmdocnRqaG5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MDAzMTMsImV4cCI6MjA1NTk3NjMxM30.eS660marbWwss7pQFbMUBJ_e2mhH7JBJvaP7Kr3ZU0M';

// Create a single instance of the Supabase client with improved configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'overtimestaffapp-web'
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Helper function to check Supabase connection with retry
export const checkSupabaseConnection = async (retries = 3, delay = 1000) => {
  let attempts = 0;
  
  while (attempts < retries) {
    try {
      console.log(`Attempting Supabase connection (attempt ${attempts + 1}/${retries})...`);
      const { error } = await supabase.auth.getSession();
      
      if (!error) {
        console.log('Supabase connection successful');
        return true;
      }
      
      console.error(`Connection attempt ${attempts + 1} failed:`, error);
      attempts++;
      
      if (attempts < retries) {
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      console.error(`Connection attempt ${attempts + 1} error:`, error);
      attempts++;
      
      if (attempts < retries) {
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  console.error('All connection attempts failed');
  return false;
};
