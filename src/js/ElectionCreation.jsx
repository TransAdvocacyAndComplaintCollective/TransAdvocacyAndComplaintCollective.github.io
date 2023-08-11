import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
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

const ElectionCreation = () => {
  const [electionName, setElectionName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // Fetch candidates from Firestore collection
    const fetchCandidates = async () => {
      const db = getFirestore();
      const candidatesSnapshot = await getDocs(collection(db, 'candidates'));
      const candidatesData = candidatesSnapshot.docs.map((doc) => doc.data());
      setCandidates(candidatesData);
    };

    fetchCandidates();
  }, []);

  const handleElectionNameChange = (event) => {
    setElectionName(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleCandidateNameChange = (index, event) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index].name = event.target.value;
    setCandidates(updatedCandidates);
  };

  const handleAddCandidate = () => {
    const newCandidate = { name: '' };
    setCandidates([...candidates, newCandidate]);
  };

  const handleSaveElection = async () => {
    // Save election details to Firestore
    const db = getFirestore();
    await addDoc(collection(db, 'elections'), {
      name: electionName,
      startTime,
      endTime,
    });

    // Save candidates to Firestore
    const batch = db.batch();
    const candidatesRef = collection(db, 'candidates');
    candidates.forEach((candidate) => {
      const newCandidateRef = doc(candidatesRef);
      batch.set(newCandidateRef, candidate);
    });
    await batch.commit();

    setElectionName('');
    setStartTime('');
    setEndTime('');
    setCandidates([]);
  };

  return (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group controlId="electionName">
            <Form.Label>Election Name</Form.Label>
            <Form.Control
              type="text"
              value={electionName}
              onChange={handleElectionNameChange}
            />
          </Form.Group>

          <Form.Group controlId="startTime">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={startTime}
              onChange={handleStartTimeChange}
            />
          </Form.Group>

          <Form.Group controlId="endTime">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={endTime}
              onChange={handleEndTimeChange}
            />
          </Form.Group>

          <Form.Group controlId="candidates">
            <Form.Label>Candidates</Form.Label>
            {candidates.map((candidate, index) => (
              <Form.Control
                key={index}
                type="text"
                value={candidate.name}
                onChange={(event) => handleCandidateNameChange(index, event)}
              />
            ))}
          </Form.Group>

          <Button variant="primary" onClick={handleAddCandidate}>
            Add Candidate
          </Button>

          <Button variant="success" onClick={handleSaveElection}>
            Save Election
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ElectionCreation;
