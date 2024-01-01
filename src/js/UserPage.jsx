// UserPage.js
import React, { useState } from "react";
import { Tab, Tabs, Form, Button, Row, Col } from "react-bootstrap";
import { createRoot } from "react-dom/client";
import Input from "./component/Input.jsx";
import CountriesInput from "./component/CountriesInput.jsx";
import {
  validateFirstName,
  validateLastName,
  validateDOB,
  validateAddress1,
  validateAddress2,
  validatePostcode,
  validateCity,
  validateEmail,
  validatePhone,
  validatePassword,
} from "./libs/validate.js";

const UserPage = () => {
  const [activeTab, setActiveTab] = useState("updatePassword");
  const [billingFrequency, setBillingFrequency] = useState('yearly');
  const [validation, setValidate] = useState({
    firstName: { isValid: null, messages: "", value: "" },
    lastName: { isValid: null, messages: "", value: "" },
    dob: { isValid: null, messages: "", value: "" },
    email: { isValid: null, messages: "", value: "" },
    address1: { isValid: null, messages: "", value: "" },
    address2: { isValid: null, messages: "", value: "" },
    postcode: { isValid: null, messages: "", value: "" },
    city: { isValid: null, messages: "", value: "" },
    phone: { isValid: null, messages: "", value: "" },
    password: { isValid: null, messages: "", value: "" },
    repeatPassword: { isValid: null, messages: "", value: "" },
  });
  const monthlyCost = '£5 per month'; // Replace with your actual monthly cost
  const yearlyCost = '£50 per year'; // Replace with your actual yearly cost

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    // get the form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
  };

  const handleUpdateDetails = (e) => {
    e.preventDefault();
    // get the form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
  };
  const handleUpdateMembership = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data["billingFrequency"] = billingFrequency;
  };

  return (
    <FirebaseContext.Provider value={contextValue}>
    <div className="container mt-5">
      <Tabs activeKey={activeTab} onSelect={handleTabChange} className="mb-3">
        <Tab eventKey="updatePassword" title="Update Password">
          <Form onSubmit={handleUpdatePassword} className="mt-3">
            <Row>
              <Col md={6}>
                <Input
                  validation={validation.password}
                  onValidate={(password) =>
                    validatePassword(password, false, setValidate)
                  }
                  name="password"
                  title="Password:"
                  type="password"
                />
              </Col>
              <Col md={6}>
                <Input
                  validation={validation.repeatPassword}
                  onValidate={(password) =>
                    validatePassword(password, true, setValidate)
                  }
                  name="repeatPassword"
                  title="Repeat Password:"
                  type="password"
                />
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Update Password
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="updateDetails" title="Update Details">
          <Form onSubmit={handleUpdateDetails} className="mt-3">
            {" "}
            <Row>
              <Col md={6}>
                <Input
                  name="firstName"
                  title="First Name:"
                  type="text"
                  onValidate={(e) => validateFirstName(e, setValidate)}
                  validation={validation.firstName}
                />
              </Col>
              <Col md={6}>
                <Input
                  name="lastName"
                  title="Last Name:"
                  type="text"
                  onValidate={(e) => validateLastName(e, setValidate)}
                  validation={validation.lastName}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Input
                  onValidate={(dob) => validateDOB(dob, setValidate)}
                  name="dob"
                  title="Date of Birth:"
                  type="date"
                  validation={validation.dob}
                />
              </Col>
              <Col md={6}>
                <Input
                  validation={validation.email}
                  name="email"
                  title="Email:"
                  type="email"
                  onValidate={(text) => validateEmail(text, setValidate)}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Input
                  validation={validation.address1}
                  name="address1"
                  title="Address line 1:"
                  type="text"
                  onValidate={(text) => validateAddress1(text, setValidate)}
                />
              </Col>
              <Col md={6}>
                <Input
                  validation={validation.address2}
                  name="address2"
                  title="Address line 2:"
                  type="text"
                  onValidate={(text) => validateAddress2(text, setValidate)}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Input
                  validation={validation.postcode}
                  name="postcode"
                  title="Postcode:"
                  type="text"
                  onValidate={(text) => validatePostcode(text, setValidate)}
                />
              </Col>
              <Col md={6}>
                <Input
                  validation={validation.city}
                  name="city"
                  title="City:"
                  type="text"
                  onValidate={(text) => validateCity(text, setValidate)}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <CountriesInput />
              </Col>
              <Col md={6}>
                <Input
                  validation={validation.phone}
                  name="phone"
                  title="Phone:"
                  type="text"
                  onValidate={(text) => validatePhone(text, setValidate)}
                />
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Update Details
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="deleteAccount" title="Delete Account">
          <Form onSubmit={handleDeleteAccount} className="mt-3">
            {/* Add delete account confirmation */}
            <Button variant="danger" type="submit">
              Delete Account
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="updateMembership" title="Update Membership">
          <Form onSubmit={handleUpdateMembership} className="mt-3">
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
            <Button variant="primary" type="submit">
              Update Membership
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </div>
    </FirebaseContext.Provider>
  );
};

const domNode = document.getElementById("UserPage");
const root = createRoot(domNode);
root.render(<UserPage />);
