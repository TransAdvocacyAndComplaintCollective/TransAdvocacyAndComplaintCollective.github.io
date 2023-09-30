import React, { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';


// Initialize Firebase app
let firebaseConfig = {
  apiKey: "AIzaSyDL2CHHhPUg9K6_tV_5Z2bUl4wWcB3-sic",
  authDomain: "ptate-df901.firebaseapp.com",
  projectId: "ptate-df901",
  storageBucket: "ptate-df901.appspot.com",
  messagingSenderId: "795297920122",
  appId: "1:795297920122:web:9cfd9b972dc92213dd77c3",
  measurementId: "G-9MPXZR194T",
};
console.log(window.location.hostname);
//  we should check if the doamin  localhost or 127.0.0.1 then we should use the local emulator
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  // Auth emulator takes the port 9099
  firebaseConfig["authEmulatorHost"] = "http://localhost:9099/";
  // Functions emulator takes the port 5001 /functions
  firebaseConfig["functionsEmulatorHost"] = "http://localhost:5001/";
  // Firestore emulator takes the port 8081
  firebaseConfig["firestoreEmulatorHost"] = "http://localhost:8081/";
  // pubsub emulator takes the port 8085
  firebaseConfig["pubsubEmulatorHost"] = "http://localhost:8085/";
  // storage emulator takes the port 9199
  firebaseConfig["storageEmulatorHost"] = "http://localhost:9199/";
  // Eventarc emulator takes the port 9199
  firebaseConfig["eventEmulatorHost"] = "http://localhost:8085/";
  // Emulator Hub running at 127.0.0.1:4400
  // Other reserved ports: 4500, 9150
}
else {

}
let app = initializeApp(firebaseConfig);
const db = getFirestore(app);



const AdminElectionResults = () => {
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    // Fetch candidates from Firestore collection
    const fetchCandidates = async () => {
      const candidatesSnapshot = await firestore.collection('candidates').get();
      const candidatesData = candidatesSnapshot.docs.map((doc) => doc.data());
      setCandidates(candidatesData);
    };

    // Fetch voters from Firestore collection
    const fetchVoters = async () => {
      const votersSnapshot = await firestore.collection('voters').get();
      const votersData = votersSnapshot.docs.map((doc) => doc.data());
      setVoters(votersData);
    };

    fetchCandidates();
    fetchVoters();
  }, []);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Election Results</Card.Title>
        <Card.Text>
          <strong>Candidates:</strong>
          <ListGroup>
            {candidates.map((candidate, index) => (
              <ListGroupItem key={index}>{candidate.name}</ListGroupItem>
            ))}
          </ListGroup>
        </Card.Text>
        <Card.Text>
          <strong>Voters:</strong>
          <ListGroup>
            {voters.map((voter, index) => (
              <ListGroupItem key={index}>{voter.name}</ListGroupItem>
            ))}
          </ListGroup>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default AdminElectionResults;
