
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FailedRegistrationEvent {
  operation: string;
  schema: string;
  table: string;
  attempt_id: number;
  email: string;
  ip_address: string;
  error_message: string;
  created_at: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase admin client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? '',
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ''
    );

    // Get event data from request
    const eventData: FailedRegistrationEvent = await req.json();
    
    console.log("Monitoring failed registration:", eventData);
    
    // Check for suspicious activity patterns
    const { data: recentAttempts, error: attemptsError } = await supabase
      .from('registration_attempts')
      .select('*')
      .eq('ip_address', eventData.ip_address)
      .eq('success', false)
      .gte('attempt_timestamp', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Last 24 hours
      .order('attempt_timestamp', { ascending: false });
    
    if (attemptsError) {
      console.error('Error checking recent failed attempts:', attemptsError);
    } else {
      // If there are multiple failed attempts from the same IP
      if (recentAttempts && recentAttempts.length >= 5) {
        console.warn(`Potential security issue: ${recentAttempts.length} failed registration attempts from IP ${eventData.ip_address} in the last 24 hours`);
        
        // Create a security alert for admins
        await supabase
          .from('notifications')
          .insert({
            profile_id: await getAdminUserId(supabase),
            type: 'security',
            title: 'Security Alert: Multiple Failed Registrations',
            message: `Multiple failed registration attempts (${recentAttempts.length}) detected from IP ${eventData.ip_address} in the last 24 hours.`,
          });
      }
    }
    
    // Aggregate common error types for analytics
    const { error: analyticsError } = await supabase.rpc(
      'update_registration_error_stats',
      { 
        p_error_message: eventData.error_message,
        p_timestamp: eventData.created_at
      }
    );
    
    if (analyticsError) {
      console.error('Error updating registration error stats:', analyticsError);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Failed registration monitored successfully"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error monitoring failed registration:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Failed to monitor registration"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

// Helper function to get admin user ID
async function getAdminUserId(supabase) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('role', 'admin')
      .limit(1)
      .single();
    
    if (error) throw error;
    return data.id;
  } catch (err) {
    console.error('Error getting admin user:', err);
    return null;
  }
}
