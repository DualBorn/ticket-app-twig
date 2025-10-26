import { defineConfig } from 'vite';

export default defineConfig({
  root: './public',
  publicDir: false,
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './public/index.html',
      },
    },
  },
  server: {
    port: 5174,
    open: true,
  },
});

