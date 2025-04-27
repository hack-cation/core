import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { reactRouter } from '@react-router/dev/vite';

export default defineConfig({
  base: '',
  optimizeDeps: {
    include: ['prop-types']
  },
  plugins: [tailwindcss(), reactRouter()]
});
