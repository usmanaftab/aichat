import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import WelcomePage from '../pages/WelcomePage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Chat from '../pages/Chat';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

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
    setLoadingState(false);
  }, [location]);

  return (
    <Routes>
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      <Route path="/forgot-password" element={
        <PublicRoute>
          <ForgotPassword />
        </PublicRoute>
      } />
      <Route path="/reset-password" element={
        <PrivateRoute>
          <ResetPassword />
        </PrivateRoute>
      } />
      <Route path="/chat" element={
        <PrivateRoute>
          <Chat />
        </PrivateRoute>
      } />
      <Route path="/" element={<WelcomePage />} />
    </Routes>
  );
}

export default AppRoutes; 