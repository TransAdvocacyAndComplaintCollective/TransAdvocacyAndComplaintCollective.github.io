import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Vote   = () => {
  const [candidates, setCandidates] = useState([
    { id: "1", name: "Candidate 1" },
    { id: "2", name: "Candidate 2" },
    { id: "3", name: "Candidate 3" },
    { id: "4", name: "Candidate 4" },
  ]);


  const [title, setTitle] = useState(null);
  const [preferences, setPreferences] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

 

  const onDragEnd = (result) => {
    const { source, destination } = result;
  
    // If there's no destination, return
    if (!destination) {
      return;
    }
  
    if (source.droppableId === destination.droppableId) {
      // If dragged within the same list
      if (source.droppableId === "preferences") {
        const newPreferences = Array.from(preferences);
        const [removed] = newPreferences.splice(source.index, 1);
        newPreferences.splice(destination.index, 0, removed);
        setPreferences(newPreferences);
      } else {
        // If dragged within candidates
        const newCandidates = Array.from(candidates);
        const [removed] = newCandidates.splice(source.index, 1);
        newCandidates.splice(destination.index, 0, removed);
        setCandidates(newCandidates);
      }
    } else {
      // If dragged between lists
      const sourceList = source.droppableId === "preferences" ? preferences : candidates;
      const destinationList = destination.droppableId === "preferences" ? preferences : candidates;
  
      const [removed] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, removed);
  
      setPreferences(preferences.slice());
      setCandidates(candidates.slice());
    }
  };
  const handleVote = () => {
  };  const handleReset = () => {
    setPreferences([]);
    setCandidates([
      { id: "1", name: "Candidate 1" },
      { id: "2", name: "Candidate 2" },
      { id: "3", name: "Candidate 3" },
      { id: "4", name: "Candidate 4" },
    ]);
    setStartTime(null);
    setEndTime(null);
  };

  
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Voting Page : {title}</h1>
      <div className="text-center mb-2">
        {startTime && <p>Start Time: {startTime.toLocaleString()}</p>}
        {endTime && <p>End Time: {endTime.toLocaleString()}</p>}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Candidates</h3>
                <p className="text-center">Drag and drop candidates into the "Preferences" list to rank them.</p>
                <Droppable droppableId="candidates">
                  {(provided) => (
                    <ul
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="list-group"
                    >
                      {candidates.map((candidate, index) => {
                        if (!candidate || typeof candidate !== "object" || !candidate.id) {
                          console.log("Invalid candidate at index:", index);
                          return null; // Skip rendering if candidate is invalid
                        }
                        return (
                          <Draggable
                            key={candidate.id}
                            draggableId={candidate.id}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="list-group-item"
                              >
                                {candidate.name}
                              </li>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Preferences</h3>
                <p className="text-center">Rank your preferred candidates by dragging them up or down.</p>
                <Droppable droppableId="preferences">
                  {(provided) => (
                    <ul
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="list-group"
                    >
                      {preferences.map((candidate, index) => {
                        if (!candidate || typeof candidate !== "object" || !candidate.id) {
                          console.log("Invalid candidate at index:", index);
                          return null; // Skip rendering if candidate is invalid
                        }
                        return (
                          <Draggable
                            key={candidate.id}
                            draggableId={candidate.id}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="list-group-item"
                              >
                                {candidate.name}
                              </li>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <button onClick={handleVote} disabled={preferences.length === 0}>
            Vote
          </button>
          <button onClick={handleReset} className="ml-3">
            Reset
          </button>
        </div>
      </DragDropContext>
    </div>
  );
  
};

export default Vote;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Vote />);
