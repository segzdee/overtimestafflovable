
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://emtebosiacxihwrfcylr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtdGVib3NpYWN4aWh3cmZjeWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4NzQwNDAsImV4cCI6MjA1NTQ1MDA0MH0.i1oNvzxBJcZWfM14Ye-q5nwiLOtSHoVCCfDjcOjk4Ck';

// Create a single instance of the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'lovable-web'
    }
  }
});

// Helper function to check Supabase connection
export const checkSupabaseConnection = async () => {
  try {
    // Use a simple health check instead of querying tables
    const { error } = await supabase.auth.getSession();
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
};
