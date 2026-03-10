import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink} from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import CategoryIcon from '@mui/icons-material/Category';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

const drawerWidth = 240;

export default function ClickDrawer() {

  const nav=useNavigate();
  const handleLogout= async()=>{
  alert("Logged out");
  localStorage.removeItem("adminToken");
  setTimeout(()=>{
    nav('/admin/adminlogin')
  })
}

const dashstyle = {
  color: '#fff',
  backgroundColor: '#111',
  transition: 'all .2s ease',

  '&:hover': {
    backgroundColor: '#C6A743',
    color: '#111'
  }}

const menuStyle = {
  color: '#fff',
  backgroundColor: '#111',
  transition: 'all .2s ease',

  '&:hover': {
    backgroundColor: '#C6A743',
    color: '#111'
  },

  '&.active': {
    backgroundColor: '#C6A743',
    color: '#111',
    fontWeight: 600
  }
}


const iconStyle = {
  color: '#f3c63d'
}

  return (
    <div>
        <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`,
        background: "#272020"}}
      >
  <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: '#C6A743' }}>
            Dream Hue Admin
          </Typography>


  <Typography
            sx={{
              cursor: "pointer",
              color: '#fff',
              '&:hover': { color: '#C6A743' }
            }}
            onClick={handleLogout}
          >
            Logout
          </Typography>
</Toolbar>

      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: '#272020',
            color: '#fff',
            borderRight: '1px solid rgba(198,167,67,0.3)'
          },
        }}
      >
        <Toolbar />
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.2rem',
              color: '#C6A743',
              letterSpacing: 1
            }}
          >
            Dream Hue Events
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
       <List>

  {/* DASHBOARD */}
  <ListItem disablePadding>
    <ListItemButton
      component={NavLink}
      to="/admin"
      sx={dashstyle}
    >
      <ListItemIcon sx={iconStyle}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  </ListItem>

  <Divider />  
  {/* USERS */}
  <ListItem disablePadding>
    <ListItemButton
      component={NavLink}
      to="/admin/viewuser"
      sx={menuStyle}
    >
      <ListItemIcon sx={iconStyle}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
  </ListItem>
   <Divider />

  {/* BOOKINGS */}
  <ListItem disablePadding>
    <ListItemButton
      component={NavLink}
      to="/admin/bookings"
      sx={menuStyle}
    >
      <ListItemIcon sx={iconStyle}>
        <EventIcon  />
      </ListItemIcon>
      <ListItemText primary="Bookings" />
    </ListItemButton>
  </ListItem>
  
  <Divider />

  {/* EVENT CATEGORIES */}
  <ListItem disablePadding>
    <ListItemButton
      component={NavLink}
      to="/admin/viewcat"
      sx={menuStyle}
    >
      <ListItemIcon sx={iconStyle}>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Event Categories" />
    </ListItemButton>
  </ListItem>

  <Divider />

  {/* EVENTS */}
  <ListItem disablePadding>
    <ListItemButton
      component={NavLink}
      to="/admin/viewevent"
      sx={menuStyle}
    >
      <ListItemIcon sx={iconStyle}>
        <EventIcon />
      </ListItemIcon>
      <ListItemText primary="Events" />
    </ListItemButton>
  </ListItem>

  <Divider />

  {/* GALLERY */}
  {/* <ListItem disablePadding>
    <ListItemButton
      component={NavLink}
      to="/admin/gallery"
      sx={menuStyle}
    >
      <ListItemIcon sx={iconStyle}>
        <PhotoLibraryIcon />
      </ListItemIcon>
      <ListItemText primary="Gallery Manager" />
    </ListItemButton>
  </ListItem> */}

  <Divider />


</List>


      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />

      </Box>
    </Box>
      
    </div>
  )
}
