import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../MyContextProvider";

export default function Shadi() {

const { host } = useContext(UserContext);
const navigate = useNavigate();
const [events, setEvents] = useState([]);

useEffect(() => {

axios.post(`${host}/events/getevents`)
.then(res => {

const weddingEvents = res.data.data.filter(
ev => ev.category?.name === "Shadi (Wedding) 💍"
);

setEvents(weddingEvents);

})
.catch(err => console.log(err));

}, [host]);

return (

<Box sx={{ p: 5 }}>

{/* BACK BUTTON */}

<Button
startIcon={<ArrowBackIcon />}
variant="contained"
onClick={() => navigate("/")}
sx={{
mb:3,
background:"linear-gradient(135deg,#D4AF37,#F3D6D6)",
color:"#2E1A47",
fontWeight:600
}}
>
Back Home
</Button>


{/* TITLE */}

<Typography
variant="h4"
fontWeight="bold"
mb={1}
sx={{ fontFamily: '"Playfair Display", serif' }}
>
Shadi (Wedding) 💍
</Typography>


{/* DESCRIPTION */}

<Typography color="text.secondary" mb={4}>
Grand mandaps, floral décor and luxurious wedding setups.
</Typography>


{/* IMAGE GRID */}

<Grid container spacing={3}>

{events.map((ev) => (

<Grid item xs={12} sm={6} md={4} key={ev._id}>

<Box
component="img"
src={`${host}/image/${ev.image}`}
alt={ev.eventName}
sx={{
width:"100%",
height:250,
objectFit:"cover",
borderRadius:3,
boxShadow:3,
transition:"0.3s",
"&:hover":{
transform:"scale(1.03)"
}
}}
/>

</Grid>

))}

</Grid>

</Box>

);

}