import React from "react";
import BodyPage from 'partials/BodyPage';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const AboutPage = () => {
  return (
    <BodyPage title={"About"} description={"Learn more about the Trans Advocacy and Complaint Collective UK"}>
      <Container>
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Who We Are</Card.Title>
            <Card.Text>
              The Trans Advocacy and Complaint Collective UK is a grassroots organization dedicated to advocating for trans rights, addressing transphobia, and ensuring that the voices of trans people are heard across the UK.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Our Vision</Card.Title>
            <Card.Text>
              We envision a society where trans individuals can live freely and openly, without fear of discrimination or prejudice. Our goal is to challenge and dismantle the systems that perpetuate transphobia, creating a more inclusive and just society for all.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Body>
            <Card.Title>What We Do</Card.Title>
            <Card.Text>
              We engage in a range of activities aimed at promoting trans rights and combating transphobia, including:
            </Card.Text>
            <ul>
              <li><strong>Advocacy:</strong> Working to influence policies and practices that impact trans people.</li>
              <li><strong>Community Support:</strong> Providing a safe space for trans individuals to connect, share resources, and support each other.</li>
              <li><strong>Media Accountability:</strong> Challenging transphobic narratives in the media through structured complaints and campaigns.</li>
              <li><strong>Healthcare Reform:</strong> Advocating for improvements in gender-affirming healthcare and addressing systemic barriers within Gender Identity Clinics (GICs).</li>
            </ul>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Get Involved</Card.Title>
            <Card.Text>
              We believe that collective action is key to making a difference. Whether you’re looking to contribute your time, share your skills, or simply connect with like-minded individuals, there are many ways to get involved with our work.
            </Card.Text>
            <Button variant="primary" href="https://discord.gg/your-invite-code" target="_blank">
              Join Our Discord
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </BodyPage>
  );
};

export default AboutPage;
