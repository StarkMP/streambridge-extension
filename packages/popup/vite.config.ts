import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@sdk': path.resolve(__dirname, '../sdk/src'),
    },
  },
  plugins: [react()],
  base: './',
  publicDir: false,
});
