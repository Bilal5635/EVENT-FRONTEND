import React from "react";
import { Box, Grid, Typography, Paper, IconButton, Button } from "@mui/material";
import { Call, Email, LocationOn, Instagram, Facebook, WhatsApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import EAppbar from "./EAppbar";
import Footer from "./Footer";


export default function Contact() {

const navigate = useNavigate();

/* STYLES */

const infoStyle = {
  display: "flex",
  alignItems: "center",
  color: "#777",
  mb: 2
};

const iconStyle = {
  fontSize: 22,
  mr: 1,
  color: "#C6A743"
};

const socialIcon = {
  color: "#5A4A42",
  "&:hover": {
    color: "#C6A743",
    transform: "scale(1.15)"
  }
};

return (
<>
<EAppbar/>

<Box sx={{ px: { xs: 2, md: 10 }, py: 6, pt: 14, background: "#faf7f2" }}>

{/* PAGE TITLE */}

<Box textAlign="center" mb={5}>
<Typography
variant="h4"
sx={{
fontFamily:'"Playfair Display", serif',
fontWeight:600,
color:"#5A4A42"
}}
>
Contact <span style={{color:"#C6A743"}}>Us</span>
</Typography>

<Typography sx={{ color:"#777", mt:1 }}>
We’d love to help plan your perfect event.
</Typography>
</Box>

<Grid container spacing={4} justifyContent="center">

{/* CONTACT INFO */}

<Grid item xs={12} md={6}>

<Paper
sx={{
p:4,
borderRadius:3,
border:"1px solid rgba(198,167,67,0.3)",
textAlign:"center"
}}
>

<Typography
variant="h6"
sx={{
mb:3,
fontFamily:'"Playfair Display", serif',
color:"#5A4A42"
}}
>
Get in Touch
</Typography>

<Typography sx={infoStyle}>
<Call sx={iconStyle}/> +91 XXXXX XXXX
</Typography>

<Typography sx={infoStyle}>
<Email sx={iconStyle}/> info@dreamhueevents.com
</Typography>

<Typography sx={infoStyle}>
<LocationOn sx={iconStyle}/> Mangalore, India
</Typography>

{/* ACTION BUTTONS */}

<Box mt={4} display="flex" justifyContent="center" gap={2} flexWrap="wrap">

<Button
variant="contained"
href="tel:+91XXXXXXXXXX"
sx={{
borderRadius:30,
background:"linear-gradient(135deg,#D4AF37,#F3D6D6)",
color:"#2E1A47",
fontWeight:600
}}
>
Call Now
</Button>

<Button
variant="contained"
href="https://wa.me/7349350390"
target="_blank"
sx={{
borderRadius:30,
background:"linear-gradient(135deg,#25D366,#9EF3C0)",
color:"#1b4332",
fontWeight:600
}}
>
WhatsApp
</Button>

<Button
variant="outlined"
onClick={()=>navigate("/booking")}
sx={{
borderRadius:30,
borderColor:"#C6A743",
color:"#5A4A42",
fontWeight:600
}}
>
Book Event
</Button>

</Box>

{/* SOCIAL */}

<Box mt={4}>

<IconButton
sx={socialIcon}
href="https://www.instagram.com/emes_theeventspace/"
target="_blank"
>
<Instagram/>
</IconButton>

<IconButton sx={socialIcon}>
<Facebook/>
</IconButton>

<IconButton
sx={socialIcon}
href="https://wa.me/7349350390"
target="_blank"
>
<WhatsApp/>
</IconButton>

</Box>

</Paper>

</Grid>

</Grid>

</Box>

<Footer/>
</>
);
}