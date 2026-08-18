import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config — this is what runs "npm run dev" and starts your local server
export default defineConfig({
  plugins: [react()],
})
