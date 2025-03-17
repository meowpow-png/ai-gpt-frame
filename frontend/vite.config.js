import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      proxy: {
      "/api": {
        target: "http://172.17.0.1:8080", // Works for Dockerized frontend (On Linux)
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
