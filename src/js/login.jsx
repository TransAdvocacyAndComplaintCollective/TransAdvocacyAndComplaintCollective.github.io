// Login.jsx
import React, { useContext, useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { signIn } from "./libs/googleAPI.js";
import { createRoot } from "react-dom/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !user.isAnonymous) {
        // if the user is logged in, redirect to home page
        window.location.href = "/";
      }
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError(null); // Reset any previous errors
      await signIn(email, password)
      // Handle successful login (redirect, etc.)
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed", error.message);
      setError(error.message); // Set the error message
    }
  };

  return (
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
  );
};

export default Login;

const domNode = document.getElementById("loginContainer");
const root = createRoot(domNode);
root.render(<Login />);
