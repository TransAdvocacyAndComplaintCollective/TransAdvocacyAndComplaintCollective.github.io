import React from 'react';
import BodyPage from '../partials/BodyPage';

const ContactPage = () => {
  // Assuming `email` is defined elsewhere, replace `email` with the actual email or pass it as a prop.
  const email = "contact@piratepartyuk.org"; // Replace with your actual email

  return (
    <BodyPage title={"Contact Us"} description={"Get in touch with the Trans Advocacy and Complaint Collective"}>
      <div className="container pb-5 mb-5">
        <h1 className="text-body-emphasis">Contact Us</h1>

        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-discord"></i> Discord
            </h5>
            <p className="card-text">
              The Trans Advocacy and Complaint Collective Discord is an online platform where members and supporters of the Trans Advocacy and Complaint Collective can connect and discuss various political and social issues. The Trans Advocacy and Complaint Collective is a political party that focuses on digital rights, civil liberties, and transparency in government. The Discord server is a space for like-minded individuals to come together and engage in discussions, share news and events, and organize political action. It is also a space for members to socialize and build a sense of community within the party.
            </p>
            <a href="https://discord.gg/KMxjhabAxN" className="btn btn-primary">
              Join
            </a>
          </div>
        </div>


      </div>
    </BodyPage>
  );
};

export default ContactPage;
