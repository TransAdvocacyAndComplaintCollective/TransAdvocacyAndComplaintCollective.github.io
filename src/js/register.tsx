import React, { useState } from "react";
import { Elements, PaymentElement, PaymentElementProps } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions, StripeExpressCheckoutElementOptions, StripePaymentElementOptions } from "@stripe/stripe-js";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
// import { StripeProvider } from "@stripe/stripe-react-native";
const publishableKey = "pk_test_51OxSL5P2akJEZ09QF9Qi7quqa16S9DNOxS7UkN93QX5OXpcWql7aCOUi8QRSMUmxlsbkWbVOfMETrsgtLkn8O5s900yPwffWeA";

// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const stripePromise = loadStripe(publishableKey);
const supabase = createClient('https://amxkrdnodghyufjcipcj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFteGtyZG5vZGdoeXVmamNpcGNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTExOTY3NDYsImV4cCI6MjAyNjc3Mjc0Nn0.g8YbPX-Er9vyLwY_849JuxB6zljudceTsQTZYPngcb0')

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    county: "",
    postcode: "",
    email: "",
    country: "",
    phoneNumber: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.firstName || !formData.lastName || !formData.dob || !formData.addressLine1 || !formData.city || !formData.county || !formData.postcode || !formData.email || !formData.phoneNumber || !formData.password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const signUpResult = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        phone: formData.phoneNumber,
        options: {
          emailRedirectTo: 'http://localhost:8080/verify-email.html',
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            dob: formData.dob,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            city: formData.city,
            county: formData.county,
            postcode: formData.postcode,
            country: formData.country,
            phoneNumber: formData.phoneNumber,
          },
        }
      });

    if (signUpResult.error) {
      console.error(signUpResult.error);
      setErrorMessage("Registration failed. Please try again. Error: " + signUpResult.error);
      return;
    }

    // Reset form data
    setFormData({
      firstName: "",
      lastName: "",
      dob: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      county: "",
      postcode: "",
      email: "",
      country: "",
      phoneNumber: "",
      password: ""
    });

    // Reset error message
    setErrorMessage("");
  } catch (error) {
    // Handle error here
    console.error(error);
    setErrorMessage("Registration failed. Please try again.");
  }
};

const handleInputChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
const optionsCheckout = {
  mode: 'payment',
  amount: 1000,
  currency: 'gbp',
  defaultValues: {
    billingDetails: {
      email: formData.email,
      phone: formData.phoneNumber,
      address: {
        line1: formData.addressLine1,
        line2: formData.addressLine2,
        city: formData.city,
        state: formData.county,
        postal_code: formData.postcode,
        country: formData.country,
      },
    },
  }

};
const optionsElements = {
  mode: 'subscription',
  amount: 1000,
  currency: 'gbp',
};

return (
  <Elements stripe={stripePromise} options={optionsElements} >
    <div className="alert alert-danger" role="alert" style={{ display: errorMessage ? "block" : "none" }}>
      {errorMessage}
    </div>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="md-6">
            <h4>Personal Information</h4>
            <div className="mb-4">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="date"
                className="form-control"
                placeholder="Date of Birth"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="md-6">
            <h4>Address Information</h4>
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Address Line 1"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Address Line 2"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="County"
                name="county"
                value={formData.county}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Postcode"
                name="postcode"
                value={formData.postcode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="md-6">
            <h4>Contact Information</h4>
            <div className="mb-4">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                className="form-control"
                placeholder="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="md-6">
            <h4>Billing and Payment Info</h4>
            <PaymentElement options={optionsCheckout} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Register £10 per Month</button>
      </form>
    </div>
  </Elements>
);
};

export default RegistrationForm;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<RegistrationForm />);
