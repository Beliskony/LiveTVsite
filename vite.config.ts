import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps:{
    include: ['lucide-react']
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
  },
   build: {
    // Augmente la limite d'avertissement si nécessaire
    chunkSizeWarningLimit: 1000, // 1000 kB au lieu de 500 kB

    rollupOptions: {
      output: {
        // Crée des chunks séparés pour les librairies volumineuses
        manualChunks: {
          react: ['react', 'react-dom'],
          lucide: ['lucide-react'],
        },
      },
    },
  },
})
