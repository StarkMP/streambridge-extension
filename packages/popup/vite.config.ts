import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared/src'),
    },
  },
  plugins: [react()],
  base: './',
  publicDir: false,
  build: {
    outDir: '../../dist/popup',
  },
});
