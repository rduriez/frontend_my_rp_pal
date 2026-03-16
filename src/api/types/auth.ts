export interface LoginRequest {
  mail: string
  password: string
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  pseudo: string
  mail: string
  password: string
}

export interface AuthTokens {
  access_token: string
  refresh_token: string
}

export interface UserResponse {
  id: number
  firstName: string
  lastName: string
  pseudo: string
  mail: string
  role: string
}