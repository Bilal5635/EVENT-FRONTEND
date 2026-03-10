import React, { useState, useContext } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../MyContextProvider'
export default function Register() {

  const { host } = useContext(UserContext)
  const nav = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  })

  // const handlechange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value })
  // }

  const handlechange = (e) => {
  const { name, value } = e.target;

  if (name === "phone") {
    const onlyNumbers = value.replace(/\D/g, "");
    setForm({ ...form, [name]: onlyNumbers });
  } else {
    setForm({ ...form, [name]: value });
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault()
     if (form.phone.length !== 10) {
    alert("Phone number must be exactly 10 digits");
    return;}


    try {
      const res = await axios.post(`${host}/users/adduser`, form)

      if (res.data.success) {
        alert("Registration Successful 🎉")
        nav('/login')
      } else {
        alert(res.data.message || "Registration Failed")
      }

    } catch (error) {
      console.log(error)
      alert("Error occurred during registration")
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#faf7f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2
      }}
    >

      <Box
        sx={{
          width: 420,
          p: 5,
          borderRadius: 4,
          backgroundColor: '#fff',
          border: '1px solid rgba(198,167,67,0.3)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
        }}
      >

        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            color: '#5A4A42',
            mb: 1
          }}
        >
          Create Account
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ color: '#888', mb: 4 }}
        >
          Register to book your dream events
        </Typography>

        <form onSubmit={handleSubmit}>

          <TextField
            fullWidth
            required
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handlechange}
            margin="normal"
          />

          <TextField
            fullWidth
            required
            type="email"
            label="Email Address"
            name="email"
            value={form.email}
            onChange={handlechange}
            margin="normal"
          />

          <TextField
            fullWidth
            required
            type="password"
            label="Password"
            name="password"
            value={form.password}
            onChange={handlechange}
            margin="normal"
          />

          <TextField
  fullWidth
  required
  type="tel"
  label="Mobile Number"
  name="phone"
  value={form.phone}
  onChange={handlechange}
  margin="normal"
  inputProps={{ maxLength: 10 }}
/>

          <TextField
            fullWidth
            label="Region / City"
            name="address"
            value={form.address}
            onChange={handlechange}
            margin="normal"
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 4,
              py: 1.4,
              borderRadius: 30,
              fontWeight: 600,
              background: 'linear-gradient(135deg,#D4AF37,#F3D6D6)',
              color: '#2E1A47',
              '&:hover': {
                background: 'linear-gradient(135deg,#F3D6D6,#D4AF37)'
              }
            }}
          >
            Register
          </Button>

        </form>

        <Typography textAlign="center" sx={{ mt: 3, fontSize: 14 }}>
          Already have an account?{' '}
          <Link
            to="/login"
            style={{
              textDecoration: 'none',
              color: '#C6A743',
              fontWeight: 600
            }}
          >
            Login
          </Link>
        </Typography>

      </Box>
    </Box>
  )
}