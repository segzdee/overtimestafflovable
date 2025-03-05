
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AuthDiagnosticEvent {
  operation: string;
  schema: string;
  table: string;
  event_id: number;
  user_id: string;
  event_type: string;
  event_data: Record<string, any>;
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
    const eventData: AuthDiagnosticEvent = await req.json();
    
    console.log("Processing auth diagnostic event:", eventData.event_type);
    
    // Process different auth diagnostic events
    switch (eventData.event_type) {
      case 'login_failed':
        await processFailedLogin(supabase, eventData);
        break;
      case 'login_success':
        await processSuccessfulLogin(supabase, eventData);
        break;
      case 'token_refresh':
        // Just log token refresh events
        console.log(`Token refresh for user ${eventData.user_id}`);
        break;
      case 'suspicious_activity':
        await processSuspiciousActivity(supabase, eventData);
        break;
      default:
        console.log(`Unhandled auth diagnostic event type: ${eventData.event_type}`);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Auth diagnostic event processed successfully"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error processing auth diagnostic event:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Failed to process auth diagnostic event"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

// Process failed login attempts
async function processFailedLogin(supabase, eventData: AuthDiagnosticEvent) {
  if (!eventData.user_id) return;
  
  try {
    // Get user's notification preferences
    const { data: preferences } = await supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', eventData.user_id)
      .single();
    
    // Check if we should send login notification
    if (preferences && preferences.login_notifications) {
      // Create notification for failed login
      await supabase
        .from('notifications')
        .insert({
          profile_id: eventData.user_id,
          type: 'security',
          title: 'Failed Login Attempt',
          message: `A login attempt from an unrecognized device was detected at ${new Date(eventData.created_at).toLocaleString()}.`,
        });
    }
    
    // Record the failed login in user's profile
    await supabase.rpc(
      'handle_failed_login',
      { 
        p_user_id: eventData.user_id,
        p_max_attempts: 5,
        p_lockout_minutes: 15
      }
    );
  } catch (error) {
    console.error('Error processing failed login:', error);
  }
}

// Process successful login events
async function processSuccessfulLogin(supabase, eventData: AuthDiagnosticEvent) {
  if (!eventData.user_id) return;
  
  try {
    // Reset failed login attempts
    await supabase.rpc(
      'reset_failed_login_attempts',
      { p_user_id: eventData.user_id }
    );
    
    // Record login activity
    await supabase.rpc(
      'record_user_login',
      { 
        p_user_id: eventData.user_id,
        p_session_token: eventData.event_data?.session_id || 'unknown',
        p_ip_address: eventData.event_data?.ip_address || 'unknown',
        p_user_agent: eventData.event_data?.user_agent || 'unknown',
        p_device_info: eventData.event_data?.device_info || {},
        p_session_hours: 24
      }
    );
    
    // Check if it's a new device
    if (eventData.event_data?.new_device) {
      // Get user's notification preferences
      const { data: preferences } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', eventData.user_id)
        .single();
      
      // Send notification about new device if enabled
      if (preferences && preferences.device_notifications) {
        await supabase
          .from('notifications')
          .insert({
            profile_id: eventData.user_id,
            type: 'security',
            title: 'New Device Login',
            message: `Your account was accessed from a new device at ${new Date(eventData.created_at).toLocaleString()}.`,
          });
      }
    }
  } catch (error) {
    console.error('Error processing successful login:', error);
  }
}

// Process suspicious activity alerts
async function processSuspiciousActivity(supabase, eventData: AuthDiagnosticEvent) {
  if (!eventData.user_id) return;
  
  try {
    // Create high-priority alert for the user
    await supabase
      .from('notifications')
      .insert({
        profile_id: eventData.user_id,
        type: 'security',
        title: 'Security Alert',
        message: eventData.event_data?.message || 'Suspicious activity detected on your account. Please review your recent activity.',
      });
    
    // Also alert an admin
    const adminId = await getAdminUserId(supabase);
    if (adminId) {
      await supabase
        .from('notifications')
        .insert({
          profile_id: adminId,
          type: 'security',
          title: 'Security Alert: Suspicious Activity',
          message: `Suspicious activity detected for user ${eventData.user_id}. Details: ${JSON.stringify(eventData.event_data)}`
        });
    }
  } catch (error) {
    console.error('Error processing suspicious activity:', error);
  }
}

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
