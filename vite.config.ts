plugins: [
  react(),
  componentTagger()
],<<<<<<< HEAD
import { defineConfig, ConfigEnv } from "vite";
=======

import { defineConfig } from "vite";
>>>>>>> c1a7d335750f4cbd9a387ea96a3e6de74fa29ec1
import react from "@vitejs/plugin-react-swc";
import path from "path";
<<<<<<< HEAD
import componentTagger from "@lovable/component-tagger";
=======
import { componentTagger } from "lovable-tagger";
>>>>>>> c1a7d335750f4cbd9a387ea96a3e6de74fa29ec1

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
<<<<<<< HEAD
    componentTagger(),
    // Note: Previously removed due to ESM compatibility issues
    // If issues persist, may need additional configuration
  ],
=======
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
>>>>>>> c1a7d335750f4cbd9a387ea96a3e6de74fa29ec1
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
