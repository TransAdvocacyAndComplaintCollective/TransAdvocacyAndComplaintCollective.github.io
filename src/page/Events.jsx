import React from 'react';
import BodyPage from '../partials/BodyPage';

const EventsPage = ({ calendarUrl, title = "Upcoming Events", description = "Stay updated on the latest events hosted by the Trans Advocacy and Complaint Collective" }) => {
  // Default Google Calendar URL (can be replaced via props)
  const googleCalendarUrl = calendarUrl || "https://calendar.google.com/calendar/u/2/embed?src=b8e2d2038d4a52e7fc437bb22ee4ac01ac38343f9bda27b51978b3f6d221d485@group.calendar.google.com&ctz=Europe/London&csspa=1";

  return (
    <BodyPage title={title} description={description}>
      <div className="container pb-5 mb-5">
        <h1 className="text-body-emphasis">{title}</h1>

        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-calendar-event"></i> View Our Events Calendar
            </h5>
            <p className="card-text">
            The Trans Advocacy and Complaint Collective hosts a variety of events designed to engage our members and supporters. These events cover topics like transgender rights and more. Check out the calendar below to find upcoming events and join us in making a difference.            </p>

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
          </div>
        </div>
      </div>
    </BodyPage>
  );
};

export default EventsPage;
