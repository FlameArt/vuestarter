import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@icons": fileURLToPath(new URL("./node_modules/@heroicons/vue/", import.meta.url)),
      "@models": fileURLToPath(new URL("./models/", import.meta.url)),
    }
  },
  "server": {
    "port": 3000
  },
  "preview": {
    "port": 3000
  }
})
