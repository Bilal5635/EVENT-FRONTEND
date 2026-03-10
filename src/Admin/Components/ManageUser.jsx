
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
  IconButton,
  Button,
  Typography,
  TextField
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility'
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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

export default function ManageUsers() {
  const { host } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); 

  // Fetch users
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

  useEffect(() => {
    fetchUsers();
  }, [deleteStatus,host]);

  // Delete user with confirmation
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    axios
      .delete(`${host}/users/deleteUser/${id}`)
      .then((res) => {
        alert("Deleted successfully");
        setDeleteStatus(id);
      })
      .catch((err) => {
        console.error("Delete error:", err);
        alert("Error deleting user");
      });
  };

  // Edit user
  const handleEdit = (id) => {
    navigate(`/admin/users/edit/${id}`);
  };
  
  //Indexing
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      (user.phone && user.phone.includes(search))
  );

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
           MANAGE CUSTOMERS :
        </Typography>

        <Button 
        startIcon={<Visibility />}
        
          variant="contained"
          sx={{
            background: "linear-gradient(135deg, #d7eca3, #f8df85)",
            fontWeight: "bold",
            color: "#000",
          }}
          onClick={() => navigate("/admin/viewuser")}
        >
          VIEW
        </Button>
      </Box>
      <TextField
        label="Search customers..."
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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
              <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers.map((user, index) => (
              <StyledTableRow key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(user._id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}