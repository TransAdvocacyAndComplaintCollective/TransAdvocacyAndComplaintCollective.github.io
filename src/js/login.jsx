import React, { useState, useCallback,useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDL2CHHhPUg9K6_tV_5Z2bUl4wWcB3-sic",
  authDomain: "ptate-df901.firebaseapp.com",
  projectId: "ptate-df901",
  storageBucket: "ptate-df901.appspot.com",
  messagingSenderId: "795297920122",
  appId: "1:795297920122:web:9cfd9b972dc92213dd77c3",
  measurementId: "G-9MPXZR194T"
};
initializeApp(firebaseConfig);

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Add state for loggedIn
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to hold the error message

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setUserEmail(user.email);
      } else {
        setLoggedIn(false);
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []); // Empty dependency array ensures the effect runs only once

  const handleLogin = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      setLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error.message);
      setError(error.message); // Set the error message in state
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setError(null); // Clear error when logging out
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <Card>
            <Card.Body>
              {loggedIn ? (
                <div>
                  <Card.Title>Welcome, {email}!</Card.Title>
                  <Button variant="primary" onClick={handleLogout}>Log Out</Button>
                </div>
              ) : (
                <div>
                    <Card.Title>Login Page</Card.Title>
                     {error && <Alert variant="danger">{error}</Alert>}
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                      <Button variant="primary" onClick={handleLogin} disabled={loading}>
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </Form>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

const domNode = document.getElementById("loginContainer");
const root = createRoot(domNode);
root.render(<LoginPage />);
