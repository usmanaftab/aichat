import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';
import AutoAwesomeSharpIcon from '@mui/icons-material/AutoAwesomeSharp';
import MenuButton from './MenuButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useAuth } from 'src/contexts/AuthContext';
import { useState } from 'react';

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
      <MenuButton onClick={toggleDrawer(true)} sx={{ mt: 1, ml: 1 }}>
        <MenuRoundedIcon />
      </MenuButton>
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
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: 'flex-start', mr: 'auto', alignItems: 'baseline', width: '100%' }}
        >
          <AutoAwesomeSharpIcon sx={{ flex: ' 0 0 auto'}}/>
          <Typography variant="h6" sx={{ flex: ' 0 0 auto'}}>
            AI Chat
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <MenuButton onClick={toggleDrawer(false)}>
            <ChevronLeftIcon />
          </MenuButton>
        </Stack>
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
