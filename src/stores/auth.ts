import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchLogin, fetchRefresh, fetchRegister } from '@/api/auth'
import { fetchMe } from '@/api/user'
import type { AuthTokens, UserResponse, LoginRequest, RegisterRequest } from '@/api/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(localStorage.getItem('access_token'))
  const refreshToken = ref<string | null>(localStorage.getItem('refresh_token'))
  const user = ref<UserResponse | null>(null)

  const isAuthenticated = computed(() => !!accessToken.value)

  async function login(payload: LoginRequest) {
    const data = await fetchLogin(payload)
    setTokens(data)
    await loadMe()
  }

  async function register(payload: RegisterRequest) {
    await fetchRegister(payload)
    await login({ mail: payload.mail, password: payload.password })
  }

  async function refresh() {
    if (!refreshToken.value) throw new Error('Pas de refresh token')
    const data = await fetchRefresh(refreshToken.value)
    setTokens(data)
  }

  function setTokens(tokens: AuthTokens) {
    accessToken.value = tokens.access_token
    refreshToken.value = tokens.refresh_token
    localStorage.setItem('access_token', tokens.access_token)
    localStorage.setItem('refresh_token', tokens.refresh_token)
  }

  function logout() {
    accessToken.value = null
    refreshToken.value = null
    user.value = null
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  async function loadMe() {
      if (!accessToken.value) return
      user.value = await fetchMe(accessToken.value)
    }

    async function init() {
      if (accessToken.value) {
        await loadMe()
      }
    }

  return { accessToken, refreshToken, user, isAuthenticated, login, logout, refresh, register, init }
})