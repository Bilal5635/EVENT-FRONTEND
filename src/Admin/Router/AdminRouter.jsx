// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import ManageUser from '../Components/ManageUser';
// import Dashboard from '../Components/Dashboard';
// import AdminLogin from '../Components/AdminLogin';
// import Viewuser from '../Components/ViewUsers';
// import ClickDrawer from '../Components/ClickDrawer';
// import AddCategory from '../Components/AddCategory';
// import ViewCategory from '../Components/ViewCategory';
// import { useLocation } from 'react-router-dom';


// export default function AdminRouter() {
//   const location = useLocation();
// const noDrawer = ['/adminlogin']; // hide drawer on login
// const token = localStorage.getItem('adminToken');
// if (!token) return <AdminLogin />;
//   return (
//     <div>        
      

// {!noDrawer.includes(location.pathname) && <ClickDrawer />}
//       <Routes>
//         <Route path='/' element={<Dashboard />} />
//         <Route path='/manageuser' element={<ManageUser />} />
//         <Route path='/viewuser' element={<Viewuser />} />
//         <Route path='/viewcat' element={<ViewCategory />} />
//         <Route path='/addcat' element={<AddCategory />} />
//         <Route path='/adminlogin' element={<AdminLogin/>} />
//       </Routes>
//     </div>
//   );
// }


import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from '../Components/Dashboard';
import AdminLogin from '../Components/AdminLogin';
import ClickDrawer from '../Components/ClickDrawer';
import ManageUser from '../Components/ManageUser';
import Viewuser from '../Components/ViewUsers';
import AddCategory from '../Components/AddCategory';
import ViewCategory from '../Components/ViewCategory';
import AddEvent from '../Components/AddEvent';
import ViewEvents from '../Components/ViewEvents';
import ManageEvent from '../Components/ManageEvent'
import ManageCategory from '../Components/ManageCategory'
import AdminBookings from '../Components/AdminBookings';
import AcceptedBookings from '../Components/AcceptedBookings';
import ContactLaterBookings from '../Components/ContactLaterBookings';

export default function AdminRouter() {
  const location = useLocation();
  const token = localStorage.getItem('adminToken');

  // If not logged in → show login only
  if (!token) {
    return <AdminLogin />;
  }

  // Logged in → show drawer and admin pages
  return (
    <div>
      <ClickDrawer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/manageuser" element={<ManageUser />} />
        <Route path="/viewuser" element={<Viewuser />} />
        <Route path="/viewcat" element={<ViewCategory />} />
        <Route path="/addcat" element={<AddCategory />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/viewevent" element={<ViewEvents />} />
        <Route path="/manageevent" element={<ManageEvent />} />
        <Route path="/managecat" element={<ManageCategory />} />
        <Route path="/bookings" element={<AdminBookings />} />
        <Route path="/accepted" element={<AcceptedBookings />} />
        <Route path="/pending" element={<ContactLaterBookings />} />
        
        
        
        {/* prevent login access while logged in */}
        <Route path="/adminlogin" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}