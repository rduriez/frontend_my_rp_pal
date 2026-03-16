import { createApp } from "vue"
import { createPinia } from "pinia"
import { createRouter, createWebHistory } from "vue-router"
import { routes } from "vue-router/auto-routes"
import { i18n } from "./i18n"
import PrimeVue from "primevue/config"
import Aura from "@primeuix/themes/aura"
import App from "./App.vue"
import "./style.css"
import 'primeicons/primeicons.css'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.dark',
      },
    },
  })
  .mount("#app")