
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
    const { shift_id, worker_id, status, photo_url, notes } = await req.json();

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

    // Get shift info
    const { data: shiftData, error: shiftError } = await supabaseClient
      .from("shifts")
      .select("id, tenant_id, title, location")
      .eq("id", shift_id)
      .single();

    if (shiftError) {
      return new Response(
        JSON.stringify({ error: "Shift not found" }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404
        }
      );
    }

    // Get worker info
    const { data: workerData, error: workerError } = await supabaseClient
      .from("shift_worker_profiles")
      .select("id, tenant_id")
      .eq("id", worker_id)
      .single();

    if (workerError) {
      return new Response(
        JSON.stringify({ error: "Worker not found" }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404
        }
      );
    }

    const timestamp = new Date().toISOString();
    
    // Update shift assignment status
    await supabaseClient
      .from("shift_assignments")
      .update({
        status: status,
        metadata: {
          ...shiftData.metadata,
          last_status: status,
          last_status_update: timestamp,
          photo_url: photo_url,
          notes: notes
        }
      })
      .eq("shift_id", shift_id)
      .eq("worker_id", worker_id);

    return new Response(
      JSON.stringify({
        success: true,
        updated_status: status,
        timestamp
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
