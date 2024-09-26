import React from 'react';
import './CitationList.css'; // Import the CSS file for the CitationList

const CitationList = ({ citations }) => {
  return (
    <div className="citation-list">
      <h2>Citations</h2>
      <ul>
        {citations.map((citation, index) => {
          return (
            <li key={index} className="citation-item">
              {/* Display citation details based on its type */}
              {citation.title && <h3 className="citation-title">{citation.title}</h3>}
              
              {citation.author && (
                <p className="citation-author">
                  <strong>Author(s):</strong>{' '}
                  {citation.author.map((auth, idx) => (
                    <span key={idx}>
                      {auth.name}
                      {auth.sameAs && ` (Same as: ${auth.sameAs})`}
                      {auth.url && (
                        <>
                          {' '}
                          - <a href={auth.url} className="citation-link">{auth.url}</a>
                        </>
                      )}
                    </span>
                  ))}
                </p>
              )}
              
              {citation.organization && (
                <p className="citation-organization">
                  <strong>Organization:</strong>{' '}
                  <a href={citation.organization.url} className="citation-link">
                    {citation.organization.name}
                  </a>
                </p>
              )}
              
              {citation.datePublished && (
                <p className="citation-date">
                  <strong>Published:</strong> {citation.datePublished}
                </p>
              )}
              
              {citation.url && (
                <p className="citation-url">
                  <strong>URL:</strong>{' '}
                  <a href={citation.url} className="citation-link">{citation.url}</a>
                </p>
              )}
              
              {citation.archivedURL && (
                <p className="citation-archived-url">
                  <strong>Archived URL:</strong>{' '}
                  <a href={citation.archivedURL} className="citation-link">{citation.archivedURL}</a>
                </p>
              )}
              
              {citation.identifier && (
                <p className="citation-identifier">
                  <strong>Identifiers:</strong>{' '}
                  {citation.identifier.map((id, idIndex) => (
                    <span key={idIndex}>
                      {id.propertyID}: {id.value}
                    </span>
                  ))}
                </p>
              )}

              {/* Render type-specific details based on the citation type */}
              {citation.programName && <p><strong>Program:</strong> {citation.programName}</p>}
              {citation.episodeTitle && <p><strong>Episode Title:</strong> {citation.episodeTitle}</p>}
              {citation.platform && <p><strong>Platform:</strong> {citation.platform}</p>}
              {citation.handle && <p><strong>Handle:</strong> {citation.handle}</p>}
              {citation.section && <p><strong>Section:</strong> {citation.section}</p>}
              {citation.edition && <p><strong>Edition:</strong> {citation.edition}</p>}
              {citation.volume && <p><strong>Volume:</strong> {citation.volume}</p>}
              {citation.issue && <p><strong>Issue:</strong> {citation.issue}</p>}
              {citation.degree && <p><strong>Degree:</strong> {citation.degree}</p>}
              {citation.blogName && <p><strong>Blog:</strong> {citation.blogName}</p>}
              {citation.interviewee && <p><strong>Interviewee:</strong> {citation.interviewee}</p>}
              {citation.interviewer && <p><strong>Interviewer:</strong> {citation.interviewer}</p>}
              {citation.director && <p><strong>Director:</strong> {citation.director}</p>}
              {citation.conferenceName && <p><strong>Conference Name:</strong> {citation.conferenceName}</p>}
              {citation.reportNumber && <p><strong>Report Number:</strong> {citation.reportNumber}</p>}
              {citation.scale && <p><strong>Scale:</strong> {citation.scale}</p>}
              {citation.album && <p><strong>Album:</strong> {citation.album}</p>}
              {citation.artist && <p><strong>Artist:</strong> {citation.artist}</p>}
              {citation.journalName && <p><strong>Journal:</strong> {citation.journalName}</p>}
              {citation.standardNumber && <p><strong>Standard Number:</strong> {citation.standardNumber}</p>}
              {citation.pageRange && <p><strong>Page Range:</strong> {citation.pageRange}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CitationList;
