import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import EventIcon from "@mui/icons-material/Event";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { UserContext } from "../../MyContextProvider";
import { useNavigate } from "react-router-dom";

export default function Booking() {

  const { host } = useContext(UserContext);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [form, setForm] = useState({
    category: "",
    event: "",
    date: "",
    place: "",
    venue: "",
    specialRequirement: ""
  });


  // ===============================
  // CHECK LOGIN
  // ===============================
  useEffect(() => {

    const token = localStorage.getItem("userToken");

    if (!token) {
      alert("Kindly login to continue");
      setIsLoggedIn(false);
      navigate("/login");
    }

  }, [navigate]);


  // ===============================
  // FETCH USER PROFILE
  // ===============================
  useEffect(() => {

    const token = JSON.parse(localStorage.getItem("userToken"));

    if (!token) return;

    axios.post(
      `${host}/users/profile`,
      {},
      {
        headers: { "auth-token": token }
      }
    )
    .then(res => setUser(res.data.data))
    .catch(err => console.log(err));

  }, []);


  // ===============================
  // FETCH CATEGORIES
  // ===============================
  useEffect(() => {

    if (!isLoggedIn) return;

    axios.post(`${host}/category/getcat`)
      .then(res => setCategories(res.data.data))
      .catch(err => console.log(err));

  }, [isLoggedIn]);


  // FETCH EVENTS
  useEffect(() => {

    if (!isLoggedIn) return;

    axios.post(`${host}/events/getevents`)
      .then(res => setEvents(res.data.data))
      .catch(err => console.log(err));

  }, [isLoggedIn]);


  const handlechange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };


  const handleEventChange = (e) => {

    const eventId = e.target.value;

    setForm({
      ...form,
      event: eventId
    });

    const foundEvent = events.find(ev => ev._id === eventId);

    setSelectedEvent(foundEvent);

  };


  // ===============================
  // SUBMIT BOOKING
  // ===============================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = JSON.parse(localStorage.getItem("userToken"));

      if (!token) {
        alert("Kindly login to continue");
        navigate("/login");
        return;
      }

      const res = await axios.post(
        `${host}/booking/create`,
        form,
        {
          headers: { "auth-token": token }
        }
      );

      if (res.data.success) {

        alert("Booking request submitted 🎉");

        setForm({
          category: "",
          event: "",
          date: "",
          place: "",
          venue: "",
          specialRequirement: ""
        });

        setSelectedEvent(null);

      }

    } catch (error) {

     if(error.response){
alert(error.response.data.message);
}else{
alert("Booking failed");
}
    }

  };


  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: "#faf7f2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2
      }}
    >

      {/* BACK BUTTON */}

      <Button
        startIcon={<ArrowBackIcon />}
        variant="contained"
        onClick={() => navigate("/")}
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


      <Box
        sx={{
          width: 520,
          p: 5,
          borderRadius: 4,
          backgroundColor: "#fff",
          border: "1px solid rgba(198,167,67,0.3)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)"
        }}
      >

        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            color: "#5A4A42",
            mb: 1
          }}
        >
          <EventIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Book Event
        </Typography>

        <Typography
          textAlign="center"
          sx={{ color: "#888", mb: 4 }}
        >
          Fill the form to request event booking
        </Typography>


        <form onSubmit={handleSubmit}>


          <TextField
            fullWidth
            label="Name"
            value={user?.name || ""}
            margin="normal"
            InputProps={{ readOnly: true }}
          />

          <TextField
            fullWidth
            label="Email"
            value={user?.email || ""}
            margin="normal"
            InputProps={{ readOnly: true }}
          />


          <TextField
            select
            fullWidth
            label="Event Category"
            name="category"
            value={form.category}
            onChange={handlechange}
            margin="normal"
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>


          <TextField
            select
            fullWidth
            label="Select Event"
            name="event"
            value={form.event}
            onChange={handleEventChange}
            margin="normal"
            required
            disabled={!form.category}
          >
            {events
              .filter(ev =>
                ev.category?._id === form.category ||
                ev.category === form.category
              )
              .map((ev) => (
                <MenuItem key={ev._id} value={ev._id}>
                  {ev.eventName}
                </MenuItem>
              ))}
          </TextField>


          {selectedEvent && (

            <Box
              sx={{
                mt: 2,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
              }}
            >

              <img
                src={`${host}/image/${selectedEvent.image}`}
                alt="event"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover"
                }}
              />

              <Box sx={{ p: 2 }}>

                <Typography fontWeight="bold">
                  {selectedEvent.eventName}
                </Typography>

                <Typography color="text.secondary">
                  Approx Price: {selectedEvent.approxPrice}
                </Typography>

              </Box>

            </Box>

          )}


          <TextField
            fullWidth
            type="date"
            label="Event Date"
            name="date"
            value={form.date}
            onChange={handlechange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />


          <TextField
            fullWidth
            label="Place"
            name="place"
            value={form.place}
            onChange={handlechange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Venue"
            name="venue"
            value={form.venue}
            onChange={handlechange}
            margin="normal"
          />


          <TextField
            fullWidth
            multiline
            rows={3}
            label="Special Requirement"
            name="specialRequirement"
            value={form.specialRequirement}
            onChange={handlechange}
            margin="normal"
          />


          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 4,
              py: 1.5,
              borderRadius: 5,
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: 1,
              background: "linear-gradient(135deg,#D4AF37,#F3D6D6)",
              color: "#2E1A47",
              boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
              "&:hover": {
                background: "linear-gradient(135deg,#F3D6D6,#D4AF37)"
              }
            }}
          >
            BOOK EVENT
          </Button>

        </form>

      </Box>

    </Box>

  );

}