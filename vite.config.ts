
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // The componentTagger will be conditionally added in development when lovable-tagger is installed
    mode === 'development' && (() => {
      try {
        // Using dynamic import for ESM module compatibility
        return {
          name: 'lovable-component-tagger',
          async configResolved() {
            try {
              const { componentTagger } = await import('lovable-tagger');
              return componentTagger();
            } catch (e) {
              console.warn('Lovable tagger not available, skipping component tagging');
              return null;
            }
          }
        };
      } catch (e) {
        console.warn('Lovable tagger setup failed:', e);
        return null;
      }
    })(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
  }
}));
