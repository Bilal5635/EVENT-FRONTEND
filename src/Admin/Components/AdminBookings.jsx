import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../MyContextProvider";
import axios from "axios";


// ============================
// Styled table header
// ============================

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#1976d2",
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
}));


// ============================
// Styled rows
// ============================

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f5f5f5",
  },
  "&:hover": {
    backgroundColor: "#e0f0ff",
  },
}));


export default function AdminBookings() {

  const { host } = useContext(UserContext);
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);


  // ============================
  // FETCH BOOKINGS
  // ============================

  const fetchBookings = async () => {

    try {

      const res = await axios.post(`${host}/booking/all`);

      if (res.data.success) {
        setBookings(res.data.data);
      }

    } catch (error) {
      console.log("Error fetching bookings:", error);
    }

  };


  useEffect(() => {
    fetchBookings();
  }, []);


  // ============================
  // UPDATE STATUS
  // ============================

  const updateStatus = async (id, status) => {

    try {

      await axios.post(`${host}/booking/status/${id}`, { status });

      alert("Booking status updated");

      fetchBookings();

    } catch (error) {

      console.log(error);

    }

  };


  return (

    <Box sx={{ padding: "30px", marginLeft: "270px", maxWidth: "95%" }}>

      {/* HEADER */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >

        <Typography variant="h5" fontWeight="bold">
          BOOKING REQUESTS :
        </Typography>


        <Box>

          <Button
            startIcon={<EventAvailableIcon />}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #d7eca3, #f8df85)",
              fontWeight: "bold",
              color: "#000",
              mr: 2
            }}
            onClick={() => navigate("/admin/accepted")}
          >
            VIEW ACCEPTED
          </Button>


          <Button
            startIcon={<EventAvailableIcon />}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #a3d8ec, #85f8d5)",
              fontWeight: "bold",
              color: "#000"
            }}
            onClick={() => navigate("/admin/pending")}
          >
            NEEDS CONTACT
          </Button>

        </Box>

      </Box>


      {/* BOOKINGS TABLE */}

      <TableContainer component={Paper}>

        <Table>

          <TableHead>

            <TableRow>

              <StyledTableCell>SL.NO</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Event</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Place</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell width="250">Actions</StyledTableCell>

            </TableRow>

          </TableHead>


          <TableBody>

            {bookings.map((b, index) => (

              <StyledTableRow key={b._id}>

                <TableCell>{index + 1}</TableCell>

                <TableCell>{b.user?.name}</TableCell>

                <TableCell>{b.user?.email}</TableCell>

                <TableCell>{b.event?.eventName}</TableCell>

                <TableCell>{b.date}</TableCell>

                <TableCell>{b.place}</TableCell>


                {/* STATUS */}

                <TableCell>

                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color:
                        b.status === "Accepted"
                          ? "green"
                          : b.status === "Rejected"
                          ? "red"
                          : b.status === "Contact Later"
                          ? "orange"
                          : "#1976d2",
                    }}
                  >
                    {b.status}
                  </Typography>

                </TableCell>


                {/* ACTION BUTTONS */}

                <TableCell>

                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>

                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => updateStatus(b._id, "Accepted")}
                    >
                      Accept
                    </Button>


                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => updateStatus(b._id, "Rejected")}
                    >
                      Reject
                    </Button>


                    <Button
                      size="small"
                      variant="contained"
                      color="warning"
                      onClick={() => updateStatus(b._id, "Contact Later")}
                    >
                      Contact Later
                    </Button>

                  </Box>

                </TableCell>

              </StyledTableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Box>

  );

}