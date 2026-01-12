import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:"/crmdemo/",
  plugins: [react()],
  build: {
    target: "es2017", // 👈 IMPORTANT
  },
})
