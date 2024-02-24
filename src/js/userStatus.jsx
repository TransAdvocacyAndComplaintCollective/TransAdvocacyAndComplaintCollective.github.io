import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { auth } from "./libs/googleAPI.js";
import { onAuthStateChanged } from "firebase/auth";

function UserStatus() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !user.isAnonymous) {
        setUserLoggedIn(true);
        // Uncomment and modify the following logic based on your actual admin-checking logic
        // For example, check if the user has a specific role or privilege
        // const isAdminUser = user.roles && user.roles.includes('admin');
        // setIsAdmin(isAdminUser);
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

// const domNode = document.getElementById("userStatusContainer")
// const root = createRoot(domNode);
// root.render(<UserStatus />);
