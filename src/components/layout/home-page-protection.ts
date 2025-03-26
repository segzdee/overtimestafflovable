// src/utils/homePageProtection.ts
import React from 'react';

// Define essential component types
interface EssentialComponents {
  HeaderNav: React.ComponentType<any>;
  HeroSection: React.ComponentType<any>;
  LoginCards: React.ComponentType<any>;
  MarketUpdates: React.ComponentType<any>;
  HowItWorks: React.ComponentType<any>;
  Footer: React.ComponentType<any>;
}

// The current approved structure hash - update this when structure intentionally changes
const APPROVED_HOME_STRUCTURE = 'v1.2.3-6c0mp';

// Function to protect the home page structure
export function protectHomePageStructure(components: Partial<EssentialComponents>) {
  // Check if all essential components are present
  const essentialComponents = [
    'HeaderNav',
    'HeroSection', 
    'LoginCards',
    'MarketUpdates',
    'HowItWorks',
    'Footer'
  ];
  
  const providedComponents = Object.keys(components);
  
  // Check if all essential components are included
  const missingComponents = essentialComponents.filter(
    comp => !providedComponents.includes(comp)
  );
  
  // If any components are missing, don't allow rendering
  if (missingComponents.length > 0) {
    console.error(
      `Home page cannot load: Missing essential components: ${missingComponents.join(', ')}`
    );
    return {
      isValid: false,
      missingComponents,
      render: () => <HomePageFallback missing={missingComponents} />
    };
  }
  
  // Verify component signatures to prevent fake components
  const componentHash = generateComponentHash(components);
  const isValidStructure = verifyComponentHash(componentHash);
  
  if (!isValidStructure) {
    console.error('Home page structure has been modified unexpectedly');
    return {
      isValid: false,
      missingComponents: [],
      render: () => <HomePageFallback modified={true} />
    };
  }
  
  // If everything checks out, allow rendering
  return {
    isValid: true,
    missingComponents: [],
    render: null
  };
}

// Generate a hash of component signatures to detect modifications
function generateComponentHash(components: Partial<EssentialComponents>): string {
  // This is a simplified version - in production you'd want a more robust hash
  return Object.entries(components)
    .map(([name, component]) => `${name}:${component.toString().length}`)
    .join('|');
}

// Verify the component hash against approved versions
function verifyComponentHash(hash: string): boolean {
  // In a real implementation, you might check against multiple approved hashes
  // or fetch from a secure source
  
  // For now, just check against the current approved version
  // In production, this would verify against a list of known good hashes
  return process.env.NODE_ENV === 'development' || 
         hash.startsWith(APPROVED_HOME_STRUCTURE);
}

// Fallback component to display when home page can't load
function HomePageFallback({ 
  missing = [], 
  modified = false 
}: { 
  missing?: string[],
  modified?: boolean
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <h1 className="text-xl font-bold text-red-600 mb-4">
          Home Page Error
        </h1>
        
        {modified ? (
          <p className="text-gray-700 mb-4">
            The home page structure has been unexpectedly modified and cannot load.
            Please contact the development team.
          </p>
        ) : (
          <div>
            <p className="text-gray-700 mb-2">
              The home page cannot load due to missing components:
            </p>
            <ul className="list-disc list-inside text-left mb-4">
              {missing.map(comp => (
                <li key={comp} className="text-red-500">{comp}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mt-6">
          <button 
            onClick={() => window.location.href = '/market'}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Market Page
          </button>
        </div>
      </div>
    </div>
  );
}