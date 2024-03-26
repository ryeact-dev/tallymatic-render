export const extractJudges = (scoresheets) => {
  const judges = [];
  scoresheets.forEach((item) =>
    item.judges.map((item) => {
      if (!judges.some((judge) => judge.id === item.id)) {
        judges.push({
          id: item.id,
          name: item.fullName,
          number: item.judgeNumber,
        });
        judges.sort((a, b) => a.number - b.number);
      }
    })
  );

  return judges;
};

export const extractCandidatesWithRanks = (scoresheets) => {
  const candidates = [];

  // Filter all candidates to prevent duplication
  scoresheets.forEach((item) => {
    item.scoresheet.map((sheetItem) => {
      const foundIndex = candidates.findIndex(
        (candidate) => candidate.name === sheetItem.fullName
      );

      if (foundIndex < 0) {
        candidates.push({
          name: sheetItem.fullName,
          number: sheetItem.number,
          photo: sheetItem.photo,
          course: sheetItem.course,
          totalRank: 0,
        });
      }
    });
  });

  // Sort and get all the ranks and total the ranks for each candidate in each competition
  candidates.sort((a, b) => a.number - b.number);
  const candidateWithRanks = candidates.map((candidate) => {
    const ranks = scoresheets.map((item) =>
      item.scoresheet.filter((item) => item.fullName === candidate.name)
    );

    const totalRanks = ranks.map((rank) =>
      rank.reduce((total, curr) => total + curr.rank, 0)
    );

    return {
      ...candidate,
      ranks: totalRanks,
    };
  });

  // Copy candidateWithRanks and replace the totalRanks with final total ranks and scores
  const candidatesWithCompetitionRanks = [...candidateWithRanks];
  const result = scoresheets.map((item, index) => {
    candidatesWithCompetitionRanks.sort(
      (a, b) => a.ranks[index] - b.ranks[index]
    );

    // Update the rank for each candidate based on their total scores
    let lastTotal = null;
    let rank = 0;
    let lastRank = 0;

    candidatesWithCompetitionRanks.forEach((candidate) => {
      // Checks if there are tied scores of candidates on each judges
      if (Number(candidate.ranks[index]) !== Number(lastTotal)) {
        lastTotal = candidate.ranks[index];
        lastRank = rank + 1;
      }
      rank++;
      candidate.ranks[index] = lastRank;
      // Total of all ranks for all competitions for each candidate
      candidate.totalRank = candidate.ranks.reduce(
        (total, curr) => total + curr,
        0
      );
    });

    return candidateWithRanks;
  });

  // Add Final Score base on the total ranks of all competitions for each candidate
  const finalScores = result[0].sort((a, b) => a.totalRank - b.totalRank);
  let lastTotal = null;
  let rank = 0;
  let lastRank = 0;

  finalScores.forEach((candidate) => {
    // Checks if there are tied scores of candidates on each judges
    if (Number(candidate.rank) !== Number(lastTotal)) {
      lastTotal = candidate.rank;
      lastRank = rank + 1;
    }
    rank++;
    candidate.rank = lastRank;
  });

  finalScores.sort((a, b) => a.number - b.number);

  return finalScores;
};

export const competitionScoresAndRanks = (scores, candidateNames) => {
  let ranks = candidateNames.map((candidate) => {
    let totalRank = 0;
    scores.forEach((score) => {
      const filteredScores = score.candidateScores.filter(
        (item) => item.name === candidate.name
      );

      if (filteredScores.length > 0) {
        totalRank += filteredScores[0].rank;
      }
    });

    return {
      name: candidate.name,
      number: candidate.number,
      photo: candidate.photo,
      course: candidate.course,
      totalRank,
    };
  });

  // Sort by totalRank
  ranks.sort((a, b) => a.totalRank - b.totalRank);

  // Update the rank for each candidate based on their total scores
  let lastTotal = null;
  let rank = 0;
  let lastRank = 0;

  ranks.forEach((candidate) => {
    // Checks if there are tied scores of candidates on each judges
    if (Number(candidate.totalRank) !== Number(lastTotal)) {
      lastTotal = candidate.totalRank;
      lastRank = rank + 1;
    }
    rank++;
    candidate.rank = lastRank;
  });

  ranks.sort((a, b) => a.number - b.number);

  return ranks;
};
