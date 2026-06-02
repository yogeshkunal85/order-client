import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.js'],
    globals: true,
  },
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('http://localhost:3000/api'),
  },
});
