import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared/src'),
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
