import { defineConfig } from 'vite' // Esta é a linha que está faltando!
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/tesouros-cariri/', 
})