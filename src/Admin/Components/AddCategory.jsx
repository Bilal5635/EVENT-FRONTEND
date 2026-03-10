import React, {  useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../MyContextProvider";
import { useContext } from "react";

export default function AddCategory() {
  const { host } = useContext(UserContext);
  const nav = useNavigate();

  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

    // const [image,setImage]=useState(null)

  const handleChange = (e) => {
    setCategory({ ...category,[e.target.name]:e.target.value })
  };

  // const handleImage =(e)=>{
  //   setImage(e.target.files[0])
  // }

  const handleSubmit = async(e)=>{
    e.preventDefault(); 
  
  const Data = new FormData();//data is variable
    Data.append('name',category.name)
    Data.append('description',category.description)
    // Data.append('image',image)

   await axios.post(`${host}/category/addcat`,Data)
    .then((res)=>{
      if (res.data) {
        alert("Category added succesfully");
        nav("/admin/viewcat");
      }
      else{
        console.log("FAILED TO ADD CATEGORY");
      }
    })
    .catch((err)=>{
console.log(err)
alert("ERROR ADDING CATEGORY")
    });
  }; 

  console.log(category,"category")


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
          ADD EVENT CATEGORY
        </Typography>

        <TextField
          fullWidth
          label="Category Name"
          name="name"
          // value={category.name}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="description"
          name="description"
          // value={category.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
        />

        {/* <TextField
          fullWidth
          name="image"
          type="file"
          // value={category.image}
          accept="image/*"

          onChange={handleImage}
          margin="normal"
        /> */}

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
          ADD CATEGORY
        </Button>
      </Box>
    </Box>
  );
}