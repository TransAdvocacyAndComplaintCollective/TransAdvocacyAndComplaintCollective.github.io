import React, { useState } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { createCheckoutSession } from "@stripe/firestore-stripe-payments";
import { getStripePayments } from "@stripe/firestore-stripe-payments";
import { doc, collection, getFirestore, setDoc } from "firebase/firestore";

// Firebase configuration
let pices = {
  
  year: { 5: "price_1NPNQFI39QBFoSmH0ubp2YEZ", 15: "price_1NPNQFI39QBFoSmHlDVnY0ox", 20: "price_1NPNQFI39QBFoSmH2nUy3E3S", 100: "price_1NPNQFI39QBFoSmHBGddtnPu" },
   months: { 5: "price_1NPNQEI39QBFoSmHXk5HDVeb", 15: "price_1NPNQEI39QBFoSmHXk5HDVeb", 20: "price_1NPNQEI39QBFoSmHiGGWDsmc", 100: "price_1NPNQEI39QBFoSmHflcSjxkO" },
  week: { 5: "price_1NPNQEI39QBFoSmHjRU80Mig", 15: "price_1NPNQEI39QBFoSmH6Z9llKyk", 20: "price_1NPNQEI39QBFoSmHLiMfH9Qf", 100: "price_1NPNQFI39QBFoSmH9oS3EZpt" },
  one_off: "price_1NPNQFI39QBFoSmHpMdvdmKU",
};
const firebaseConfig = {
  apiKey: "AIzaSyDL2CHHhPUg9K6_tV_5Z2bUl4wWcB3-sic",
  authDomain: "ptate-df901.firebaseapp.com",
  projectId: "ptate-df901",
  storageBucket: "ptate-df901.appspot.com",
  messagingSenderId: "795297920122",
  appId: "1:795297920122:web:9cfd9b972dc92213dd77c3",
  measurementId: "G-9MPXZR194T",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});
const DonationForm = () => {
  const [plans, setPlans] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [address4, setAddress4] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("GB");
  const [isRecurring, setIsRecurring] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      console.log("handleSubmit");
      e.preventDefault();
      const currentUser = auth.currentUser;
      setIsLoading(true);
      
      if (!currentUser) {
        // User is not logged in, create an anonymous account and log them in
        try {
          console.log("Creating anonymous user");
          const anonymousUser = await signInAnonymously(auth);
          console.log("Anonymous user created:", anonymousUser);
          console.log("Anonymous user logged in");
        } catch (error) {
          console.log("Error creating or logging in anonymous user:", error);
          setIsLoading(false);
          return;
        }
      }
      // Save donation data to
      const userCredential = auth.currentUser;

      const uid = userCredential.uid;
      const DonationsCollectionRef = collection(db, "donations");
      const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: {
          addressLines: [address1, address2, address3, address4],
          locality: city,
          regionCode: country,
        },
        isRecurring: isRecurring,
        uid: uid,
      };
      await setDoc(doc(DonationsCollectionRef, uid), data);
      if (plans == "one_off") {
        let rate = pices[plans];
        const session = await createCheckoutSession(payments, {
          price: rate,
        });
        window.location.href = session.url;
      } else {
        let rate = pices[plans][amount];
        const session = await createCheckoutSession(payments, {
          price: rate,
        });
        window.location.href = session.url;
      }
      console.log("createCheckoutSession done");

      // Reset form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setAmount("");
      setAddress1("");
      setAddress2("");
      setAddress3("");
      setCity("");
      setPostcode("");
      setCountry("");
      setIsRecurring(false);
    } catch (error) {
      setIsLoading(false);
    } finally {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <select
          value={plans}
          onChange={(e) => setPlans(e.target.value)}
          name="plans"
          id="plans"
          className="form-control"
        >
          <option value="one_off">One off Customer Chooses</option>
          <option value="year">year</option>
          <option value="week">week</option>
          <option value="months">months</option>
        </select>
      </div>
      {plans === "one_off" ? (
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      ) : (
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <select
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            name="amount"
            id="amount"
            className="form-control"
          >
            <option value="100">£100</option>
            <option value="20">£20</option>
            <option value="15">£15</option>
            <option value="5">£5</option>
          </select>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="address1">Address Line 1:</label>
        <input
          type="text"
          className="form-control"
          id="address1"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address2">Address Line 2:</label>
        <input
          type="text"
          className="form-control"
          id="address2"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address4">Address Line 4:</label>
        <input
          type="text"
          className="form-control"
          id="address4"
          value={address4}
          onChange={(e) => setAddress4(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address3">Address Line 3:</label>
        <input
          type="text"
          className="form-control"
          id="address3"
          value={address3}
          onChange={(e) => setAddress3(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address4">Address Line 4:</label>
        <input
          type="text"
          className="form-control"
          id="address4"
          value={address4}
          onChange={(e) => setAddress4(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">City:</label>
        <input
          type="text"
          className="form-control"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="postcode">Postcode:</label>
        <input
          type="text"
          className="form-control"
          id="postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          className="form-control"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <button type="submit" className="btn btn-primary">
          Donate
        </button>
      )}
    </form>
  );
};

export default DonationForm;
