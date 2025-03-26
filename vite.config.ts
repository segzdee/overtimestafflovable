
import { defineConfig, ConfigEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      "37f1a441-292f-495d-b558-9661305d7dd7.lovableproject.com",
      "localhost"
    ]
  },
  plugins: [
    react(),
    // The componentTagger will be conditionally added in development when lovable-tagger is installed
    mode === 'development' && (() => {
      try {
        // Using dynamic import for ESM module compatibility
        return {
          name: 'lovable-component-tagger',
          configResolved: async (config) => {
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
