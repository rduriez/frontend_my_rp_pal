import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchLogin, fetchRefresh, fetchRegister } from '@/api/auth'

interface AuthTokens {
  access_token: string
  refresh_token: string
}

interface User {
  id: number
  username: string
}

export const useAuthStore = defineStore("auth", () => {
  const accessToken = ref<string | null>(localStorage.getItem("access_token"))
  const refreshToken = ref<string | null>(localStorage.getItem("refresh_token"))
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!accessToken.value)

async function login(email: string, password: string) {
  const data = await fetchLogin(email, password)
  setTokens(data)
}

async function refresh() {
if (!refreshToken.value) throw new Error("Pas de refresh token")
const data = await fetchRefresh(refreshToken.value)
setTokens(data)
}

function setTokens(tokens: AuthTokens) {
accessToken.value = tokens.access_token
refreshToken.value = tokens.refresh_token
localStorage.setItem("access_token", tokens.access_token)
localStorage.setItem("refresh_token", tokens.refresh_token)
}

function logout() {
accessToken.value = null
refreshToken.value = null
user.value = null
localStorage.removeItem("access_token")
localStorage.removeItem("refresh_token")
}

async function register(username: string, email: string, pseudo: string, password: string) {
  const data = await fetchRegister(username, email, pseudo, password)
  setTokens(data)
}

return { accessToken, refreshToken, user, isAuthenticated, login, logout, refresh, register }
})