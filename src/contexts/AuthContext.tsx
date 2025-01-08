import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

interface User {
  first_name: string;
  last_name: string;
  fullName(): string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
  setLoadingState: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const createFullNameFunction = (first_name: string, last_name: string) => {
    return () => {
      return `${capitalizeFirstLetter(first_name)} ${capitalizeFirstLetter(last_name)}`;
    };
  };

  const fetchAndSetUser = async (accessToken: any) => {
    const userData = await authService.getUser(accessToken);
    const userWithFullName = {
      ...userData,
      fullName: createFullNameFunction(userData.first_name, userData.last_name)
    };
    setUser(userWithFullName);
    localStorage.setItem('user', JSON.stringify(userData));
  }

  const login = (accessToken: any) => {
    setIsAuthenticated(true);
    setToken(accessToken);
    localStorage.setItem('token', accessToken);
    fetchAndSetUser(accessToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setLoading(false);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const setLoadingState = (loading: boolean) => {
    setLoading(loading);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setIsAuthenticated(true);
        const userData = JSON.parse(storedUser)
        const userWithFullName = {
          ...userData,
          fullName: createFullNameFunction(userData.first_name, userData.last_name)
        };
        setUser(userWithFullName);
    }

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: !!token, 
      user, 
      token,
      loading,
      login,
      logout,
      setLoadingState
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


