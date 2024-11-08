import React, { useState } from 'react';
import ReactDOM from "react-dom/client"; // Properly import ReactDOM

const articleBehaviors = [
  "Misrepresentation of Trans People as Controversial",
  "Linking Trans Identities to Crime",
  "Dismissal or Mockery of Transphobia",
  "Political Weaponization",
  "Misgendering",
  "Stereotyping or Dehumanizing Language",
  "Invalidating Trans Identities",
  "Fearmongering",
  "Overemphasis on Transition Details",
  "Erasing or Minimizing Trans Experiences",
  "Promoting Anti-Trans Legislation or Policies",
  "Cherry-Picking Negative Stories",
  "Ignoring Harmful Consequences"
];

const disagreementBehaviors = [
  "Use of Hostile or Dismissive Language",
  "Failure to Respect Pronouns",
  "Invalidation of Transgender Experiences",
  "Argumentative or Aggressive Responses",
  "Spreading Misinformation",
  "Refusal to Engage in Dialogue",
  "Gaslighting or Manipulation",
  "Disrespecting Boundaries",
  "Name-Calling or Personal Attacks",
  "Generalization of Transgender Experiences"
];

// Mock community data
const mockCommunityResponses = {
  "Misrepresentation of Trans People as Controversial": "yes",
  "Linking Trans Identities to Crime": "no",
  "Dismissal or Mockery of Transphobia": "yes",
  "Political Weaponization": "yes",
  "Misgendering": "no",
  "Stereotyping or Dehumanizing Language": "yes",
  "Invalidating Trans Identities": "no",
  "Fearmongering": "yes",
  "Overemphasis on Transition Details": "no",
  "Erasing or Minimizing Trans Experiences": "yes",
  "Promoting Anti-Trans Legislation or Policies": "yes",
  "Cherry-Picking Negative Stories": "no",
  "Ignoring Harmful Consequences": "yes",
  "Use of Hostile or Dismissive Language": "no",
  "Failure to Respect Pronouns": "yes",
  "Invalidation of Transgender Experiences": "yes",
  "Argumentative or Aggressive Responses": "no",
  "Spreading Misinformation": "yes",
  "Refusal to Engage in Dialogue": "no",
  "Gaslighting or Manipulation": "yes",
  "Disrespecting Boundaries": "no",
  "Name-Calling or Personal Attacks": "yes",
  "Generalization of Transgender Experiences": "yes"
};

