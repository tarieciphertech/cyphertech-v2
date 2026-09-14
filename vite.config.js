import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// Custom domain (cyphertech.co.zw) is ACTIVE — base must stay '/'.
// The explicit HTML inputs below make public service pages real GitHub Pages
// documents (HTTP 200) rather than relying only on client-side SPA routing.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        repair: resolve(__dirname, 'services/repair/index.html'),
        computerRepair: resolve(__dirname, 'services/computer-repair/index.html'),
        mobilePhoneRepair: resolve(__dirname, 'services/mobile-phone-repair/index.html'),
      },
    },
  },
})
