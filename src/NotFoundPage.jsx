import React from 'react';
import Header from './partials/Header.jsx';
import Footer from './partials/Footer.jsx';
import './styles/bootstrap.css'; // Assuming you have your Bootstrap styles imported properly

const NotFoundPage = () => {
  return (
    <div>
      <Header />
      <div className="container pb-5 mb-5">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          {/* <img className="bi mt-4 mb-3" src="/media/PP.svg" /> */}
          <h1 className="text-body-emphasis">404 - Page not Found</h1>
          <p className="col-lg-8 mx-auto fs-5 text-muted">Page not Found</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
