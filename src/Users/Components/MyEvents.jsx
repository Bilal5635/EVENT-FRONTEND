import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import axios from "axios";
import { UserContext } from "../../MyContextProvider";
import { useNavigate } from "react-router-dom";

export default function MyEvents() {

  const { host } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  

  const [bookings, setBookings] = useState([]);
  useEffect(() => {
  
      const token = localStorage.getItem("userToken");
  
      if (!token) {
        alert("LOGIN TO FETCH YOUR ORDERS");
        setIsLoggedIn(false);
        navigate("/login");
      }
  
    }, [navigate]);

  useEffect(() => {

    const fetchBookings = async () => {

      try {

        const token = JSON.parse(localStorage.getItem("userToken"));

        const res = await axios.post(
          `${host}/booking/mybookings`,
          {},
          {
            headers: { "auth-token": token }
          }
        );

        if (res.data.success) {
          setBookings(res.data.data);
        }

      } catch (error) {
        console.log(error);
      }

    };

    fetchBookings();

  }, []);


  const getColor = (status) => {

    if (status === "Accepted") return "green";
    if (status === "Rejected") return "red";
    if (status === "Contact Later") return "orange";

    return "#1976d2"; // Pending

  };


  return (

    <Box sx={{ p: 5, minHeight: "100vh", background: "#faf7f2" }}>

      {/* BACK BUTTON */}

      <Button
        startIcon={<ArrowBackIcon />}
        variant="contained"
        onClick={() => navigate("/")}
        sx={{
          mb: 3,
          background: "#fff",
          color: "#333",
          fontWeight: "bold"
        }}
      >
        Home
      </Button>


      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Playfair Display", serif',
          mb: 4
        }}
      >
        My Event Bookings
      </Typography>


      <Paper>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell><b>Event</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Place</b></TableCell>
              <TableCell><b>Status</b></TableCell>

            </TableRow>

          </TableHead>


          <TableBody>

            {bookings.map((b) => (

              <TableRow key={b._id}>

                <TableCell>
                  {b.event?.eventName}
                </TableCell>

                <TableCell>
                  {b.date}
                </TableCell>

                <TableCell>
                  {b.place}
                </TableCell>

                <TableCell>

                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: getColor(b.status)
                    }}
                  >
                    {b.status}
                  </Typography>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </Paper>

    </Box>

  );

}


