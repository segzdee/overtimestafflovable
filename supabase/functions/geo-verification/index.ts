
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Calculate distance between two coordinates using the Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in km
  
  return distance;
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { shift_id, staff_id, latitude, longitude, action } = await req.json();

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

    // Get shift data to verify location
    const { data: shiftData, error: shiftError } = await supabaseClient
      .from("shifts")
      .select("latitude, longitude, max_distance_km")
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

    // Calculate distance from venue
    const distance = calculateDistance(
      latitude, 
      longitude, 
      shiftData.latitude, 
      shiftData.longitude
    );

    // Check if user is within allowed distance
    const isWithinRange = distance <= (shiftData.max_distance_km || 0.5); // Default 500m

    if (!isWithinRange) {
      return new Response(
        JSON.stringify({ 
          verified: false, 
          message: `You're ${distance.toFixed(2)}km away from the venue. Must be within ${(shiftData.max_distance_km || 0.5).toFixed(2)}km to ${action}.`,
          distance: distance
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200
        }
      );
    }

    // Record clock in/out action
    const timestamp = new Date().toISOString();
    
    if (action === "clock-in") {
      await supabaseClient
        .from("shift_assignments")
        .update({
          clock_in_time: timestamp,
          clock_in_latitude: latitude,
          clock_in_longitude: longitude,
          status: "in_progress"
        })
        .eq("shift_id", shift_id)
        .eq("worker_id", staff_id);
    } else if (action === "clock-out") {
      await supabaseClient
        .from("shift_assignments")
        .update({
          clock_out_time: timestamp,
          clock_out_latitude: latitude,
          clock_out_longitude: longitude,
          status: "completed"
        })
        .eq("shift_id", shift_id)
        .eq("worker_id", staff_id);
    }

    return new Response(
      JSON.stringify({ 
        verified: true, 
        action: action,
        timestamp: timestamp,
        distance: distance 
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
