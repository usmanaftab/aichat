import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import ResetPassword from '../pages/ResetPassword';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import NotFound from 'src/pages/NotFound';
import SignIn from 'src/pages/SignIn';
import SignUp from 'src/pages/SignUp';
import About from '../pages/About';
import Chat from 'src/pages/Chat';
import Feedback from 'src/pages/Feedback';

function LoadingScreen() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user, token, loading } = useAuth();
    const { showError } = useNotification();

    if (loading) {
      return <LoadingScreen />;
    }

    if (!isAuthenticated || !token || !user) {
        showError('You are not logged in');
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useAuth();
    const { showError } = useNotification();

    if (loading) {
      return <LoadingScreen />;
    }

    if (isAuthenticated) {  
        showError('You are already logged in');
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}

function AppRoutes() {
  const { setLoadingState } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.endsWith('/login')) {
      setLoadingState(false);
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/login" element={
        <PublicRoute>
          <SignIn />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <SignUp />
        </PublicRoute>
      } />
      <Route path="/reset-password" element={
        <PublicRoute>
          <ResetPassword />
        </PublicRoute>
      } />
      <Route path="/" element={
        <PrivateRoute>
          <Chat />
        </PrivateRoute>
      } />
      <Route path="/about" element={
        <PrivateRoute>
          <About />
        </PrivateRoute>
      } />
      <Route path="/feedback" element={
        <PrivateRoute>
          <Feedback />
        </PrivateRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes; 