import type { Router } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const publicRoutes = ['/login', '/register', '/forgot-password']

export function setupGuards(router: Router) {
  router.beforeEach((to) => {
    const auth = useAuthStore()

    if (!publicRoutes.includes(to.path) && !auth.isAuthenticated) {
      return { path: '/login' }
    }

    if (publicRoutes.includes(to.path) && auth.isAuthenticated) {
      return { path: '/' }
    }
  })
}