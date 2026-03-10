import React from 'react'
import Home from '../Components/Home'
import { Routes,Route } from 'react-router-dom'
import Booking from '../Components/Booking'
import Login from '../Components/Login'
import Register from '../Components/Register'
import Contact from '../Components/Contact'
import Services from '../Components/Services'
import Gallery from '../Components/Gallery'
import MyEvents from '../Components/MyEvents'
import Birthday from '../Components/Birthday'
import Engagement from '../Components/Engagement'
import Corporate from '../Components/Corporate'
import Dinner from '../Components/Dinner'
import Shadi from '../Components/Shadi'
import EAppbar from '../Components/EAppbar'


export default function UserRouter() {
  return (
    <div>
      <EAppbar/>
      <Routes>
        
         <Route path='/' element={<Home/>}/>
         <Route path='/booking' element={<Booking/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/reg' element={<Register/>}/>
         <Route path='/contact' element={<Contact/>}/>
         <Route path="/services" element={<Services />} />
         <Route path="/gallery" element={<Gallery />} />
         <Route path="/myevents" element={<MyEvents />} />
         <Route path="/birthday" element={<Birthday />} />
        <Route path="/engagement" element={<Engagement/>}/>
        <Route path="/corporate" element={<Corporate/>}/>
        <Route path="/dinner" element={<Dinner/>}/>
        <Route path="/shadi" element={<Shadi/>}/>
        

      </Routes>
    </div>
  )
}
