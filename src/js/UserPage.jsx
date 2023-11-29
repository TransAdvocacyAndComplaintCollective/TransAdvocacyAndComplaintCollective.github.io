import React, { useState, useEffect } from "react";
import { Tab, Nav, Row, Col, Form, Button } from "react-bootstrap";
import { createRoot } from "react-dom/client";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDoc,
  connectFirestoreEmulator,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  updatePassword,
  signOut,
  connectAuthEmulator,
  onAuthStateChanged,
} from "firebase/auth";
import Alert from "react-bootstrap/Alert";

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
const auth = getAuth(app);
const db = getFirestore(app);
console.log("initialize App done");

function UserSettings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [address1, set_Address1] = useState("");
  const [address2, set_Address2] = useState("");
  const [address3, set_Address3] = useState("");
  const [address4, set_Address4] = useState("");
  const [postcode, set_Postcode] = useState("");
  const [country, setCountry] = useState("");
  const [email, set_Email] = useState("");
  const [work_email, setWork_Email] = useState("");
  const [phone, set_Phone] = useState("");
  const [city, set_City] = useState("");
  const [address_error, set_address_error] = useState("");

  const [activeTab, setActiveTab] = useState("election");
  const [elections, setElections] = useState([
    { name: "test" },
    { name: "test" },
    { name: "test" },
    { name: "test" },
  ]);
  console.log("UserSettings 2");
  const [profilePicture, setProfilePicture] = useState(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = getAuth();

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(auth.currentUser);
      console.log('User deleted');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (user && !user.isAnonymous) {
          console.log("User is signed in");
          // setUserLoggedIn(true);
          // // Determine if the user is an admin based on your logic
          // // Example: check if the user has a specific role or privilege
          // const isAdminUser = user.roles && user.roles.includes('admin');
          // setIsAdmin(isAdminUser);
          // firesotre get user data by uid
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          docSnap.get("firstName")
            ? setFirstName(docSnap.get("firstName"))
            : setFirstName("");
          docSnap.get("lastName")
            ? setLastName(docSnap.get("lastName"))
            : setLastName("");
          docSnap.get("dob") ? setDob(docSnap.get("dob")) : setDob("");
          console.log(docSnap.get("address"));
          const address = docSnap.get("address");
          address["addressLines"][0]
            ? set_Address1(address["addressLines"][0])
            : set_Address1("");
          address["addressLines"][1]
            ? set_Address2(address["addressLines"][1])
            : set_Address2("");
          address["addressLines"][2]
            ? set_Address3(address["addressLines"][2])
            : set_Address3("");
          address["addressLines"][3]
            ? set_Address4(address["addressLines"][3])
            : set_Address4("");
          address["locality"] ? set_City(address["locality"]) : set_City("");
          try {
            error = docSnap.get("error");
            set_address_error(error["message"]);
          } catch (e) { }

          // address["regionCode"] ? set_
          // docSnap.get("address1") ? set_Address1(docSnap.get("address1")) : set_Address1("");
          // docSnap.get("address2") ? set_Address2(docSnap.get("address2")) : set_Address2("");
          console.log(docSnap.get("firstName"));
        } else {
          console.log("User is signed out");
          // setUserLoggedIn(false);
          // setIsAdmin(false);
        }
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
  });

  const handlePasswordChange = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      updatePassword(user, getASecureRandomPassword)
        .then(() => {
          // Update successful.
        })
        .catch((error) => {
          // An error ocurred
          // ...
        });

      // Clear the input fields
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");

      console.log("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error.message);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // This useEffect will run whenever activeTab changes
  useEffect(() => {
    // Perform actions based on the activeTab
    switch (activeTab) {
      case "election":
        // Handle election tab actions
        break;
      case "profile":
        // Handle profile tab actions
        break;
      case "security":
        // Handle security tab actions
        break;
      case "notifications":
        // Handle notifications tab actions
        break;
      default:
        break;
    }
  }, [activeTab]);

  return (
    <div className="container mt-5">
      <Tab.Container
        id="user-settings-tabs"
        activeKey={activeTab}
        onSelect={handleTabChange}
      >
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="election">Election</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="profile">Profile Settings</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="security">Security Settings</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="notifications">
                  Notifications Settings
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="election">
                <h2>Election Settings</h2>
                {elections.map((election, index) => {
                  return (
                    <div key={`election-${index}`}>{election.name}Hello</div>
                  );
                })}
              </Tab.Pane>
              <Tab.Pane eventKey="profile">
                <h2>Profile Settings</h2>
                {/* <Form onSubmit={handleProfilePictureSubmit}>
                    <Form.Group>
                      <Form.Label>Change Profile Picture</Form.Label>
                      <Form.File
                        id="profilePictureInput"
                        label="Choose file"
                        onChange={handleProfilePictureChange}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form> */}
                {/* Your other profile settings form elements can go here */}
                <hr />
                {/* show address error here */}
                {address_error && (
                  <Alert variant="danger">{address_error}</Alert>
                )}
                <div className="form-group">
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    {firstName.length > 1 && (
                      <div className="invalid-feedback">
                        The first name needs to be longer than 1 character.
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dob">Date of Birth:</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    className="form-control"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address line 1:</label>
                  <input
                    type="text"
                    id="address1"
                    name="address1"
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => set_Email(e.target.value)}
                  />
                </div>
                <button onClick={handleDeleteAccount}>
                  Delete Account
                </button>
                <button >
                  Update Account
                </button>
              </Tab.Pane>
              <Tab.Pane eventKey="security">
                <h2>Security Settings</h2>
                <Form>
                  <Form.Group controlId="newPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handlePasswordChange}>
                    Change Password
                  </Button>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="notifications">
                <h2>Notification Settings</h2>
                {/* Your notification settings form can go here */}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
console.log("UserSettings");
const domNode = document.getElementById("UserSettings");
const root = createRoot(domNode);
root.render(<UserSettings />);
