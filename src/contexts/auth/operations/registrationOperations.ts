
import { supabase } from "@/lib/supabase/client";
import { AuthUser } from "../types";
import { executeWithConnectionRetry } from "@/lib/robust-connection-handler";

// Create a profile for a new user
export const createProfile = async (
  userId: string,
  email: string,
  role: AuthUser["role"],
  name: string,
  category?: string
) => {
  return executeWithConnectionRetry(
    async () => {
      const { error } = await supabase.from('profiles').insert({
        id: userId,
        email,
        role,
        name,
        category,
        profile_complete: false
      });
      
      if (error) throw error;
      return { success: true };
    },
    {
      maxRetries: 3,
      criticalOperation: false // Non-blocking for registration
    }
  );
};

// Create notification preferences for a new user
export const createNotificationPreferences = async (userId: string) => {
  return executeWithConnectionRetry(
    async () => {
      const { error } = await supabase.from('notification_preferences').insert({
        user_id: userId,
        email: true,
        sms: false,
        push: true
      });
      
      if (error) throw error;
      return { success: true };
    },
    {
      maxRetries: 3,
      criticalOperation: false // Non-blocking for registration
    }
  );
};

// Optimized registration function with connection resiliency
export const register = async (
  email: string,
  password: string,
  role: AuthUser["role"],
  name: string,
  category?: string
) => {
  try {
    // Use our connection-resilient executor for the critical signup operation
    const data = await executeWithConnectionRetry(
      async () => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              role,
              category
            },
            emailRedirectTo: `https://www.overtimestaff.com/verify-email`
          }
        });
        
        if (error) {
          // Enhanced error handling
          if (error.message.includes("duplicate key") || error.message.includes("already registered")) {
            throw new Error('This email is already registered. Please use a different email or try logging in.');
          }
          throw error;
        }
        
        if (!data.user) throw new Error('No user returned from sign up');
        
        return data;
      },
      {
        maxRetries: 5,
        initialBackoff: 1000,
        maxBackoff: 30000,
        criticalOperation: true
      }
    );
    
    console.log("Supabase signup response:", data);

    // Now handle the secondary operations
    try {
      // These operations are important but non-blocking for registration
      await Promise.allSettled([
        createProfile(data.user.id, email, role, name, category),
        createNotificationPreferences(data.user.id)
      ]);
      console.log('Registration completed successfully - all data created');
    } catch (innerError) {
      console.warn('Some profile data creation failed, but user was created successfully:', innerError);
      // Don't block the signup process if secondary operations fail
    }
    
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    
    // Improve error messages for common issues
    if (error instanceof Error) {
      if (error.message.includes('network') || error.message.includes('fetch')) {
        throw new Error('Network connection issue. Please check your internet connection and try again.');
      } else if (error.message.includes('timeout')) {
        throw new Error('The request timed out. Please try again when you have a stronger connection.');
      } else if (error.message.includes('rate') || error.message.includes('too many requests')) {
        throw new Error('Too many registration attempts. Please wait a moment before trying again.');
      }
    }
    
    // If we can't provide a better message, rethrow the original
    throw error;
  }
};
