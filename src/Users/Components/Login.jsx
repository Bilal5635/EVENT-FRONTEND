import React, { useState, useContext } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../MyContextProvider'

export default function Login() {

  const nav = useNavigate()
  const { host } = useContext(UserContext)

  const [login, setLogin] = useState({
    email: '',
    password: ''
  })

  const handlechange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post(`${host}/users/userlogin`, login)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("userToken", JSON.stringify(res.data.userToken))
          alert("Login Successful")
          nav('/')
        } else {
          alert("Invalid credentials")
        }
      })
      .catch(() => {
        alert("Error during login")
      })
  }

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

      {/* HOME BUTTON - TOP LEFT */}

      <Button
        startIcon={<ArrowBackIcon />}
        variant="contained"
        onClick={() => nav("/")}
        sx={{
          position: "fixed",
          top: 20,
          left: 20,
          background: "#fff",
          color: "#333",
          fontWeight: "bold",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          "&:hover": {
            background: "#f5f5f5"
          }
        }}
      >
        Home
      </Button>


      {/* LOGIN CARD */}

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

        {/* TITLE */}

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
          Welcome Back
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ color: '#888', mb: 4 }}
        >
          Login to manage your bookings & events
        </Typography>

        {/* EMAIL */}

        <TextField
          fullWidth
          onChange={handlechange}
          label="Email Address"
          name="email"
          value={login.email}
          type="email"
          margin="normal"
        />

        {/* PASSWORD */}

        <TextField
          fullWidth
          onChange={handlechange}
          label="Password"
          name="password"
          value={login.password}
          type="password"
          margin="normal"
        />

        {/* LOGIN BUTTON */}

        <Button
          onClick={handleSubmit}
          fullWidth
          sx={{
            mt: 4,
            py: 1.4,
            borderRadius: 30,
            fontWeight: 600,
            background: 'linear-gradient(135deg,#D4AF37,#F3D6D6)',
            color: '#2E1A47',
            '&:hover': {
              background: 'linear-gradient(135deg,#F3D6D6,#D4AF37)',
            }
          }}
        >
          Login
        </Button>


        {/* REGISTER LINK */}

        <Typography
          textAlign="center"
          sx={{ mt: 3, fontSize: 14 }}
        >
          Don't have an account?{' '}
          <Link
            to="/reg"
            style={{
              textDecoration: 'none',
              color: '#C6A743',
              fontWeight: 600
            }}
          >
            Register
          </Link>
        </Typography>

      </Box>

    </Box>
  )
}