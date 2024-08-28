import React from 'react';
import BodyPage from './partials/BodyPage';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Discord, Envelope, Mastodon, Twitter } from 'react-bootstrap-icons';

const ContactPage = () => {
  const email = "contact@transadvocacyuk.org"; // Replace with your actual email

  return (
    <BodyPage title={"Contact Us"} description={"Get in touch with the Trans Advocacy and Complaint Collective UK"}>
      <Container className="pb-5 mb-5">
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Contact Us</Card.Title>
            <Card.Text>
              We’d love to hear from you! Whether you have questions, want to get involved, or simply need to reach out, here are the ways you can connect with us:
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mt-4">
          <Card.Body>
            <Card.Title>
              <Discord size={20} /> Discord
            </Card.Title>
            <Card.Text>
              Join our Discord community where members and supporters of the Trans Advocacy and Complaint Collective UK come together to discuss, organize, and support each other. It’s a safe space for connection, collaboration, and community.
            </Card.Text>
            <Button variant="primary" href="https://discord.gg/your-invite-code" target="_blank">
              Join
            </Button>
          </Card.Body>
        </Card>

        <Card className="mt-4">
          <Card.Body>
            <Card.Title>
              <Mastodon size={20} /> Mastodon
            </Card.Title>
            <Card.Text>
              Stay connected with us on Mastodon for the latest updates and discussions on trans rights and advocacy.
            </Card.Text>
            <Button variant="primary" href="https://tech.lgbt/@transadvocacyuk" target="_blank">
              Find us
            </Button>
          </Card.Body>
        </Card>

        <Card className="mt-4">
          <Card.Body>
            <Card.Title>
              <Twitter size={20} /> Twitter
            </Card.Title>
            <Card.Text>
              Follow us on Twitter to keep up with the latest news, events, and actions from the Trans Advocacy and Complaint Collective UK.
            </Card.Text>
            <Button variant="primary" href="https://twitter.com/transadvocacyuk" target="_blank">
              Find us
            </Button>
          </Card.Body>
        </Card>

        <Card className="mt-4">
          <Card.Body>
            <Card.Title>
              <Envelope size={20} /> Email
            </Card.Title>
            <Card.Text>
              For any inquiries or to get in touch directly, feel free to email us at:
            </Card.Text>
            <a href={`mailto:${email}`} className="btn btn-primary">
              {email}
            </a>
          </Card.Body>
        </Card>
      </Container>
    </BodyPage>
  );
};

export default ContactPage;
