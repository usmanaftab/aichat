import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';

import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/contexts/AuthContext';
import { useNotification } from 'src/contexts/NotificationContext';

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function SideMenuMobile({ open, toggleDrawer }: SideMenuMobileProps) {
  const { user, logout, setLoadingState, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { showSuccess } = useNotification();

  const handleLogout = () => {
    setLoadingState(true);
    logout();
    navigate('/login');
    showSuccess('You are logged out');
  };

  const handleMenuClick = () => {
    toggleDrawer(false)();
  }

  const handlePrfoileClick = () => {
    toggleDrawer(false)();
    navigate('/me');
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: '70dvw',
          height: '100%',
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt={user?.fullName()}
              src="/static/images/avatar/7.jpg"
              sx={{ width: 24, height: 24 }}
            />
            <Typography component="p" variant="h6">
              {user?.fullName()}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent onclick={handleMenuClick} />
          <Divider />
        </Stack>
        <Stack sx={{ p: 2 }} visibility={isAuthenticated ? 'visible' : 'hidden'}>
          <Button sx={{ mb: 2 }} onClick={handlePrfoileClick} variant="outlined" fullWidth startIcon={<AccountCircleRoundedIcon />}>
            Profile
          </Button>
          <Button onClick={handleLogout} variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />}>
            Logout
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
