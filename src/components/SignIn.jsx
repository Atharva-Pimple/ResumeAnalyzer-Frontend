// import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { addToken, loginUser } from '../services/userServices';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import { SignInSchema } from '../Schemas/SignInSchema';



export function SignIn() {
  const navigate = useNavigate();

  async function handleSubmit(values) {
    try {
      const response = await loginUser(values);
      if (response.status === 200) {
        addToken(response.data.token);
        toast.success("User logged in successfully");
        navigate("/");
      } else {
        toast.error("User does not exist");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  const handleCombinedBlur = (e, blurHandler) => {
    blurHandler(e);
    e.target.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.1)';
  };

  return (
    <div
      style={{
        backgroundImage: 'url(/assets/BD_one_c.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        // padding:'20px',
        // marginBottom:'20px',
        marginTop:"80px",
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Poppins', sans-serif",
        backdropFilter: 'blur(3px)',
      }}
    >
      <Container className="d-flex justify-content-center align-items-center">
        <Card
          style={{
            width: '35rem',
            padding: '3rem',
            background: 'rgba(255, 255, 255, 0.85)',
            border: '0.1rem solid black',
            borderRadius: '4rem',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            animation: 'zoomIn 0.6s ease',
          }}
        >
          <h2 className="text-center mb-4" style={{ fontWeight: '700', color: '#2d3436' }}>
            Sign In to Resume Analyzer
          </h2>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={SignInSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
              isValid,
            }) => (
              <Form noValidate validated={isValid} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationCustomUsername">
                    <Form.Label style={{ fontWeight: 600 }}>Username</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="e.g. johndoe"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={(e) => handleCombinedBlur(e, handleBlur)}
                      isInvalid={touched.username && errors.username}
                      style={{
                        borderRadius: '0.8rem',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
                        border: '1px solid #ced4da',
                        transition: '0.3s',
                      }}
                      onFocus={(e) =>
                        (e.target.style.boxShadow = '0 0 8px rgba(0,123,255,0.5)')
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationCustomPassword">
                    <Form.Label style={{ fontWeight: 600 }}>Password</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="password"
                        placeholder="••••••••"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={(e) => handleCombinedBlur(e, handleBlur)}
                        isInvalid={touched.password && errors.password}
                        required
                        style={{
                          borderRadius: '0.8rem',
                          border: '1px solid #ced4da',
                          transition: '0.3s',
                        }}
                        onFocus={(e) =>
                          (e.target.style.boxShadow = '0 0 8px rgba(0,123,255,0.5)')
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Check
                    required
                    label="Agree to terms and conditions"
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                  />
                </Form.Group>

                <div className="d-grid gap-2 mt-4">
                  <Button
                    variant="dark"
                    type="submit"
                    style={{
                      borderRadius: '2rem',
                      padding: '0.75rem',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      transition: 'all 0.3s',
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#2c2c2c')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '')}
                  >
                    Sign In
                  </Button>

                  <Button
                    variant="outline-secondary"
                    type="button"
                    onClick={() => navigate('/register')}
                    style={{
                      borderRadius: '2rem',
                      fontWeight: 500,
                      textDecoration: 'none',
                    }}
                  >
                    Don't have an account? Register
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </Container>

      <style>
        {`
          @keyframes zoomIn {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
