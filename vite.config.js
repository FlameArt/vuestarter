import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "url";
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  optimizeDeps: {
    include: ['vuetify'],
  },
  plugins: [
    vue(), VueI18nPlugin({ /* options */ }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@icons": fileURLToPath(new URL("./node_modules/@heroicons/vue/", import.meta.url)),
      "@models": fileURLToPath(new URL("./models/", import.meta.url)),
    }
  },
  "server": {
    "port": 3111,
    "allowedHosts": true,
  },
  "preview": {
    "port": 3900,
    "allowedHosts": true,
  }
})
