import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container } from '@mui/material';
import { config } from '../config';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate(config.NOT_FOUND_REDIRECT);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Container maxWidth="sm">
        <Box textAlign="center">
          <Typography variant="h2" color="primary" gutterBottom>
            404 - Page Not Found
          </Typography>
          <Typography variant="h6" gutterBottom>
            The page you're looking for doesn't exist.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Redirecting to home page in 3 seconds...
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound; 