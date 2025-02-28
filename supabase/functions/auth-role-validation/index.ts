
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { role, user_id } = await req.json();

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Get user data
    const { data: userData, error: userError } = await supabaseClient
      .from("profiles")
      .select("role")
      .eq("id", user_id)
      .single();

    if (userError) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404
        }
      );
    }

    // Validate role access
    if (userData.role !== role) {
      return new Response(
        JSON.stringify({ error: "Access denied. Invalid role for this user." }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 403
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        authorized: true, 
        role: userData.role
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500
      }
    );
  }
});
