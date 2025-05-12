import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import logo from "../assets/search.png";
import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../services/userServices"; 


export function Navigationbar() {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token on mount and on token change
  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token); // if token exists, user is logged in
  }, []);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      // Logout logic
      removeToken();
      setIsLoggedIn(false);
      navigate("/signin");
    } else {
      // Sign in redirect
      navigate("/signin");
    }
  };

  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm py-3 fixed-top">
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center gap-2 fw-bold fs-4"
          >
            <img src={logo} height="40" alt="Logo" className="d-inline-block" />
            ResumeLens
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className="px-3">Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className="px-3">About Us</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="px-3">Contact Us</Nav.Link>

              <Nav.Link as={Link} to="/profile" className="px-3">Profile </Nav.Link>

              <Button variant="primary" className="ms-3" onClick={handleAuthAction}>
                {isLoggedIn ? "Logout" : "Sign In"}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  
  );
}


