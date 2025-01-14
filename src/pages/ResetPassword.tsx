import { Collapse } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import ColorModeSelect from './shared-theme/ColorModeSelect';
import { AuthContainer, Card } from './shared-theme/shared-styles';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';
import { authService } from '../services/authService';
import { AIChatLogo } from './components/CustomIcons';

export default function ResetPassword(props: { disableCustomTheme?: boolean }) {
  const [error, setError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { showSuccess } = useNotification();

  const validateInputs = () => {
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError('Invalid reset token');
      return;
    }
    try {
      const password = document.getElementById('password') as HTMLInputElement;
      await authService.resetPassword(token, password.value);
      navigate('/login');
      showSuccess('Password reset successful. Please login.');
    } catch (err) {
      setError('Password reset failed. Please try again.');
    }
  };

  return (
    <AuthContainer direction="column" justifyContent="space-between">
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <Card variant="outlined">
        <AIChatLogo />
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Reset Password
        </Typography>
        <Collapse in={error !== ''}>
          <Alert
            severity="error"
            onClose={() => setError('')}
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        </Collapse>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="password">New Password</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Reset Password
          </Button>
        </Box>
      </Card>
    </AuthContainer>
  );
}
