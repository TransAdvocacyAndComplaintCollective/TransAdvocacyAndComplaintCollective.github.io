import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const BodyPage = ({ children, title = "Trans Advocacy and Complaint Collective", description = "", header = null }) => {
  return (
    <html lang="en">
    <head>
      <title>{title}</title>
      <meta charSet="UTF-8"/>
      <meta name="description" content={description}/>
      <link href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;900&#038;display=swap' rel='stylesheet'/>
      <link href="/styles/bootstrap.min.css" rel="stylesheet"/>
      <link href="/styles/style.css" rel="stylesheet"/>
      <script src="/js/bootstrap/bootstrap.bundle.min.js"></script>
      <link rel="icon" href="/media/trans.png"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="theme-color" content="#121212"/>
    </head>
    <body>
    <div id="root">
      <Header/>
      <div className="content">{children}</div>
      <Footer/>
    </div>
    </body>
    </html>
  );
};

export default BodyPage;
