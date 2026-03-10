import './App.css';
import AdminRouter from './Admin/Router/AdminRouter';
import UserRouter from './Users/Router/UserRouter'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>

        <Route path='/admin/*' element={<AdminRouter/>}/>
        <Route path='/*' element={<UserRouter/>}/>

 
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
