// Import necessary React and Bootstrap components
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

const AdminElectionPage = () => {
  // State to manage election form data
  const [electionData, setElectionData] = useState({
    name: '',
    startTime: '',
    endTime: '',
    candidates: [],
  });

  // State to manage candidate input
  const [candidateInput, setCandidateInput] = useState('');

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElectionData({ ...electionData, [name]: value });
  };

  // Function to add a candidate to the list
  const addCandidate = () => {
    if (candidateInput.trim() !== '') {
      setElectionData({
        ...electionData,
        candidates: [...electionData.candidates, candidateInput],
      });
      setCandidateInput('');
    }
  };

  // Function to submit the election form
  const submitForm = (e) => {
    e.preventDefault();
    // Add your logic to submit the election data to the backend or perform any other necessary actions
    console.log('Election data submitted:', electionData);
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h2>Create Election</h2>
          <Form onSubmit={submitForm}>
            <Form.Group controlId="electionName">
              <Form.Label>Election Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter election name"
                name="name"
                value={electionData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="startTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startTime"
                value={electionData.startTime}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="endTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="endTime"
                value={electionData.endTime}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="candidates">
              <Form.Label>Candidates</Form.Label>
              <Row>
                <Col xs={8}>
                  <Form.Control
                    type="text"
                    placeholder="Enter candidate name"
                    value={candidateInput}
                    onChange={(e) => setCandidateInput(e.target.value)}
                  />
                </Col>
                <Col>
                  <Button variant="primary" onClick={addCandidate}>
                    Add
                  </Button>
                </Col>
              </Row>
              <ListGroup className="mt-2">
                {electionData.candidates.map((candidate, index) => (
                  <ListGroup.Item key={index}>{candidate}</ListGroup.Item>
                ))}
              </ListGroup>
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Election
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminElectionPage;
