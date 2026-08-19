import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain (cyphertech.co.zw) is ACTIVE — base must stay '/'.
// Do NOT change back to '/cyphertech-v2/': the old project-site base path
// breaks asset URLs on the custom domain. See README.md "Custom Domain".
export default defineConfig({
  plugins: [react()],
  base: '/',
})
