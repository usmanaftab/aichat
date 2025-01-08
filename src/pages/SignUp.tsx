import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AppTheme from './shared-theme/AppTheme';
import { GoogleIcon, FacebookIcon } from './shared-theme/CustomIcons';
import ColorModeSelect from './shared-theme/ColorModeSelect';
import AutoAwesomeSharpIcon from '@mui/icons-material/AutoAwesomeSharp';

import { Link as RLink, useNavigate} from 'react-router-dom';
import { useAuth } from 'src/contexts/AuthContext';
import { authService } from 'src/services/authService';
import { Alert, Collapse } from '@mui/material';
import { Card, AuthContainer } from './shared-theme/shared-styles';

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [error, setError] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const firstName = document.getElementById('first_name') as HTMLInputElement;
    const lastName = document.getElementById('last_name') as HTMLInputElement;

    let isValid = true;

    if (!firstName.value || firstName.value.length < 1) {
      setFirstNameError(true);
      setFirstNameErrorMessage('First name is required.');
      isValid = false;
    } else {
      setFirstNameError(false);
      setFirstNameErrorMessage('');
    }

    if (!lastName.value || lastName.value.length < 1) {
      setLastNameError(true);
      setLastNameErrorMessage('Last name is required.');
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameErrorMessage('');
    }

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const firstName = document.getElementById('first_name') as HTMLInputElement;
    const lastName = document.getElementById('last_name') as HTMLInputElement;

    if (firstNameError || lastNameError || emailError || passwordError) {
      return;
    }

    try {
      const userData = await authService.register({
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        password: password.value
      });
      const token = await authService.login({ email: email.value, password: password.value });
      login(token.access_token);
      navigate('/');
    } catch (err: any) {
      if (err.details?.errors) {
        const errors = err.details.errors;
        if (errors.email) {
          setEmailError(true);
          setEmailErrorMessage(errors.email);
        }
        if (errors.password) {
          setPasswordError(true); 
          setPasswordErrorMessage(errors.password);
        }
        if (errors.first_name) {
          setFirstNameError(true);
          setFirstNameErrorMessage(errors.first_name);
        }
        if (errors.last_name) {
          setLastNameError(true);
          setLastNameErrorMessage(errors.last_name);
        }
      } else {
        setError(err.details.message);
      }
    }
  };

  return (
    <AuthContainer direction="column" justifyContent="space-between">
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <Card variant="outlined">
        <AutoAwesomeSharpIcon />
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Sign up
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
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="first_name">First name</FormLabel>
            <TextField
              autoComplete="given-name"
              name="first_name"
              required
              fullWidth
              id="first_name"
              placeholder="Jon"
              error={firstNameError}
              helperText={firstNameErrorMessage}
              color={firstNameError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="last_name">Last name</FormLabel>
            <TextField
              autoComplete="family-name"
              name="last_name"
              required
              fullWidth
              id="last_name"
              placeholder="Snow"
              error={lastNameError}
              helperText={lastNameErrorMessage}
              color={lastNameError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              required
              fullWidth
              id="email"
              placeholder="your@email.com"
              name="email"
              autoComplete="email"
              variant="outlined"
              error={emailError}
              helperText={emailErrorMessage}
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              required
              fullWidth
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="new-password"
              variant="outlined"
              error={passwordError}
              helperText={passwordErrorMessage}
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Sign up
          </Button>
        </Box>
        <Divider>
          <Typography sx={{ color: 'text.secondary' }}>or</Typography>
        </Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert('Sign up with Google')}
            startIcon={<GoogleIcon />}
          >
            Sign up with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert('Sign up with Facebook')}
            startIcon={<FacebookIcon />}
          >
            Sign up with Facebook
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link
              component={RLink} to="/login"
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Card>
    </AuthContainer>
  );
}
