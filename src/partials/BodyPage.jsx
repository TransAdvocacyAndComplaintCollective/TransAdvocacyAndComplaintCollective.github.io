import React from "react";
import Header from "./Header";
import Footer from "./Footer";


const BodyPage = ({ children, title = "Pirate Party UK", description = "", header = null }) => {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <link href="/styles/bootstrap.min.css" rel="stylesheet" />
        <script src="/js/bootstrap/bootstrap.bundle.min.js"></script>
        <link rel="icon" href="media/PP.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
