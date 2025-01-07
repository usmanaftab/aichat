import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import NavigationBar from './components/NavigationBar';
import AppRoutes from './components/AppRoutes';
import { GlobalSnackbar } from './components/GlobalSnackbar';
import { NotificationProvider } from './contexts/NotificationContext';

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

function App() {
  return (
      <NotificationProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Box sx={{ flexGrow: 1 }}>
              <NavigationBar />
              <AppRoutes />
            </Box>
          </Router>
          <GlobalSnackbar />
        </ThemeProvider>
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