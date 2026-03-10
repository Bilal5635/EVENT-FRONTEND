import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { Facebook, Instagram, WhatsApp, Call, Email } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <Box
      sx={{
        background: '#f1e7d1',
        borderRadius: 8,
        borderTop: '1px solid rgba(198,167,67,0.3)',
         textAlign: "center",
        mt: 8,
        pt: 6,
        pb: 3,
        px: { xs: 3, md: 10 },
         width: "90%",        // ✅ reduce width
    maxWidth: 1100,      // ✅ prevent stretching on large screens
    mx: "auto",          // ✅ center horizontally
    boxShadow: 3
      }}
    >
      <Grid container spacing={4}>

        {/* BRAND */}
        <Grid item xs={12} md={4}>
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.6rem',
              fontWeight: 600,
              color: '#5A4A42'
            }}
          >
            Dream <span style={{color:'#C6A743'}}>Hue</span> Events
          </Typography>

          <Typography sx={{ mt: 1, color: '#777' }}>
            Creating magical celebrations with elegant décor and unforgettable experiences.
          </Typography>
        </Grid>

        {/* QUICK LINKS */}
        <Grid item xs={6} md={2}>
          <Typography sx={{ fontWeight: 600, color: '#5A4A42', mb: 1 }}>
            Explore
          </Typography>

          <Typography component={Link} to="/" sx={linkStyle}>
            Home
          </Typography>
          <Typography component={Link} to="/services" sx={linkStyle}>
            Services
          </Typography>
          <Typography component={Link} to="/gallery" sx={linkStyle}>
            Gallery
          </Typography>
          <Typography component={Link} to="/contact" sx={linkStyle}>
            Contact
          </Typography>
        </Grid>

        {/* CONTACT INFO */}
        <Grid item xs={6} md={3}>
          <Typography sx={{ fontWeight: 600, color: '#5A4A42', mb: 1 }}>
            Contact
          </Typography>

          <Typography sx={infoStyle}>
            <Call sx={iconStyle}/> +91 XXXXX XXXX
          </Typography>

          <Typography sx={infoStyle}>
            <Email sx={iconStyle}/> info@dreamhueevents.com
          </Typography>

          <Typography sx={infoStyle}>
            📍 Mangalore, India
          </Typography>
        </Grid>

        {/* SOCIAL */}
        <Grid item xs={12} md={3}>
          <Typography sx={{ fontWeight: 600, color: '#5A4A42', mb: 1 }}>
            Connect With Us
          </Typography>

          <IconButton 
          sx={socialIcon}
          href="https://www.instagram.com/emes_theeventspace/">
            <Instagram />
          </IconButton>

          <IconButton sx={socialIcon}>
            <Facebook />
          </IconButton>

          <IconButton
            sx={socialIcon}
            href="https://wa.me/7349350390"
            target="_blank"
          >
            <WhatsApp />
          </IconButton>
        </Grid>

      </Grid>

      {/* COPYRIGHT */}
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography sx={{ color: '#888', fontSize: 14 }}>
          © {new Date().getFullYear()} Dream Hue Events. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}

/* STYLES */
const linkStyle = {
  display: 'block',
  textDecoration: 'none',
  color: '#777',
  mb: 0.5,
  '&:hover': {
    color: '#C6A743'
  }
}

const infoStyle = {
  color: '#777',
  mb: 0.7,
  display: 'flex',
  alignItems: 'center'
}

const iconStyle = {
  fontSize: 18,
  mr: 1,
  color: '#C6A743'
}

const socialIcon = {
  color: '#5A4A42',
  '&:hover': {
    color: '#C6A743',
    transform: 'scale(1.15)'
  }
}