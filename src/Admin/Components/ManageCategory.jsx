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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Visibility from '@mui/icons-material/Visibility'

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import SecurityIcon from "@mui/icons-material/Security";
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

export default function ViewCategory() {

  const { host } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(null);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {

      const res = await axios.post(`${host}/category/getcat`);

      if (res.data.success) {
        setCategories(res.data.data);
      }

    } catch (error) {

      console.error("Error fetching categories:", error);

    }
  };

  useEffect(() => {
    fetchCategories();
  }, [deleteStatus,host]);

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {

      const res = await axios.post(`${host}/category/deletecat/${id}`);

      if (res.data.success) {
        alert("Category deleted successfully");
        setDeleteStatus(id);
      }

    } catch (error) {

      console.error("Delete error:", error);
      alert("Error deleting category");

    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/category/updatecat/${id}`);
  };

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
          Manage Categories
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>

          <Button
            variant="contained"
            startIcon={<Visibility/>}
            sx={{
              background: "linear-gradient(135deg, #d7eca3, #f8df85)",
              fontWeight: "bold",
              color: "#000",
            }}
            onClick={() => navigate("/admin/viewcat")}
          >
            VIEW
          </Button>

          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #d7eca3, #f8df85)",
              fontWeight: "bold",
              color: "#000",
            }}
            onClick={() => navigate("/admin/addcat")}
          >
            + ADD CATEGORY
          </Button>

        </Box>

      </Box>

      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <StyledTableCell>SL.NO</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {categories.map((row, index) => (

              <StyledTableRow key={row._id}>

                <TableCell>{index + 1}</TableCell>

                <TableCell>{row.name}</TableCell>

                <TableCell>{row.description}</TableCell>

                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(row._id)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>

                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(row._id)}
                  >
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