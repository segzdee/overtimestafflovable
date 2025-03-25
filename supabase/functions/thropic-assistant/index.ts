
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

// Analyze code and generate suggestions
function analyzeCode(code: string, filePath?: string): any[] {
  // This is a simplified analyzer that looks for common issues
  // In a real implementation, this would use more sophisticated code analysis
  const suggestions = [];
  
  // Check for useState without dependency array
  if (code.includes('useEffect') && !code.includes('useEffect(') && !code.includes('dependency array')) {
    suggestions.push({
      type: 'fix',
      description: 'useEffect missing dependency array',
      original: 'useEffect(() => {',
      suggested: 'useEffect(() => {\n  // Your effect logic\n}, [])'
    });
  }
  
  // Check for unused imports
  const importMatches = code.match(/import\s+{\s*([^}]+)\s*}\s+from\s+['"][^'"]+['"]/g) || [];
  for (const importStatement of importMatches) {
    const importedItems = importStatement.match(/import\s+{\s*([^}]+)\s*}\s+from/);
    if (importedItems && importedItems[1]) {
      const items = importedItems[1].split(',').map(item => item.trim().split(' ')[0]);
      for (const item of items) {
        if (item && !code.includes(`${item}(`) && !code.includes(`<${item}`) && !code.includes(` ${item}`) && item !== 'FC' && item !== 'ReactNode') {
          suggestions.push({
            type: 'enhancement',
            description: `Unused import: ${item}`,
            original: importStatement,
            suggested: importStatement.replace(new RegExp(`(,\\s*)?${item}\\s*(,\\s*)?`), '$2')
          });
        }
      }
    }
  }
  
  // Check for missing error handling in async functions
  if (code.includes('async') && !code.includes('try') && !code.includes('catch')) {
    suggestions.push({
      type: 'enhancement',
      description: 'Consider adding error handling to async functions',
      original: null,
      suggested: null
    });
  }
  
  // Check for long functions that could be refactored
  const functionMatches = code.match(/function\s+\w+\([^)]*\)\s*{[^}]*}/g) || [];
  for (const func of functionMatches) {
    if (func.length > 500) {
      suggestions.push({
        type: 'refactor',
        description: 'This function is quite long, consider breaking it down into smaller functions',
        original: null,
        suggested: null
      });
    }
  }
  
  return suggestions;
}

// Generate a response based on the prompt and code
function generateResponse(prompt: string, code: string, filePath?: string, mode?: string): string {
  // Check if the prompt is asking for debugging help
  if (prompt.toLowerCase().includes('debug') || prompt.toLowerCase().includes('error')) {
    return analyzeCodeForErrors(code, filePath);
  }
  
  // Check if the prompt is asking for a component
  if (prompt.toLowerCase().includes('component') || prompt.toLowerCase().includes('ui')) {
    return generateComponentSuggestion(prompt);
  }
  
  // Check if the prompt is asking for refactoring
  if (prompt.toLowerCase().includes('refactor')) {
    return suggestRefactoring(code, filePath);
  }
  
  // Default response with code analysis
  return generateDefaultResponse(prompt, code, filePath);
}

// Helper functions for different types of responses
function analyzeCodeForErrors(code: string, filePath?: string): string {
  const fileContext = filePath ? `in ${filePath}` : '';
  return `I've analyzed your code ${fileContext} and found potential issues:

${code.includes('useState') && !code.includes('import { useState }') ? '- Missing import for useState from React\n' : ''}
${code.includes('useEffect') && !code.includes('dependency array') ? '- useEffect missing dependency array, which could cause infinite loops\n' : ''}
${code.includes('async') && !code.includes('try') ? '- Async function without error handling\n' : ''}
${code.includes('console.log') ? '- Debug console.log statements should be removed in production\n' : ''}

Suggested fixes:
\`\`\`tsx
// Fix imports
${!code.includes('import React') && (code.includes('useState') || code.includes('useEffect')) ? 'import React, { useState, useEffect } from "react";\n' : ''}

// Fix hooks usage
${code.includes('useEffect') && !code.includes('dependency array') ? 'useEffect(() => {\n  // Your effect logic\n}, []); // Add appropriate dependencies\n' : ''}

// Add error handling
${code.includes('async') && !code.includes('try') ? 'try {\n  // Your async code\n} catch (error) {\n  console.error("Error:", error);\n}\n' : ''}
\`\`\``;
}

function generateComponentSuggestion(prompt: string): string {
  return `Here's a suggested component based on your request:

\`\`\`tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  title: string;
  description: string;
}

export function CustomComponent({ title, description }: Props) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  );
}
\`\`\`

You can customize this component by:
1. Adding more props as needed
2. Enhancing the styling using Tailwind classes
3. Adding interactive elements like buttons or inputs`;
}

function suggestRefactoring(code: string, filePath?: string): string {
  return `Based on analyzing your code${filePath ? ` in ${filePath}` : ''}, here's how you might refactor it:

1. Extract reusable logic into custom hooks
2. Break large components into smaller ones
3. Use the builder pattern for complex data transformations
4. Implement memoization for expensive calculations

Example refactoring:
\`\`\`tsx
// Before: Everything in one component
function LargeComponent() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    // Data fetching logic
  };
  
  return (
    <div>
      {/* Complex JSX */}
    </div>
  );
}

// After: Split into custom hook and smaller components
function useDataFetching() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      // Data fetching logic
    };
    
    fetchData();
  }, []);
  
  return data;
}

function DataItem({ item }) {
  return (
    <div>
      {/* Item rendering */}
    </div>
  );
}

function ImprovedComponent() {
  const data = useDataFetching();
  
  return (
    <div>
      {data.map(item => <DataItem key={item.id} item={item} />)}
    </div>
  );
}
\`\`\``;
}

function generateDefaultResponse(prompt: string, code: string, filePath?: string): string {
  return `I've analyzed your codebase patterns and have some suggestions:

- Your authentication system uses Supabase with React Router
- You're using Tailwind CSS with the shadcn/ui component library
- You have a dev mode toggle for debugging

For your specific request about "${prompt}", I recommend:
- Keep components small and focused
- Leverage React context for global state
- Use TypeScript interfaces for component props
- Consider adding unit tests for critical functionality

Is there a specific part of this you'd like me to elaborate on?`;
}

serve(async (req) => {
  // Handle CORS preflight requests
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { prompt, context, code, filePath, files, mode } = await req.json();
    
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
    
    // Generate response
    const response = generateResponse(prompt, code || '', filePath, mode);
    
    // Generate code suggestions if in debug-assist mode
    let suggestions = [];
    if (mode === 'debug-assist' && code) {
      suggestions = analyzeCode(code, filePath);
    }

    return new Response(
      JSON.stringify({ 
        response,
        suggestions
      }),
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
