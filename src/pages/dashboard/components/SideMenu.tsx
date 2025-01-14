import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { AIChatLogo } from '../../components/CustomIcons';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';

import { Button } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'src/contexts/AuthContext';

const drawerWidth = 260;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  const { user, isAuthenticated } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  return (
    <Box>
      <Drawer
        variant="persistent"
        anchor='left'
        open={drawerOpen}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'none', md: 'block' },
          [`& .${drawerClasses.paper}`]: {
            backgroundColor: 'background.paper',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 1.5,
          }}
        >
          <Button component={Link} to="/" sx={{ p: 0 }}>
            <AIChatLogo />
          </Button>
        </Box>
        <Divider />
        <MenuContent />
        <Stack
          direction="row"
          visibility={isAuthenticated ? 'visible' : 'hidden'}
          sx={{
            p: 2,
            gap: 1,
            alignItems: 'center',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Avatar
            sizes="small"
            alt={user?.fullName()}
            src="/static/images/avatar/7.jpg"
            sx={{ width: 36, height: 36 }}
          />
          <Box sx={{ mr: 'auto' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
              {user?.fullName()}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {user?.email}
            </Typography>
          </Box>
          <OptionsMenu />
        </Stack>
      </Drawer>
    </Box>
  );
}
