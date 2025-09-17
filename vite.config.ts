import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer({ open: true })],

  optimizeDeps: {
    include: ['lucide-react'],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // ⚡ très important pour sous-domaine
  base: '/', // car ton app est servie à la racine du sous-domaine front.yeshouatv.com

  build: {
    outDir: 'dist',

    // Augmente la limite d'avertissement si nécessaire
    chunkSizeWarningLimit: 1000, // 1000 kB au lieu de 500 kB

    rollupOptions: {
      output: {
        // Crée des chunks séparés pour les librairies volumineuses
        manualChunks: {
          react: ['react', 'react-dom'],
          lucide: ['lucide-react'],
          router: ['react-router-dom'],
          dateFns: ['date-fns'],
          hlsjs: ['hls.js'],
        },
      },
    },
  },
})
