
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

serve(async (req) => {
  // Handle CORS preflight requests
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // In a real implementation, this would scan your project directory
    // For now, return a mock list of files
    const mockFiles = [
      { name: 'DevModeToggle.tsx', path: 'src/components/DevModeToggle.tsx' },
      { name: 'AuthProvider.tsx', path: 'src/contexts/auth/AuthProvider.tsx' },
      { name: 'useAuth.tsx', path: 'src/contexts/auth/useAuth.tsx' },
      { name: 'use-toast.ts', path: 'src/hooks/use-toast.ts' },
      { name: 'toaster.tsx', path: 'src/components/ui/toaster.tsx' },
      { name: 'Router.tsx', path: 'src/Router.tsx' },
      { name: 'App.tsx', path: 'src/App.tsx' },
      { name: 'DevModeContext.tsx', path: 'src/contexts/dev/DevModeContext.tsx' },
      { name: 'PasswordResetForm.tsx', path: 'src/components/forms/auth/PasswordResetForm.tsx' },
      { name: 'LoginForm.tsx', path: 'src/components/forms/auth/LoginForm.tsx' },
    ];

    return new Response(
      JSON.stringify({ files: mockFiles }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
