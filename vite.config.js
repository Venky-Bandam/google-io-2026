import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: Replace 'repo-name' with the name of your GitHub repository.
// For example, if your URL is github.com/username/io-2026, the base should be '/io-2026/'
export default defineConfig({
  plugins: [react()],
  base: '/repo-name/', 
})