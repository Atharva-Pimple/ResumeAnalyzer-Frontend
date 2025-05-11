import React, { useState } from "react";
import "./Dashboard.css";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { getAnalysis } from "../services/DashboardService";
import { ResumeSchema } from "../services/ResumeSchema";
import { useFormik } from "formik";
import * as Yup from "yup";

function Dashboard() {
  const [analysis, setAnalysis] = useState(null);

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: ResumeSchema,
    onSubmit: async (values) => {
      try {
        const response = await getAnalysis(values.file);
        if (response.status === 200) {
          setAnalysis(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div style={{ textAlign: "center", paddingTop: "100px" }}>
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

      <Container className="mt-5">
        <Row>
          <Col
            md={5}
            className="d-flex align-items-center justify-content-center"
          >
            <Card
              className="p-4 shadow-sm w-100"
              style={{ minHeight: "500px" }}
            >
              <Card.Body className="d-flex align-items-center justify-content-center">
                <div
                  style={{
                    border: "2px dashed #dee2e6",
                    padding: "30px",
                    borderRadius: "10px",
                    width: "100%",
                    maxWidth: "100%",
                  }}
                >
                  <Card.Title className="text-center mb-4">
                    Upload Your Resume
                  </Card.Title>
                  <form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>
                        Select your resume file (PDF, DOCX)
                      </Form.Label>
                      <Form.Control
                        type="file"
                        accept=".pdf,.doc,.docx"
                        name="file"
                        onChange={(event) =>
                          formik.setFieldValue(
                            "file",
                            event.currentTarget.files[0]
                          )
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
                      <Button variant="primary" type="submit">
                        Upload
                      </Button>
                    </div>
                  </form>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col
            md={7}
            className="d-flex flex-column align-items-center justify-content-center"
          >
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
                      {analysis.improvement_suggestions.map(
                        (suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        )
                      )}
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
    </div>
  );
}

export default Dashboard;
