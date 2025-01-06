interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

const API_URL = 'http://127.0.0.1:5000/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Credentials': 'true',
};

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(credentials),
      credentials: 'include',
      mode: 'cors',
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    return response.json();
  },

  async register(credentials: RegisterCredentials) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(credentials),
      credentials: 'include',
      mode: 'cors',
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    
    return response.json();
  },

  async forgotPassword(email: string) {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ email }),
      mode: 'cors',
    });
    
    if (!response.ok) {
      throw new Error('Failed to send reset email');
    }
    
    return response.json();
  },

  async resetPassword(token: string, password: string) {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ token, password }),
      mode: 'cors',
    });
    
    if (!response.ok) {
      throw new Error('Password reset failed');
    }
    
    return response.json();
  },

  async googleLogin() {
    window.location.href = `${API_URL}/oauth/google`;
  },
}; 