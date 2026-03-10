import React, { useEffect, useState, useContext } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { UserContext } from "../../MyContextProvider";

import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import EventIcon from "@mui/icons-material/Event";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Dashboard() {

  const { host } = useContext(UserContext);

  const [customers, setCustomers] = useState(0);
  const [categories, setCategories] = useState(0);
  const [events, setEvents] = useState(0);
  const [bookings, setBookings] = useState(0);
  const [acceptedBookings, setAcceptedBookings] = useState(0);

  const fetchData = async () => {

    try {

      // USERS
      const userRes = await axios.get(`${host}/users/getuser`);
      setCustomers(userRes.data.data.length);

      // CATEGORIES
      const catRes = await axios.post(`${host}/category/getcat`);
      setCategories(catRes.data.data.length);

      // EVENTS
      const eventRes = await axios.post(`${host}/events/getevents`);
      setEvents(eventRes.data.data.length);

      // BOOKINGS
      const bookingRes = await axios.post(`${host}/booking/all`);

      const bookingData = bookingRes.data.data;

      setBookings(bookingData.length);

      const accepted = bookingData.filter(
        (b) => b.status === "Accepted"
      );

      setAcceptedBookings(accepted.length);

    } catch (err) {

      console.error(err);

    }

  };

  useEffect(() => {
    fetchData();
  }, [host,fetchData]);

  const cardStyle = {
    padding: 3,
    textAlign: "center",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#d7eca3,#f8df85)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  };

  const iconStyle = { fontSize: 50, color: "#555" };

  return (

    <Box sx={{ padding: 4, marginLeft: "270px", backgroundColor: "#f5f7fa" }}>

      <Typography variant="h4" fontWeight="bold" mb={3}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>

        {/* CUSTOMERS */}

        <Grid item xs={12} md={4}>
          <Paper sx={cardStyle}>
            <PeopleIcon sx={iconStyle} />
            <Typography variant="h6">Customers</Typography>
            <Typography variant="h4">{customers}</Typography>
          </Paper>
        </Grid>

        {/* CATEGORIES */}

        <Grid item xs={12} md={4}>
          <Paper sx={cardStyle}>
            <CategoryIcon sx={iconStyle} />
            <Typography variant="h6">Categories</Typography>
            <Typography variant="h4">{categories}</Typography>
          </Paper>
        </Grid>

        {/* EVENTS */}

        <Grid item xs={12} md={4}>
          <Paper sx={cardStyle}>
            <EventIcon sx={iconStyle} />
            <Typography variant="h6">Events</Typography>
            <Typography variant="h4">{events}</Typography>
          </Paper>
        </Grid>

        {/* TOTAL BOOKINGS */}

        <Grid item xs={12} md={4}>
          <Paper sx={cardStyle}>
            <BookOnlineIcon sx={iconStyle} />
            <Typography variant="h6">Total Bookings</Typography>
            <Typography variant="h4">{bookings}</Typography>
          </Paper>
        </Grid>

        {/* ACCEPTED BOOKINGS */}

        <Grid item xs={12} md={4}>
          <Paper sx={cardStyle}>
            <CheckCircleIcon sx={iconStyle} />
            <Typography variant="h6">Accepted Bookings</Typography>
            <Typography variant="h4">{acceptedBookings}</Typography>
          </Paper>
        </Grid>

      </Grid>

    </Box>

  );

}