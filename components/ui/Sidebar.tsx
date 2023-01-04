import { useContext } from 'react';
import { UIContext } from '../../context/ui';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
  Divider,
  ListItemText,
} from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts'];

export const Sidebar = () => {
  const { sidebarOpenMenu, closeSidebarMenu } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sidebarOpenMenu} onClose={closeSidebarMenu}>
      <Box sx={{ width: 250 }}>
        {/* El box es como un div pero que nos permite usar el theme de Mui */}
        <Box sx={{ padding: '5px 10px' }}>
          <Typography variant="h4">Menú</Typography>
        </Box>
        <List>
          {menuItems.map((text, index) => (
            <ListItemButton key={text}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlinedIcon /> : <MailOutlineIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map((text, index) => (
            <ListItemButton key={text}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlinedIcon /> : <MailOutlineIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
