
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
    // The componentTagger will be imported dynamically in development mode
    mode === 'development' && {
      name: 'dynamic-tagger',
      async configureServer(server) {
        try {
          // Dynamically import the tagger only in dev mode
          const { componentTagger } = await import('lovable-tagger');
          const plugin = componentTagger();
          if (plugin.configureServer) {
            plugin.configureServer(server);
          }
        } catch (e) {
          console.warn('Could not load lovable-tagger:', e);
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-components": ["@/components/ui"],
          "auth": ["@/contexts/auth"],
        },
      },
    },
    sourcemap: process.env.NODE_ENV !== "production",
    chunkSizeWarningLimit: 1000,
  },
}));
