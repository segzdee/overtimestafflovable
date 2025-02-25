
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the user ID from the Authorization header
    const authHeader = req.headers.get('Authorization')?.split('Bearer ')[1]
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Get the profile updates from request body
    const { profile } = await req.json()
    if (!profile) {
      throw new Error('No profile data provided')
    }

    // Get the user's ID
    const { data: userData, error: userError } = await supabase.auth.getUser(authHeader)
    if (userError) throw userError

    // Update the profile
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', userData.user.id)
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ profile: data }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
