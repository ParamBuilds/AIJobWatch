import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: [
        { find: '@/components/ui', replacement: fileURLToPath(new URL('./src/components/ui', import.meta.url)) },
        { find: '@/components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
        { find: '@/lib', replacement: fileURLToPath(new URL('./src/lib', import.meta.url)) },
        { find: '@/context', replacement: fileURLToPath(new URL('./src/context', import.meta.url)) },
        { find: '@/data', replacement: fileURLToPath(new URL('./src/data', import.meta.url)) },
        { find: '@/pages', replacement: fileURLToPath(new URL('./src/pages', import.meta.url)) },
        { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
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
