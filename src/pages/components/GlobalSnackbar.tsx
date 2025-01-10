import { Alert, Snackbar } from '@mui/material';
import { useNotification } from '../../contexts/NotificationContext';

export function GlobalSnackbar() {
  const { error, clearError, success, clearSuccess } = useNotification();

  const handleOnClose = () => {
    clearError();
    clearSuccess();
  }

  return (
    <Snackbar
      open={!!error || !!success}
      autoHideDuration={6000}
      onClose={handleOnClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleOnClose} severity={error ? 'error' : 'success'}>
        {error ? error : success}
      </Alert>
    </Snackbar>
  );
}