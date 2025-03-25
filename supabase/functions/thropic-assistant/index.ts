
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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
    const { prompt, context, code, files } = await req.json();
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Log the request details for debugging
    console.log(`Processing Thropic request. Context: ${context}, Prompt length: ${prompt.length}`);
    console.log(`Code snippet provided: ${code?.substring(0, 100)}${code?.length > 100 ? '...' : ''}`);
    if (files && files.length) {
      console.log(`Files provided for context: ${files.map((f: any) => f.name).join(', ')}`);
    }
    
    // In a real implementation, you would use an actual AI API service here
    // This is a simulated response for development purposes
    
    // Simulate API response delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate simulated response based on context, prompt, and code analysis
    let response = "";
    
    if (prompt.toLowerCase().includes("debug") || prompt.toLowerCase().includes("error")) {
      response = "I've analyzed your code and found potential issues:\n\n";
      
      if (code) {
        // Perform basic static analysis on the code
        if (code.includes("useState") && !code.includes("import React")) {
          response += "- You might be missing React imports for hooks\n";
        }
        
        if (code.includes("useEffect") && !code.includes("dependency array")) {
          response += "- Check your useEffect dependency arrays\n";
        }
        
        if (code.includes("async") && code.includes("useState")) {
          response += "- Be careful with async functions and React state updates\n";
        }
        
        response += "\nSuggested fixes:\n";
        response += "```tsx\n// Fix imports\nimport React, { useState, useEffect } from 'react';\n\n// Fix hooks usage\nconst [state, setState] = useState(initialValue);\n```";
      } else {
        response += "- Check for circular dependencies between modules\n";
        response += "- Verify that all hooks are called at the top level of your components\n";
        response += "- Make sure components using hooks are properly wrapped in their parent providers\n";
      }
    } 
    else if (prompt.toLowerCase().includes("component") || prompt.toLowerCase().includes("ui")) {
      response = "Here's a suggested component structure based on your codebase patterns:\n\n";
      response += "```tsx\nimport React from 'react';\nimport { Card, CardContent } from '@/components/ui/card';\n\n";
      response += "interface Props {\n  title: string;\n  description: string;\n}\n\n";
      response += "export function MyComponent({ title, description }: Props) {\n";
      response += "  return (\n    <Card>\n      <CardContent>\n        <h3 className=\"text-lg font-medium\">{title}</h3>\n        <p className=\"text-muted-foreground\">{description}</p>\n      </CardContent>\n    </Card>\n  );\n}\n```";
    }
    else if (prompt.toLowerCase().includes("refactor")) {
      response = "Based on analyzing your codebase patterns, here's how you might refactor this code:\n\n";
      
      if (code) {
        // Check if code contains a large component that could be split
        if (code.length > 200 && (code.includes("return") || code.includes("JSX"))) {
          response += "I notice this component is getting large. Let's break it down:\n\n";
          response += "```tsx\n// Extract this part into a separate component\nfunction SubComponent({ data }) {\n  return (\n    <div>\n      {/* JSX for the extracted part */}\n    </div>\n  );\n}\n\n";
          response += "// Main component becomes simpler\nfunction MainComponent() {\n  return (\n    <div>\n      <SubComponent data={data} />\n    </div>\n  );\n}\n```";
        } else {
          response += "Consider extracting repeated logic into custom hooks and breaking large components into smaller ones.";
        }
      } else {
        response += "1. Move related logic into custom hooks\n";
        response += "2. Split large components into smaller, focused ones\n";
        response += "3. Implement context for shared state\n";
        response += "4. Use the builder pattern for complex data transformations\n";
      }
    }
    else if (prompt.toLowerCase().includes("test") || prompt.toLowerCase().includes("testing")) {
      response = "Based on your codebase patterns, here's a testing approach:\n\n";
      response += "```tsx\nimport { render, screen, fireEvent } from '@testing-library/react';\n";
      response += "import { ThemeProvider } from '@/contexts/theme';\n";
      response += "import YourComponent from './YourComponent';\n\n";
      response += "// Create a wrapper with all required providers\nconst AllProviders = ({ children }) => (\n";
      response += "  <ThemeProvider>\n    {children}\n  </ThemeProvider>\n);\n\n";
      response += "describe('YourComponent', () => {\n";
      response += "  test('renders correctly', () => {\n";
      response += "    render(<YourComponent />, { wrapper: AllProviders });\n";
      response += "    expect(screen.getByText('Expected Text')).toBeInTheDocument();\n";
      response += "  });\n});\n```";
    }
    else if (prompt.toLowerCase().includes("api") || prompt.toLowerCase().includes("endpoint")) {
      response = "Based on your Supabase setup, here's how to implement an API endpoint:\n\n";
      response += "```ts\n// supabase/functions/my-api/index.ts\n";
      response += "import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';\n\n";
      response += "const corsHeaders = {\n";
      response += "  'Access-Control-Allow-Origin': '*',\n";
      response += "  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',\n";
      response += "};\n\n";
      response += "serve(async (req) => {\n";
      response += "  if (req.method === 'OPTIONS') {\n";
      response += "    return new Response(null, { headers: corsHeaders });\n";
      response += "  }\n\n";
      response += "  try {\n";
      response += "    const { param1, param2 } = await req.json();\n";
      response += "    // Your business logic here\n";
      response += "    return new Response(\n";
      response += "      JSON.stringify({ result: 'Success' }),\n";
      response += "      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }\n";
      response += "    );\n";
      response += "  } catch (error) {\n";
      response += "    return new Response(\n";
      response += "      JSON.stringify({ error: error.message }),\n";
      response += "      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }\n";
      response += "    );\n";
      response += "  }\n";
      response += "});\n```";
    }
    else {
      // Default response with codebase-specific advice
      response = "I've analyzed your codebase patterns and have some suggestions:\n\n";
      response += "- Your authentication system uses Supabase with React Router\n";
      response += "- You're using Tailwind CSS with the shadcn/ui component library\n";
      response += "- You have a dev mode toggle for debugging\n\n";
      
      if (code) {
        response += "For your specific code, I recommend:\n";
        response += "- Verify all hooks follow React rules (called at top level)\n";
        response += "- Check for circular dependencies between modules\n";
        response += "- Ensure components are properly wrapped in their providers\n";
      } else {
        response += "Here are some best practices for your project:\n";
        response += "- Use custom hooks for complex state logic\n";
        response += "- Keep components small and focused\n";
        response += "- Leverage React context for global state\n";
        response += "- Use TypeScript interfaces for component props\n";
      }
    }

    return new Response(
      JSON.stringify({ response }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error("Error in thropic-assistant function:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
