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

// Mock file content storage
const mockFileContents: Record<string, string> = {
  'src/components/DevModeToggle.tsx': `import { useState, useEffect, useCallback } from "react";
import { useDevMode } from "@/contexts/dev/DevModeContext";
// ... rest of DevModeToggle component
`,
  'src/contexts/auth/AuthProvider.tsx': `import React, { createContext, useState, useEffect } from 'react';
// Authentication provider implementation
`,
  'src/contexts/auth/useAuth.tsx': `// Re-export the useAuth hook from the provider
export { useAuth } from './AuthProvider';
`,
  'src/hooks/use-toast.ts': `// This file provides the core toast functionality
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";
// Rest of toast implementation
`,
};

serve(async (req) => {
  // Handle CORS preflight requests
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { path } = await req.json();
    
    if (!path) {
      return new Response(
        JSON.stringify({ error: "File path is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (!mockFileContents[path]) {
      return new Response(
        JSON.stringify({ error: `File not found: ${path}` }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // In a real implementation, this would read the file from your project directory
    // For now, return mock content or a placeholder
    const content = mockFileContents[path] || `// No content available for ${path}`;

    return new Response(
      JSON.stringify({ 
        content,
        path,
        lastModified: new Date().toISOString()
      }),
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
