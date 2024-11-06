import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Esto permite que Vite escuche en todas las interfaces de red
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://54.162.233.65:8080', // Dirección HTTP del backend en EC2
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Ajusta el prefijo según sea necesario
      },
    },
  }
})
