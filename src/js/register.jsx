import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { Alert } from "react-bootstrap";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator
} from "firebase/auth";
import { createCheckoutSession } from "@stripe/firestore-stripe-payments";
import { getStripePayments } from "@stripe/firestore-stripe-payments";
import { doc, collection, getFirestore,connectFirestoreEmulator, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDL2CHHhPUg9K6_tV_5Z2bUl4wWcB3-sic",
  authDomain: "ptate-df901.firebaseapp.com",
  projectId: "ptate-df901",
  storageBucket: "ptate-df901.appspot.com",
  messagingSenderId: "795297920122",
  appId: "1:795297920122:web:9cfd9b972dc92213dd77c3",
  measurementId: "G-9MPXZR194T",
};

const app = initializeApp(firebaseConfig);
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  // app.useEmulator("127.0.0.1", 8081);
}
const auth = getAuth(app);
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  // auth.useEmulator("http://localhost:9099")
  connectAuthEmulator(auth, "http://127.0.0.1:9099")
}
const db = getFirestore(app);
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  connectFirestoreEmulator(db, "127.0.0.1", 8081)
  // db.useEmulator("localhost:8081")
}
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

  const [error, setError] = useState("");

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
  let [validation_MembershipRate, setValidation_MembershipRate] =
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
    if (!validation_FirstName) {
      console.log("error validation_FirstName");
      return;
    }
    if (!validation_LastName) {
      console.log("error validation_LastName");
      return;
    }
    if (!validation_Dob) {
      console.log("error validation_Dob");
      return;
    }
    if (!validation_Address1) {
      console.log("error validation_Address1");
      return;
    }
    if (!validation_Address2) {
      console.log("error validation_Address2");
      return;
    }
    if (!validation_Address3) {
      console.log("error validation_Address3");
      return;
    }
    if (!validation_Postcode) {
      console.log("error validation_Postcode");
      return;
    }
    if (!validation_Email) {
      console.log("error validation_Email");
      return;
    }
    // if (validation_Work_Email) {
    //   console.log("error validation_Work_Email");
    //   return;
    // }
    if (!validation_Phone) {
      console.log("error validation_Phone");
      return;
    }
    if (!validation_Password) {
      console.log("error validation_Password");
      return;
    }
    if (!validation_city) {
      console.log("error validation_city");
      return;
    }
    if (!validation_RepeatPassword) {
      console.log("error validation_RepeatPassword");
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
      return;
    }
    let data = {
      firstName,
      lastName,
      dob,
      address: {
        addressLines: [address1, address2, address3, address4, postcode],
        // postalCode:postcode,
        locality: city,
        regionCode: country,
      },
      email,
      phone,
      uid: userCredential.user.uid,
      role: [],
    };
    console.log("createCheckoutSession ", prices_mapping[membershipRate],membershipRate);

    const uid = userCredential.user.uid;
    console.log("users", data);
    const userCollectionRef = collection(db, "users"); // Updated collection reference
    await setDoc(doc(userCollectionRef, uid), data);
    console.log("users done");
    console.log("createCheckoutSession price:",prices_mapping[membershipRate]);
      const session = await createCheckoutSession(payments, {
        price: prices_mapping[membershipRate]
      });
      console.log("createCheckoutSession done");
      window.location.href = session.url;
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
        <label htmlFor="address4">Address line 3:</label>
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
        <label htmlFor="country">Country:</label>
        <select
          name="country"
          id="country"
          className="form-control"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="AF">Afghanistan</option>
          <option value="AX">Åland Islands</option>
          <option value="AL">Albania</option>
          <option value="DZ">Algeria</option>
          <option value="AS">American Samoa</option>
          <option value="AD">Andorra</option>
          <option value="AO">Angola</option>
          <option value="AI">Anguilla</option>
          <option value="AQ">Antarctica</option>
          <option value="AG">Antigua and Barbuda</option>
          <option value="AR">Argentina</option>
          <option value="AM">Armenia</option>
          <option value="AW">Aruba</option>
          <option value="AU">Australia</option>
          <option value="AT">Austria</option>
          <option value="AZ">Azerbaijan</option>
          <option value="BS">Bahamas</option>
          <option value="BH">Bahrain</option>
          <option value="BD">Bangladesh</option>
          <option value="BB">Barbados</option>
          <option value="BY">Belarus</option>
          <option value="BE">Belgium</option>
          <option value="BZ">Belize</option>
          <option value="BJ">Benin</option>
          <option value="BM">Bermuda</option>
          <option value="BT">Bhutan</option>
          <option value="BO">Bolivia (Plurinational State of)</option>
          <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
          <option value="BA">Bosnia and Herzegovina</option>
          <option value="BW">Botswana</option>
          <option value="BV">Bouvet Island</option>
          <option value="BR">Brazil</option>
          <option value="IO">British Indian Ocean Territory</option>
          <option value="BN">Brunei Darussalam</option>
          <option value="BG">Bulgaria</option>
          <option value="BF">Burkina Faso</option>
          <option value="BI">Burundi</option>
          <option value="CV">Cabo Verde</option>
          <option value="KH">Cambodia</option>
          <option value="CM">Cameroon</option>
          <option value="CA">Canada</option>
          <option value="KY">Cayman Islands</option>
          <option value="CF">Central African Republic</option>
          <option value="TD">Chad</option>
          <option value="CL">Chile</option>
          <option value="CN">China</option>
          <option value="CX">Christmas Island</option>
          <option value="CC">Cocos (Keeling) Islands</option>
          <option value="CO">Colombia</option>
          <option value="KM">Comoros</option>
          <option value="CG">Congo</option>
          <option value="CD">Congo, Democratic Republic of the</option>
          <option value="CK">Cook Islands</option>
          <option value="CR">Costa Rica</option>
          <option value="CI">Côte d'Ivoire</option>
          <option value="HR">Croatia</option>
          <option value="CU">Cuba</option>
          <option value="CW">Curaçao</option>
          <option value="CY">Cyprus</option>
          <option value="CZ">Czechia</option>
          <option value="DK">Denmark</option>
          <option value="DJ">Djibouti</option>
          <option value="DM">Dominica</option>
          <option value="DO">Dominican Republic</option>
          <option value="EC">Ecuador</option>
          <option value="EG">Egypt</option>
          <option value="SV">El Salvador</option>
          <option value="GQ">Equatorial Guinea</option>
          <option value="ER">Eritrea</option>
          <option value="EE">Estonia</option>
          <option value="SZ">Eswatini</option>
          <option value="ET">Ethiopia</option>
          <option value="FK">Falkland Islands (Malvinas)</option>
          <option value="FO">Faroe Islands</option>
          <option value="FJ">Fiji</option>
          <option value="FI">Finland</option>
          <option value="FR">France</option>
          <option value="GF">French Guiana</option>
          <option value="PF">French Polynesia</option>
          <option value="TF">French Southern Territories</option>
          <option value="GA">Gabon</option>
          <option value="GM">Gambia</option>
          <option value="GE">Georgia</option>
          <option value="DE">Germany</option>
          <option value="GH">Ghana</option>
          <option value="GI">Gibraltar</option>
          <option value="GR">Greece</option>
          <option value="GL">Greenland</option>
          <option value="GD">Grenada</option>
          <option value="GP">Guadeloupe</option>
          <option value="GU">Guam</option>
          <option value="GT">Guatemala</option>
          <option value="GG">Guernsey</option>
          <option value="GN">Guinea</option>
          <option value="GW">Guinea-Bissau</option>
          <option value="GY">Guyana</option>
          <option value="HT">Haiti</option>
          <option value="HM">Heard Island and McDonald Islands</option>
          <option value="VA">Holy See</option>
          <option value="HN">Honduras</option>
          <option value="HK">Hong Kong</option>
          <option value="HU">Hungary</option>
          <option value="IS">Iceland</option>
          <option value="IN">India</option>
          <option value="ID">Indonesia</option>
          <option value="IR">Iran (Islamic Republic of)</option>
          <option value="IQ">Iraq</option>
          <option value="IE">Ireland</option>
          <option value="IM">Isle of Man</option>
          <option value="IL">Israel</option>
          <option value="IT">Italy</option>
          <option value="JM">Jamaica</option>
          <option value="JP">Japan</option>
          <option value="JE">Jersey</option>
          <option value="JO">Jordan</option>
          <option value="KZ">Kazakhstan</option>
          <option value="KE">Kenya</option>
          <option value="KI">Kiribati</option>
          <option value="KP">Korea (Democratic People's Republic of)</option>
          <option value="KR">Korea, Republic of</option>
          <option value="KW">Kuwait</option>
          <option value="KG">Kyrgyzstan</option>
          <option value="LA">Lao People's Democratic Republic</option>
          <option value="LV">Latvia</option>
          <option value="LB">Lebanon</option>
          <option value="LS">Lesotho</option>
          <option value="LR">Liberia</option>
          <option value="LY">Libya</option>
          <option value="LI">Liechtenstein</option>
          <option value="LT">Lithuania</option>
          <option value="LU">Luxembourg</option>
          <option value="MO">Macao</option>
          <option value="MG">Madagascar</option>
          <option value="MW">Malawi</option>
          <option value="MY">Malaysia</option>
          <option value="MV">Maldives</option>
          <option value="ML">Mali</option>
          <option value="MT">Malta</option>
          <option value="MH">Marshall Islands</option>
          <option value="MQ">Martinique</option>
          <option value="MR">Mauritania</option>
          <option value="MU">Mauritius</option>
          <option value="YT">Mayotte</option>
          <option value="MX">Mexico</option>
          <option value="FM">Micronesia (Federated States of)</option>
          <option value="MD">Moldova, Republic of</option>
          <option value="MC">Monaco</option>
          <option value="MN">Mongolia</option>
          <option value="ME">Montenegro</option>
          <option value="MS">Montserrat</option>
          <option value="MA">Morocco</option>
          <option value="MZ">Mozambique</option>
          <option value="MM">Myanmar</option>
          <option value="NA">Namibia</option>
          <option value="NR">Nauru</option>
          <option value="NP">Nepal</option>
          <option value="NL">Netherlands, Kingdom of the</option>
          <option value="NC">New Caledonia</option>
          <option value="NZ">New Zealand</option>
          <option value="NI">Nicaragua</option>
          <option value="NE">Niger</option>
          <option value="NG">Nigeria</option>
          <option value="NU">Niue</option>
          <option value="NF">Norfolk Island</option>
          <option value="MK">North Macedonia</option>
          <option value="MP">Northern Mariana Islands</option>
          <option value="NO">Norway</option>
          <option value="OM">Oman</option>
          <option value="PK">Pakistan</option>
          <option value="PW">Palau</option>
          <option value="PS">Palestine, State of</option>
          <option value="PA">Panama</option>
          <option value="PG">Papua New Guinea</option>
          <option value="PY">Paraguay</option>
          <option value="PE">Peru</option>
          <option value="PH">Philippines</option>
          <option value="PN">Pitcairn</option>
          <option value="PL">Poland</option>
          <option value="PT">Portugal</option>
          <option value="PR">Puerto Rico</option>
          <option value="QA">Qatar</option>
          <option value="RE">Réunion</option>
          <option value="RO">Romania</option>
          <option value="RU">Russian Federation</option>
          <option value="RW">Rwanda</option>
          <option value="BL">Saint Barthélemy</option>
          <option value="SH">
            Saint Helena, Ascension and Tristan da Cunha
          </option>
          <option value="KN">Saint Kitts and Nevis</option>
          <option value="LC">Saint Lucia</option>
          <option value="MF">Saint Martin (French part)</option>
          <option value="PM">Saint Pierre and Miquelon</option>
          <option value="VC">Saint Vincent and the Grenadines</option>
          <option value="WS">Samoa</option>
          <option value="SM">San Marino</option>
          <option value="ST">Sao Tome and Principe</option>
          <option value="SA">Saudi Arabia</option>
          <option value="SN">Senegal</option>
          <option value="RS">Serbia</option>
          <option value="SC">Seychelles</option>
          <option value="SL">Sierra Leone</option>
          <option value="SG">Singapore</option>
          <option value="SX">Sint Maarten (Dutch part)</option>
          <option value="SK">Slovakia</option>
          <option value="SI">Slovenia</option>
          <option value="SB">Solomon Islands</option>
          <option value="SO">Somalia</option>
          <option value="ZA">South Africa</option>
          <option value="GS">
            South Georgia and the South Sandwich Islands
          </option>
          <option value="SS">South Sudan</option>
          <option value="ES">Spain</option>
          <option value="LK">Sri Lanka</option>
          <option value="SD">Sudan</option>
          <option value="SR">Suriname</option>
          <option value="SJ">Svalbard and Jan Mayen</option>
          <option value="SE">Sweden</option>
          <option value="CH">Switzerland</option>
          <option value="SY">Syrian Arab Republic</option>
          <option value="TW">Taiwan, Province of China</option>
          <option value="TJ">Tajikistan</option>
          <option value="TZ">Tanzania, United Republic of</option>
          <option value="TH">Thailand</option>
          <option value="TL">Timor-Leste</option>
          <option value="TG">Togo</option>
          <option value="TK">Tokelau</option>
          <option value="TO">Tonga</option>
          <option value="TT">Trinidad and Tobago</option>
          <option value="TN">Tunisia</option>
          <option value="TR">Türkiye</option>
          <option value="TM">Turkmenistan</option>
          <option value="TC">Turks and Caicos Islands</option>
          <option value="TV">Tuvalu</option>
          <option value="UG">Uganda</option>
          <option value="UA">Ukraine</option>
          <option value="AE">United Arab Emirates</option>
          <option value="GB" defaultValue>
            United Kingdom of Great Britain and Northern Ireland
          </option>
          <option value="UM">United States Minor Outlying Islands</option>
          <option value="US">United States of America</option>
          <option value="UY">Uruguay</option>
          <option value="UZ">Uzbekistan</option>
          <option value="VU">Vanuatu</option>
          <option value="VE">Venezuela (Bolivarian Republic of)</option>
          <option value="VN">Viet Nam</option>
          <option value="VG">Virgin Islands (British)</option>
          <option value="VI">Virgin Islands (U.S.)</option>
          <option value="WF">Wallis and Futuna</option>
          <option value="EH">Western Sahara</option>
          <option value="YE">Yemen</option>
          <option value="ZM">Zambia</option>
          <option value="ZW">Zimbabwe</option>
        </select>
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
          Optional NHS or Forces Email (with ac/nhs/):
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
export default Register;
