import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDL2CHHhPUg9K6_tV_5Z2bUl4wWcB3-sic",
  authDomain: "ptate-df901.firebaseapp.com",
  projectId: "ptate-df901",
  storageBucket: "ptate-df901.appspot.com",
  messagingSenderId: "795297920122",
  appId: "1:795297920122:web:9cfd9b972dc92213dd77c3",
  measurementId: "G-9MPXZR194T"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function UserStatus() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !user.isAnonymous) {
        setUserLoggedIn(true);
        // Determine if the user is an admin based on your logic
        // Example: check if the user has a specific role or privilege
        const isAdminUser = user.roles && user.roles.includes('admin');
        setIsAdmin(isAdminUser);
      } else {
        setUserLoggedIn(false);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (userLoggedIn) {
    if (isAdmin) {
      return (
        <div className="dropdown text-end">
          <img src="/media/person.svg" alt="mdo" className="bg-light rounded-circle" width="32" height="32" />
          <ul className="dropdown-menu text-small dropdown-menu-end" aria-labelledby="dropdownUser1">
            <li>
              <a className="dropdown-item" href="/profile.html">
                Profile
              </a>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => auth.signOut()}>
                Sign out
              </button>
            </li>
            <li>
              <a className="dropdown-item" href="/admin.html">
                Admin Panel
              </a>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="dropdown text-end">
          <img src="/media/person.svg" alt="mdo" className="bg-light rounded-circle" width="32" height="32" />
          <ul className="dropdown-menu text-small dropdown-menu-end" aria-labelledby="dropdownUser1">
            <li>
              <a className="dropdown-item" href="/profile.html">
                Profile
              </a>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => auth.signOut()}>
                Sign out
              </button>
            </li>
          </ul>
        </div>
      );
    }
  } else {
    return (
      <div className="dropdown text-end">
        <a href="/login.html" className="btn btn-primary">
          Login
        </a>
        <a href="/register.html" className="btn btn-primary">
          Register
        </a>
      </div>
    );
  }
}

export default UserStatus;