// useFirebase.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { set } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";
import { getStripePayments } from "@stripe/firestore-stripe-payments";

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

const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});
const db = getFirestore(app);
const auth = getAuth();
export const FirebaseContext = createContext({
  user: null,
  signIn: () => {},
  signOut: () => {},
  // signUp: () => {},

});


// Custom hook to use Firebase authentication
export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      // Add an observer to listen for changes in authentication state
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
      // Cleanup the observer when the component unmounts
      return () => unsubscribe();
    }, []);
  
    // Expose authentication-related functions
    const signIn = async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
      } catch (error) {}
    };
  
    const signOut = async () => {
      await signOut(auth);
    };

    const signUp = async (firstName, lastName, dob, email, address1, address2, postcode, city, phone, password) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const db = getFirestore(app);
        const docRef = await addDoc(collection(db, "users"), {
          "firstName": firstName,
          "lastName": lastName,
          "dob": dob,
          "phone": phone,
          "address": {
            "addressLines": [address1, address2],
            "postcode": postcode,
            "city": city
          }
        });
      } catch (error) {
        console.error("Error signing up user: ", error);
      }
    };
    // ... rest of your code ...
  
    // Expose the user object and authentication functions through context
    const contextValue = {
      user,
      signIn,
      signOut,
      signUp,
    };
  
    return (
      <FirebaseContext.Provider value={contextValue}>
        {children}
      </FirebaseContext.Provider>
    );
  };
  