
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check for missing config
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
