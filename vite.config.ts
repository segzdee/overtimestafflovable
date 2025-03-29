
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
    // Removed componentTagger as it's causing ESM compatibility issues
  ],
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
