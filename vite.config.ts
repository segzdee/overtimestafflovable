import { defineConfig, ConfigEnv, PluginOption } from "vite";
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
    mode === 'development' && (() => {
      try {
        const componentTaggerPlugin: PluginOption = {
          name: 'lovable-component-tagger',
          async configResolved() {
            try {
              const { componentTagger } = await import('lovable-tagger');
              if (componentTagger) {
                componentTagger();
              } else {
                console.warn('Component tagger function not found in lovable-tagger');
              }
            } catch (e) {
              console.warn('Lovable tagger not available, skipping component tagging:', e);
            }
          }
        };
        return componentTaggerPlugin;
      } catch (e) {
        console.warn('Lovable tagger setup failed:', e);
        return null;
      }
    })(),
  ].filter(Boolean), // Ensure null or undefined plugins are filtered out
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
    define: {
      'process.env.REACT_APP_NAME': JSON.stringify('YourReactAppName') // Replace with your app name
    }
  }
}));
