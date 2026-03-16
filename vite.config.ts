import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import VueRouter from "vue-router/vite"
import AutoImport from 'unplugin-auto-import/vite'
import tailwindcss from "@tailwindcss/vite"
import { fileURLToPath } from "url"

export default defineConfig({
  plugins: [
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        { 'vue-router/auto-routes': ['defineMeta'] },
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    VueRouter({ routesFolder: "src/pages" }),
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})