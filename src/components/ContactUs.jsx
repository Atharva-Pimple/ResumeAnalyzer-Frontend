import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

const developers = [
  {
    name: "Atharva Kishor Pimple",
    profession: "Software Developer",
    image: "src/assets/atharva.jpg", 
    linkedin: "https://www.linkedin.com/in/atharva-pimple-99bbbb216",
    email: "atharvapimple30@gmail.com",
    phone: "+91 8766491081",
  },
  {
    name: "Arpreet Khare",
    profession: "Backend Developer",
    image: "src/assets/arpreetkhare.jpg",
    linkedin: "https://www.linkedin.com/in/arpreetkhare41/",
    email: "khareanu41@gmail.com",
    phone: "+91 6232518943",
  },
  {
    name: "Fardeen Khan",
    profession: "Frontend Developer",
    image: "src/assets/fardeen.jpg",
    linkedin: "http://www.linkedin.com/in/fardeen-khan-581135294",
    email: "khanfardeen212@gmail.com",
    phone: "+91 9158674884",
  },
];

export const ContactUs = () => {
  return (
    <Container className="py-5" >
      <h2 className="text-center mb-5">Meet Our Team</h2>
      <Row className="g-4">
        {developers.map((dev, index) => (
          <Col key={index} xs={12} md={6} lg={4}>
            <Card className="h-100 shadow-sm" style={{borderRadius:"50px", backgroundColor:"#ECEFF1"}}>
              <Card.Img
                variant="top"
                src={dev.image}
                alt={dev.name}
                style={{ height: "300px", objectFit: "fill" , borderRadius:"50px"}}  
              />
              <Card.Body className="text-center">
                <Card.Title>{dev.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {dev.profession}
                </Card.Subtitle>
                <Card.Text>
                  <FaPhone className="me-2" />
                  {dev.phone}
                  <br />
                  <FaEnvelope className="me-2" />
                  <a href={`mailto:${dev.email}`} className="text-decoration-none">
                    {dev.email}
                  </a>
                </Card.Text>
                <Button
                  variant="primary"
                  href={dev.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="me-2" />
                  LinkedIn
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
