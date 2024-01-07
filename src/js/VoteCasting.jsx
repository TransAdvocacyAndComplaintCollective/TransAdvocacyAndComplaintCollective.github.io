// VotingPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { createRoot } from "react-dom/client";
import { retrieveVote, fetchCandidates, placeVote } from "./libs/googleAPI.js";

const VotingPage = () => {
  const location = window.location;
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [votingData, setVotingData] = useState({"title":""});
  const [rankings, setRankings] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [userHasVoted, setUserHasVoted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {

        // Fetch candidates for the specified election
        const candidates = await fetchCandidates(id);
        
        setCandidates(candidates);
        // Fetch user vote
        const userVote = await retrieveVote(id);
        if (userVote) {
          setRankings(userVote.candidateId || []);
          setUserHasVoted(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    console.log("id:",id,"fetchData");
    fetchData();
  }, [id]);

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
      await placeVote(id, voteData);


      setUserHasVoted(true);
    } catch (error) {
      console.error("Error casting vote:", error);
      // Handle the error appropriately, e.g., show a user-friendly message to the user
    }
  };

  return (
    <Container className="mt-5">
      {votingData && (
        <div>
          <h2>{votingData.title}</h2>
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
        </div>
      )}
    </Container>
  );
};


const domNode = document.getElementById("VotingListPage");
const root = createRoot(domNode);
root.render(<VotingPage />);
