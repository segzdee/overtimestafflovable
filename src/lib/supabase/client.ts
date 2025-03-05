
import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qdyyfxgonldvghrtjhnn.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeXlmeGdvbmxkdmdocnRqaG5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MDAzMTMsImV4cCI6MjA1NTk3NjMxM30.eS660marbWwss7pQFbMUBJ_e2mhH7JBJvaP7Kr3ZU0M';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeXlmeGdvbmxkdmdocnRqaG5uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDQwMDMxMywiZXhwIjoyMDU1OTc2MzEzfQ.MKIcuSLo_ZI6PTA44VyHFes5wV1xpKMRYv-AWxr3qp0';

// Global timeout values
const DEFAULT_TIMEOUT = 20000; // 20 seconds

// Create Supabase client with improved timeouts and resilience
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    redirectTo: 'https://www.overtimestaff.com/token-validation',
  },
  global: {
    // Custom fetch with timeout
    fetch: (...args) => {
      // @ts-ignore - the args type is complex but this works
      const [url, config] = args;
      const timeout = DEFAULT_TIMEOUT;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      return fetch(url, {
        ...config,
        signal: controller.signal,
      })
        .then(response => {
          clearTimeout(timeoutId);
          return response;
        })
        .catch(error => {
          clearTimeout(timeoutId);
          if (error.name === 'AbortError') {
            throw new Error(`Request timeout after ${timeout}ms`);
          }
          throw error;
        });
    },
    headers: {
      'X-Client-Info': 'overtimestaffapp-web'
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Create a service role client for admin operations
// WARNING: This should only be used in secure contexts (like serverless functions)
// NEVER expose this client in browser code
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  global: {
    headers: {
      'X-Client-Info': 'overtimestaffapp-admin'
    }
  }
});

// Function to check Supabase connection status with timeout
export const checkSupabaseConnection = async (
  maxRetries = 2, 
  timeoutMs = 3000
): Promise<boolean> => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Create a promise that will reject after a timeout
      const timeoutPromise = new Promise<never>((_resolve, reject) => {
        setTimeout(() => reject(new Error('Connection check timed out')), timeoutMs);
      });
      
      // Create a promise that will resolve with the health check result
      const healthCheckPromise = supabase.auth.getSession().then(() => true);
      
      // Race the two promises
      const isConnected = await Promise.race([healthCheckPromise, timeoutPromise]);
      if (isConnected) return true;
    } catch (error) {
      console.warn(`Connection check attempt ${attempt + 1} failed:`, error);
      if (attempt === maxRetries - 1) {
        console.error('All connection check attempts failed');
        return false;
      }
    }
  }
  
  return false;
};

// Optional: A function for centralized error handling
export const handleSupabaseError = (error: any): { message: string; code: string } => {
  if (!error) return { message: 'Unknown error', code: 'unknown' };
  
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorCode = error.code || 'unknown';
  
  // Map common Supabase errors to user-friendly messages
  const errorMap: Record<string, string> = {
    'auth/invalid-email': 'The email address is not valid.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/email-already-in-use': 'This email is already registered.',
    '23505': 'A record with this information already exists.',
    'timeout': 'The request timed out. Please try again.',
    'aborted': 'The request was aborted. Please try again.',
    'network_error': 'A network error occurred. Please check your connection.',
  };
  
  return { 
    message: errorMap[errorCode] || errorMessage,
    code: errorCode
  };
};
