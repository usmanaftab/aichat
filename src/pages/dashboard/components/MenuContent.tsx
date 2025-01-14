import { PrivacyTipRounded } from '@mui/icons-material';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

interface MenuContentProps {
  onclick?: () => void;
}

const mainListItems = [
  { text: 'Chat', icon: <ChatRoundedIcon />, page: '/' },
];

const secondaryListItems = [
  { text: 'About', icon: <InfoRoundedIcon />, page: '/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, page: '/feedback' },
  { text: 'Privacy Policy', icon: <PrivacyTipRounded />, page: '/privacy' },
];

export default function MenuContent({ onclick }: MenuContentProps) {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = React.useState('/');

  const handleItemClick = (page: string) => {
    setSelectedItem(page);
    navigate(page);
    onclick && onclick();
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
