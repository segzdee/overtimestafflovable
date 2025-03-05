
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RegistrationEvent {
  operation: string;
  schema: string;
  table: string;
  user_id: string;
  email: string;
  role: string;
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
    const eventData: RegistrationEvent = await req.json();
    
    console.log("Processing registration event:", eventData);
    
    // Perform post-registration processing
    // 1. Send welcome email or notification
    // 2. Set up any default data needed for the user
    // 3. Trigger any integration with external systems
    
    // Example: Create a notification for the user
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert({
        profile_id: eventData.user_id,
        type: 'system',
        title: 'Welcome to OVERTIMESTAFF',
        message: 'Your account has been created successfully. Complete your profile to get started.',
        link: '/complete-profile'
      });
    
    if (notificationError) {
      console.error('Failed to create welcome notification:', notificationError);
    }
    
    // Log the successful processing
    console.log(`Registration processing completed for user: ${eventData.user_id}`);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Registration processed successfully"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error processing registration:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Failed to process registration"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
