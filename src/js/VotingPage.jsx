// VotingPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { FirebaseProvider, useFirebase } from "./hook/usefirebase.jsx";
import { Button, Card, Container, Form } from "react-bootstrap";

const VotingPage = () => {
  const location = window.location;
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const firebase = useContext(useFirebase);
  const [votingData, setVotingData] = useState({});
  const [rankings, setRankings] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [userHasVoted, setUserHasVoted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch voting data
        const votingData = await yourFirebaseFunction(id);
        setVotingData(votingData);

        // Fetch candidates for the specified election
        const candidates = await firebase.fetchCandidates(id);
        setCandidates(candidates);

        // Fetch user vote
        const userVote = await firebase.retrieveVote(id);
        if (userVote) {
          setRankings(userVote.candidateId || []);
          setUserHasVoted(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, firebase]);

  const handleRankingChange = (candidateId, rank) => {
    const updatedRankings = [...rankings];
    updatedRankings[candidateId] = rank;
    setRankings(updatedRankings);
  };

  const handleVoteSubmit = async () => {
    try {
      // Ensure rankings array is filtered to remove undefined values
      const voteData = {
        candidateId: rankings.filter((rank) => rank !== undefined),
      };

      // Ensure the user is authenticated before accessing uid
      const user = firebase.auth().currentUser;
      if (!user) {
        console.error("User not authenticated.");
        // Handle the case where the user is not authenticated
        return;
      }

      const uid = user.uid;

      // Replace 'yourFirestoreCollection' with the actual Firestore collection reference
      const voteRef = doc(collection(yourFirestoreCollection), "election", id, "vote", uid);

      // Update the vote document with the vote data
      await updateDoc(voteRef, voteData);

      setUserHasVoted(true);
    } catch (error) {
      console.error("Error casting vote:", error);
      // Handle the error appropriately, e.g., show a user-friendly message to the user
    }
  };

  return (
    <FirebaseProvider>
      <Container className="mt-5">
        <Card>
          <Card.Body>
            <Card.Title>{votingData.title}</Card.Title>
            {userHasVoted ? (
              <p>You have already voted. Thank you!</p>
            ) : (
              <Form>
                {candidates.map((candidate) => (
                  <Form.Group key={candidate.id}>
                    <Form.Label>{candidate.name}</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) =>
                        handleRankingChange(
                          candidate.id,
                          parseInt(e.target.value)
                        )
                      }
                    >
                      <option value="">Select Rank</option>
                      {candidates.map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                ))}
                <Button variant="primary" onClick={handleVoteSubmit}>
                  Submit Vote
                </Button>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Container>
    </FirebaseProvider>
  );
};

export default VotingPage;
