import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../MyContextProvider";
export default function Corporate() {

const { host } = useContext(UserContext);
const navigate = useNavigate();
const [events, setEvents] = useState([]);

useEffect(() => {

axios.post(`${host}/events/getevents`)
.then(res => {

const corporateEvents = res.data.data.filter(
ev => ev.category?.name === "Corporate Connect 🏢"
);

setEvents(corporateEvents);

});

}, []);

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

<Typography variant="h4" fontWeight="bold" mb={1}>
Corporate Connect 🏢
</Typography>

<Typography color="text.secondary" mb={4}>
Professional events where leaders collaborate and ideas grow.
</Typography>

<Grid container spacing={3}>

{events.map((ev) => (

<Grid item xs={12} md={4} key={ev._id}>

<Box
component="img"
src={`${host}/image/${ev.image}`}
alt={ev.eventName}
sx={{
width:"100%",
height:250,
objectFit:"cover",
borderRadius:3,
boxShadow:3
}}
/>

</Grid>

))}

</Grid>

</Box>

);

}