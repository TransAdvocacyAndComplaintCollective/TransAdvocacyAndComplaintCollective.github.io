import React, { useState, useContext, useEffect } from "react";
import Input from "./component/Input.jsx";
import CountriesInput from "./component/CountriesInput.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from 'react-dom/client';
import { Container, Form, Button, Row, Col } from "react-bootstrap";
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
  validate_call,
} from "./libs/validate.js";
import {
  connectAuthEmulator,
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {auth, signUp, isUserLoggedIn } from "./libs/googleAPI.js";
console.log(auth);
const Register = () => {
  const [billingFrequency, setBillingFrequency] = useState("yearly");
  const [message, setMessage] = useState(null);
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
    passwordRepeat: { isValid: null, messages: "", value: "" },
  });
  // if user is logged in, redirect to home page

  // useEffect(() => {
  //   const checkUserLoggedIn = async () => {
  //     let userLogged = await isUserLoggedIn();
  //     if (userLogged) {
  //       window.location.href = "/";
  //     }
  //   };

  //   checkUserLoggedIn();
  // }, []);

  function validate_all(formData) {
    for (const key of formData.keys()) {
      if (!(key in validate_call)) {
        console.log("key not found:", key);
        continue;
      }
      validate_call[key](formData.get(key), setValidate, validation);
    }
  }

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user && !user.isAnonymous) {
  //       window.location.href = "/";
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    // Access form values directly from the event object
    const formData = new FormData(e.target);
    validate_all(formData);
    const userData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      dob: formData.get("dob"),
      email: formData.get("email"),
      address1: formData.get("address1"),
      address2: formData.get("address2"),
      postcode: formData.get("postcode"),
      city: formData.get("city"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      passwordRepeat: formData.get("passwordRepeat"),
      regionCode: formData.get("country"),
    };
    // Add your form submission logic here
    try {
      // Validate form data before submitting
      // Add your own validation logic or use a validation library

      // Example: Check if all fields are non-empty
      for (const key in userData) {
        if (!userData[key]) {
          throw new Error(`${key} is required.`);
        }
      }

      // Example: Check if password and repeat password match
      if (userData.password !== userData.passwordRepeat) {
        throw new Error("Passwords do not match.");
      }
      // Call the Firebase signUp function with the form data
      const d = await signUp(
        userData.firstName.toString(),
        userData.lastName.toString(),
        userData.dob.toString(),
        userData.email.toString(),
        userData.address1.toString(),
        userData.address2.toString(),
        userData.postcode.toString(),
        userData.city.toString(),
        userData.phone.toString(),
        userData.password.toString(),
        userData.regionCode.toString()
      );
      if (!d.isValid) {
        setMessage(d.messages);
      } else {
        setMessage(null);
        // go to home page
        window.location.href = "/";
      }

      // If successful, you can perform additional actions here
      console.log("Registration successful!");
    } catch (error) {
      // Handle form submission errors
      console.error("Error submitting the form:", error.message);
      // You might want to update the state to show an error message to the user
    }
  }

  return (
    <Container className="py-5">
      <h1>Register</h1>
      {/* show EROOR */}
      {message && <div className="error">{message}</div>}
      <Form onSubmit={handleSubmit}>
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
              type="tel"
              onValidate={(text) => validatePhone(text, setValidate)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Input
              validation={validation.password}
              onValidate={(password) =>
                validatePassword(password, setValidate, validation, false)
              }
              name="password"
              title="Password:"
              type="password"
            />
          </Col>
          <Col md={6}>
            <Input
              validation={validation.passwordRepeat}
              onValidate={(password) => {
                return validatePassword(
                  password,
                  setValidate,
                  validation,
                  true
                );
              }}
              name="passwordRepeat"
              title="Repeat Password:"
              type="password"
            />
          </Col>
        </Row>
        {/* <Row>
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
          </Row> */}
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
