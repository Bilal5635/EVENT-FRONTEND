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
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";


import { UserContext } from "../../MyContextProvider";
import axios from "axios";

// Styled header
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#1976d2",
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
}));

// Styled rows
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f5f5f5",
  },
  "&:hover": {
    backgroundColor: "#e0f0ff",
  },
}));

export default function AcceptedBookings() {

  const { host } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    const fetchBookings = async () => {
      try {

        const res = await axios.post(`${host}/booking/all`);

        if (res.data.success) {

          const acceptedBookings = res.data.data.filter(
            (b) => b.status === "Accepted"
          );

          setBookings(acceptedBookings);
        }

      } catch (error) {
        console.log("Error fetching bookings:", error);
      }
    };

    fetchBookings();

  }, [host]);


  return (

    <Box sx={{ padding: "30px", marginLeft: "270px", maxWidth: "95%" }}>

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >

        <Typography variant="h5" fontWeight="bold">
          ACCEPTED BOOKINGS :
        </Typography>

      </Box>

      {/* TABLE */}

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

                <TableCell>

                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "green",
                    }}
                  >
                    {b.status}
                  </Typography>

                </TableCell>

                

              </StyledTableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Box>

  );

}