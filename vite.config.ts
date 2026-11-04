import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    // Una página real por versión (sin selector ni reescrituras de servidor):
    //   /resultado/  /manifiesto/  /en-vivo/   (y / con el índice de versiones)
    build: {
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, 'index.html'),
          resultado: path.resolve(__dirname, 'resultado/index.html'),
          manifiesto: path.resolve(__dirname, 'manifiesto/index.html'),
          'en-vivo': path.resolve(__dirname, 'en-vivo/index.html'),
        },
      },
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
