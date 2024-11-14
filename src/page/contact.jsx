import React from 'react';
import BodyPage from '../partials/BodyPage';

const ContactPage = () => {

  return (
    <BodyPage title={"Contact Us"} description={"Get in touch with the Trans Advocacy and Complaint Collective"}>
      <div className="container pb-5 mb-5">
        <h1 className="text-body-emphasis">Contact Us</h1>

        {/* Discord Section */}
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-discord"></i> Discord
            </h5>
            <p className="card-text">
              Join our Discord community to connect with members of the Trans Advocacy and Complaint Collective. Engage in discussions, share news, and help organize political action.
            </p>
            <a href="https://discord.gg/KMxjhabAxN" className="btn btn-primary">
              Join Discord
            </a>
          </div>
        </div>

        {/* Threads Section */}
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-threads"></i> Threads
            </h5>
            <p className="card-text">
              Follow us on Threads for the latest updates and announcements.
            </p>
            <a href="https://www.threads.net/@tacc40566" className="btn btn-primary">
              Follow on Threads
            </a>
          </div>
        </div>

        {/* Bluesky Section */}
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-stars"></i> Bluesky
            </h5>
            <p className="card-text">
              Connect with us on Bluesky for community updates and discussions.
            </p>
            <a href="https://bsky.app/profile/tacc-uk.bsky.social" className="btn btn-primary">
              Visit Bluesky
            </a>
          </div>
        </div>

        {/* Facebook Section */}
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-facebook"></i> Facebook
            </h5>
            <p className="card-text">
              Join our Facebook page for news, events, and updates from TACC.
            </p>
            <a href="https://www.facebook.com/profile.php?id=61567774272432" className="btn btn-primary">
              Follow on Facebook
            </a>
          </div>
        </div>
      </div>
    </BodyPage>
  );
};

export default ContactPage;
