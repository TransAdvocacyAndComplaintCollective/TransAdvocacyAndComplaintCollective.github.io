import React from 'react';
import BodyPage from './partials/BodyPage';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Discord, Envelope, Mastodon, Twitter } from 'react-bootstrap-icons';

const HomePage = () => {
  const email = "contact@transadvocacyuk.org"; // Replace with your actual email

  return (
    <BodyPage title={"Home Page"} description={"Get in touch with the Trans Advocacy and Complaint Collective UK"}>
    </BodyPage>
  );
};

export default HomePage;
