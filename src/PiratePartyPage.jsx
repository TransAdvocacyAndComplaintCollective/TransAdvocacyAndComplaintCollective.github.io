import React from 'react';
import BodyPage from 'partials/BodyPage';
import './styles/bootstrap.css'; // Assuming you have your Bootstrap styles imported properly

const PiratePartyPage = () => {
  return (
    <BodyPage>
      <div className="container pb-5 mb-5">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          {/* <img className="bi mt-4 mb-3" src="/media/PP.svg" alt="Pirate Party Logo"/> */}
          <h1 className="text-body-emphasis">Pirate Party UK</h1>
          <p className="col-lg-8 mx-auto fs-5 text-muted">We believe in democracy, transparency, rights, and a free internet</p>
        </div>

        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Civil Liberties</h5>
            <p className="card-text">
              We believe in protecting civil liberties, including freedom of conscience, freedom of press, freedom of religion, freedom of expression, and freedom of assembly. These fundamental freedoms are essential to a free and open society. However, these freedoms must be exercised responsibly and with respect for the rights of others.
            </p>
            <p className="card-text">
              For example, freedom of expression is a fundamental human right that should be protected and upheld, but this right does not extend to hate speech or expressions of discrimination against others. It's important to distinguish between personal expressions of identity, such as gender, sexuality, race, ethnicity, and religion, which should be respected and celebrated, and expressions of hate and discrimination, which have no place in our society.
            </p>
            <p className="card-text">
              Love and respect for others should be the guiding principles when it comes to how we express ourselves, and we will work to promote an inclusive and welcoming environment for all individuals.
            </p>
          </div>
        </div>

        {/* Other card components go here */}

        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Get Involved</h5>
            <p className="card-text"> If you share our values and are interested in supporting the New UK Pirate Party, we welcome you to join us. You can connect with us on our Discord server and stay up to date with our latest news and events on our website. <a href="https://discord.gg/t8EDRgXzMH" className="bi bi-discord"></a></p>
          </div>
        </div>
      </div>
    </BodyPage>
  );
};

export default PiratePartyPage;
