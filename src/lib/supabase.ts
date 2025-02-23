
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = 'https://emtebosiacxihwrfcylr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtdGVib3NpYWN4aWh3cmZjeWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4NzQwNDAsImV4cCI6MjA1NTQ1MDA0MH0.i1oNvzxBJcZWfM14Ye-q5nwiLOtSHoVCCfDjcOjk4Ck';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-application-name': 'overtimestaff'
    }
  },
  db: {
    schema: 'public'
  }
});

// Add error logging
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase auth event:', event);
  if (event === 'SIGNED_OUT') {
    // Clear any cached data
    localStorage.removeItem('supabase.auth.token');
  }
});
