import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const BodyPage = ({ children, title }) => {
  return (
    <html>
      <head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <link href="styles/bootstrap.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
        <link rel="icon" href="media/PP.svg" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
};
export default BodyPage;