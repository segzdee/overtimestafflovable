
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Define CORS headers for browser access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handle OPTIONS requests for CORS preflight
const handleCors = (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  return null;
};

// Define role permissions structure
const ROLE_PERMISSIONS = {
  admin: {
    label: 'Admin',
    permissions: ['create', 'read', 'update', 'delete', 'manage_users'],
  },
  company: {
    label: 'Company',
    permissions: ['read', 'update', 'manage_team'],
  },
  agency: {
    label: 'Agency',
    permissions: ['read', 'update', 'manage_team'],
  },
  shift_worker: {
    label: 'Shift Worker',
    permissions: ['read', 'update'],
  },
  aiagent: {
    label: 'AI Agent',
    permissions: ['read'],
  },
};

serve(async (req) => {
  // Handle CORS preflight requests
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { 
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse request body
    const { role, permission, resourceId, tenantId } = await req.json();
    
    if (!role) {
      return new Response(
        JSON.stringify({ error: "Role is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if role exists
    if (!ROLE_PERMISSIONS[role]) {
      return new Response(
        JSON.stringify({ error: "Invalid role" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate permission if specified
    if (permission && !ROLE_PERMISSIONS[role].permissions.includes(permission)) {
      return new Response(
        JSON.stringify({ 
          authorized: false,
          message: `Role '${role}' does not have permission '${permission}'`
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate tenant access if applicable
    // This is a simplified implementation - in a real app, you would check against database records
    if (resourceId && tenantId) {
      // In a real implementation, check if the user has access to the resource based on tenantId
      console.log(`Validating access for tenant ${tenantId} to resource ${resourceId}`);
      
      // For demo purposes, we'll assume access is granted
      // In a real app, you would check against database records
    }

    return new Response(
      JSON.stringify({
        authorized: true,
        role: role,
        permissions: ROLE_PERMISSIONS[role].permissions,
        message: "Access authorized"
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error("Error in auth-role-validation function:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
