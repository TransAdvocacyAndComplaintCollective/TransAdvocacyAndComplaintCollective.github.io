import React from "react";
import BodyPage from './partials/BodyPage';
import Button from 'react-bootstrap/Button';

const AboutPage = () => {
  return (
    <BodyPage title={"About"}>
      <div className="container pb-5 mb-5">
        <h1>What we believe</h1>
        <p>
          The Pirate Party in the UK adopted a set of nine principles on which
          its policies are based. All the policies and ideas you see here, as
          well as the stances we take in our advocacy, local or national
          campaigning, come from these seven principles. They determine whether
          we can or cannot support a specific initiative and they should be
          sufficient to determine our position on any number of issues, whether
          outlined in our manifesto or additional policy documents or not:
        </p>
        <ul>
          <li>
            Sharing – Our society is built upon the sharing of knowledge, ideas,
            and culture. It is furthered by freedom of thought and expression,
            and protected by the rule of law. The Pirate Party exists to ensure
            the preservation and development of these foundations.
          </li>
          <li>
            Security - To ensure the security of our society, it is the
            responsibility of the government to provide for its defence, the
            mechanisms of justice and such services and infrastructure required
            to meet its needs.
          </li>
          <li>
            Equal - All are equal under the law. We all have a say in the
            structure and processes of governance and a right to know what is
            done on our behalf.
          </li>
          <li>
            Evidence - We will act on the basis of evidence, with the consent of
            society through democracy in the interests of all.
          </li>
          <li>
            Participation - To be free to participate in society, everyone must
            have access to justice, education, and such services and
            infrastructure required for life within it.
          </li>
          <li>
            Respect - Respect for our private and family life by government and
            society is fundamental, and we all have freedom of choice in our
            associations and relationships.
          </li>
          <li>
            Dignity - Human dignity is inviolable. Each of us has a right to
            life and to live, to freedom of thought and self-determination, and
            to participate in society.
          </li>
          <li>
            Inclusivity - The Pirate Party is committed to promoting
            inclusivity, including but not limited to, protecting the rights and
            dignity of all individuals, regardless of their age, race,
            ethnicity, LGBTQIA+, religion, or physical or mental ability.
          </li>
          <li>
            Openness - The Pirate Party is committed to promoting openness,
            transparency, and accountability in all aspects of governance and
            decision-making.
          </li>
        </ul>
        <h1>Our Policies</h1>
        <p>
          Democracy is in crisis in the United Kingdom. Whether it is online or
          on the doorstep, people are telling us that they feel alienated,
          ignored, that they have given up voting as it changes nothing.
        </p>
        <p>
          It's this sense of powerlessness over the forces that shape our lives
          and the space around us that is so worrying in the UK today. Creeping
          privatisation means all aspects of our society are being divided up
          and parcelled out. It can be impossible to find out who is responsible
          for the most basic aspects of our environment, public spaces and
          services, let alone get anyone to do anything about it.
        </p>
        <p>
          The Pirate Party develops policy in a collaborative manner, allowing
          anyone to have input and ultimately allowing its members to make the
          decision as to what the party stands for. The policies you find on
          these pages are the result of a process that allows us to refine and
          continually assess our positions, a process that we would encourage
          you to take part in.
        </p>
      </div>
    </BodyPage>
  );
};
export default AboutPage;
