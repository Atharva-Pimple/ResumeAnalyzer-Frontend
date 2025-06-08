import { useNavigate } from 'react-router-dom';
import { registerUser } from "../services/userServices";
import { toast } from 'react-toastify';

import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import {
  Button, Col, Container, Row, Card, InputGroup, Form as BootstrapForm
} from 'react-bootstrap';
import { validationSchema } from '../Schemas/SignupSchema';


export function Register() {
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    email: '',
    password: '',
    terms: false
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await registerUser(values);
      if (response.status === 201) {
        toast.success('User registered successfully');
        resetForm();
        navigate('/signin');
      } else {
        toast.error('Error');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
    setSubmitting(false);
  };

  return (
    <div
      style={{
        backgroundImage: 'url(/assets/BD_one_c.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '70vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Poppins', sans-serif",
        backdropFilter: 'blur(3px)',
        marginBottom: '30px',
        marginTop:"120px",
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
            Create Account
          </h2>
          <p className="text-center text-muted mb-4">AI-Powered Resume Analyzer</p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <FormikForm noValidate>
                <Row className="mb-3">
                  <BootstrapForm.Group as={Col} controlId="username">
                    <BootstrapForm.Label style={{ fontWeight: 600 }}>Username</BootstrapForm.Label>
                    <Field
                      name="username"
                      type="text"
                      placeholder="e.g. johndoe"
                      className="form-control"
                      style={{
                        borderRadius: '0.8rem',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
                        border: '1px solid #ced4da',
                      }}
                    />
                    <div className="text-danger mt-1">
                      <ErrorMessage name="username" />
                    </div>
                  </BootstrapForm.Group>
                </Row>

                <Row className="mb-3">
                  <BootstrapForm.Group as={Col} controlId="email">
                    <BootstrapForm.Label style={{ fontWeight: 600 }}>Email</BootstrapForm.Label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="e.g. johndoe@example.com"
                      className="form-control"
                      style={{
                        borderRadius: '0.8rem',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
                        border: '1px solid #ced4da',
                      }}
                    />
                    <div className="text-danger mt-1">
                      <ErrorMessage name="email" />
                    </div>
                  </BootstrapForm.Group>
                </Row>

                <Row className="mb-3">
                  <BootstrapForm.Group as={Col} controlId="password">
                    <BootstrapForm.Label style={{ fontWeight: 600 }}>Password</BootstrapForm.Label>
                    <InputGroup hasValidation>
                      <Field
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className="form-control"
                        style={{
                          borderRadius: '0.8rem',
                          border: '1px solid #ced4da',
                        }}
                      />
                    </InputGroup>
                    <div className="text-danger mt-1">
                      <ErrorMessage name="password" />
                    </div>
                  </BootstrapForm.Group>
                </Row>

                <BootstrapForm.Group className="mb-3" controlId="terms">
                  <div className="form-check">
                    <Field
                      type="checkbox"
                      name="terms"
                      className="form-check-input"
                    />
                    <label className="form-check-label">
                      Agree to terms and conditions
                    </label>
                    <div className="text-danger mt-1">
                      <ErrorMessage name="terms" />
                    </div>
                  </div>
                </BootstrapForm.Group>

                <div className="d-grid gap-2 mt-4">
                  <Button
                    variant="dark"
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      borderRadius: '2rem',
                      padding: '0.75rem',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                    }}
                  >
                    {isSubmitting ? 'Registering...' : 'Register'}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    type="button"
                    onClick={() => navigate('/signin')}
                    style={{
                      borderRadius: '2rem',
                      fontWeight: 500,
                    }}
                  >
                    Already have an account? Sign In
                  </Button>
                </div>
              </FormikForm>
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
