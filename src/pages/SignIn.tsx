import { Collapse } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import ForgotPassword from './ForgotPassword';
import ColorModeSelect from './shared-theme/ColorModeSelect';
import { GoogleIcon } from './shared-theme/CustomIcons';
import { AuthContainer, Card } from './shared-theme/shared-styles';

import { useGoogleLogin } from '@react-oauth/google';
import { Link as RLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { authService } from '../services/authService';
import { AIChatLogo } from './components/CustomIcons';

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showSuccess } = useNotification();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError || open) {
      return;
    }

    if (!validateInputs()) {
      return;
    }

    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    console.log({
      email: email.value,
      password: password.value,
    });

    event.preventDefault();
    try {
      const token = await authService.login({ email: email.value, password: password.value });

      login(token.access_token);
      navigate('/');
      showSuccess('You are logged in');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleGuestLogin = async () => {
    try {
      const token = await authService.loginAsGuest();
      login(token.access_token);
      navigate('/');
      showSuccess('You are logged in as a guest');
    } catch (err) {
      setError('Failed to sign in as guest');
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

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

  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      const { access_token } = response;
      const token = await authService.googleLogin(access_token);
      login(token.access_token);
      navigate('/');
      showSuccess('You are logged in');
    } catch (err) {
      setError('Failed to sign in with Google');
    }
  };

  const handleGoogleLoginFailure = () => {
    setError('Failed to sign in with Google');
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: handleGoogleLoginFailure,
  });

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
          Sign in
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
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
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
          <ForgotPassword open={open} handleClose={handleClose} setError={setError} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Sign in
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleGuestLogin}
          >
            Sign in as Guest
          </Button>
          <Link
            component="button"
            type="button"
            onClick={handleClickOpen}
            variant="body2"
            sx={{ alignSelf: 'center' }}
          >
            Forgot your password?
          </Link>
        </Box>
        <Divider>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => handleGoogleLogin()}
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <Link
              component={RLink} to="/register"
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Card>
    </AuthContainer>
  );
}
