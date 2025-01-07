import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';

function NavigationBar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const { showSuccess } = useNotification();

  const handleLogout = () => {
    logout();
    navigate('/login');
    showSuccess('You are logged out');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>My App</Link>
        </Typography>
        {isAuthenticated ? (
          <>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user?.fullName()}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar; 