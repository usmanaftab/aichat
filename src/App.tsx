import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>My App</Link>
              </Typography>
              {isAuthenticated ? (
                <>
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    {user?.first_name} {user?.last_name}
                  </Typography>
                  <Button color="inherit" onClick={logout}>Logout</Button>
                </>
              ) : (
                <Button color="inherit" component={Link} to="/login">Login</Button>
              )}
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/chat" element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            } />
            <Route path="/" element={
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
            } />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithAuth;