import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
    resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@icons": fileURLToPath(new URL("./node_modules/@heroicons/vue/solid/", import.meta.url))
    }
  },
})
