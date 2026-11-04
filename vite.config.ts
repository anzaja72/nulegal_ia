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
    // Tres páginas de entrada; scripts/prerender.mjs las separa en un sitio por dominio (dist-sites/).
    build: {
      rollupOptions: {
        input: {
          resultado: path.resolve(__dirname, 'resultado.html'),
          manifiesto: path.resolve(__dirname, 'manifiesto.html'),
          'en-vivo': path.resolve(__dirname, 'en-vivo.html'),
          estados: path.resolve(__dirname, 'estados.html'),
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
