import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Chat from 'src/pages/Chat';
import Feedback from 'src/pages/Feedback';
import NotFound from 'src/pages/NotFound';
import LoadingScreen from 'src/pages/shared-theme/loadingScreen';
import MainLayout from 'src/pages/shared-theme/MainLayout';
import SignIn from 'src/pages/SignIn';
import SignUp from 'src/pages/SignUp';
import UserProfile from 'src/pages/UserProfile';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import About from '../pages/About';
import ResetPassword from '../pages/ResetPassword';

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
    if (window.location.pathname.endsWith('/login')) {
      setLoadingState(false);
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Chat />} />
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/me" element={<UserProfile />} />
      </Route>
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;