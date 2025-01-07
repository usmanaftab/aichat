import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useNotification } from '../contexts/NotificationContext';

export function GlobalSnackbar() {
  const { error, clearError } = useNotification();

  return (
    <Snackbar 
      open={!!error} 
      autoHideDuration={6000} 
      onClose={clearError}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={clearError} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
} 