import { CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './components/AppRoutes';
import { GlobalSnackbar } from './components/GlobalSnackbar';
import { NotificationProvider } from './contexts/NotificationContext';
import { config } from './config';
import AppTheme from './pages/shared-theme/AppTheme';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';

function App(props: { disableCustomTheme?: boolean }) {
  const { isAuthenticated } = useAuth();

  return (
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