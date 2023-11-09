import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const CandidateForm = ({ electionId }) => {
  const [candidateName, setCandidateName] = useState('');

  const addCandidate = async () => {
    const db = firebase.firestore();

    try {
      await db.collection(`elections/${electionId}/candidates`).add({
        name: candidateName,
      });
      alert('Candidate added successfully!');
      setCandidateName('');
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  return (
    <div>
      <h2>Add Candidate</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="candidateName" className="form-label">
            Candidate Name
          </label>
          <input
            type="text"
            className="form-control"
            id="candidateName"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={addCandidate}>
          Add Candidate
        </button>
      </form>
    </div>
  );
};

export default CandidateForm;
