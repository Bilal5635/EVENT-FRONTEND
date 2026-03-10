import React, { useEffect, useState, useContext } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../MyContextProvider";
import EAppbar from "./EAppbar";

export default function Gallery() {

  const { host } = useContext(UserContext);
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [openImage, setOpenImage] = useState(null);

  const fetchEvents = async () => {
    try {

      const res = await axios.post(`${host}/events/getevents`);

      if (res.data.success) {
        setEvents(res.data.data);
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
    <EAppbar/>

    <Box
      sx={{
        mt: 10,
        px: { xs: 3, md: 8 },
        pb: 8,
        background: "linear-gradient(180deg,#f9f5ec 0%,#ffffff 60%,#f9f5ec 100%)"
      }}
    >

      {/* HEADER */}

      <Box sx={{ textAlign: "center", mb: 6 }}>

        <Typography
          variant="h3"
          sx={{
            fontFamily: "Playfair Display",
            fontWeight: 700,
            letterSpacing: 2,
            background: "linear-gradient(135deg,#C6A743,#EAD8A0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Event Gallery
        </Typography>

        <Typography sx={{ mt: 1, color: "#6d645b" }}>
          A glimpse of our beautifully crafted events
        </Typography>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "center",
            gap: 2
          }}
        >

          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            sx={{
              borderColor: "#C6A743",
              color: "#5A4A42",
              borderRadius: "30px",
              px: 3,
              fontWeight: 600
            }}
          >
            Home
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate("/booking")}
            sx={{
              borderRadius: "30px",
              px: 3,
              fontWeight: 600,
              color: "#2E1A47",
              background: "linear-gradient(135deg,#D4AF37,#F3D6D6)",
              boxShadow: "0 4px 15px rgba(212,175,55,0.35)",
              "&:hover": {
                background: "linear-gradient(135deg,#F3D6D6,#D4AF37)"
              }
            }}
          >
            Book Now
          </Button>

        </Box>

      </Box>

      {/* GALLERY GRID */}

      <Grid container spacing={4}>

        {events.map((event) => (

          <Grid item xs={12} sm={6} md={4} key={event._id}>

            <Box
              sx={{
                overflow: "hidden",
                borderRadius: "12px"
              }}
            >

              <img
                src={`${host}/image/${event.image}`}
                alt={event.eventName}
                onClick={() => setOpenImage(`${host}/image/${event.image}`)}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  cursor: "pointer"
                }}
              />

            </Box>

            {/* EVENT NAME */}

            <Typography
              sx={{
                textAlign: "center",
                mt: 1,
                fontWeight: 600,
                color: "#5A4A42"
              }}
            >
              {event.eventName}
            </Typography>

            {/* CATEGORY */}

            <Typography
              sx={{
                textAlign: "center",
                fontSize: "14px",
                color: "#8b7b72"
              }}
            >
              {event.category?.name}
            </Typography>

            {/* PRICE */}

            <Typography
              sx={{
                textAlign: "center",
                fontWeight: 500,
                color: "#C6A743"
              }}
            >
              ₹ {event.approxPrice}
            </Typography>

          </Grid>

        ))}

      </Grid>

      {/* FULLSCREEN IMAGE VIEW */}

      {openImage && (

        <Box
          onClick={() => setOpenImage(null)}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000
          }}
        >

          <img
            src={openImage}
            alt="preview"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "12px"
            }}
          />

        </Box>

      )}

    </Box>
    </>
  );
}