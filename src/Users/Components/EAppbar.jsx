import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { NavLink, useNavigate } from 'react-router-dom';
// import Bow from '../../Assets/Bow.png';

export default function EAppbar() {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  // ✅ Check login status
  const isLoggedIn = Boolean(localStorage.getItem("userToken"));

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
    window.location.reload(); // refresh navbar after logout
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "#f1e7d1",
        borderBottom: "1px solid rgba(198, 167, 67, 0.3)"
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 1 }}>

          {/* LOGO + BRAND */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src={Bow}
              alt="Dream Hue Events"
              sx={{ height: 58, mr: 1 }}
            />
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.4rem',
                fontWeight: 600,
                color: '#5A4A42',
                letterSpacing: '1px',
              }}
            >
              Dream <span style={{color:'#C6A743'}}>Hue</span> Events
            </Typography>
          </Box>

          {/* MOBILE MENU */}
          <Box sx={{ ml: 'auto', display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={(e)=>setAnchorElNav(e.currentTarget)}>
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={()=>setAnchorElNav(null)}
            >
              {menuItems.map((item)=>(
                <MenuItem
                  key={item.name}
                  component={NavLink}
                  to={item.path}
                  onClick={()=>setAnchorElNav(null)}
                >
                  {item.name}
                </MenuItem>
              ))}

              {/* Mobile Login/Logout */}
              <MenuItem
                onClick={() => {
                  setAnchorElNav(null);
                  isLoggedIn ? handleLogout() : navigate("/login");
                }}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </MenuItem>

            </Menu>
          </Box>

          {/* DESKTOP MENU */}
          <Box
            sx={{
              ml: 'auto',
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center'
            }}
          >
            {menuItems.map((item)=>(
              <Button
                key={item.name}
                component={NavLink}
                to={item.path}
                sx={{
                  fontWeight: 500,
                  letterSpacing: 1,
                  mx: 1,
                  textTransform: "none",
                  transition: "all .25s ease",
                  color: '#5A4A42',
                  '&:hover': {
                    color: '#C6A743',
                    backgroundColor: 'transparent',
                  },
                  '&.active': {
                    color: '#C6A743',
                  }
                }}
              >
                {item.name}
              </Button>
            ))}

            {/* Login / Logout Button */}
            <Button
              onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
              sx={{
                ml: 2,
                px: 3,
                borderRadius: '30px',
                fontWeight: 600,
                color: '#2E1A47',
                background: 'linear-gradient(135deg,#D4AF37,#F3D6D6)',
                boxShadow: '0 4px 15px rgba(212,175,55,0.35)',
                '&:hover': {
                  background: 'linear-gradient(135deg,#F3D6D6,#D4AF37)',
                }
              }}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </Button>

          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}