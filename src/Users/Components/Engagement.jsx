import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../MyContextProvider";

export default function Engagement() {

const { host } = useContext(UserContext);
const navigate = useNavigate();

const [events, setEvents] = useState([]);

useEffect(() => {

axios.post(`${host}/events/getevents`)
.then(res => {

const engagementEvents = res.data.data.filter(
ev => ev.category?.name === "Engagement events 💍✨"
);

setEvents(engagementEvents);

})
.catch(err => console.log(err));

}, [host]);

return (

<Box sx={{ p: 5 }}>

<Button
startIcon={<ArrowBackIcon />}
variant="contained"
onClick={() => navigate("/")}
sx={{
mb:3,
background:"linear-gradient(135deg,#D4AF37,#F3D6D6)",
color:"#2E1A47"
}}
>
Back Home
</Button>

<Typography
variant="h4"
fontWeight="bold"
mb={1}
sx={{ fontFamily: '"Playfair Display", serif' }}
>
Engagement Events 💍✨
</Typography>

<Typography color="text.secondary" mb={4}>
A celebration of commitment where two hearts begin their journey together.
</Typography>

<Grid container spacing={3}>

{events.map((ev) => (

<Grid item xs={12} md={4} key={ev._id}>

<Box
component="img"
src={`${host}/image/${ev.image}`}
alt={ev.eventName}
sx={{
width: "100%",
height: 250,
objectFit: "cover",
borderRadius: 3,
boxShadow: 3
}}
/>

</Grid>

))}

</Grid>

</Box>

);

}