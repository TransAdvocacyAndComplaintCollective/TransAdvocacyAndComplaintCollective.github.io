import React from 'react';
import BodyPage from 'partials/BodyPage';

const RestartPage = () => {
  return (
    <BodyPage tite={"Restarting the Party"}>
        <div className="container pb-5 mb-5">
          <section className="container">
            <h2>The Restart:</h2>
            <p>After the previous Pirate Party UK (PPUK) was deregistered in November 2020, we embarked on a journey to keep the spirit and mission alive. Today, we proudly announce the restart of PPUK with renewed energy and commitment.</p>
          </section>

          <section className="container">
            <h2>Preserving Resources:</h2>
            <p>When PPUK was shut down, the NEC and Board of Governors agreed to keep certain resources available for a potential new party. These resources include the logo, the domain name (<a href="https://pirateparty.org.uk/">https://pirateparty.org.uk/</a>), and the residual website. These resources align with the aims and operation of the previous party, and we see no reason to object to the formation of the new party.</p>
          </section>

          <section className="container">
            <h2>Application to Electoral Commission:</h2>
            <p>An application for Pirate Party UK has been submitted to the Electoral Commission on August 10, 2023. This marks a significant step in our journey towards re-establishing our party and participating in the political process.</p>
          </section>

          <section className="container">
            <h2>Website Update:</h2>
            <p>Our new official website is located at <a href="http://ukpirate.party/">http://ukpirate.party/</a>, serving as a hub for our supporters and the general public. The previous website <a href="https://pirateparty.org.uk/">https://pirateparty.org.uk/</a> is no longer in use, until we regain control of the old domain, at which point it will redirect to <a href="https://pirateparty.org.uk/">https://pirateparty.org.uk/</a>.</p>
          </section>

          <section className="container">
            <h2>Future Plans:</h2>
            <p>We have plans to establish a Board of Governors in the future as the party grows. This governance structure will help us ensure effective leadership and decision-making as we continue to expand our reach and impact.</p>
          </section>

          <section className="container">
            <h2>Recent Changes:</h2>
            <ol>
              <li><strong>Leadership:</strong> Lucy Maber, a transgender leader, assumed the role of party leader on March 11, 2023, marking the beginning of a new and inclusive era.</li>
              <li><strong>Party Aims:</strong> PPUK remains dedicated to the core principles of its predecessor. We are committed to advocating for copyright and patent law reform, supporting privacy, reducing surveillance by governments and businesses, and championing freedom of speech and expression. Additionally, we have added trans rights as a central policy.</li>
              <li><strong>Branches and Governance:</strong> PPUK has adopted a new structure, and we no longer maintain branches or a Board of Governors. Our streamlined approach ensures efficiency and agility.</li>
              <li><strong>International Affiliation:</strong> As part of our restart efforts, we are actively exploring the possibility of rejoining Pirate Party International (PPI). This step is essential to strengthen international collaboration and solidarity among pirate parties worldwide.</li>
              <li><strong>Headquarters:</strong> we are no longer using Unit 6941, PO Box 4336, Manchester, M61 0BW address for Headquarters</li>
            </ol>
          </section>

          <footer className="container mt-4">
            <p>Thank you for your unwavering support as we embark on this exciting journey of renewal and growth. Together, we are redefining the future of pirate politics.</p>
          </footer>
        </div>
    </BodyPage>
  );
};

export default RestartPage;
