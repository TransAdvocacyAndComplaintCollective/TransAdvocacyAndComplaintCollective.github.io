import React from "react";
import { Container, Card } from "react-bootstrap";
import BodyPage from "./partials/BodyPage";

function App() {
  return (
    <BodyPage title={"Home"}>
      <Container className="pb-5 mb-5">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          {/* <img className="bi mt-4 mb-3" src="/media/PP.svg" alt="PP Logo" /> */}
          <h1 className="text-body-emphasis">Pirate Party UK</h1>
          <p className="col-lg-8 mx-auto fs-5 text-muted">
            We believe in democracy, transparency, rights, and a free internet
          </p>
        </div>

        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Civil Liberties</Card.Title>
            <Card.Text>
              We believe in protecting civil liberties, including freedom of
              conscience, freedom of press, freedom of religion, freedom of
              expression, and freedom of assembly. These fundamental freedoms
              are essential to a free and open society. However, these freedoms
              must be exercised responsibly and with respect for the rights of
              others.
            </Card.Text>
            <Card.Text>{/* Your content goes here */}</Card.Text>
            <Card.Text>{/* Your content goes here */}</Card.Text>
          </Card.Body>
        </Card>

        {/* Repeat the above Card structure for other sections */}

        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Get Involved</Card.Title>
            <Card.Text>
              If you share our values and are interested in supporting the New
              UK Pirate Party, we welcome you to join us. You can connect with
              us on our Discord server and stay up to date with our latest news
              and events on our website.{" "}
              <a
                href="https://discord.gg/t8EDRgXzMH"
                className="bi bi-discord"
              ></a>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </BodyPage>
  );
}

export default App;
