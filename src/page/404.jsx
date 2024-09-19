import React from 'react';
import BodyPage from './page/partials/BodyPage';
import Container from 'react-bootstrap/Container';

const NotFoundPage = () => {
  return (
    <BodyPage  title={"Not Found"} description="Page Not Found">
      {/*  className="container pb-5 mb-5" */}
      <Container > 
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          {/* <img className="bi mt-4 mb-3" src="/media/PP.svg" /> */}
          <h1 className="text-body-emphasis">404 - Page not Found</h1>
          <p className="col-lg-8 mx-auto fs-5 text-muted">Page not Found</p>
        </div>
      </Container>
    </BodyPage>
  );
};

export default NotFoundPage;
