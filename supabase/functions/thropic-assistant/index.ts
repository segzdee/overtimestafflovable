
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

    // In a real implementation, you would use an actual Thropic API key and endpoint
    // For now, we'll simulate a response for development purposes
    
    console.log(`Processing Thropic request. Context: ${context}, Prompt: ${prompt}`);
    if (code) {
      console.log(`Code snippet provided for analysis: ${code.substring(0, 100)}...`);
    }
    if (files && files.length) {
      console.log(`Files provided for context: ${files.map((f: any) => f.name).join(', ')}`);
    }
    
    // Simulate API response delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate simulated response based on context and prompt
    let response = "";
    
    if (prompt.toLowerCase().includes("debug") || prompt.toLowerCase().includes("error")) {
      response = "I've analyzed your code and found potential issues:\n\n";
      response += "- Check if you're handling async operations correctly\n";
      response += "- Verify all your component props are properly typed\n";
      response += "- Look for missing dependencies in useEffect hooks\n\n";
      response += "You might want to add console.log statements to trace the execution flow.";
      
      if (code) {
        response += "\n\nSpecific to your code sample:\n";
        response += "- Consider adding error boundaries around async components\n";
        response += "- Make sure all state updates are properly handled";
      }
    } 
    else if (prompt.toLowerCase().includes("component") || prompt.toLowerCase().includes("ui")) {
      response = "Here's a suggested component structure:\n\n";
      response += "```tsx\nimport React from 'react';\nimport { Card, CardContent } from '@/components/ui/card';\n\n";
      response += "interface Props {\n  title: string;\n  description: string;\n}\n\n";
      response += "export function MyComponent({ title, description }: Props) {\n";
      response += "  return (\n    <Card>\n      <CardContent>\n        <h3>{title}</h3>\n        <p>{description}</p>\n      </CardContent>\n    </Card>\n  );\n}\n```";
    }
    else if (prompt.toLowerCase().includes("refactor")) {
      response = "Here's how you might refactor your code:\n\n";
      response += "1. Extract the repeated logic into a custom hook\n";
      response += "2. Break down large components into smaller, focused ones\n";
      response += "3. Use the strategy pattern for conditional rendering\n\n";
      response += "This will improve maintainability and readability.";
      
      if (code) {
        response += "\n\nFor your specific code, consider:\n";
        response += "```tsx\n// Create a custom hook\nfunction useDataFetching() {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  \n  useEffect(() => {\n    // Fetching logic here\n  }, []);\n  \n  return { data, loading };\n}\n```";
      }
    }
    else if (prompt.toLowerCase().includes("test") || prompt.toLowerCase().includes("testing")) {
      response = "Here's a testing approach for your code:\n\n";
      response += "```tsx\nimport { render, screen, fireEvent } from '@testing-library/react';\n";
      response += "import YourComponent from './YourComponent';\n\n";
      response += "describe('YourComponent', () => {\n";
      response += "  test('renders correctly', () => {\n";
      response += "    render(<YourComponent />);\n";
      response += "    expect(screen.getByText('Expected Text')).toBeInTheDocument();\n";
      response += "  });\n\n";
      response += "  test('handles user interaction', () => {\n";
      response += "    render(<YourComponent />);\n";
      response += "    fireEvent.click(screen.getByRole('button'));\n";
      response += "    expect(screen.getByText('New State')).toBeInTheDocument();\n";
      response += "  });\n";
      response += "});\n```";
    }
    else if (prompt.toLowerCase().includes("api") || prompt.toLowerCase().includes("endpoint")) {
      response = "Here's how to implement an API endpoint with Supabase Edge Functions:\n\n";
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
      response = "I've analyzed your request and have some suggestions:\n\n";
      response += "- Consider using TanStack Query for data fetching\n";
      response += "- Look into using the Context API for state management\n";
      response += "- Organize your components using the Atomic Design methodology\n\n";
      response += "Let me know if you need more specific guidance!";
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
