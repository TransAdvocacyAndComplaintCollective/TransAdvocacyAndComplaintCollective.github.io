import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const ElectionForm = () => {
  const [electionName, setElectionName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const createElection = async () => {
    const db = firebase.firestore();

    try {
      await db.collection('elections').add({
        name: electionName,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      });
      alert('Election created successfully!');
    } catch (error) {
      console.error('Error creating election:', error);
    }
  };

  return (
    <div>
      <h2>Create Election</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="electionName" className="form-label">
            Election Name
          </label>
          <input
            type="text"
            className="form-control"
            id="electionName"
            value={electionName}
            onChange={(e) => setElectionName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startTime" className="form-label">
            Start Time
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endTime" className="form-label">
            End Time
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={createElection}>
          Create Election
        </button>
      </form>
    </div>
  );
};

export default ElectionForm;
