import React from "react";
import { Container, Card } from "react-bootstrap";
import BodyPage from "./partials/BodyPage";
import { Discord } from 'react-bootstrap-icons';
import ReactDOM from 'react-dom';

function App() {
  return (
    <BodyPage title={"Home"} description={"Welcome to the Pirate Party UK"}>
      <Container className="pb-5 mb-5">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <h1 className="text-body-emphasis">Pirate Party UK</h1>
          <p className="col-lg-8 mx-auto fs-5 text-muted">
            We believe in democracy, transparency, rights, and a free internet
          </p>
        </div>

        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Civil Liberties</Card.Title>
            <Card.Text>
              <ul>
                <li>We believe in protecting civil liberties, including:</li>
                <ul>
                  <li>Freedom of conscience</li>
                  <li>Freedom of press</li>
                  <li>Freedom of religion</li>
                  <li>Freedom of expression</li>
                  <li>Freedom of assembly</li>
                </ul>
                <li>These fundamental freedoms are essential to a free and open society.</li>
                <li>However, these freedoms must be exercised responsibly and with respect for the rights of others.</li>
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Body>
            <Card.Title>LGBTQIA+ Rights</Card.Title>
            <Card.Text>
              <ul>
                <li>We recognize the challenges faced by LGBTQIA+ individuals in our society.</li>
                <li>At Pirate Party UK, we believe in equal rights and opportunities for all individuals, regardless of their sexual orientation or gender identity.</li>
                <li>We are committed to advocating for LGBTQIA+ rights and ensuring that politicians understand and address these issues.</li>
                <li>Everyone deserves to live free from discrimination and to be treated with dignity and respect.</li>
                <li>Join us in our mission to create a more inclusive and equitable society for all.</li>
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Digital Freedoms</Card.Title>
            <Card.Text>
              <ul>
                <li>Online Privacy: Your personal data should be protected from unwarranted surveillance and misuse.</li>
                <li>Net Neutrality: We support a free and open internet where all data is treated equally, without discrimination by ISPs.</li>
                <li>Secure Communications: You should be able to communicate online securely without fear of eavesdropping or censorship.</li>
                <li>Open Source Software: We advocate for the use of open source software to promote transparency and user control.</li>
                <li>We work tirelessly to address issues related to digital rights and fight against legislation that threatens your online freedoms.</li>
                <li>Join us in safeguarding the digital world for generations to come.</li>
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Get Involved</Card.Title>
            <Card.Text>
              If you share our values and are interested in supporting the New UK Pirate Party, we welcome you to join us. You can connect with us on our Discord server and stay up to date with our latest news and events on our website.{" "}
              <a
                href="https://discord.gg/t8EDRgXzMH"
                aria-label="Join us on Discord"
              >
                <Discord size={24} />
              </a>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </BodyPage>
  );
}

export default App;
