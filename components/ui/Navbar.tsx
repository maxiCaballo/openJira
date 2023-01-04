import { useContext } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '../../context/ui';

export const Navbar = () => {
  const { openSidebarMenu } = useContext(UIContext);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSidebarMenu}>
          <MenuOutlinedIcon />
        </IconButton>
        <Typography variant="h6" sx={{ marginLeft: '5px' }}>
          OpenJira
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
