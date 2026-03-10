import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../MyContextProvider";

export default function AddEvent() {

  const { host } = useContext(UserContext);
  const nav = useNavigate();

  const [event,setEvent] = useState({
    eventName:"",
    category:"",
    approxPrice:""
  });

  const [image,setImage] = useState(null);
  const [categories,setCategories] = useState([]);

  // fetch categories
  useEffect(()=>{
    axios.post(`${host}/category/getcat`)
    .then((res)=>{
      if(res.data.success){
        setCategories(res.data.data);
      }
    })
    .catch((err)=>{
      console.log(err);
    });
  },[host]);

  const handleChange = (e)=>{
    setEvent({...event,[e.target.name]:e.target.value});
  };

  const handleImage =(e)=>{
    setImage(e.target.files[0]);
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const Data = new FormData();

    Data.append("eventName",event.eventName);
    Data.append("category",event.category);
    Data.append("approxPrice",event.approxPrice);
    Data.append("image",image);

    try {

      const res = await axios.post(`${host}/events/createevent`,Data,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });

      if(res.data.success){
        alert("Event Added Successfully");
        nav("/admin/viewevent");
      }

    } catch (error) {

      console.log(error);
      alert("Error Adding Event");

    }

  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >

      <Box
        sx={{
          width: 450,
          p: 4,
          borderRadius: 4,
          backgroundColor: "#fff",
          boxShadow: 12,
        }}
      >

        <Typography variant="h4" textAlign="center" fontWeight={700} mb={3}>
          ADD EVENT
        </Typography>

        <TextField
          fullWidth
          label="Event Name"
          name="eventName"
          value={event.eventName}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          select
          fullWidth
          label="Category"
          name="category"
          value={event.category}
          onChange={handleChange}
          margin="normal"
        >
          {categories.map((cat)=>(
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Approx Price"
          name="approxPrice"
          placeholder="Rs.5000/- to 10000/-"
          value={event.approxPrice}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          type="file"
          accept="image/*"
          onChange={handleImage}
          margin="normal"
        />

        <Button
          onClick={handleSubmit}
          fullWidth
          sx={{
            mt: 4,
            py: 1.4,
            borderRadius: 3,
            fontSize: 14,
            fontWeight: 600,
            color: "#fff",
            background: "linear-gradient(135deg, #d7eca3, #f8df85)",
            boxShadow: "0 8px 25px rgba(230, 226, 110, 0.4)",
          }}
        >
          ADD EVENT
        </Button>

      </Box>

    </Box>
  );
}