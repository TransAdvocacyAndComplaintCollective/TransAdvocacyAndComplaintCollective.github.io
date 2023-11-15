import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { Card, Button, Form } from 'react-bootstrap';
// import { firestore } from './firebase';
const VoteCasting = () => {
  const [candidates, setCandidates] = useState([]);
  const [candidateRankings, setCandidateRankings] = useState([]);

  useEffect(() => {
    // Fetch candidates from Firestore collection
    const fetchCandidates = async () => {
      const candidatesSnapshot = await firestore.collection('candidates').get();
      const candidatesData = candidatesSnapshot.docs.map((doc) => doc.data());
      setCandidates(candidatesData);
    };

    fetchCandidates();
  }, []);

  const handleCandidateRanking = (event, candidateId) => {
    const ranking = parseInt(event.target.value);

    const updatedRankings = [...candidateRankings];
    const existingIndex = updatedRankings.findIndex(
      (entry) => entry.candidateId === candidateId
    );

    if (existingIndex > -1) {
      updatedRankings[existingIndex].ranking = ranking;
    } else {
      updatedRankings.push({ candidateId, ranking });
    }

    setCandidateRankings(updatedRankings);
  };

  const handleVoteSubmission = async () => {
    // Sort the rankings based on the user's preferences
    const sortedRankings = candidateRankings.sort(
      (a, b) => a.ranking - b.ranking
    );

    // Save the vote to Firestore
    await firestore.collection('votes').add({
      rankings: sortedRankings,
      timestamp: new Date(),
    });

    // Clear the selected candidate rankings
    setCandidateRankings([]);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Cast Your Vote</Card.Title>
        <Card.Text>
          <Form>
            {candidates.map((candidate) => (
              <Form.Group controlId={candidate.id} key={candidate.id}>
                <Form.Label>{candidate.name}</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(event) =>
                    handleCandidateRanking(event, candidate.id)
                  }
                >
                  <option value="">No Preference</option>
                  {candidates.map((_, index) => (
                    <option value={index + 1} key={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            ))}
          </Form>
        </Card.Text>
        <Button
          variant="primary"
          onClick={handleVoteSubmission}
          disabled={candidateRankings.length !== candidates.length}
        >
          Submit Vote
        </Button>
      </Card.Body>
    </Card>
  );
};

// ReactDOM.render(
//   React.createElement(VoteCasting),
//   document.getElementById("RegisterContainer")
// );


export default VoteCasting;
