import React from 'react';
import BodyPage from './page/partials/BodyPage';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Discord, Envelope, Mastodon, Twitter } from 'react-bootstrap-icons';

const HomePage = () => {
  const email = "contact@transadvocacyuk.org"; // Replace with your actual email

  return (
    <BodyPage title={"Home Page"} description={"Get in touch with the Trans Advocacy and Complaint Collective UK"}>
      <Container className="mt-4">
        {/* Introduction Section */}
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Introducing the Trans Advocacy and Complaint Collective UK: Join Us in Making a Difference!</Card.Title>
            <Card.Text>
              Hello, everyone! We are excited to announce the launch of the Trans Advocacy and Complaint Collective UK—a new initiative dedicated to advocating for trans rights and addressing transphobia across the UK.
            </Card.Text>
            <Card.Text>
              Our mission is to create a united front for trans people and allies to push back against discrimination, hold media accountable for transphobic content, and ensure that our voices are heard. Whether you’re passionate about activism, need support, or want to help make real change, there’s a place for you in our collective.
            </Card.Text>
          </Card.Body>
        </Card>

        {/* What We Offer Section */}
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>What We Offer</Card.Title>
            <Card.Text as="div">
              <ul>
                <li><strong>Organized Activism:</strong> We’re planning targeted actions, campaigns, and events to challenge transphobia and promote equality.</li>
                <li><strong>FOI Requests:</strong> Join our efforts to obtain crucial information through Freedom of Information requests, shining a light on issues affecting the trans community.</li>
                <li><strong>Media Complaints:</strong> Help us hold media outlets accountable for transphobic coverage by organizing and submitting well-structured complaints.</li>
                <li><strong>Transphobic Events Documentation:</strong> A space to document and discuss incidents of transphobia, allowing us to respond collectively and effectively.</li>
                <li><strong>GIC Advocacy:</strong> Work with us to address issues within Gender Identity Clinics, including long waiting times, inadequate care, and systemic barriers to accessing gender-affirming healthcare.</li>
                <li><strong>Support and Community:</strong> A safe space for peer support, sharing resources, and celebrating trans joy.</li>
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>

        {/* How You Can Get Involved Section */}
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>How You Can Get Involved</Card.Title>
            <Card.Text as="div">
              <ul>
                <li><strong>Join Our Discord:</strong> Our Discord server is the hub for all our activities. Whether you want to take part in specific actions or just connect with like-minded people, we’d love to have you.</li>
                <li><strong>Share Your Ideas:</strong> We’re always looking for fresh ideas and perspectives. Your input can help shape the direction of our collective.</li>
                <li><strong>Spread the Word:</strong> Even if you can’t join, spreading the word about our collective can help us reach more people who might be interested.</li>
              </ul>
            </Card.Text>
            <Button variant="primary" href="https://discord.gg/KMxjhabAxN" className="me-2">
              <Discord /> Join Our Discord
            </Button>
          </Card.Body>
        </Card>

        {/* Closing Section */}
        <Card className="mb-4">
          <Card.Body>
            <Card.Text>
              This is a community-driven effort, and we believe that together, we can create meaningful change. Let’s work together to ensure that trans voices are amplified, respected, and heard across the UK.
            </Card.Text>
            <Card.Text>
              Join us today and be a part of something powerful!
            </Card.Text>
          </Card.Body>
        </Card>

        {/* Social Media Links Section */}
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Connect With Us</Card.Title>
            <Card.Text>Stay in touch through our social media channels:</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </BodyPage>
  );
};

export default HomePage;
