function candidateReranking(candidatesTotalScores) {
  candidatesTotalScores.sort((a, b) => b.total - a.total);

  // Update the rank for each candidate based on their total scores
  let lastTotal = null;
  let rank = 0;
  let lastRank = 0;

  candidatesTotalScores.forEach((candidate) => {
    // Checks if there are tied scores of candidates on each judges
    if (Number(candidate.total) !== Number(lastTotal)) {
      lastTotal = candidate.total;
      lastRank = rank + 1;
    }
    rank++;
    candidate.rank = lastRank;
  });

  return candidatesTotalScores;
}

exports.candidateReranking = candidateReranking;
