import { Box, CssBaseline } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router } from 'react-router-dom';
import { config } from './config';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import AppRoutes from './pages/components/AppRoutes';
import { GlobalSnackbar } from './pages/components/GlobalSnackbar';
import AppTheme from './pages/shared-theme/AppTheme';

function App(props: { disableCustomTheme?: boolean }) {
  const { isAuthenticated } = useAuth();

  return (
    <GoogleOAuthProvider clientId="571547820643-hkuftrq162r9u7cjthmup25liovbolin.apps.googleusercontent.com">
      <NotificationProvider>
        <AppTheme {...props}>
          <CssBaseline enableColorScheme />
          <Router basename={config.BASE_PATH}>
            <Box sx={{ flexGrow: 1 }}>
              <AppRoutes />
            </Box>
          </Router>
          <GlobalSnackbar />
        </AppTheme>
      </NotificationProvider>
    </GoogleOAuthProvider>
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