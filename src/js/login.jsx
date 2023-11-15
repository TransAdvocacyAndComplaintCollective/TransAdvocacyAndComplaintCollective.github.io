import React, { useState, useCallback } from "react";
import { createRoot } from 'react-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

// Initialize Firebase app
const firebaseConfig = {
  // Your Firebase configuration
};

initializeApp(firebaseConfig);

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Add state for loggedIn

  const handleLogin = async () => { // Make handleLogin async
    try {
      const auth = getAuth(); // Get Auth instance
      await signInWithEmailAndPassword(auth, email, password); // Await the sign-in
      setLoggedIn(true); // Set loggedIn to true upon successful login
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure here
    }
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
                  <Button variant="primary" onClick={() => setLoggedIn(false)}>Log Out</Button>
                </div>
              ) : (
                <div>
                  <Card.Title>Login Page</Card.Title>
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" onClick={handleLogin}>Login</Button>
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
