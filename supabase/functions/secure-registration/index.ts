import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RegistrationRequest {
  email: string;
  password: string;
  role: "company" | "agency" | "shift-worker" | "admin" | "aiagent";
  name: string;
  category?: string;
  redirectUrl?: string;
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

    // Get registration data from request
    const registrationData: RegistrationRequest = await req.json();
    
    if (!registrationData.email || !registrationData.password || !registrationData.name || !registrationData.role) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Missing required fields"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Check for rate limiting (could be implemented with more sophistication)
    const ipAddress = req.headers.get('x-forwarded-for') || 'unknown';
    
    // Get client info for auditing
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    // Create the user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: registrationData.email,
      password: registrationData.password,
      email_confirm: false, // Require email verification
      user_metadata: {
        name: registrationData.name,
        role: registrationData.role,
        category: registrationData.category
      },
      app_metadata: {
        provider: "email"
      }
    });
    
    // Log the registration attempt
    await supabase
      .from('registration_attempts')
      .insert({
        email: registrationData.email,
        ip_address: ipAddress,
        user_agent: userAgent,
        success: !authError,
        error_message: authError?.message || null
      });

    if (authError) {
      // Log the registration attempt
      // Here you'd log to a table like 'registration_attempts'
      
      return new Response(
        JSON.stringify({
          success: false,
          message: authError.message
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    const user = authData.user;
    
    try {
      // Create user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: registrationData.email,
          role: registrationData.role,
          name: registrationData.name,
          category: registrationData.category,
          profile_complete: false
        });
      
      if (profileError) {
        throw profileError;
      }
      
      // Create notification preferences
      const { error: prefError } = await supabase
        .from('notification_preferences')
        .insert({
          user_id: user.id,
          email: true,
          sms: false,
          push: true
        });
      
      if (prefError) {
        console.error('Failed to create notification preferences:', prefError);
        // Non-critical, continue
      }
      
      // Log successful registration
      // Here you'd log to 'registration_attempts' with success=true
      
      return new Response(
        JSON.stringify({
          success: true,
          message: "Registration successful. Please check your email to verify your account.",
          userId: user.id
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    } catch (error) {
      // If profile creation failed, delete the auth user
      const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
      
      if (deleteError) {
        console.error('Failed to clean up auth user after failed registration:', deleteError);
      }
      
      // Log failure
      // Here you'd log to 'registration_attempts' with success=false
      
      return new Response(
        JSON.stringify({
          success: false,
          message: error.message || "Failed to create user profile"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
  } catch (error) {
    // Log unexpected error
    // Here you'd log to 'system_errors' or similar
    
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Internal server error"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
