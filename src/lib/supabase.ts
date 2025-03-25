import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cavtxsryftvzsenhxokf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhdnR4c3J5ZnR2enNlbmh4b2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NDk0NjMsImV4cCI6MjA1ODAyNTQ2M30.ZUMt50Sq5GtooqbNvZ0V0IH35bKSyvlvalLnxbpAiSM';

// Create Supabase client with full type support
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Authentication helpers
export const auth = {
  // Sign up with email and password
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return { data, error };
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  },

  // Sign in with phone
  signInWithPhone: async (phone: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({ phone });
    return { data, error };
  },

  // Verify OTP
  verifyOtp: async (phone: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms' });
    return { data, error };
  },

  // OAuth sign in
  signInWithOAuth: async (provider: 'github' | 'google' | 'facebook' | 'twitter') => {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider });
    return { data, error };
  },

  // Get current user
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    return { user: data.user, error };
  },

  // Password recovery
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    return { data, error };
  },

  // Update user
  updateUser: async (updates: { email?: string; password?: string; data?: any }) => {
    const { data, error } = await supabase.auth.updateUser(updates);
    return { data, error };
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },
};

// Database helpers
export const db = {
  // Generic select function with type safety
  select: async <T>(
    table: string, 
    options?: { 
      columns?: string, 
      filter?: { column: string; value: any }[],
      limit?: number,
      order?: { column: string, ascending?: boolean }
    }
  ): Promise<{ data: T | null; error: any }> => {
    let query = supabase.from(table).select(options?.columns || '*');
    
    if (options?.filter) {
      options.filter.forEach(f => {
        query = query.eq(f.column, f.value);
      });
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.order) {
      query = query.order(options.order.column, { ascending: options.order.ascending ?? true });
    }

    const { data, error } = await query;
    return { data: data as T, error };
  },

  // Insert function
  insert: async <T>(table: string, data: any): Promise<{ data: T | null; error: any }> => {
    const { data: result, error } = await supabase.from(table).insert(data).select().single();
    return { data: result as T, error };
  },

  // Update function
  update: async <T>(
    table: string, 
    data: any, 
    match: { column: string; value: any }
  ): Promise<{ data: T | null; error: any }> => {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq(match.column, match.value)
      .select()
      .single();
    return { data: result as T, error };
  },

  // Delete function
  delete: async (
    table: string, 
    match: { column: string; value: any }
  ): Promise<{ error: any }> => {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq(match.column, match.value);
    return { error };
  },
};

// Storage helpers
export const storage = {
  // Upload file
  upload: async (bucket: string, path: string, file: File) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true });
    return { data, error };
  },

  // Get public URL for a file
  getPublicUrl: (bucket: string, path: string) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },

  // Download file
  download: async (bucket: string, path: string) => {
    const { data, error } = await supabase.storage.from(bucket).download(path);
    return { data, error };
  },

  // List files in a bucket
  list: async (bucket: string, path?: string) => {
    const { data, error } = await supabase.storage.from(bucket).list(path || '');
    return { data, error };
  },

  // Delete file
  delete: async (bucket: string, paths: string[]) => {
    const { data, error } = await supabase.storage.from(bucket).remove(paths);
    return { data, error };
  },
};

// Create a hook to subscribe to auth changes
export const onAuthStateChange = (callback: (user: any) => void) => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });
  return () => {
    data.subscription.unsubscribe();
  };
};
