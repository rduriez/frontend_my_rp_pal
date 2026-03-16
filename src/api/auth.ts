const BASE_URL = import.meta.env.VITE_API_URL
import type { LoginRequest, RegisterRequest, AuthTokens, UserResponse } from './types/auth'


export async function fetchRefresh(refreshToken: string): Promise<AuthTokens> {
  const response = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })

  if (!response.ok) {
    throw new Error("Refresh token invalide")
  }

  return response.json()
}

export async function fetchLogin(payload: LoginRequest): Promise<AuthTokens> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error('Identifiants invalides')
  return response.json()
}

export async function fetchRegister(payload: RegisterRequest): Promise<UserResponse> {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error('Erreur lors de l\'inscription')
  return response.json()
}