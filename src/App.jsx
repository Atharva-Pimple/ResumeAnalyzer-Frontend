import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigationbar from "./components/Navigationbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./components/Dashboard";
// import {SignIn} from "./components/SignIn";
import { SignIn } from "./components/SignIn";

import {ContactUs} from "./components/ContactUs";

import { Register } from "./components/Register";
import { ToastContainer } from 'react-toastify';
import { AboutUs } from "./components/AboutUs";



function App() {
  
  return ( 
    <>
      <BrowserRouter>
        <Navigationbar/>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/about" element={<AboutUs/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/register" element={<Register/>} />
        </Routes>

        <ToastContainer/>
        
      </BrowserRouter>
    </>
  )
}

export default App
