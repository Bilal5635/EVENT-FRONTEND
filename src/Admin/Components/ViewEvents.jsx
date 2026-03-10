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
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
import SecurityIcon from "@mui/icons-material/Security";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../MyContextProvider";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#1976d2",
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f5f5f5",
  },
  "&:hover": {
    backgroundColor: "#e0f0ff",
  },
}));

export default function ViewEvents() {

  const { host } = useContext(UserContext);
  const [events, setEvents] = useState([]);
//   const [deleteStatus, setDeleteStatus] = useState(null);

  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {

      const res = await axios.post(`${host}/events/getevents`);

      if (res.data.success) {
        setEvents(res.data.data);
      }

    } catch (error) {

      console.error("Error fetching events:", error);

    }
  };

  useEffect(() => {
    fetchEvents();
},[host]);

//   const handleDelete = async (id) => {

//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this event?"
//     );

//     if (!confirmDelete) return;

//     try {

//       const res = await axios.post(`${host}/events/deleteevent/${id}`);

//       if (res.data.success) {
//         alert("Event deleted successfully");
//         setDeleteStatus(id);
//       }

//     } catch (error) {

//       console.error("Delete error:", error);
//       alert("Error deleting event");

//     }
//   };

//   const handleEdit = (id) => {
//     navigate(`/admin/events/updateevent/${id}`);
//   };

  return (

    <Box sx={{ padding: "30px", marginLeft: "270px", maxWidth: "90%" }}>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >

        <Typography variant="h5" fontWeight="bold">
          Events Available
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>

          <Button
            variant="contained"
            startIcon={<SecurityIcon />}
            sx={{
              background: "linear-gradient(135deg, #d7eca3, #f8df85)",
              fontWeight: "bold",
              color: "#000",
            }}
            onClick={() => navigate("/admin/manageevent")}
          >
            MANAGE EVENTS
          </Button>

          {/* <Button
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #d7eca3, #f8df85)",
              fontWeight: "bold",
              color: "#000",
            }}
            onClick={() => navigate("/admin/addevent")}
          >
            + ADD EVENT
          </Button> */}

        </Box>

      </Box>

      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <StyledTableCell>SL.NO</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Event Name</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Approx Price</StyledTableCell>
              {/* <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>

            {events.map((row, index) => (

              <StyledTableRow key={row._id}>

                <TableCell>{index + 1}</TableCell>

                <TableCell>
                  <img
                    src={`${host}/image/${row.image}`}
                    alt="event"
                    width="70"
                    style={{ borderRadius: "6px" }}
                  />
                </TableCell>

                <TableCell>{row.eventName}</TableCell>

                <TableCell>
                  {row.category ? row.category.name : "No Category"}
                </TableCell>

                <TableCell>{row.approxPrice}</TableCell>

                {/* <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(row._id)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell> */}

                {/* <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(row._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell> */}

              </StyledTableRow>

            ))}

          </TableBody>

        </Table>
      </TableContainer>

    </Box>
  );
}