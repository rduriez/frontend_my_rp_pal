import { useAuthStore } from '@/stores/auth'

const BASE_URL = import.meta.env.VITE_API_URL

async function request<T>(path: string, options: RequestInit = {}, retry = true): Promise<T> {
  const auth = useAuthStore()

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(auth.accessToken ? { Authorization: `Bearer ${auth.accessToken}` } : {}),
      ...options.headers,
    },
  })

  if (response.status === 401 && retry) {
    try {
      await auth.refresh()
      return request<T>(path, options, false)
    } catch {
      auth.logout()
      window.location.href = '/login'
      throw new Error('Session expirée')
    }
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  return response.json() as Promise<T>
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) =>
    request<T>(path, { method: 'DELETE' }),
}