import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link as MuiLink,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

interface ValidationErrors {
  first_name?: string[];
  last_name?: string[];
  email?: string[];
  password?: string[];
}

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await authService.register({
        first_name: firstName,
        last_name: lastName,
        email,
        password
      });
      const token = await authService.login({ email, password });
      login(token.access_token);
      navigate('/chat');
    } catch (err: any) {
      if (err.details?.errors) {
        setErrors(err.details.errors);
      } else {
        setErrors({ email: [err.details.message] });
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Register
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            error={!!errors.first_name}
            helperText={errors.first_name?.[0]}
          />
          <TextField
            fullWidth
            label="Last Name"
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            error={!!errors.last_name}
            helperText={errors.last_name?.[0]}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={!!errors.email}
            helperText={errors.email?.[0]}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error={!!errors.password}
            helperText={errors.password?.[0]}
          />
          
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <MuiLink component={Link} to="/login">
            Already have an account? Login
          </MuiLink>
        </Box>
      </Paper>
    </Container>
  );
} 