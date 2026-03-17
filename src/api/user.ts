import type { UserResponse } from "./types/auth"
const BASE_URL = import.meta.env.VITE_API_URL

export async function fetchMe(accessToken: string): Promise<UserResponse> {
  const response = await fetch(`${BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!response.ok) throw new Error('Utilisateur introuvable')
  return response.json()
}