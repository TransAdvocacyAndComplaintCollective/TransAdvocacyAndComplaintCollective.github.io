import React, { useState, useEffect } from "react";
import { FirebaseProvider, useFirebase } from "./hook/usefirebase.jsx"; // Replace with the actual import statement for Firebase
import { Button, Card, Container, Form } from "react-bootstrap";

const VotingPage = () => {
  const location = window.location;
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const firebase = useContext(useFirebase);
  const [votingData, setVotingData] = useState({});
  const [rankings, setRankings] = useState([]);
  const [userHasVoted, setUserHasVoted] = useState(false);

  // Fetch voting data from Firebase based on the provided ID
  useEffect(() => {
    const fetchVotingData = async () => {
      // Replace 'yourFirebaseFunction' with the actual function to fetch data from Firebase
      const data = await yourFirebaseFunction(id);
      setVotingData(data);
    };

    fetchVotingData();
  }, [id]);

  const handleRankingChange = (candidateId, rank) => {
    const updatedRankings = [...rankings];
    updatedRankings[candidateId] = rank;
    setRankings(updatedRankings);
  };

  const handleVoteSubmit = async () => {
    // Implement Firebase update to register the user's vote with rankings
    await yourFirebaseUpdateFunction(id, rankings);
    setUserHasVoted(true);
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
                {votingData.options &&
                  votingData.options.map((option, index) => (
                    <Form.Group key={option.id}>
                      <Form.Label>{option.label}</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={(e) =>
                          handleRankingChange(
                            option.id,
                            parseInt(e.target.value)
                          )
                        }
                      >
                        <option value="">Select Rank</option>
                        {votingData.options.map((_, i) => (
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

const domNode = document.getElementById("VotingPage");
const root = createRoot(domNode);
root.render(<VotingPage />);
export default VotingPage;
