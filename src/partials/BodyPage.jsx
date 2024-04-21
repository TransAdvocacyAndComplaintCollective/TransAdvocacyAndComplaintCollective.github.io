import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

const BodyPage = ({ children, title = "Pirate Party UK", description = "", header = null }) => {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <link href="/styles/bootstrap.min.css" rel="stylesheet" />
        <link rel="icon" href="media/PP.svg" />
        <meta name="theme-color" content="#4285f4" />
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
            }
          `}
        </style>
        <meta name="viewport" content="width=device-width" />
        {header ? header : null}
      </head>
      <body>
        <Header />
        <div id="root">
          <div className="content">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
};

export default BodyPage;
