import { initializeApp } from "firebase/app";
import { setDoc, connectFirestoreEmulator, getFirestore, collection, doc, updateDoc, getDocs, getDoc } from "firebase/firestore";
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

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
if (window.location.hostname === "localhost") {
    connectAuthEmulator(auth, "http://localhost:9099");
}
export const db = getFirestore(app);
if (window.location.hostname === "localhost") {
    connectFirestoreEmulator(db, 'localhost', 8081);
}



export const placeVote = async (electionId, rankings) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            console.error("User not authenticated.");
            return;
        }

        const uid = user.uid;
        const voteRef = doc(db, `election/${electionId}/user/${uid}`);

        // Use setDoc to create a new document or overwrite an existing one
        await setDoc(voteRef, { rankings });
    } catch (error) {
        console.error("Error placing vote:", error);
    }
};

export const retrieveVote = async (electionId) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            console.error("User not authenticated.");
            return null;
        }

        const uid = user.uid;
        const voteRef = doc(db, "election", electionId, "users", uid);
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

export const fetchVotingElections = async () => {
    try {
        const electionsRef = collection(db, "election");
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

export const fetchCandidates = async (electionId) => {
    try {
        const candidatesRef = collection(db, "election", electionId, "candidate");
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
export const signIn = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out user: ", error);
    }
};
export const getAuth_ = () => {
    return auth;
};
export const isUserLoggedIn = async () => {
    try {
        const user = auth.currentUser;
        if (!user) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.error("Error signing out user: ", error);
    }
}
export const fetchUser = async () => {
    try {
        const user = auth.currentUser;
        if (!user) {
            console.error("User not authenticated.");
            return null;
        }

        const uid = user.uid;
        const userRef = doc(collection(db, "users", uid));
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            console.log("User document does not exist.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}


export const signUp = async (firstName, lastName, dob, email, address1, address2, postcode, city, phone, password, regionCode) => {
    let isAccountCreated = false;
    try {
        const auth = getAuth();
        const db = getFirestore();

        // Sign up the user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Sign in the user
        await signInWithEmailAndPassword(auth, email, password);
        isAccountCreated = true;

        // Add a new document with a user id.
        const docRef = await setDoc(doc(db, "user", user.uid), {
            "email": email,
            "firstName": firstName,
            "lastName": lastName,
            "dob": dob,
            "phone": phone,
            "address": {
                "addressLines": [address1, address2],
                "postcode": postcode,
                "locality": city,
                "regionCode": regionCode,
            },
            "role": []
        });
        if (docRef) {
            console.log("Document written with ID: ", docRef.id);
        }
        else {
            console.log("Document not written with ID: ", docRef.id);
        }

        return {
            message: "Account created successfully",
            isValid: true,
            isAccountCreated: isAccountCreated
        }
    } catch (error) {
        return {
            message: error.message,
            isValid: false,
            isAccountCreated: isAccountCreated
        }
    }
};


export const make_election = async (electionData, candidatesData) => {
    try {
        // Create Election
        const electionRef = await setDoc(doc(collection(db, "election")), electionData);

        // Add Candidates
        if (electionRef) {
            const electionId = electionRef.id;

            const candidatesCollectionRef = collection(db, "election", electionId, "candidate");

            for (const candidate of candidatesData) {
                await setDoc(doc(candidatesCollectionRef), candidate);
            }

            console.log("Election and candidates added successfully.");
        }

        return {
            message: "Election and candidates added successfully.",
            isValid: true,
        };
    } catch (error) {
        console.error("Error making election:", error);
        return {
            message: error.message,
            isValid: false,
        };
    }
};
export const update_election = async (electionData, candidatesData, id) => {
    try {
        // Update Election
        const electionRef = doc(collection(db, "election"), id);
        await updateDoc(electionRef, electionData);

        // Update or add Candidates
        const candidatesCollectionRef = collection(db, "election", id, "candidate");

        for (const candidate of candidatesData) {
            const candidateId = candidate.id; // Assuming candidates have unique IDs
            const candidateRef = doc(candidatesCollectionRef, candidateId);

            if (candidateId) {
                // Update existing candidate
                await updateDoc(candidateRef, candidate);
            } else {
                // Add new candidate
                await setDoc(doc(candidatesCollectionRef), candidate);
            }
        }

        console.log("Election and candidates updated successfully.");

        return {
            message: "Election and candidates updated successfully.",
            isValid: true,
        };
    } catch (error) {
        console.error("Error updating election:", error);
        return {
            message: error.message,
            isValid: false,
        };
    }
};


export const is_admin = async () =>{
    try {
        const user = auth.currentUser;
        if (!user) {
            console.error("User not authenticated.");
            return null;
        }

        const uid = user.uid;
        const userRef = doc(collection(db, "users", uid));
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            if (userDoc.data().role.includes("admin")) {
                return true;
            }
            else {
                return false;
            }
        } else {
            console.log("User document does not exist.");
            return false;
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return false;
    }

}

export const fetchAllVotesForElection = async (electionId) => {
    try {
        const votesRef = collection(db, "election", electionId, "user");
        const snapshot = await getDocs(votesRef);

        const votes = snapshot.docs.map((doc) => ({
            userId: doc.id,
            ...doc.data(),
        }));

        return votes;
    } catch (error) {
        console.error("Error fetching votes for election:", error);
        return [];
    }
};

export const fetchElection = async (electionId) => {
    try {
        const electionRef = doc(collection(db, "election"), electionId);
        const electionDoc = await getDoc(electionRef);

        if (electionDoc.exists()) {
            return {
                id: electionDoc.id,
                ...electionDoc.data(),
            };
        } else {
            console.log("Election document does not exist.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching election:", error);
        return null;
    }
};
