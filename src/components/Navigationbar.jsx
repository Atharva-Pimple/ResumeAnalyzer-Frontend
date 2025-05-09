import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import logo from "../assets/search.png";
import { Link, useNavigate } from "react-router-dom";

function Navigationbar() {

  const navigate=useNavigate();

  const handelToggle=()=>{
    navigate("/signin");
  }
  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm py-3">
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
              <Nav.Link as={Link} to="/" className="px-3">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="px-3">
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className="px-3">
                Contact Us
              </Nav.Link>
              <Button variant="primary" className="ms-3" onClick={handelToggle}>
                Sign In
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigationbar;
