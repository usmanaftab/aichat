import React, { createContext, useContext, useState } from 'react';

type NotificationContextType = {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  clearError: () => void;
  clearSuccess: () => void;
  error: string | null;
  success:string | null;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const showError = (message: string) => setError(message);
  const showSuccess = (message: string) => setSuccess(message);
  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(null);

  return (
    <NotificationContext.Provider value={{ showError, clearError, error, showSuccess, clearSuccess, success }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
} 