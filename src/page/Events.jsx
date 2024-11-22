import React from 'react';
import BodyPage from '../partials/BodyPage';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const EventsPage = ({ calendarUrl, title = "Upcoming Events", description = "Stay updated on the latest events hosted by the Trans Advocacy and Complaint Collective" }) => {
  // Default Google Calendar URL (can be replaced via props)
  const googleCalendarUrl = calendarUrl || "https://calendar.google.com/calendar/embed?src=b8e2d2038d4a52e7fc437bb22ee4ac01ac38343f9bda27b51978b3f6d221d485%40group.calendar.google.com&ctz=Europe%2FLondon";

  return (
    <BodyPage title={title} description={description}>
      <Container>

        <h1>{title}</h1>

        <Card className="mb-4">
          <Card.Body>
            <Card.Title>View Our Events Calendar</Card.Title>
            <Card.Text>
              The Trans Advocacy and Complaint Collective hosts a variety of events designed to engage our members and supporters. These events cover topics like transgender rights and more. Check out the calendar below to find upcoming events and join us in making a difference.
            </Card.Text>

            {/* Google Calendar Embed with improved responsiveness */}
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                src={googleCalendarUrl}
                style={{ border: 0, width: '100%', height: '600px' }}
                title="Google Calendar"
                loading="lazy"
                allowFullScreen
                className="rounded"
              ></iframe>
            </div>

            {/* Fallback message */}
            <p className="mt-3 text-muted">
              If the calendar fails to load, you can access it directly <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer">here</a>.
            </p>

          </Card.Body>
        </Card>
      </Container>
    </BodyPage>
  );
};

export default EventsPage;
