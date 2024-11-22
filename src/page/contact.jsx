import React from 'react';
import BodyPage from '../partials/BodyPage';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const ContactPage = () => {

  return (
    <BodyPage title={"Contact Us"} description={"Get in touch with the Trans Advocacy and Complaint Collective"}>
      <Container>

        <h2>Contact Us</h2>

        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Discord</Card.Title>
            <Card.Text>
              Join our Discord community to connect with members of the Trans Advocacy and Complaint Collective. Engage
              in discussions, share news, and help organize political action.
            </Card.Text>
            <a href="https://discord.gg/KMxjhabAxN" className="btn btn-primary">
              Join Discord
            </a>
          </Card.Body>
        </Card>

        {/* Bluesky Section */}
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Bluesky</Card.Title>
            <Card.Text>
              Connect with us on Bluesky for community updates and discussions..
            </Card.Text>
            <a href="https://bsky.app/profile/tacc-uk.bsky.social" className="btn btn-primary">
              Follow on Bluesky
            </a>
          </Card.Body>
        </Card>

        {/* Threads Section */}
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Threads</Card.Title>
            <Card.Text>
              Follow us on Threads for the latest updates and announcements.
            </Card.Text>
            <a href="https://www.threads.net/@tacc40566" className="btn btn-primary">
              Follow on Threads
            </a>
          </Card.Body>
        </Card>

        {/* Facebook Section */}
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Facebook</Card.Title>
            <Card.Text>
              Join our Facebook page for news, events, and updates from TACC.
            </Card.Text>
            <a href="https://www.facebook.com/profile.php?id=61567774272432" className="btn btn-primary">
              Follow on Facebook
            </a>
          </Card.Body>
        </Card>

      </Container>
    </BodyPage>
  );
};

export default ContactPage;
