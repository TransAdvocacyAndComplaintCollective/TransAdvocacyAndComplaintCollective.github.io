function countSTVVotes(candidates, ballots) {
    let remainingCandidates = [...candidates];
    let electedCandidates = [];
    let round = 1;
  
    while (remainingCandidates.length > 1) {
      const candidateVoteCounts = remainingCandidates.reduce((acc, candidate) => {
        acc[candidate.id] = 0;
        return acc;
      }, {});
  
      ballots.forEach(ballot => {
        const highestPreference = ballot.find(candidateId => remainingCandidates.some(c => c.id === candidateId));
        if (highestPreference) {
          candidateVoteCounts[highestPreference]++;
        }
      });
  
      const lowestCandidate = getLowestCandidate(candidateVoteCounts);
      if (!lowestCandidate) {
        break; // No more elimination needed
      }
  
      electedCandidates.push({
        id: lowestCandidate.id,
        name: lowestCandidate.name,
        round: round,
      });
  
      remainingCandidates = remainingCandidates.filter(candidate => candidate.id !== lowestCandidate.id);
      round++;
    }
  
    // The remaining candidate is declared the winner
    if (remainingCandidates.length === 1) {
      electedCandidates.push({
        id: remainingCandidates[0].id,
        name: remainingCandidates[0].name,
        round: round,
      });
    }
  
    return {
      electedCandidates: electedCandidates,
      remainingCandidates: remainingCandidates,
      round: round,
    };
  }

  function getLowestCandidate(candidateVoteCounts) {
    let lowestVotes = Number.MAX_SAFE_INTEGER;
    let lowestCandidate = null;
  
    for (const candidateId in candidateVoteCounts) {
      if (candidateVoteCounts[candidateId] < lowestVotes) {
        lowestVotes = candidateVoteCounts[candidateId];
        lowestCandidate = candidates.find(candidate => candidate.id === candidateId);
      }
    }
  
    return lowestCandidate;
  }

  const candidates = [
    { id: 'candidate1', name: 'Candidate 1' },
    { id: 'candidate2', name: 'Candidate 2' },
    { id: 'candidate3', name: 'Candidate 3' },
  ];
  
  const voteBallots = [
    ['candidate1', 'candidate2', 'candidate3'],
    ['candidate2', 'candidate1', 'candidate3'],
    ['candidate3', 'candidate2', 'candidate1'],
    ['candidate1', 'candidate3', 'candidate2'],
    ['candidate2', 'candidate3', 'candidate1'],
    ['candidate3', 'candidate1', 'candidate2'],
  ];
console.log(countSTVVotes(candidates, voteBallots));