const TransphobiaAssessment = () => {
  const [isTransRelated, setIsTransRelated] = useState(null);
  const [transphobicRating, setTransphobicRating] = useState(50);
  const [articleResponses, setArticleResponses] = useState({});
  const [disagreementResponses, setDisagreementResponses] = useState({});
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleTransRelatedChange = (event) => {
    setIsTransRelated(event.target.value === 'true');
  };

  const handleSliderChange = (event) => {
    setTransphobicRating(event.target.value);
  };

  const handleArticleResponseChange = (behavior, value) => {
    setArticleResponses((prevResponses) => ({
      ...prevResponses,
      [behavior]: value,
    }));
  };

  const handleDisagreementResponseChange = (behavior, value) => {
    setDisagreementResponses((prevResponses) => ({
      ...prevResponses,
      [behavior]: value,
    }));
  };

  const handleCommentChange = (event) => {
    setComments(event.target.value);
  };

  const calculateScore = () => {
    let totalScore = 0;
    totalScore += Object.keys(articleResponses).length;
    totalScore += Object.keys(disagreementResponses).length;
    return totalScore;
  };

  const calculateConsensus = () => {
    let matchingResponses = 0;
    let totalBehaviors = Object.keys(articleResponses).length;

    Object.keys(articleResponses).forEach((behavior) => {
      if (mockCommunityResponses[behavior] === articleResponses[behavior]) {
        matchingResponses++;
      }
    });

    return matchingResponses / totalBehaviors;
  };

  const handleSubmit = () => {
    const totalScore = calculateScore();
    setScore(totalScore);
    setSubmitted(true);
  };

  const handleNext = () => {
    setIsTransRelated(null);
    setTransphobicRating(50);
    setArticleResponses({});
    setDisagreementResponses({});
    setComments("");
    setSubmitted(false);
  };

  if (submitted) {
    const consensusPercentage = Math.round(calculateConsensus() * 100);
    return (
      <div className="results-screen" style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Results</h2>
        <p>Your score: {score} points</p>
        <p>Community Consensus Match: {consensusPercentage}%</p>
        <button onClick={handleNext} style={{ padding: '10px 20px', marginTop: '20px' }}>
          Next Article
        </button>
      </div>
    );
  }

  return (
    <div className="assessment-container" style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <div className="assessment-header" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Radio buttons to determine if the article is trans-related */}
        <div className="related-status" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <label>
            <input
              type="radio"
              name="transRelated"
              value="true"
              onChange={handleTransRelatedChange}
              style={{ marginRight: '5px' }}
            />
            Trans-related
          </label>
          <label>
            <input
              type="radio"
              name="transRelated"
              value="false"
              onChange={handleTransRelatedChange}
              style={{ marginRight: '5px' }}
            />
            Not Trans-related
          </label>
        </div>

        {/* Show all options if "Trans-related" is selected */}
        {isTransRelated && (
          <>
            <div className="slider-container" style={{ textAlign: 'center' }}>
              <label style={{ fontWeight: 'bold' }}>Rate the degree of transphobia: </label>
              <input
                type="range"
                min="0"
                max="100"
                value={transphobicRating}
                onChange={handleSliderChange}
                style={{ width: '100%', marginTop: '10px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', fontWeight: 'bold' }}>
                <span>Not Transphobic</span>
                <span>Neutral</span>
                <span>Very Transphobic</span>
              </div>
              <p style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '10px' }}>Rating: {transphobicRating}%</p>
            </div>

            {/* Spoiler (collapsible section) for article behavior evaluations */}
            <details className="behavior-responses" style={{ marginTop: '20px' }}>
              <summary style={{ fontWeight: 'bold', cursor: 'pointer' }}>
                Evaluate the following behaviors in the article [optional]:
              </summary>
              {articleBehaviors.map((behavior) => (
                <div key={behavior} style={{ marginBottom: '10px', marginTop: '10px' }}>
                  <label style={{ fontWeight: 'bold' }}>{behavior}</label>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <label>
                      <input
                        type="radio"
                        name={behavior}
                        value="yes"
                        onChange={() => handleArticleResponseChange(behavior, 'yes')}
                        checked={articleResponses[behavior] === 'yes'}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={behavior}
                        value="no"
                        onChange={() => handleArticleResponseChange(behavior, 'no')}
                        checked={articleResponses[behavior] === 'no'}
                      />
                      No
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={behavior}
                        value="idk"
                        onChange={() => handleArticleResponseChange(behavior, 'idk')}
                        checked={articleResponses[behavior] === 'idk'}
                      />
                      Unsure or I don't know or not answered
                    </label>
                  </div>
                </div>
              ))}
            </details>

            {/* Spoiler (collapsible section) for disagreement behavior evaluations */}
            <details className="disagreement-responses" style={{ marginTop: '20px' }}>
              <summary style={{ fontWeight: 'bold', cursor: 'pointer' }}>
                Evaluate the following behaviors in how people disagreed [optional]:
              </summary>
              {disagreementBehaviors.map((behavior) => (
                <div key={behavior} style={{ marginBottom: '10px', marginTop: '10px' }}>
                  <label style={{ fontWeight: 'bold' }}>{behavior}</label>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <label>
                      <input
                        type="radio"
                        name={behavior}
                        value="yes"
                        onChange={() => handleDisagreementResponseChange(behavior, 'yes')}
                        checked={disagreementResponses[behavior] === 'yes'}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={behavior}
                        value="no"
                        onChange={() => handleDisagreementResponseChange(behavior, 'no')}
                        checked={disagreementResponses[behavior] === 'no'}
                      />
                      No
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={behavior}
                        value="idk"
                        onChange={() => handleDisagreementResponseChange(behavior, 'idk')}
                        checked={disagreementResponses[behavior] === 'idk'}
                      />
                      Unsure or I don't know or not answered
                    </label>
                  </div>
                </div>
              ))}
            </details>

            {/* Comment box for additional feedback */}
            <details className="comments-section" style={{ marginTop: '20px' }}>
              <summary style={{ fontWeight: 'bold', cursor: 'pointer' }}>
                Additional Comments [optional]
              </summary>
              <textarea
                value={comments}
                onChange={handleCommentChange}
                placeholder="Add any comments or feedback here..."
                style={{ width: '100%', height: '100px', padding: '10px', marginTop: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </details>
          </>
        )}

        {/* Submit button appears if either option is selected */}
        {isTransRelated !== null && (
          <button onClick={handleSubmit} style={{ padding: '10px 20px', marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
            Submit
          </button>
        )}
      </div>

      {/* Placeholder for article body to be loaded later */}
      <div className="article-body" style={{ marginTop: '20px' }}>
        <p>Loading article content...</p>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); 
root.render(<TransphobiaAssessment />);