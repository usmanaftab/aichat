import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';

import { authService } from '../services/authService';
import { useNotification } from '../contexts/NotificationContext';

interface ForgotPasswordProps {
  open: boolean;
  setError: (error: string) => void;
  handleClose: () => void;
}

export default function ForgotPassword({ open, handleClose, setError }: ForgotPasswordProps) {
  const { showSuccess } = useNotification();

  const handleSubmitForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const email = document.getElementById('email_forgot_password') as HTMLInputElement;
      await authService.forgotPassword(email.value);
      showSuccess('Password reset instructions have been sent to your email');
      setError('');
    } catch (err) {
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleSubmitForgotPassword(event);
          handleClose();
        },
        sx: { backgroundImage: 'none' },
      }}
    >
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you a link to
          reset your password.
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email_forgot_password"
          name="email"
          label="Email address"
          placeholder="Email address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
