import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const BodyPage = ({ children, title = "Trans Advocacy and Complaint Collective", description = "", header = null }) => {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <link href="/styles/bootstrap.min.css" rel="stylesheet" />
        <script src="/js/bootstrap/bootstrap.bundle.min.js"></script>
        <link rel="icon" href="/media/trans-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#121212" />
        <style>
          {`
            html, body {
              height: 100%;
              margin: 0;
              padding: 0;
            }

            #root {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
            }

            .content {
              flex: 1;
              padding: 20px;
            }

            footer {
              margin-top: auto;
            }
          `}
        </style>
        {header ? header : null}
      </head>
      <body>
        <div id="root">
          <Header />
          <div className="content">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default BodyPage;
