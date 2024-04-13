import React, { useEffect, useState } from 'react';

const ContactUsPage = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const generateEmail = () => {
      if (navigator.webdriver || (window.chrome && window.chrome.webstore)) {
        setEmail("Due to web browser automation, emails are not displayed.");
        return;
      }
      const user = "0ku.ytrap.etarip".split("").reverse().join("");
      const domain = "moc.liamg".split("").reverse().join("");
      const email_address = user + "@" + domain;
      setEmail(email_address);
    };
    
    generateEmail();
  }, []);

  return (
    <div>
      {/* Include your header component here */}
      
      <div className="container pb-5 mb-5" style={{ height: '100px' }}>
        <h1 className="text-body-emphasis">contact us</h1>
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title"><i className="bi bi-discord"></i> Discord</h5>
            <p className="card-text">
              The Pirate Party UK Discord is an online platform where members and
              supporters of the Pirate Party UK can connect and discuss various
              political and social issues. The Pirate Party UK is a political
              party that focuses on digital rights, civil liberties, and
              transparency in government. The Discord server is a space for
              like-minded individuals to come together and engage in discussions,
              share news and events, and organize political action. It is also a
              space for members to socialize and build a sense of community within
              the party.
            </p>
            <a href="https://discord.gg/t8EDRgXzMH" className="btn btn-primary">
              Join
            </a>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title"><i className="bi bi-mastodon"></i> mastodon</h5>
            <p className="card-text">
              Stay connected with the latest updates on mastodon.
            </p>
            <a href="https://tech.lgbt/@pirate_party_uk" className="btn btn-primary">
              Find us
            </a>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title"><i className="bi bi-twitter"></i> twitter</h5>
            <p className="card-text">
              Stay connected with the latest updates on twitter.
            </p>
            <a href="https://twitter.com/_PiratePartyUK" className="btn btn-primary">
              Find us
            </a>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title"><i className="bi bi-envelope"></i> Email</h5>
            <p className="card-text">
              The Pirate Party UK can be reached via email. Feel free to get in
              touch with them for any inquiries or communications related to their
              activities and initiatives.
            </p>
            <noscript>
              <p>Enable JavaScript to see email address</p>
            </noscript>
            <div id="email-container">
              {email && <a href={`mailto:${email}`}>{email}</a>}
            </div>
          </div>
        </div>
      </div>
      
      {/* Include your footer component here */}
    </div>
  );
};

export default ContactUsPage;
