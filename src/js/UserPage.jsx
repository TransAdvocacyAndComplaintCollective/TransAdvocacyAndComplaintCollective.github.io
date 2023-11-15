import React, { useState, useEffect } from 'react';
import { Tab, Nav, Row, Col, ListGroup } from 'react-bootstrap';
import { createRoot } from 'react-dom/client';

function UserSettings() {
  const [activeTab, setActiveTab] = useState('election');
  const [elections, setElections] = useState([
    { name: "test" },
    { name: "test" },
    { name: "test" },
    { name: "test" }
  ]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // This useEffect will run whenever activeTab changes
  useEffect(() => {
    // Perform actions based on the activeTab
    switch (activeTab) {
      case 'election':
        // Handle election tab actions
        break;
      case 'profile':
        // Handle profile tab actions
        break;
      case 'security':
        // Handle security tab actions
        break;
      case 'notifications':
        // Handle notifications tab actions
        break;
      default:
        break;
    }
  }, [activeTab]);

  return (
    <div className="container mt-5">
      <Tab.Container id="user-settings-tabs" activeKey={activeTab} onSelect={handleTabChange}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="election">Election</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="profile">Profile Settings</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="security">Security Settings</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="notifications">Notifications Settings</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="election">
                <h2>Election Settings</h2>
              {
                elections.map((election, index) => {
                 return <div key={`election-${index}`}>{election.name}Hello</div>;
                })
              }
              </Tab.Pane>
              <Tab.Pane eventKey="profile">
                <h2>Profile Settings</h2>
                {/* Your profile settings form can go here */}
              </Tab.Pane>
              <Tab.Pane eventKey="security">
                <h2>Security Settings</h2>
                {/* Your security settings form can go here */}
              </Tab.Pane>
              <Tab.Pane eventKey="notifications">
                <h2>Notification Settings</h2>
                {/* Your notification settings form can go here */}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

const domNode = document.getElementById("UserSettings");
const root = createRoot(domNode);
root.render(<UserSettings />);
