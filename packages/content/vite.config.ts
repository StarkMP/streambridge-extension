import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@sdk': path.resolve(__dirname, '../sdk/src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: './src/index.ts',
      },
      output: {
        entryFileNames: 'content/[name].js',
        assetFileNames: 'content/[name].[ext]',
      },
    },
  },
});
