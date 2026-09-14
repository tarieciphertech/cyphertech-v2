import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// Custom domain (cyphertech.co.zw) is ACTIVE — base must stay '/'.
// Explicit HTML inputs make public service/location pages real GitHub Pages
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
        laptopRepair: resolve(__dirname, 'services/laptop-repair/index.html'),
        laptopScreenReplacement: resolve(__dirname, 'services/laptop-screen-replacement/index.html'),
        computerDiagnostics: resolve(__dirname, 'services/computer-diagnostics/index.html'),
        windowsSoftwareRepair: resolve(__dirname, 'services/windows-software-repair/index.html'),
        virusMalwareRemoval: resolve(__dirname, 'services/virus-malware-removal/index.html'),
        dataRecovery: resolve(__dirname, 'services/data-recovery/index.html'),
        phoneScreenReplacement: resolve(__dirname, 'services/phone-screen-replacement/index.html'),
        phoneBatteryReplacement: resolve(__dirname, 'services/phone-battery-replacement/index.html'),
        androidSamsungRepair: resolve(__dirname, 'services/android-samsung-repair/index.html'),
        iphoneRepair: resolve(__dirname, 'services/iphone-repair/index.html'),
        businessComputerRepair: resolve(__dirname, 'services/business-computer-repair/index.html'),
        onsitePhoneRepair: resolve(__dirname, 'services/on-site-phone-repair-gaborone-tlokweng/index.html'),
        gaboroneComputerRepair: resolve(__dirname, 'locations/gaborone/computer-repair/index.html'),
        tlokwengComputerRepair: resolve(__dirname, 'locations/tlokweng/computer-repair/index.html'),
        gaboronePhoneRepair: resolve(__dirname, 'locations/gaborone/phone-repair/index.html'),
        tlokwengPhoneRepair: resolve(__dirname, 'locations/tlokweng/phone-repair/index.html'),
      },
    },
  },
})
