import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigationbar from "./components/Navigationbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
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
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
