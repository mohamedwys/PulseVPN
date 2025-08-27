// API endpoints for authentication
export const AUTH_API_BASE = 'https://your-vpn-api.com/auth';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
  };
  token: string;
  expiresAt: string;
}

export async function loginUser(credentials: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${AUTH_API_BASE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

export async function registerUser(credentials: RegisterRequest): Promise<AuthResponse> {
  const response = await fetch(`${AUTH_API_BASE}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json();
}

export async function refreshToken(token: string): Promise<AuthResponse> {
  const response = await fetch(`${AUTH_API_BASE}/refresh`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Token refresh failed');
  }

  return response.json();
}