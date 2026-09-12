import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages project subpath — https://billsun9305.github.io/five-sutra-study/
  base: '/five-sutra-study/',
  plugins: [react()],
})
