import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function WelcomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome!
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        {isAuthenticated ? (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/chat"
          >
            Start Chat
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login to Start
          </Button>
        )}
      </Typography>
    </Container>
  );
}

export default WelcomePage; 