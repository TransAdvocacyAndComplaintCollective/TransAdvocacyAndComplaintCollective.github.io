import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';



const BodyPage = ({ children, title = "Pirate Party UK" ,description = ""}) => {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={description}/>
        <link href="/styles/bootstrap.min.css" rel="stylesheet"/>
        <link rel="icon" href="media/PP.svg" />
        <meta name="theme-color" content="#4285f4" />
        <style>
        </style>
        <meta name="viewport" content="width=device-width"/>
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
