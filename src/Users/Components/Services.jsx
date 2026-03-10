import React, { useEffect, useState, useContext } from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../MyContextProvider";

export default function Services() {

  const { host } = useContext(UserContext);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.post(`${host}/category/getcat`);

      if (res.data.success) {
        setCategories(res.data.data);
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    

    <Box sx={{ mt: 12, px: 6 }}>

      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 6
        }}
      >

        <Typography
          variant="h4"
          sx={{
            fontFamily: "Playfair Display",
            color: "#5A4A42",
            fontWeight: 600
          }}
        >
          Our Available Services
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>

          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            sx={{
              borderColor: "#C6A743",
              color: "#5A4A42",
              fontWeight: 600,
              borderRadius: "30px",
              px: 3,
              "&:hover": {
                borderColor: "#C6A743",
                backgroundColor: "rgba(198,167,67,0.08)"
              }
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

      {/* Category Cards */}

      <Grid container spacing={4}>

        {categories.map((cat) => (

          <Grid item xs={12} sm={6} md={4} key={cat._id}>

            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                textAlign: "center",
                background: "#f1e7d1",
                cursor: "pointer",
                transition: "all .3s ease",

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
                }
              }}
            >

              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Playfair Display",
                  color: "#5A4A42",
                  mb: 2,
                  fontWeight: 600
                }}
              >
                {cat.name}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#6b5d56"
                }}
              >
                {cat.description}
              </Typography>

            </Paper>

          </Grid>

        ))}

      </Grid>

    </Box>
  );
}