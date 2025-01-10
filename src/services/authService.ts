import { config } from '../config';

export class AuthError extends Error {
  status: number;
  details: any;

  constructor(message: string, status: number, details?: any) {
    super(message);
    this.name = 'AuthError';
    this.status = status;
    this.details = details;
  }
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  first_name: string;
  last_name: string;
}

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Credentials': 'true',
};

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await fetch(`${config.API_URL}/auth/login`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(credentials),
      credentials: 'include',
      mode: 'cors',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new AuthError(error.message || 'Login failed', response.status, error);
    }

    return response.json();
  },

  async register(credentials: RegisterCredentials) {
    const response = await fetch(`${config.API_URL}/auth/register`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(credentials),
      credentials: 'include',
      mode: 'cors',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new AuthError(error.message || 'Registration failed', response.status, error);
    }

    return response.json();
  },

  async forgotPassword(email: string) {
    const response = await fetch(`${config.API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ email }),
      mode: 'cors',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new AuthError(error.message || 'Failed to process forgot password request', response.status, error);
    }

    return response.json();
  },

  async resetPassword(token: string, password: string) {
    const response = await fetch(`${config.API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ token, password }),
      mode: 'cors',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new AuthError(error.message || 'Failed to reset password', response.status, error);
    }

    return response.json();
  },

  async googleLogin(access_token: string) {
    const response = await fetch(`${config.API_URL}/auth/oauth/google`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ token: access_token }),
      mode: 'cors',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to sign in with Google');
    }

    return response.json();
  },

  async getUser(token: string) {
    const response = await fetch(`${config.API_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new AuthError(error.message || 'Failed to fetch user profile', response.status, error);
    }

    return await response.json();
  },
};