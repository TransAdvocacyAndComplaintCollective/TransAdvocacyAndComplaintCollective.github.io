import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://amxkrdnodghyufjcipcj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFteGtyZG5vZGdoeXVmamNpcGNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTExOTY3NDYsImV4cCI6MjAyNjc3Mjc0Nn0.g8YbPX-Er9vyLwY_849JuxB6zljudceTsQTZYPngcb0"
);
const publishableKey =
  "pk_test_51OxSL5P2akJEZ09QF9Qi7quqa16S9DNOxS7UkN93QX5OXpcWql7aCOUi8QRSMUmxlsbkWbVOfMETrsgtLkn8O5s900yPwffWeA";
const stripePromise = loadStripe(publishableKey);

const Subscription = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { user, error } = await supabase.auth.session();
      if (user) {
        setIsLoggedIn(true);
        setEmail(user.email);
      } else {
        setIsLoggedIn(false);
        setEmail("");
      }
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  };

  const onClick = async () => {
    try {
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        mode: "subscription",
        customerEmail: email,
        lineItems: [],
        successUrl: "http://localhost:3000/success",
        cancelUrl: "http://localhost:3000/cancel",
        automaticTax: { enabled: false },
        billingAddressCollection: "required",
      });
      if (result.error) {
        console.error("Error:", result.error.message);
      }
    } catch (error) {
      console.error("Error redirecting to checkout:", error.message);
    }
  };

  return (
    <button onClick={onClick} disabled={!isLoggedIn}>
      Subscribe
    </button>
  );
};

export default Subscription;
