import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'src/popup',
  base: './',
  publicDir: false,
  build: {
    outDir: '../../dist/popup',
    rollupOptions: {
      input: './src/popup/index.html',
      output: {
        entryFileNames: '[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
});
