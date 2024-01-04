import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {connectFirestoreEmulator, getFirestore, collection, doc, updateDoc, getDocs, getDoc } from "firebase/firestore";
import {
  connectAuthEmulator, 
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStripePayments } from "@stripe/firestore-stripe-payments";

console.log("firebase hock usefirebase.jsx");

const firebaseConfig = {
  apiKey: "AIzaSyDL2CHHhPUg9K6_tV_5Z2bUl4wWcB3-sic",
  authDomain: "ptate-df901.firebaseapp.com",
  projectId: "ptate-df901",
  storageBucket: "ptate-df901.appspot.com",
  messagingSenderId: "795297920122",
  appId: "1:795297920122:web:9cfd9b972dc92213dd77c3",
  measurementId: "G-9MPXZR194T",
};

if (window.location.hostname === "localhost") {
  // firebaseConfig.host = "localhost:8080";
  firebaseConfig.ssl = false;
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  // Assuming your Firestore emulator is running at localhost:8080
  // Update the port accordingly if it's different
  connectFirestoreEmulator(db, 'localhost', 8080);
}

const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});

const placeVote = async (electionId, rankings) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("User not authenticated.");
      return;
    }

    const uid = user.uid;
    const voteRef = doc(collection(db, "votes", electionId, "users", uid));

    await updateDoc(voteRef, { rankings });
  } catch (error) {
    console.error("Error placing vote:", error);
  }
};

const retrieveVote = async (electionId) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("User not authenticated.");
      return null;
    }

    const uid = user.uid;
    const voteRef = doc(collection(db, "votes", electionId, "users", uid));
    const voteDoc = await getDoc(voteRef);

    if (voteDoc.exists()) {
      return voteDoc.data();
    } else {
      console.log("Vote document does not exist.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving vote:", error);
    return null;
  }
};

const fetchVotingElections = async () => {
  try {
    const electionsRef = collection(db, "elections");
    const snapshot = await getDocs(electionsRef);

    const elections = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return elections;
  } catch (error) {
    console.error("Error fetching voting elections:", error);
    return [];
  }
};

const fetchCandidates = async (electionId) => {
  try {
    const candidatesRef = collection(db, "election", electionId, "candidates");
    const snapshot = await getDocs(candidatesRef);

    const candidates = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return candidates;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return [];
  }
};

export const FirebaseContext = createContext({
  user: null,
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
  placeVote: () => {},
  retrieveVote: () => {},
  fetchCandidates: () => {},
});

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in user: ", error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out user: ", error);
    }
  };

  const signUp = async (firstName, lastName, dob, email, address1, address2, postcode, city, phone, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

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

  const contextValue = {
    user,
    signIn,
    signOut: signOutUser,
    signUp,
    placeVote,
    retrieveVote,
    fetchCandidates,
  };

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
};
