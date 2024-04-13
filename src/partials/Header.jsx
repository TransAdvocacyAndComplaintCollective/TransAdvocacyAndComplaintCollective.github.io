import React from 'react';

const Navbar = () => {
  return (
    <nav className="p-3 mb-3 navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <a href="/"><img src="/media/PP.svg" className="img-thumbnail" width="50" alt="Pirate Party Logo" /></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/articles/0.html">Articles</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about.html">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact.html">Contact</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/policy/readme.html">Policy</a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="/contact.html">Contact</a>
            </li> */}
            
            {/* <li className="nav-item">
              <a className="nav-link" href="/policy/readme.html">rules</a>
            </li> */}
            {/* <li className="nav-item">
              <a className="nav-link" href="/donations.html">Donations</a>
            </li> */}
          </ul>
          <div className="dropdown text-end">
            <div id="userStatusContainer">HI</div> 
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
