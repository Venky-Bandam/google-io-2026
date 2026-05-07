import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This MUST match your repository name: 'google-io-2026'
export default defineConfig({
  plugins: [react()],
  base: '/google-io-2026/', 
})