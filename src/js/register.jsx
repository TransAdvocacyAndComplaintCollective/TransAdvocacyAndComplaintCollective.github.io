// import React, { useState } from "react";
// // import { createRoot } from 'react-dom/client';
// // import { Alert } from "react-bootstrap";
// // import { initializeApp } from "firebase/app";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";
// import { createCheckoutSession,getStripePayments } from "@stripe/firestore-stripe-payments";
// import { getFirestore, collection, getDocs ,connectFirestoreEmulator,setDoc,doc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDL2CHHhPUg9K6_tV_5Z2bUl4wWcB3-sic",
  authDomain: "ptate-df901.firebaseapp.com",
  projectId: "ptate-df901",
  storageBucket: "ptate-df901.appspot.com",
  messagingSenderId: "795297920122",
  appId: "1:795297920122:web:9cfd9b972dc92213dd77c3",
  measurementId: "G-9MPXZR194T"
};
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
//   connectFirestoreEmulator(db, "http://localhost",8081);
//   connectAuthEmulator(auth, "http://localhost:9099");
// }
// const payments = getStripePayments(app, {
//   productsCollection: "products",
//   customersCollection: "customers",
// });
// const prices_mapping = {
//   volunteer: "price_1NDws6I39QBFoSmHiXtlmiV2",
//   other_month: "price_1NJEZZI39QBFoSmHShwOQASS",
//   other_year: "price_1NJEZZI39QBFoSmHy6MlUOEk",
//   reduced_month: "price_1NJEXDI39QBFoSmH9S9feiu3",
//   reduced_year: "price_1NJEXDI39QBFoSmHv4mpM9vw",
//   standard_month: "price_1NJEcGI39QBFoSmHt8saPetA",
//   standard_year: "price_1NJEcGI39QBFoSmHt8saPetA",
// };

const Register = () => {
  function handleSubmit(e){

  }
  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Input validation={validation_FirstName} name="firstName" title="First Name:" type="text" />
      <Input validation={validation_LastName} name="lastName" title="Last Name:" type="text" />
      <Input validation={validation_Dob} name="dob" title="Date of Birth:" type="date" />
      <Input validation={validation_Address1} name="address1" title="Address line 1:" type="text" />
      <Input validation={validation_Address2} name="address2" title="Address line 2:" type="text" />
      <Input validation={validation_Postcode} name="postcode" title="Postcode:" type="text" />
      <Input validation={validation_city} name="city" title="city:" type="text" />
      <CountriesInput></CountriesInput>
      <Input validation={validation_Email} name="email" title="Email:" type="email" />
      <Input validation={validation_Email} name="email" title="Email:" type="email" />
      <Input validation={validation_Phone} name="phone" title="Phone:" type="text" />
      <Input validation={validation_Password} name="password" title="Password:" type="password" />
      <Input validation={validation_RepeatPassword} name="repeatPassword" title="Repeat Password:" type="password" />
    </form>
  );
};
const domNode = document.getElementById("RegisterContainer")
const root = createRoot(domNode);
root.render(<Register />);


// export default Register;
