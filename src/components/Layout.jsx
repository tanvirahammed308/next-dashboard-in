"use client" 

import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Assessment, ExpandLess, ExpandMore, HelpCenter, Settings, SpaceDashboard } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const drawerWidth = 240;

function Layout(props) {
  const { window } = props;
  const { children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapse, setCollapse] = React.useState(false);
  const router=useRouter();
  const pathName=usePathname();
  console.log(pathName)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleCollapseToggle = () => {
    setCollapse(!collapse);
  };

  const drawer = (
    <div>
      <Toolbar>
      <Image
      src="/logo.gif"
      alt="logo"
      width={50}
      height={50}
	  
    />
    Next
      </Toolbar>
      <Divider />
      <List>
        {['Dashboard','Analytical', 'Send email'].map((text, index) => (
          <ListItem key={text} disablePadding 
          className={
            pathName.startsWith('/' + text.toLowerCase()) ? 'text-red-500 bg-green-600 font-bold ' : 'text-slate-900'
          }
          onClick={()=>router.push('/' + text.toLowerCase())}
          
          >
            <ListItemButton>
              <ListItemIcon className={
            pathName.startsWith('/' + text.toLowerCase()) ? 'text-red-500 bg-green-600' : 'text-slate-900 font-bold'
          }>
                {
                  index === 0 && <SpaceDashboard/>
                }
                {
                  index === 1 && <Assessment/>
                }
                {
                  index === 2 && <SpaceDashboard/>
                }
                
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem  disablePadding onClick={handleCollapseToggle}>
            <ListItemButton>
              <ListItemIcon>
              <Settings/>
              </ListItemIcon>
              <ListItemText primary={'Help'} />
              {
                collapse ? <ExpandMore/> : <ExpandLess/>
              }
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
      <Collapse in={collapse} timeout={'auto'} unmountOnExit>
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding className={
            pathName.startsWith('/' + text.toLowerCase()) ? 'text-red-500 bg-green-600 ' : 'text-slate-900'
          }
          onClick={()=>router.push('/' + text.toLowerCase())}
          
          >
            <ListItemButton>
              <ListItemIcon className={
            pathName.startsWith('/' + text.toLowerCase()) ? 'text-red-500 bg-green-600' : 'text-slate-900'
          }>
               {
                index === 0 && <HelpCenter/>
               }
               {
                index === 1 && <HelpCenter/>
               }
               {
                index === 2 && <HelpCenter/>
               }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      </Collapse>
      
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
           Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <main>{children}</main>
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
  children: PropTypes.array,
};

export default Layout;
