
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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { UserContext } from "../../MyContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Styled table header
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#1976d2",
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
}));

// Styled table rows
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f5f5f5",
  },
  "&:hover": {
    backgroundColor: "#e0f0ff",
  },
}));

export default function ViewUsers() {
  const { host } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users
  // const fetchUsers = async () => {
  //   try {
  //     const res = await axios.get(`${host}/users/getuser`);
  //     if (res.data) {
  //       setUsers(res.data.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, [host,fetchUsers]);

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${host}/users/getuser`);
      if (res.data) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchUsers();
}, [host]);

  
  

  return (
    <Box sx={{ padding: "30px", marginLeft: "270px", maxWidth: "90%" }}>
      {/* Header + Add User Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          CUSTOMERS :
        </Typography>

        <Button
        startIcon={<AdminPanelSettingsIcon/>}
          variant="contained"
          sx={{
            background: "linear-gradient(135deg, #d7eca3, #f8df85)",
            fontWeight: "bold",
            color: "#000",
          }}
          onClick={() => navigate("/admin/manageuser")}
        >
          MANAGE
        </Button>
      </Box>

      {/* Users Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>SL.NO</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user, index) => (
              <StyledTableRow key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.address}</TableCell>
              
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}