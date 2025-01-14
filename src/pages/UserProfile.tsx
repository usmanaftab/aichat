// filepath: /Users/usmanaftab/Workspace/my-rag-app/aichat/src/pages/UserProfile.tsx
import { Alert, Box, Button, Collapse, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from 'src/contexts/NotificationContext';
import { userService } from 'src/services/userService';
import { useAuth } from '../contexts/AuthContext';

const UserProfile: React.FC = () => {
  const { user, logout, setLoadingState } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState('');
  const { showSuccess } = useNotification();

  const handleDeleteAccount = async () => {
    try {
      await userService.deleteUser();
      setLoadingState(true);
      logout();
      navigate('/login');
      showSuccess('Your account has been deleted');
    } catch (err) {
      setError('Failed to delete account');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Typography variant="h4">User Profile</Typography>
      <Typography variant="body1">Name: {user?.fullName()}</Typography>
      <Typography variant="body1">Email: {user?.email}</Typography>
      <Collapse in={error !== ''}>
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Collapse>
      <Button variant="contained" color="error" onClick={handleDeleteAccount}>
        Delete Account
      </Button>
    </Box>
  );
};

export default UserProfile;