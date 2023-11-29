import React, { useState } from "react";
import { createRoot } from 'react-dom/client';
import { Alert } from "react-bootstrap";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";
import { createCheckoutSession,getStripePayments } from "@stripe/firestore-stripe-payments";
import { getFirestore, collection, getDocs ,connectFirestoreEmulator,setDoc,doc} from 'firebase/firestore';

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
//   connectFirestoreEmulator(db, "http://localhost",8081);
//   connectAuthEmulator(auth, "http://localhost:9099");
// }
const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});
const prices_mapping = {
  volunteer: "price_1NDws6I39QBFoSmHiXtlmiV2",
  other_month: "price_1NJEZZI39QBFoSmHShwOQASS",
  other_year: "price_1NJEZZI39QBFoSmHy6MlUOEk",
  reduced_month: "price_1NJEXDI39QBFoSmH9S9feiu3",
  reduced_year: "price_1NJEXDI39QBFoSmHv4mpM9vw",
  standard_month: "price_1NJEcGI39QBFoSmHt8saPetA",
  standard_year: "price_1NJEcGI39QBFoSmHt8saPetA",
};

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [address4, setAddress4] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [work_email, setWork_Email] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [membershipRate, setMembershipRate] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  let [validation_city, setValidation_city] = useState(false);
  let [validation_FirstName, setValidation_FirstName] = useState(false);
  let [validation_LastName, setValidation_LastName] = useState(false);
  let [validation_Dob, setValidation_Dob] = useState(false);
  let [validation_Address1, setvalidation_Address1] = useState(false);
  let [validation_Address2, setValidation_Address2] = useState(false);
  let [validation_Address3, setValidation_Address3] = useState(true);
  let [validation_Address4, setValidation_Address4] = useState(true);
  let [validation_Postcode, setValidation_Postcode] = useState(false);
  let [validation_Email, setValidation_Email] = useState(false);
  let [validation_Work_Email, setValidation_Work_Email] = useState(false);
  let [validation_Phone, setValidation_Phone] = useState(false);
  let [validation_Password, setValidation_Password] = useState(false);
  let [validation_RepeatPassword, setValidation_RepeatPassword] =
    useState(false);
  let [can_other, set_can_not_other] = useState(true);
  let [can_reduced, set_can_not_reduced] = useState(true);

  function set_FirstName(value) {
    // console.log(value);
    setFirstName(value);
    if (value.length > 1) {
      setValidation_FirstName(true);
    } else {
      setValidation_FirstName(false);
    }
  }
  function set_LastName(value) {
    // console.log(value);
    setLastName(value);
    if (value.length > 1) {
      setValidation_LastName(true);
    } else {
      setValidation_LastName(false);
    }
  }
  function set_Dob(value) {
    // console.log(value);
    setDob(value);
    setValidation_Dob(true);
    processDobAndEmail(value, work_email);
  }
  function set_Work_Email(value) {
    setWork_Email(value);
    processDobAndEmail(dob, value);
  }
  function calculateAge(dateOfBirth) {
    var dob = new Date(dateOfBirth);
    var currentDate = new Date();

    var age = currentDate.getFullYear() - dob.getFullYear();
    var monthDiff = currentDate.getMonth() - dob.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age;
  }
  function isAgeValid(age) {
    // Check if age is between 20 and 29 (inclusive)
    if (age >= 20 && age <= 29) {
      return 1;
    }
    // Check if age is 66 or older
    if (age >= 66) {
      return 1;
    }
    if (age >= 14 && age <= 19) {
      return 2;
    }
    if (age > 14) {
      return -1;
    }
    return 0;
  }
  function processDobAndEmail(dob, email) {
    setDob(dob);
    var userDOB = new Date(dob);
    var age = calculateAge(userDOB);
    let re_email_academic = /\.(ac|edu)\.[a-z][a-z]$/;
    let re_email_hero = /((nhs|mod|met).uk|(nhs|).net)$/;
    if (re_email_academic.exec(email) || isAgeValid(age) == 2) {
      console.log("email -> academic");
      setValidation_Work_Email(true);
      set_can_not_other(false);
      set_can_not_reduced(false);
    } else if (re_email_hero.exec(email) || isAgeValid(age) == 1) {
      console.log("email -> hero");
      setValidation_Work_Email(true);
      set_can_not_other(false);
      set_can_not_reduced(true);
      if (
        membershipRate == "reduced_month" ||
        membershipRate == "reduced_year"
      ) {
        setMembershipRate("standard_month");
      }
    } else {
      console.log("email -> unknown");
      setValidation_Work_Email(false);
      set_can_not_other(true);
      set_can_not_reduced(true);
      if (
        membershipRate == "reduced_month" ||
        membershipRate == "reduced_year"
      ) {
        setMembershipRate("standard_month");
      }
      if (membershipRate == "other_month" || membershipRate == "other_year") {
        setMembershipRate("standard_month");
      }
    }
  }

  function set_Address1(value) {
    // console.log(value);
    setAddress1(value);
    if (value.length > 5) {
      setvalidation_Address1(true);
    } else {
      setvalidation_Address1(false);
    }
  }
  function set_Address2(value) {
    setAddress2(value);
    if (value.length > 5) {
      setValidation_Address2(true);
    } else {
      setValidation_Address2(false);
    }
  }
  function set_Address3(value) {
    setAddress3(value);
  }
  function set_Address4(value) {
    setAddress4(value);
  }
  function set_Postcode(value) {
    setPostcode(value);
    if (value.length > 3) {
      setValidation_Postcode(true);
    } else {
      setValidation_Postcode(false);
    }
  }

  function set_city(value) {
    setCity(value);
    if (value.length > 2) {
      setValidation_city(true);
    } else {
      setValidation_city(false);
    }
  }
  function set_Email(value) {
    // console.log(value);
    setEmail(value);
    if (value.length > 5) {
      setValidation_Email(true);
    } else {
      setValidation_Email(false);
    }
  }
  function set_Phone(value) {
    setPhone(value);
    const phoneNumberRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (phoneNumberRegex.test(value)) {
      setValidation_Phone(true);
    } else {
      setValidation_Phone(false);
    }
  }
  function set_Password(value) {
    setPassword(value);
    if (value.length > 5) {
      setValidation_Password(true);
    } else {
      setValidation_Password(false);
    }
  }
  function set_RepeatPassword(value) {
    setRepeatPassword(value);
    if (value.length < 6) {
      setValidation_RepeatPassword(false);
    } else if (value != password) {
      setValidation_RepeatPassword(false);
    } else {
      setValidation_RepeatPassword(true);
    }
  }
  function set_MembershipRate(value) {
    console.log(value);
    setMembershipRate(value);
  }
  async function signOut() {
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validation_FirstName) {
      console.log("error validation_FirstName");
      setError("error validation_FirstName");
      setIsLoading(false);
      return;
    }
    if (!validation_LastName) {
      console.log("error validation_LastName");
      setError("error validation_LastName");
      setIsLoading(false);
      return;
    }
    if (!validation_Dob) {
      console.log("error validation_Dob");
      setError("error validation_Dob");
      setIsLoading(false);
      return;
    }
    if (!validation_Address1) {
      console.log("error validation_Address1");
      setError("error validation_Address1");
      setIsLoading(false);
      return;
    }
    if (!validation_Address2) {
      console.log("error validation_Address2");
      setError("error validation_Address2");
      setIsLoading(false);
      return;
    }
    if (!validation_Address3) {
      console.log("error validation_Address3");
      setError("error validation_Address3");
      setIsLoading(false);
      return;
    }
    if (!validation_Postcode) {
      console.log("error validation_Postcode");
      setError("error validation_Postcode");
      setIsLoading(false);
      return;
    }
    if (!validation_Email) {
      console.log("error validation_Email");
      setError("error validation_Email");
      setIsLoading(false);
      return;
    }
 
    if (!validation_Phone) {
      console.log("error validation_Phone");
      setError("error validation_Phone");
      setIsLoading(false);
      return;
    }
    if (!validation_Password) {
      console.log("error validation_Password");
      setError("error validation_Password");
      setIsLoading(false);
      return;
    }
    if (!validation_city) {
      console.log("error validation_city");
      setError("error validation_city");
      setIsLoading(false);
      return;
    }
    if (!validation_RepeatPassword) {
      console.log("error validation_RepeatPassword");
      setError("error validation_RepeatPassword");
      setIsLoading(false);
      return;
    }
    const currentUser = auth.currentUser;
    if (currentUser && currentUser.isAnonymous) {
      try {
        await signOut(auth);
      } catch (error) {
        console.log("Error signing out anonymous user:", error);
      }
    }
    // Create a new Firebase user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.code);
      setError(error.message);
      setIsLoading(false);
      return;
    }
    let data = {
      firstName,
      lastName,
      dob,
      address: {
        addressLines: [address1, address2, address3, address4, postcode],
        locality: city,
        regionCode: country,
      },
      email,
      phone,
      uid: userCredential.user.uid,
      role: [],
    };
    const uid = userCredential.user.uid;
    const userCollectionRef = collection(db, "users"); // Updated collection reference
    await setDoc(doc(userCollectionRef, uid), data);
    console.log("createCheckoutSession");
    try{
      const session = await createCheckoutSession(payments, {
        price: prices_mapping[membershipRate]
      });
      window.location.href = session.url;
      console.log("createCheckoutSession done");
      setIsLoading(false);
    }
    catch(error){
      console.log(error);
      setError(error.message);
      setIsLoading(false);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className={validation_FirstName ? "form-group" : "form-group"}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className={
            validation_FirstName
              ? "form-control is-valid"
              : "form-control is-invalid is-valid"
          }
          value={firstName}
          onChange={(e) => set_FirstName(e.target.value)}
        />
        <div className="invalid-feedback">
          {firstName.length > 1 && (
            <div className="invalid-feedback">
              The first name needs to be longer than 1 character.
            </div>
          )}
        </div>
      </div>
      <div className={validation_LastName ? "form-group" : "form-group"}>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className={
            validation_LastName
              ? "form-control is-valid"
              : "form-control is-invalid is-valid"
          }
          value={lastName}
          onChange={(e) => set_LastName(e.target.value)}
        />
      </div>

      <div className={validation_Dob ? "form-group" : "form-group"}>
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          className={
            validation_Dob
              ? "form-control is-valid"
              : "form-control is-invalid is-valid"
          }
          value={dob}
          onChange={(e) => set_Dob(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address line 1:</label>
        <input
          type="text"
          id="address1"
          name="address1"
          className={
            validation_Address1
              ? "form-control is-valid"
              : "form-control is-invalid is-valid"
          }
          value={address1}
          onChange={(e) => set_Address1(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="address2">Address line 2:</label>
        <input
          type="text"
          id="address2"
          name="address2"
          className={
            validation_Address2
              ? "form-control is-valid"
              : "form-control is-invalid is-valid"
          }
          value={address2}
          onChange={(e) => set_Address2(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="address3">Address line 3:</label>
        <input
          type="text"
          id="address3"
          name="address3"
          className={
            validation_Address3
              ? "form-control is-valid"
              : "form-control is-invalid"
          }
          value={address3}
          onChange={(e) => set_Address3(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="address4">Address line 4:</label>
        <input
          type="text"
          id="address4"
          name="address4"
          className={
            validation_Address4
              ? "form-control is-valid"
              : "form-control is-invalid"
          }
          value={address4}
          onChange={(e) => set_Address4(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">city:</label>
        <input
          type="text"
          id="city"
          name="city"
          className={
            validation_city
              ? "form-control is-valid"
              : "form-control is-invalid"
          }
          value={city}
          onChange={(e) => set_city(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="postcode">Postcode:</label>
        <input
          type="text"
          id="postcode"
          name="postcode"
          className={
            validation_Address3
              ? "form-control is-valid"
              : "form-control is-invalid is-valid"
          }
          value={postcode}
          onChange={(e) => set_Postcode(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="country">country:</label>
        <input
          type="text"
          id="country"
          name="country"
          className={
            validation_Address3
              ? "form-control is-valid"
              : "form-control is-invalid is-valid"
          }
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div className={validation_Email ? "form-group" : "form-group"}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          className={
            validation_Email
              ? "form-control is-valid"
              : "form-control is-invalid is-valid"
          }
          value={email}
          onChange={(e) => set_Email(e.target.value)}
        />
      </div>
      <div className={validation_Work_Email ? "form-group" : "form-group"}>
        <label htmlFor="work_email">
          Optional NHS or Forces Email or academic (with ac/nhs/):
        </label>
        <input
          type="text"
          id="work_email"
          name="work_email"
          className={
            validation_Work_Email ? "form-control is-valid" : "form-control"
          }
          value={work_email}
          onChange={(e) => set_Work_Email(e.target.value)}
        />
      </div>
      <div className={validation_Phone ? "form-group" : "form-group"}>
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className={
            validation_Phone
              ? "form-control is-valid"
              : "form-control is-invalid is-valid"
          }
          value={phone}
          onChange={(e) => set_Phone(e.target.value)}
        />
      </div>

      <div className={validation_Password ? "form-group" : "form-group"}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          className={
            validation_Password
              ? "form-control is-valid"
              : "form-control is-invalid is-valid"
          }
          value={password}
          onChange={(e) => set_Password(e.target.value)}
        />
      </div>

      <div className={validation_RepeatPassword ? "form-group" : "form-group"}>
        <label htmlFor="repeatPassword">Repeat Password:</label>
        <input
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          className={
            validation_RepeatPassword
              ? "form-control is-valid"
              : "form-control is-invalid is-valid"
          }
          value={repeatPassword}
          onChange={(e) => set_RepeatPassword(e.target.value)}
        />
      </div>
      <div className="form-group border">
        <div className="row" data-toggle="buttons">


          <div className="col-sm-3 mb-3 mb-sm-0">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Aged 20-29 or Aged 66+ or Force or NHS Membership rate
                </h5>
                <p className="card-text">
                  Become a Standard member of the Pirate Party UK and enjoy all
                  the benefits and privileges but at a reduce rate for Aged
                  20-29 or Aged 66+ or Force or NHS Membership.
                </p>
              </div>
              <input
                disabled={can_other}
                type="radio"
                className="btn-check btn"
                name="rate"
                id="reduced_month"
                value="reduced_month"
                onChange={(e) => set_MembershipRate(e.target.value)}
              />

              <label
                className="btn btn-outline-primary"
                htmlFor="reduced_month"
              >
                Month £2
              </label>
              <input
                disabled={can_other}
                type="radio"
                className="btn-check btn"
                name="rate"
                id="reduced_year"
                value="reduced_year"
                onChange={(e) => set_MembershipRate(e.target.value)}
              />
              <label className="btn btn-outline-primary" htmlFor="reduced_year">
                Year £24
              </label>
            </div>
          </div>
          <div className="col-sm-3 mb-3 mb-sm-0">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Aged 14-19 or Student Membership rate
                </h5>
                <p className="card-text">
                  Become a Standard member of the Pirate Party UK and enjoy all
                  the benefits and privileges but at a reduce rate for Aged
                  14-19 or Student Membership.
                </p>
              </div>
              <input
                disabled={can_reduced}
                type="radio"
                className="btn-check btn"
                name="rate"
                id="other_month"
                value="other_month"
                onChange={(e) => set_MembershipRate(e.target.value)}
              />
              <label className="btn btn-outline-primary" htmlFor="other_month">
                Month £1
              </label>
              <input
                disabled={can_reduced}
                type="radio"
                className="btn-check btn"
                name="rate"
                id="other_year"
                value="other_year"
                onChange={(e) => set_MembershipRate(e.target.value)}
              />
              <label className="btn btn-outline-primary" htmlFor="other_year">
                Year £12
              </label>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Standard Membership</h5>
                <p className="card-text">
                  Become a Standard member of the Pirate Party UK and enjoy all
                  the benefits and privileges, including the ability to vote in
                  party elections and contribute to decision-making processes.
                </p>
              </div>
              <input
                type="radio"
                className="btn-check btn"
                name="rate"
                id="standard_month"
                value="standard_month"
                onChange={(e) => setMembershipRate(e.target.value)}
              />
              <label
                className="btn btn-outline-primary"
                htmlFor="standard_month"
              >
                Month £5
              </label>
              <input
                type="radio"
                className="btn-check btn"
                name="rate"
                id="standard_year"
                value="standard_year"
                onChange={(e) => set_MembershipRate(e.target.value)}
              />
              <label
                className="btn btn-outline-primary"
                htmlFor="standard_year"
              >
                Year £60
              </label>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <button type="submit" className="btn btn-primary">
          Make it so
        </button>
      )}
    </form>
  );
};
const domNode = document.getElementById("RegisterContainer")
const root = createRoot(domNode);
root.render(<Register />);


export default Register;
