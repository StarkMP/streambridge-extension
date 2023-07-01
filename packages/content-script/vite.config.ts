import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared/src'),
    },
  },
  publicDir: '../../public',
  build: {
    emptyOutDir: true,
    outDir: '../../dist',
    rollupOptions: {
      input: {
        index: './src/index.ts',
      },
      output: {
        entryFileNames: 'content-script/[name].js',
        assetFileNames: 'content-script/[name].[ext]',
      },
    },
  },
});
