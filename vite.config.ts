import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Garante que o ambiente de build seja moderno o suficiente
    // para suportar 'import.meta.env'
    target: 'esnext'
  }
})

