import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { useNavigate } from 'react-router-dom';

const mainListItems = [
  { text: 'Chat', icon: <ChatRoundedIcon />, page: '/' },
];

const secondaryListItems = [
  { text: 'About', icon: <InfoRoundedIcon />, page: '/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, page: '/feedback' },
];

export default function MenuContent() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = React.useState('/');

  const handleItemClick = (page: string) => {
    setSelectedItem(page);
    navigate(page);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item) => (
          <ListItem key={item.page} disablePadding sx={{ display: 'block' }}>
            <ListItemButton 
              selected={selectedItem === item.page}
              onClick={() => handleItemClick(item.page)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item) => (
          <ListItem key={item.page} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={selectedItem === item.page}
              onClick={() => handleItemClick(item.page)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
