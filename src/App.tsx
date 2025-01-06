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
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Chat from './Chat';

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>My App</Link>
              </Typography>
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" element={
              <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h2" component="h1" gutterBottom>
                  Welcome!
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/chat"
                  >
                    Start Chat
                  </Button>
                </Typography>
              </Container>
            } />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;