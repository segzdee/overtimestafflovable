
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      external: []
    }
  },
  resolve: {
    alias: {}
  }
});
