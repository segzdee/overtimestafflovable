
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
    const { shift_id } = await req.json();

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

    // Get shift details
    const { data: shiftData, error: shiftError } = await supabaseClient
      .from("shifts")
      .select(`
        id,
        title,
        required_skills,
        start_time,
        end_time,
        hourly_rate,
        location
      `)
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

    // Find matching workers based on skills
    // Note: This is a simplified implementation - a real one would be more complex
    const { data: matchingStaff, error: matchingError } = await supabaseClient
      .from('shift_worker_profiles')
      .select(`
        id,
        tenant_id,
        skills
      `)
      .contains('skills', shiftData.required_skills);

    if (matchingError) {
      return new Response(
        JSON.stringify({ error: matchingError.message }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500
        }
      );
    }

    // Create shift applications for matching workers (simplified approach)
    const applications = matchingStaff.map(worker => ({
      shift_id: shift_id,
      applicant_id: worker.id,
      status: 'pending',
      created_at: new Date().toISOString()
    }));

    if (applications.length > 0) {
      await supabaseClient
        .from('shift_applications')
        .insert(applications);
    }

    return new Response(
      JSON.stringify({
        success: true,
        matched_staff_count: matchingStaff.length,
        shift: shiftData
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
