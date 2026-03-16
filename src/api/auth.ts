const BASE_URL = import.meta.env.VITE_API_URL

export async function fetchRefresh(refreshToken: string) {
  const response = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })

  if (!response.ok) {
    throw new Error("Refresh token invalide")
  }

  return response.json() as Promise<{ access_token: string; refresh_token: string }>
}

export async function fetchLogin(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error("Identifiants invalides")
  }

  return response.json() as Promise<{ access_token: string; refresh_token: string }>
}

export async function fetchRegister(
  username: string,
  email: string,
  pseudo: string,
  password: string
) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, pseudo, password }),
  })

  if (!response.ok) {
    throw new Error('Erreur lors de l\'inscription')
  }

  return response.json() as Promise<{ access_token: string; refresh_token: string }>
}