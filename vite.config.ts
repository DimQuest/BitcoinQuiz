
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This allows process.env to be accessible in the browser context
    'process.env': process.env
  }
});
