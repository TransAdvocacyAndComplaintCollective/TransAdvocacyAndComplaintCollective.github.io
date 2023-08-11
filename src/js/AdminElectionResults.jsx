import React, { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';


// Initialize Firebase app
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
