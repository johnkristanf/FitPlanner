import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({

  server: {
    port: 8080,
    proxy: {
      '/server': {
        target: "http://localhost:4000",
        changeOrigin: true
      }
    }
  },
  
  plugins: [react()],
})
