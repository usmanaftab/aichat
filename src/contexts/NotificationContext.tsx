import React, { createContext, useContext, useState } from 'react';

type NotificationContextType = {
  showError: (message: string) => void;
  clearError: () => void;
  error: string | null;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null);

  const showError = (message: string) => setError(message);
  const clearError = () => setError(null);

  return (
    <NotificationContext.Provider value={{ showError, clearError, error }}>
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