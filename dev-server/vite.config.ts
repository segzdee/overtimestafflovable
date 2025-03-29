import { defineConfig } from 'vite';
// ...existing code...

export default defineConfig({
  // ...existing code...
  optimizeDeps: {
    esbuildOptions: {
      // Mark `lovable-tagger` as external to avoid loading it with `require`
      external: ['lovable-tagger']
    }
  },
  resolve: {
    alias: {
      // Ensure ESM compatibility
      'lovable-tagger': 'lovable-tagger/dist/index.mjs'
    }
  }
});
