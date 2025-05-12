import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

const steps = [
  {
    id: 1,
    title: "Upload Resume",
    info: "Easily upload your resume in PDF or DOC format using our secure uploader.",
  },
  {
    id: 2,
    title: "Get Instant Analysis",
    info: "Receive instant feedback on your resume’s strengths, weaknesses, and improvements.",
  },
  {
    id: 3,
    title: "Optimize for ATS",
    info: "Our system helps you optimize your resume for Applicant Tracking Systems (ATS).",
  },
];

export const AboutUs = () => {
  const navigate = useNavigate(); 

  const handleRedirect = () => {
    navigate("/"); 
  };

  return (
    <div className="py-5">
      {/* Section 1 */}
      <section className="mb-5">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} lg={5} className="text-center mb-4 mb-lg-0">
              <Image
                src="src/assets/PreAnalysis.png"
                alt="Resume Upload"
                fluid
              />
            </Col>
            <Col xs={12} lg={7}>
              <h5 className="text-muted">-- POWERED BY AI & NLP</h5>
              <h2 className="mb-4">How does Resume Analyzer Work?</h2>
              {steps.map(({ id, title, info }) => (
                <Row key={id} className="mb-3 align-items-start">
                  <Col xs={1} className="fw-bold fs-5">
                    {id}.
                  </Col>
                  <Col xs={11}>
                    <h5>{title}</h5>
                    <p>{info}</p>
                  </Col>
                </Row>
              ))}
              <Button variant="outline-primary">Learn More</Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Section 2 */}
      <section>
        <Container>
          <Row className="align-items-center flex-lg-row-reverse">
            <Col xs={12} lg={5} className="text-center mb-4 mb-lg-0">
              <Image
                src="src/assets/AboutUSAI.jpg"
                alt="AI Support"
                fluid
              />
            </Col>
            <Col xs={12} lg={7}>
              <h5 className="text-muted">-- AVAILABLE 24/7</h5>
              <h2 className="mb-4">AI-Powered Support for Career Growth</h2>
              {steps.map(({ id, title, info }) => (
                <Row key={id} className="mb-3 align-items-start">
                  <Col xs={1} className="fw-bold fs-5">
                    {id}.
                  </Col>
                  <Col xs={11}>
                    <h5>{title}</h5>
                    <p>{info}</p>
                  </Col>
                </Row>
              ))}
              <Button variant="outline-primary" onClick={handleRedirect}>
                Get Started
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};
