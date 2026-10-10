import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: [
        { find: '@/components/ui', replacement: path.resolve(__dirname, './src/components/ui') },
        { find: '@/components', replacement: path.resolve(__dirname, './src/components') },
        { find: '@/lib', replacement: path.resolve(__dirname, './src/lib') },
        { find: '@/context', replacement: path.resolve(__dirname, './src/context') },
        { find: '@/data', replacement: path.resolve(__dirname, './src/data') },
        { find: '@/pages', replacement: path.resolve(__dirname, './src/pages') },
        { find: '@', replacement: path.resolve(__dirname, './src') },
      ],
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
