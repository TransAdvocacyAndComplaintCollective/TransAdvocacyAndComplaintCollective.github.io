import React from 'react';
import BodyPage from '../partials/BodyPage';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const GetInvolvedPage = () => {
  return (
    <BodyPage title={"Get Involved"} description={"Join us in advocating for trans rights and making a difference in the community"}>
      <Container className="pb-5 mb-5">
        
        {/* Event Section */}
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Event</Card.Title>
            <Card.Text>
              Attend one of our upcoming events to learn more about our work, meet other advocates, and engage in meaningful actions. Whether it’s a rally, a workshop, or an online discussion, your presence can make a difference.
            </Card.Text>
            <Button variant="primary" href="/Event.html" target="_blank">
              View Events
            </Button>
          </Card.Body>
        </Card>

        {/* Take Action Section */}
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Take Action</Card.Title>
            <Card.Text>
              Participate in our ongoing campaigns and actions to combat transphobia and advocate for trans rights. From signing petitions to contacting your representatives, your voice is crucial in making change.
            </Card.Text>
            <Button variant="primary" href="/take-action" target="_blank">
              Take Action
            </Button>
          </Card.Body>
        </Card>

        {/* Volunteer Section */}
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Volunteer</Card.Title>
            <Card.Text>
              Volunteering with the Trans Advocacy and Complaint Collective UK is a powerful way to contribute your skills and time to our mission. We offer a variety of volunteer opportunities, whether you have a few hours or want to commit long-term.
            </Card.Text>
            <Button variant="primary" href="#volunteer-projects">
              Explore Volunteer Projects
            </Button>
          </Card.Body>
        </Card>

        {/* Volunteer Projects Subsection */}
        <Card className="mt-4" id="volunteer-projects">
          <Card.Body>
            <Card.Title>Volunteer Projects</Card.Title>
            <Card.Text>
              Here are some of the projects you can get involved with:
            </Card.Text>
            <ul>
              <li><strong>Media Monitoring:</strong> Help us monitor and respond to transphobic media coverage by submitting complaints and promoting accurate representation.</li>
              <li><strong>Social Media Management:</strong> Assist in managing our social media accounts to spread awareness and engage with our community online.</li>
              <li><strong>Community Outreach:</strong> Work on outreach projects to connect with trans individuals and allies across the UK, providing them with resources and support.</li>
              <li><strong>Research and Policy Analysis:</strong> Conduct research and analyze policies that impact trans rights, contributing to our advocacy efforts.</li>
              <li><strong>Event Planning:</strong> Assist in organizing events, from rallies to educational workshops, ensuring everything runs smoothly and reaches a wide audience.</li>
            </ul>
          </Card.Body>
        </Card>
        
      </Container>
    </BodyPage>
  );
};

export default GetInvolvedPage;
