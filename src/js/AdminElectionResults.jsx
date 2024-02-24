import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { fetchCandidates, fetchAllVotesForElection ,fetchElection} from "./libs/googleAPI.js";
function countSTVVotes(candidates, ballots) {
  let remainingCandidates = [...candidates];
  let electedCandidates = [];
  let round = 1;

  while (remainingCandidates.length > 1) {
    const candidateVoteCounts = remainingCandidates.reduce((acc, candidate) => {
      acc[candidate.id] = 0;
      return acc;
    }, {});

    ballots.forEach((ballot) => {
      const highestPreference = ballot.find((candidateId) =>
        remainingCandidates.some((c) => c.id === candidateId)
      );
      if (highestPreference) {
        candidateVoteCounts[highestPreference]++;
      }
    });

    const lowestCandidate = getLowestCandidate(candidateVoteCounts);
    if (!lowestCandidate) {
      break; // No more elimination needed
    }

    electedCandidates.push({
      id: lowestCandidate.id,
      name: lowestCandidate.name,
      round: round,
    });

    remainingCandidates = remainingCandidates.filter(
      (candidate) => candidate.id !== lowestCandidate.id
    );
    round++;
  }

  // The remaining candidate is declared the winner
  if (remainingCandidates.length === 1) {
    electedCandidates.push({
      id: remainingCandidates[0].id,
      name: remainingCandidates[0].name,
      round: round,
    });
  }

  return {
    electedCandidates: electedCandidates,
    remainingCandidates: remainingCandidates,
    round: round,
  };
}

function getLowestCandidate(candidateVoteCounts) {
  let lowestVotes = Number.MAX_SAFE_INTEGER;
  let lowestCandidate = null;

  for (const candidateId in candidateVoteCounts) {
    if (candidateVoteCounts[candidateId] < lowestVotes) {
      lowestVotes = candidateVoteCounts[candidateId];
      lowestCandidate = candidates.find(
        (candidate) => candidate.id === candidateId
      );
    }
  }

  return lowestCandidate;
}

const AdminElectionResults = () => {
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);
  const [electionResults, setElectionResults] = useState(null);
  const [votingData, setVotingData] = useState({ "title": "", "stat": "", "end": "" });

  useEffect(async () => {
    try {
      const electionId = window.location.pathname.split("/").pop();
      const candidate = await fetchCandidates(electionId);
      const ballots = await fetchAllVotesForElection(electionId);
      const election = await fetchElection(electionId);
      const results = countSTVVotes(candidate, ballots);
      setElectionResults(results);
      setCandidates(candidate);
      setVoters(ballots);
      setVotingData(election);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error (e.g., show an error message)
    }
  }, []);

  return (
    <div>
      <h2>Election Results</h2>
      {electionResults && (
        <div>
          <h3>Title: {votingData.title}</h3>
          <p>Start Time: {votingData.start}</p>
          <p>End Time: {votingData.end}</p>

          <div>
            <h4>Candidates:</h4>
            <ListGroup>
              {candidates.map((candidate, index) => (
                <ListGroupItem key={index}>{candidate.name}</ListGroupItem>
              ))}
            </ListGroup>
          </div>

          <div>
            <h4>Voters:</h4>
            <ListGroup>
              {voters.map((voter, index) => (
                <ListGroupItem key={index}>{voter.name}</ListGroupItem>
              ))}
            </ListGroup>
          </div>

          <div>
            <h4>Election Results:</h4>
            <ListGroup>
              {electionResults.electedCandidates.map((electedCandidate, index) => (
                <ListGroupItem key={index}>
                  {`${electedCandidate.name} (Round ${electedCandidate.round})`}
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        </div>
      )}
    </div>
  );
};


ReactDOM.render(
  <React.StrictMode>
    <AdminElectionResults />
  </React.StrictMode>,
  document.getElementById("AdminElectionResultsCreation")
);

export default AdminElectionResults;