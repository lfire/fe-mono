import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'node:buffer': 'buffer',
    },
  },
  server: {
    port: 8088,
  },
});
