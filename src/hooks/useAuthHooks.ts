
import { useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { checkSupabaseConnection } from '@/lib/supabase/client';

/**
 * Hook to manage authentication-related hooks and edge function connections
 */
export function useAuthHooks() {
  const { toast } = useToast();
  
  /**
   * Send an auth diagnostic event
   */
  const sendAuthDiagnostic = useCallback(async (
    eventType: string,
    userData: any = null,
    eventData: Record<string, any> = {}
  ) => {
    try {
      // Check connection first
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        console.warn('Cannot send auth diagnostic: offline');
        return false;
      }
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;
      
      // Add user information to event data if provided
      if (userData) {
        eventData.userData = userData;
      }
      
      // Call the edge function
      const { error } = await supabase.functions.invoke('process-auth-diagnostics', {
        body: {
          operation: 'INSERT',
          schema: 'public',
          table: 'auth_diagnostics',
          event_id: Date.now(),
          user_id: userId || null,
          event_type: eventType,
          event_data: eventData,
          created_at: new Date().toISOString()
        }
      });
      
      if (error) {
        console.error('Error sending auth diagnostic:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Failed to send auth diagnostic event:', error);
      return false;
    }
  }, []);
  
  /**
   * Process registration events
   */
  const processRegistration = useCallback(async (
    userId: string,
    email: string,
    role: string,
    additionalData: Record<string, any> = {}
  ) => {
    try {
      // Check connection first
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        console.warn('Cannot process registration: offline');
        return false;
      }
      
      // Call the edge function
      const { error } = await supabase.functions.invoke('process-registration', {
        body: {
          operation: 'INSERT',
          schema: 'public',
          table: 'profiles',
          user_id: userId,
          email: email,
          role: role,
          created_at: new Date().toISOString(),
          ...additionalData
        }
      });
      
      if (error) {
        console.error('Error processing registration:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Failed to process registration:', error);
      return false;
    }
  }, []);
  
  /**
   * Monitor failed registration attempts
   */
  const monitorFailedRegistration = useCallback(async (
    email: string,
    errorMessage: string,
    ipAddress?: string
  ) => {
    try {
      // Check connection first
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        console.warn('Cannot monitor failed registration: offline');
        return false;
      }
      
      // Call the edge function
      const { error } = await supabase.functions.invoke('monitor-failed-registrations', {
        body: {
          operation: 'INSERT',
          schema: 'public',
          table: 'registration_attempts',
          attempt_id: Date.now(),
          email: email,
          ip_address: ipAddress || null,
          error_message: errorMessage,
          created_at: new Date().toISOString()
        }
      });
      
      if (error) {
        console.error('Error monitoring failed registration:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Failed to monitor failed registration:', error);
      return false;
    }
  }, []);
  
  return {
    sendAuthDiagnostic,
    processRegistration,
    monitorFailedRegistration
  };
}
