// VotingListPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { Card, Container } from "react-bootstrap";
import { createRoot } from 'react-dom/client';
import { fetchVotingElections } from "./libs/googleAPI.js";

const VotingListPage = () => {
  const [votingElections, setVotingElections] = useState([]);

  useEffect(() => {
    const fetchElections = async () => {
      const elections = await fetchVotingElections();
      setVotingElections(elections);
    };

    fetchElections();
  },[]);

  return (
      <Container className="mt-5">
        <h1>Available Voting Elections</h1>
        {votingElections.map((election) => (
          <Card key={election.id} className="mb-3">
            <Card.Body>
              <Card.Title>{election.name}</Card.Title>
              <Card.Text>{election.description}</Card.Text>
              <a href={`/VoteCasting.htmk?id=${election.id}`}>Take Part</a>
            </Card.Body>
          </Card>
        ))}
      </Container>
  );
};

export default VotingListPage;

const domNode = document.getElementById("VotingListPage");
const root = createRoot(domNode);
root.render(<VotingListPage />);
