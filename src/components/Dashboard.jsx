import React, { useState } from "react";
import "./Dashboard.css";
import { Container, Row, Col, Button, Form, Card, Modal } from "react-bootstrap";
import { getAnalysis } from "../services/DashboardService";
import { ResumeSchema } from "../services/ResumeSchema";
import { getToken } from "../services/userServices"; // <-- Make sure this exists
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate=useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);



  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: ResumeSchema,
    onSubmit: async (values) => {
      const token = getToken();

      if (!token) {
        handleShow(); // Show modal if no token
        return;
      }

      setLoading(true);


      try {
        const response = await getAnalysis(values.file, token);
        if (response.status === 200) {
          setAnalysis(response.data);
        }
      } catch (error) {
        console.error(error);

      }
      finally{
        setLoading(false);

      }
    },
  });

  return (
    <div style={{ textAlign: "center", paddingTop: "100px" }}>

      {/* Loading spinner overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}


      {/* Banner images */}
      <img
        src="src/assets/BannerLg.png"
        alt="Large Banner"
        className="banner-lg"
        style={{
          maxWidth: "100vw",
          height: "90vh",
          margin: "0 auto",
        }}
      />
      <img
        src="src/assets/BannerSm.jpg"
        alt="Small Banner"
        className="banner-sm"
        style={{
          maxWidth: "100vw",
          height: "50vh",
          margin: "0 auto",
        }}
      />

      {/* Resume Upload & Analysis Section */}
      <Container className="mt-5">
        <Row>
          {/* Upload card */}
          <Col md={5} className="d-flex align-items-center justify-content-center">
            <Card className="p-4 shadow-sm w-100" style={{ minHeight: "500px" }}>
              <Card.Body className="d-flex align-items-center justify-content-center">
                <div
                  style={{
                    border: "2px dashed #dee2e6",
                    padding: "30px",
                    borderRadius: "10px",
                    width: "100%",
                  }}
                >
                  <Card.Title className="text-center mb-4">Upload Your Resume</Card.Title>
                  <form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Select your resume file (PDF, DOCX)</Form.Label>
                      <Form.Control
                        type="file"
                        accept=".pdf,.doc,.docx"
                        name="file"
                        onChange={(event) =>
                          formik.setFieldValue("file", event.currentTarget.files[0])
                        }
                        onBlur={() => formik.setFieldTouched("file", true)}
                        isInvalid={formik.touched.file && !!formik.errors.file}
                      />
                      {formik.errors.file && formik.touched.file && (
                        <Form.Text className="text-danger">
                          {formik.errors.file}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <div className="d-grid">

                      <Button variant="primary" type="submit" disabled={loading} className={loading ? "clicked" : ""}>{loading ? "Analyzing..." : "Upload"}</Button>

                      <Button variant="primary" type="submit">Upload</Button>

                    </div>
                  </form>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Analysis results */}
          <Col md={7} className="d-flex flex-column align-items-center justify-content-center">
            <h3 className="mb-4 mt-2 text-center">Resume Analysis</h3>

            {!analysis ? (
              <img
                src="src/assets/PreAnalysis.png"
                alt="No Analysis Yet"
                style={{
                  maxWidth: "100%",
                  maxHeight: "400px",
                  objectFit: "contain",
                }}
              />
            ) : (
              <div className="d-flex flex-column gap-4 w-100">
                {/* Each card below shows a section of analysis */}
                <Card bg="light" className="shadow-sm">
                  <Card.Body>
                    <Card.Title>ATS Score</Card.Title>
                    <Card.Text className="fs-4 fw-bold text-primary">
                      {analysis.ats_score} / 100
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card bg="light" className="shadow-sm">
                  <Card.Body>
                    <Card.Title>Technical Strengths</Card.Title>
                    <ul className="mb-0">
                      {analysis.technical_strengths.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>

                <Card bg="light" className="shadow-sm">
                  <Card.Body>
                    <Card.Title>Grammar Issues</Card.Title>
                    <ul className="mb-0 text-danger">
                      {analysis.grammar_issues.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>

                <Card bg="light" className="shadow-sm">
                  <Card.Body>
                    <Card.Title>Improvement Suggestions</Card.Title>
                    <ul className="mb-0 text-success">
                      {analysis.improvement_suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>

                <Card bg="light" className="shadow-sm">
                  <Card.Body>
                    <Card.Title>Final Summary</Card.Title>
                    <Card.Text style={{ textAlign: "justify" }}>
                      {analysis.final_summary}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* Modal: Prompt to Sign In */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign In Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>You must be signed in to analyze a resume.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => navigate("/signin")}>
            Go to Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Dashboard;
