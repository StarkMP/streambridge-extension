import { defineConfig } from 'vite';

export default defineConfig({
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
