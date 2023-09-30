import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  // Your Firebase config here
};

firebase.initializeApp(config);

const db = firebase.firestore();

const VotingPage = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    // Fetch elections from Firestore
    db.collection('elections').onSnapshot((snapshot) => {
      const electionList = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        electionList.push({ id: doc.id, ...data });
      });
      setElections(electionList);
    });
  }, []);

  const handleElectionChange = (event) => {
    const electionId = event.target.value;
    setSelectedElection(electionId);

    // Fetch candidates for the selected election
    db.collection(`elections/${electionId}/candidates`).onSnapshot((snapshot) => {
      const candidateList = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        candidateList.push({ id: doc.id, ...data });
      });
      setCandidates(candidateList);
    });
  };

  const handleCandidateChange = (event) => {
    setSelectedCandidate(event.target.value);
  };

  const handleVote = () => {
    // Check if the user has already voted
    // You can implement this logic based on your Firestore structure
    if (isVoted) {
      alert('You have already voted in this election.');
      return;
    }

    // Create a new vote document in Firestore
    db.collection(`elections/${selectedElection}/votes`).add({
      userId: firebase.auth().currentUser.uid,
      candidateId: selectedCandidate,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
      .then(() => {
        setIsVoted(true);
        alert('Vote submitted successfully!');
      })
      .catch((error) => {
        console.error('Error submitting vote:', error);
      });
  };

  return (
    <div className="container">
      <h1>Vote in an Election</h1>
      <div className="form-group">
        <label>Select an Election:</label>
        <select className="form-control" onChange={handleElectionChange}>
          <option value="">Select an election</option>
          {elections.map((election) => (
            <option key={election.id} value={election.id}>{election.name}</option>
          ))}
        </select>
      </div>
      {selectedElection && (
        <div className="form-group">
          <label>Select a Candidate:</label>
          <select className="form-control" onChange={handleCandidateChange}>
            <option value="">Select a candidate</option>
            {candidates.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>{candidate.name}</option>
            ))}
          </select>
        </div>
      )}
      <button className="btn btn-primary" onClick={handleVote} disabled={!selectedCandidate}>
        Cast Vote
      </button>
    </div>
  );
};

export default VotingPage;
