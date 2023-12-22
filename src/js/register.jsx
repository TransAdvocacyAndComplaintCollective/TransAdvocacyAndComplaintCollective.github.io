import React, { useState } from 'react';
import { createRoot } from "react-dom/client";
import Input from "./component/Input.jsx";
import CountriesInput from "./component/CountriesInput.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Container, Form, Button, Row, Col } from "react-bootstrap"; // Import Bootstrap components
import { validateAddress1, validateAddress2, validatePostcode, validateCity, validatePhone } from "./libs/validate.js";
const Register = () => {
  const [billingFrequency, setBillingFrequency] = useState('yearly');
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  function handleSubmit(e) {
    // Handle form submission logic here
  }

  function validation(e) {
    return { isValid: true, messages: "" };
  }
  const monthlyCost = '$5 per month'; // Replace with your actual monthly cost
  const yearlyCost = '$50 per year'; // Replace with your actual yearly cost
  return (
    <Container className="py-5">
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Input
              validation={validation}
              name="firstName"
              title="First Name:"
              type="text"
            />
          </Col>
          <Col md={6}>
            <Input
              validation={validation}
              name="lastName"
              title="Last Name:"
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Input
              validation={validation}
              name="dob"
              title="Date of Birth:"
              type="date"
            />
          </Col>
          <Col md={6}>
            <Input
              validation={validation}
              name="email"
              title="Email:"
              type="email"
              onValidate={(text) => (validateEmail(text,undefined))}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Input
              validation={validation}
              name="address1"
              title="Address line 1:"
              type="text"
              onValidate={(text) => (validateAddress1(text,undefined))}
            />
          </Col>
          <Col md={6}>
            <Input
              validation={validation}
              name="address2"
              title="Address line 2:"
              type="text"
              onValidate={(text) => (validateAddress2(text,undefined))}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Input
              validation={validation}
              name="postcode"
              title="Postcode:"
              type="text"
              onValidate={(text) => (validatePostcode(text,undefined))}
            />
          </Col>
          <Col md={6}>
            <Input
              validation={validation}
              name="city"
              title="City:"
              type="text"
              onValidate={(text) => (validateCity(text,undefined))}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <CountriesInput />
          </Col>
          <Col md={6}>
            <Input
              validation={validation}
              name="phone"
              title="Phone:"
              type="text"
              onValidate={(text) => (validatePhone(text,undefined))}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Input
              validation={validation}
              name="password"
              title="Password:"
              type="password"
            />
          </Col>
          <Col md={6}>
            <Input
              validation={validation}
              name="repeatPassword"
              title="Repeat Password:"
              type="password"
            />
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <h2>Membership Cost</h2>
            <Form.Check
              type="radio"
              label={`Monthly Cost: ${monthlyCost}`}
              name="billingFrequency"
              id="monthly"
              checked={billingFrequency === "monthly"}
              onChange={() => setBillingFrequency("monthly")}
            />
            <Form.Check
              type="radio"
              label={`Yearly Cost: ${yearlyCost}`}
              name="billingFrequency"
              id="yearly"
              checked={billingFrequency === "yearly"}
              onChange={() => setBillingFrequency("yearly")}
            />
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="mt-3">
          Register and Pay
        </Button>
      </Form>
    </Container>
  );
};

const domNode = document.getElementById("RegisterContainer");
const root = createRoot(domNode);
root.render(<Register />);
