import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
import { loadStripe, StripeElementsOptions, StripeExpressCheckoutElementOptions, StripePaymentElementOptions } from "@stripe/stripe-js";
import { Elements, CardElement, PaymentElement, PaymentElementProps } from "@stripe/react-stripe-js";

const supabase = createClient(
  "https://amxkrdnodghyufjcipcj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFteGtyZG5vZGdoeXVmamNpcGNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTExOTY3NDYsImV4cCI6MjAyNjc3Mjc0Nn0.g8YbPX-Er9vyLwY_849JuxB6zljudceTsQTZYPngcb0"
);
const publishableKey = "pk_test_51OxSL5P2akJEZ09QF9Qi7quqa16S9DNOxS7UkN93QX5OXpcWql7aCOUi8QRSMUmxlsbkWbVOfMETrsgtLkn8O5s900yPwffWeA";
const stripePromise = loadStripe(publishableKey);


const VerifyEmail = () => {
  const [verificationMessage, setVerificationMessage] = useState("");
  const [subscribed, setSubscribed] = useState(false); // Corrected initial state

  const optionsCheckout = {
    mode: 'payment',
    amount: 1000,
    currency: 'gbp',
    // defaultValues: {
    //   billingDetails: {
    //     email: formData.email,
    //     phone: formData.phoneNumber,
    //     address: {
    //       line1: formData.addressLine1,
    //       line2: formData.addressLine2,
    //       city: formData.city,
    //       state: formData.county,
    //       postal_code: formData.postcode,
    //       country: formData.country,
    //     },
    //   },
    // }
  
  };
  const optionsElements = {
    mode: 'subscription',
    amount: 1000,
    currency: 'gbp',
  };
  
  useEffect(() => {
    async function verifyOTP() {
      const { data, error } = await supabase.auth.getSession();
      if (!error) {
        setVerificationMessage("You are already logged in");
        return;
      }
      // Extracting the query parameters from the URL
      const urlString = window.location.href;
      const url = new URL(urlString);
      const params = new URLSearchParams(url.hash.substring(1)); // Extract parameters from the hash part

      let queryParams = {};
      // Decoding and printing each parameter
      for (const [key, value] of params) {
        queryParams[key] = decodeURIComponent(value);
      }

      // Check if there's an error in the URL parameters
      if (queryParams.error) {
        setVerificationMessage(queryParams.error_description);
        return; // Stop further execution
      }

      if (queryParams.type && queryParams.type === "signup") {
        try {
          const { data: otpData, error } = await supabase.auth.verifyOtp({
            token_hash: queryParams.access_token,
            type: "signup",
          });

          if (error) {
            console.error("Error verifying OTP:", error.message);
            setVerificationMessage("Error verifying OTP: " + error.message);
          } else {
            console.log("OTP verified successfully:", otpData);
            setVerificationMessage("OTP verified successfully!");
            // Do something with the verified OTP data if needed
          }
        } catch (error) {
          console.error("Error verifying OTP:", error.message);
          setVerificationMessage("Error verifying OTP: " + error.message);
        }
      }
      verifyOTP();
    }
    verifyOTP();
    const checkSubscription = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (data && data.email) {
          const customers = await stripe.customers.list({ email: data.email });
          if (customers.data.length === 0) {
            setSubscribed(false);
            setVerificationMessage("You are not subscribed to any plan");
          } else {
            const subscriptions = await stripe.subscriptions.list({
              customer: customers.data[0].id,
            });
            if (subscriptions.data.length === 0) {
              setSubscribed(false);
              setVerificationMessage("You are not subscribed to any plan");
            } else {
              setSubscribed(true);
              setVerificationMessage("You are subscribed to a plan");
            }
          }
        }
      } catch (error) {
        console.error("Error checking subscription:", error.message);
        setVerificationMessage("Error checking subscription: " + error.message);
      }
    };

    const authListener = (event, session) => {
      if (event === "SIGNED_IN") {
        checkSubscription();
        setVerificationMessage("You are already logged in");
      } else if (event === "SIGNED_OUT") {
        setVerificationMessage("You are logged out");
      } else if (event === "USER_UPDATED" || event === "PASSWORD_RECOVERY") {
        checkSubscription();
        setVerificationMessage("User updated");
      }
    };

    supabase.auth.onAuthStateChange(authListener);

    // Cleanup function for removing the auth listener
    return () => {
      supabase.auth.removeAuthListener(authListener);
    };
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Verify Email</div>
            <div className="card-body">
              <p>{verificationMessage}</p>
              {subscribed ? (
                <button className="btn btn-primary" onClick={handleSignOut}>Sign Out</button>
              ) : (
                <>
                  <p>To become a member of the Pirate Party UK, please subscribe to a plan.</p>
                  <div className="form-group">
                    <h4>Billing and Payment Info</h4>
                    <Elements stripe={stripePromise}>
                      <CardElement className="form-control" />
                    </Elements>
                  </div>
                  <button className="btn btn-success">Subscribe</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<VerifyEmail />);
