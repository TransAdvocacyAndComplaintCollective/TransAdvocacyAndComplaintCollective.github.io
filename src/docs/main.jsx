import React from 'react';
import { Container } from 'react-bootstrap';
import BodyPage from './page/partials/BodyPage';

const ContactPage = ({doc}) => {
  return (
    <BodyPage>
      <Container>
        {/* <header>
          <h1 className="entry-title" itemprop="headline">{doc.title}</h1>
        </header> */}
        <Container className="pb-5 mb-5" dangerouslySetInnerHTML={{ __html: doc.main }} />
      </Container>
    </BodyPage>
  );
}

export default ContactPage;
