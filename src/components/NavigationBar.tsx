import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function NavigationBar() {
  const { isAuthenticated, logout, user } = useAuth();

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
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar; 