import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword , onAuthStateChanged} from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";
import { getStripePayments } from "@stripe/firestore-stripe-payments";

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
const payments = getStripePayments(app, {
    productsCollection: "products",
    customersCollection: "customers",
});
const db = getFirestore(app);
const auth = getAuth();



export const validateEmail = (email, setState) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setState((e) => ({ ...e, email: { isValid: false, messages: "Email already in use." } }));
        } else {
            setState((e) => ({ ...e, email: { isValid: true, messages: "" } }));
        }
    }
};



// login 
export const login = async (email, password) => {

};


// /user/{uid}
// Create a user
export const createUser = async (email, password, name, firstName, lastName, dob, address1, address2, postcode, city, phone, yearlyCost, country) => {
    try {
        // Create user authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // Create user object
        const user = {
            email,
            name,
            firstName,
            lastName,
            dob,
            address: {
                "addressLines":[address1, address2],
                "postalCode":postcode,
                "locality":city,
                "regionCode":country
            },
            phone,
            role:[]
        };

        // Add user data to Firestore
        const userRef = doc(db, "users", uid);
        await set(userRef, user);
    } catch (error) {
        throw error;
    }
    // const myPriceId = "";
    // console.log("payments:", payments);
    // const session = await createCheckoutSession(payments, {price: myPriceId});
    // console.log("session:", session);
};


// This will be using STV voting system
// /election/{electionId}
//{name:string, description:string, image:string,endDate:timestamp,startDate:timestamp,seats:number}
export const createElection = async (name, description, image) => {
    try {
        const election = {
            name,
            description,
            image
        };

        // Add election data to Firestore
        const electionRef = doc(db, "elections");
        await set(electionRef, election);

        console.log("Election created successfully!");
    } catch (error) {
        console.error("Error creating election:", error.message);
    }
}
export const getElection = async (electionId) => {
    try {
        const electionRef = doc(db, "elections", electionId);
        const election = await getDoc(electionRef);
        if (election.exists()) {
            console.log("Election data:", election.data());
        } else {
            console.log("No election data available");
        }
    } catch (error) {
        console.error("Error getting election:", error.message);
    }
}
export const updateElection = async (electionId, name, description, image) => {
    try {
        const electionRef = doc(db, "elections", electionId);
        await updateDoc(electionRef, {
            name,
            description,
            image
        });
        console.log("Election updated successfully!");
    } catch (error) {
        console.error("Error updating election:", error.message);
    }
}
// /election/{electionId}/candidate/{candidateId}
// {name:string, description:string, image:string}
export const createCandidate = async (electionId, name, description, image, endDate, startDate) => {
    try {
        const candidate = {
            name,
            description,
            image,
            endDate,
            startDate
        };

        // Add candidate data to Firestore
        const candidateRef = doc(db, "elections", electionId, "candidates");
        await set(candidateRef, candidate);

        console.log("Candidate created successfully!");
    } catch (error) {
        console.error("Error creating candidate:", error.message);
    }
}
export const getCandidate = async (electionId, candidateId) => {
    try {
        const candidateRef = doc(db, "elections", electionId, "candidates", candidateId);
        const candidate = await getDoc(candidateRef);
        if (candidate.exists()) {
            console.log("Candidate data:", candidate.data());
        } else {
            console.log("No candidate data available");
        }
    } catch (error) {
        console.error("Error getting candidate:", error.message);
    }
}
// /election/{electionId}/vote/{uid}
// {preferences:[candidateId]}
async function createVote(electionId, uid, preferences) {
    try {
        const vote = {
            preferences
        };

        // Add vote data to Firestore
        const voteRef = doc(db, "elections", electionId, "votes", uid);
        await set(voteRef, vote);

        console.log("Vote created successfully!");
    } catch (error) {
        console.error("Error creating vote:", error.message);
    }
}
async function getVote(electionId, uid) {
    try {
        const voteRef = doc(db, "elections", electionId, "votes", uid);
        const vote = await getDoc(voteRef);
        if (vote.exists()) {
            console.log("Vote data:", vote.data());
        } else {
            console.log("No vote data available");
        }
    } catch (error) {
        console.error("Error getting vote:", error.message);
    }
}
async function getVotes(electionId) {
    try {
        const votesRef = doc(db, "elections", electionId, "votes");
        const votes = await getDoc(votesRef);
        if (votes.exists()) {
            console.log("Votes data:", votes.data());
        } else {
            console.log("No votes data available");
        }
    } catch (error) {
        console.error("Error getting votes:", error.message);
    }
}
//STV voting system
async function stvResults(electionId) {
    //get election
    const election = await getElection(electionId);
    //get candidates
    const candidates = await getCandidates(electionId);
    //get votes
    const votes = await getVotes(electionId) ;

}
