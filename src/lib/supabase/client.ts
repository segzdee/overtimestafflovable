
import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qdyyfxgonldvghrtjhnn.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeXlmeGdvbmxkdmdocnRqaG5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MDAzMTMsImV4cCI6MjA1NTk3NjMxM30.eS660marbWwss7pQFbMUBJ_e2mhH7JBJvaP7Kr3ZU0M';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeXlmeGdvbmxkdmdocnRqaG5uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDQwMDMxMywiZXhwIjoyMDU1OTc2MzEzfQ.MKIcuSLo_ZI6PTA44VyHFes5wV1xpKMRYv-AWxr3qp0';

// Create a more resilient fetch implementation with adaptive timeouts and caching
const createResilientFetch = () => {
  // Initial configuration
  let currentTimeoutMs = 5000; // Start with 5 seconds
  const maxTimeoutMs = 20000; // Maximum timeout
  const initialTimeoutMs = 5000; // Initial timeout
  
  // Simple in-memory cache
  const cache = new Map();
  const CACHE_TTL = 60000; // 1 minute cache TTL
  
  return (url: string, options: RequestInit = {}) => {
    // If this is a GET request and cache is available, try to return from cache
    const cacheKey = options.method === 'GET' || !options.method ? url : '';
    if (cacheKey && cache.has(cacheKey)) {
      const { data, expiry } = cache.get(cacheKey);
      if (expiry > Date.now()) {
        return Promise.resolve(new Response(data.body, data));
      } else {
        cache.delete(cacheKey); // Remove expired item
      }
    }

    const controller = new AbortController();
    const originalSignal = options.signal;
    
    // Combine our abort signal with any existing one
    if (originalSignal) {
      if (originalSignal.aborted) {
        controller.abort();
      } else {
        originalSignal.addEventListener('abort', () => controller.abort());
      }
    }
    
    const timeoutId = setTimeout(() => {
      controller.abort();
      // Increase the timeout for next attempts
      currentTimeoutMs = Math.min(currentTimeoutMs * 1.5, maxTimeoutMs);
      console.log(`Request timed out, increasing timeout to ${currentTimeoutMs}ms for next attempt`);
    }, currentTimeoutMs);
    
    return fetch(url, { ...options, signal: controller.signal })
      .then(response => {
        clearTimeout(timeoutId);
        
        // Reset timeout on success gradually
        currentTimeoutMs = Math.max(initialTimeoutMs, currentTimeoutMs * 0.8);
        
        // Clone the response for caching if it's a GET request
        if (cacheKey && response.ok) {
          response.clone().text().then(body => {
            cache.set(cacheKey, {
              data: {
                body,
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries())
              },
              expiry: Date.now() + CACHE_TTL
            });
          });
        }
        
        return response;
      })
      .catch(error => {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
          console.warn(`Supabase request to ${url.split('?')[0]} timed out after ${currentTimeoutMs}ms`);
          throw new Error(`Request timed out after ${currentTimeoutMs}ms`);
        }
        throw error;
      });
  };
};

// Supabase client options with performance optimizations
const options = {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
  global: {
    fetch: createResilientFetch(),
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
};

// Create Supabase client with improved performance
export const supabase = createClient(supabaseUrl, supabaseAnonKey, options);

// Create a service role client for admin operations
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

// Function to check Supabase connection status with improved retry handling
export const checkSupabaseConnection = async (
  maxRetries = 3, 
  timeoutMs = 5000
): Promise<boolean> => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Create a promise that will reject after a timeout
      const timeoutPromise = new Promise<never>((_resolve, reject) => {
        setTimeout(() => reject(new Error('Connection check timed out')), timeoutMs + (attempt * 1000)); // Increase timeout with each retry
      });
      
      // Create a promise that will resolve with the health check result
      const healthCheckPromise = Promise.race([
        supabase.auth.getSession().then(() => true),
        // Also try another endpoint as a fallback
        supabase.from('profiles').select('count', { count: 'exact', head: true }).then(() => true)
      ]);
      
      // Race the promises
      const isConnected = await Promise.race([healthCheckPromise, timeoutPromise]);
      if (isConnected) {
        if (attempt > 0) {
          console.log(`Supabase connection restored after ${attempt + 1} attempts`);
        }
        return true;
      }
    } catch (error) {
      const waitTime = Math.min(1000 * Math.pow(2, attempt), 8000); // Exponential backoff
      console.warn(`Connection check attempt ${attempt + 1}/${maxRetries} failed: ${error.message}`);
      console.warn(`Waiting ${waitTime}ms before next attempt...`);
      
      if (attempt < maxRetries - 1) {
        // Wait before trying again with exponential backoff
        await new Promise(resolve => setTimeout(resolve, waitTime));
      } else {
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
