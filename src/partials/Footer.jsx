import React from 'react';

const Footer = () => {
  return (
    <div className="mt-5 navbar fixed-bottom bg-body-tertiary bg-dark" data-bs-theme="dark">
      <div className="col-md-3">
        <span className="mb-3 mb-md-0 text-body-secondary">
          Copyright &copy; {new Date().getFullYear()} Pirate Party UK
        </span>
      </div>
      <div className="col-md-3 text-end">
        <span className="mb-3 mb-md-0 text-body-secondary">
          <a href="https://discord.gg/t8EDRgXzMH" className="bi bi-discord"></a>
        </span>

        <span className="mb-3 mb-md-0 text-body-secondary">
          <a href="https://github.com/pirate-party-uk" className="bi bi-github"></a>
        </span>
        <span className="mb-3 mb-md-0 text-body-secondary">
          <a rel="me" className="bi bi-mastodon" href="https://tech.lgbt/@pirate_party_uk"></a>
        </span>
        <span className="mb-3 mb-md-0 text-body-secondary">
          <a rel="me" className="bi bi-twitter" href="https://twitter.com/_PiratePartyUK"></a>
        </span>
        {/* Facebook link commented out */}
        {/* <span className="mb-3 mb-md-0 text-body-secondary">
          <a rel="me" className="bi bi-facebook" href="https://www.facebook.com/profile.php?id=100094049784840"></a>
        </span> */}
      </div>
    </div>
  );
};

export default Footer;
