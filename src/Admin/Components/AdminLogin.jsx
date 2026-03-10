import React, { useState } from 'react'
import axios from "axios";
import { useContext } from "react";
import { UserContext } from '../../MyContextProvider';


import { Box,Typography,TextField,Button,Paper} from '@mui/material'
import { useNavigate } from 'react-router-dom'


export default function AdminLogin() {

  const { host } = useContext(UserContext);

  const nav=useNavigate();
  const [admin, setAdmin] = useState({
    
    email: '',
    password: ''
   
  })

  


  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value })
  }

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${host}/api/adminlogin`, admin)

      if (res.data.success) {
        localStorage.setItem(
          'adminToken',
          JSON.stringify(res.data.adminToken)
        )
        alert('ADMIN LOGIN SUCCESSFUL')
        nav('/admin')
      } else {
        alert('Invalid admin credentials')
      }
    } catch (error) {
      console.error(error)
      alert('ERROR DURING ADMIN LOGIN')
    }
  }

  return (
    <>
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          py: 6,
          background: '#faf7f2'
        }}
      >

        <Paper
          elevation={0}
          sx={{
            maxWidth: 500,
            width: '100%',
            p: 4,
            borderRadius: 3,
            border: '1px solid rgba(198,167,67,0.3)'
          }}
        >

          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              fontFamily: '"Playfair Display", serif',
              color: '#5A4A42',
              mb: 3
            }}
          >
            LOGIN AS ADMIN
          </Typography>

          <form onSubmit={handleSubmit}>

      

            <TextField
              label="Email"
              name="email"
              type='email'
              fullWidth
              required
              margin="normal"
              value={admin.email}
              onChange={handleChange}
            />

            <TextField
              label="password"
              name="password"
              type='password'
              fullWidth
              required
              margin="normal"
              value={admin.password}
              onChange={handleChange}
            />


            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 30,
                fontWeight: 600,
                background: 'linear-gradient(135deg,#D4AF37,#F3D6D6)',
                color: '#2E1A47',
                '&:hover': {
                  background: 'linear-gradient(135deg,#F3D6D6,#D4AF37)'
                }
              }}
            >
              LOGIN
            </Button>

          </form>
        </Paper>
      </Box>

      {/* SUCCESS MESSAGE */}
      
       

    </>
  )
}