import React from "react";
import { NavLink } from "react-router-dom";
import EAppbar from "./EAppbar";
import Footer from "./Footer";

import { Box, Typography, Grid, Button } from "@mui/material";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import swirl from "../../Assets/swirl.png";

/* HERO */
import dreamhue from "../../Assets/dreamhue_hero.png";
import bday2 from "../../Assets/bday2.jpg";
import dinner1 from "../../Assets/dinner1.jpg";

/* BIRTHDAY */
import bday1 from "../../Assets/bday1.jpg";
import bday3 from "../../Assets/bday3.jpg";

/* ENGAGEMENT */
import s1 from "../../Assets/s1.jpg";
import s2 from "../../Assets/s2.jpg";
import s3 from "../../Assets/s3.jpg";

/* CORPORATE */
import c1 from "../../Assets/c1.jpg";
import c2 from "../../Assets/c2.jpg";
import c3 from "../../Assets/c3.jpg";
import c4 from "../../Assets/c4.jpg";

/* DINNER */
import d1 from "../../Assets/dinner1.jpg";
import d2 from "../../Assets/dinner2.jpg";

/* WEDDING */
import shadi1 from "../../Assets/shadi1.jpg";
import shadi2 from "../../Assets/shadi2.jpg";
import event3 from "../../Assets/event3.jpg";

export default function Home() {

const heroImages=[dreamhue,s1,c3,bday2,dinner1,d1];

const sliderSettings={
dots:false,
infinite:true,
autoplay:true,
autoplaySpeed:3000,
arrows:false
};

const categories=[

{
title:"Birthday Bash 🎂",
route:"birthday",
description:"Celebrate the magic of another year.",
images:[bday2,bday1,bday3]
},

{
title:"Engagement Events 💍✨",
route:"engagement",
description:"A celebration of commitment.",
images:[s1,s2,s3]
},

{
title:"Corporate Connect 🏢",
route:"corporate",
description:"Leaders in one room.",
images:[c1,c2,c3,c4]
},

{
title:"Dinner 🍽️",
route:"dinner",
description:"Good food, good mood, unforgettable night.",
images:[d1,d2]
},

{
title:"Shadi (Wedding) 💍",
route:"shadi",
description:"Grand wedding setups with luxurious décor.",
images:[shadi1,shadi2,event3,s2]
}

];

return(

<>

<EAppbar/>

{/* HERO */}

<Box sx={{position:"relative"}}>

<Slider {...sliderSettings}>

{heroImages.map((img,i)=>(
<Box
key={i}
component="img"
src={img}
sx={{
width:"100%",
height:{xs:350,md:"80vh"},
objectFit:"cover"
}}
/>
))}

</Slider>

<Box
sx={{
position:"absolute",
inset:0,
background:"linear-gradient(rgba(0,0,0,0.35),rgba(0,0,0,0.65))"
}}
/>

<Box
sx={{
position:"absolute",
top:"50%",
left:"50%",
transform:"translate(-50%,-50%)",
textAlign:"center",
color:"#fff",
width:"90%",
maxWidth:800
}}
>

<Typography
variant="h3"
sx={{
fontFamily:'"Playfair Display", serif',
fontWeight:600
}}
>
Create Unforgettable Celebrations
</Typography>

<Typography sx={{mt:2,mb:4,fontSize:18}}>
Luxury event décor and memorable experiences for every occasion
</Typography>

<Box sx={{display:"flex",gap:2,justifyContent:"center",flexWrap:"wrap"}}>

<Button
component={NavLink}
to="/booking"
variant="contained"
sx={{
background:"linear-gradient(135deg,#D4AF37,#F3D6D6)",
color:"#2E1A47",
fontWeight:600,
borderRadius:30,
px:4
}}
>
Book Event
</Button>

<Button
component={NavLink}
to="/myevents"
variant="contained"
sx={{
background:"#fff",
color:"#5A4A42",
fontWeight:600,
borderRadius:30,
px:4
}}
>
My Events
</Button>

<Button
component={NavLink}
to="/gallery"
variant="outlined"
sx={{
borderColor:"#fff",
color:"#fff",
borderRadius:30,
px:4
}}
>
Explore Gallery
</Button>

</Box>

</Box>

</Box>

{/* CATEGORY SECTION */}

<Box
sx={{
backgroundImage:`url(${swirl})`,
backgroundRepeat:"repeat",
backgroundSize:"420px",
backgroundColor:"#fbf8ef",
py:8
}}
>

<Typography
variant="h4"
textAlign="center"
sx={{
fontFamily:'"Playfair Display", serif',
color:"#5A4A42",
fontWeight:600,
mb:6
}}
>
Explore Our Event Experiences
</Typography>

<Grid container spacing={4} sx={{px:{xs:2,md:8}}}>

{categories.map((cat,index)=>(

<Grid item xs={12} sm={6} md={4} key={index}>

<Box
sx={{
borderRadius:3,
overflow:"hidden",
boxShadow:"0 6px 20px rgba(0,0,0,0.08)",
background:"#fff",
transition:"0.3s",
'&:hover':{
transform:"translateY(-6px)",
boxShadow:"0 12px 30px rgba(198,167,67,0.25)"
}
}}
>

<Slider {...sliderSettings}>

{cat.images.map((img,i)=>(
<Box
key={i}
component="img"
src={img}
sx={{
width:"100%",
height:200,
objectFit:"cover"
}}
/>
))}

</Slider>

<Box sx={{p:3,textAlign:"center"}}>

<Typography
variant="h6"
sx={{
fontFamily:'"Playfair Display", serif',
color:"#5A4A42",
mb:1
}}
>
{cat.title}
</Typography>

<Typography sx={{color:"#777",mb:2}}>
{cat.description}
</Typography>

<Button
component={NavLink}
to={`/${cat.route}`}
variant="outlined"
sx={{
borderColor:"#C6A743",
color:"#C6A743",
'&:hover':{
background:"#C6A743",
color:"#fff"
}
}}
>
View Gallery
</Button>

</Box>

</Box>

</Grid>

))}

</Grid>

</Box>

<Footer/>

</>

)

}