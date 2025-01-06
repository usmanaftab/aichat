import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Chat from '../pages/Chat';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
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
      <Route path="/" element={<WelcomePage />} />
    </Routes>
  );
}

export default AppRoutes; 