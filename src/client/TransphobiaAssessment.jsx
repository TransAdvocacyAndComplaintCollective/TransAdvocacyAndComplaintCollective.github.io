import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

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

// Mock community data for consensus calculation
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
  const [articleData, setArticleData] = useState(null); // Store current article data
  const [articlesList, setArticlesList] = useState([]); // Store list of articles

  // Fetch list of articles on component mount
  useEffect(() => {
    const fetchArticlesList = async () => {
      const response = await fetch('data/articleList.json');
      if (response.ok) {
        const articles = await response.json();
        setArticlesList(articles);
        loadRandomArticle(articles);
      }
    };
    fetchArticlesList();
  }, []);

  // Load a random article from the list
  const loadRandomArticle = async (articles) => {
    const randomIndex = Math.floor(Math.random() * articles.length);
    const article = articles[randomIndex];
    const articleResponse = await fetch(article.local_url);
    if (articleResponse.ok) {
      const articleContent = await articleResponse.json();
      setArticleData(articleContent);
    }
  };

  // Handle the submit action
  const handleSubmit = () => {
    const totalScore = calculateScore();
    setScore(totalScore);
    setSubmitted(true);
  };

  const handleNextArticle = () => {
    loadRandomArticle(articlesList);
    resetAssessment();
  };

  const resetAssessment = () => {
    setIsTransRelated(null);
    setTransphobicRating(50);
    setArticleResponses({});
    setDisagreementResponses({});
    setComments("");
    setSubmitted(false);
  };

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

  // Show results after submission
  if (submitted) {
    const consensusPercentage = Math.round(calculateConsensus() * 100);
    return (
      <div className="results-screen" style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Results</h2>
        <p>Your score: {score} points</p>
        <p>Community Consensus Match: {consensusPercentage}%</p>
        <button onClick={handleNextArticle} style={{ padding: '10px 20px', marginTop: '20px' }}>
          Next Article
        </button>
      </div>
    );
  }

  return (
    <div className="assessment-container" style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      {articleData && (
        <>
          <h2>{articleData.title}</h2>
          <div className="article-body" dangerouslySetInnerHTML={{ __html: articleData.body }}></div>
          <div className="article-metadata">
            <p><strong>Source:</strong> {articleData.source}</p>
            <p><strong>Byline:</strong> {articleData.byline}</p>
            <p><strong>Date:</strong> {articleData.date}</p>
            <p><strong>Author:</strong> {articleData.author}</p>
          </div>
        </>
      )}

      <div className="assessment-header" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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

        {isTransRelated !== null && (
          <button onClick={handleSubmit} style={{ padding: '10px 20px', marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<TransphobiaAssessment />);
