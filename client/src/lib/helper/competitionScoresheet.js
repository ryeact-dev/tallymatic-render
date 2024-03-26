export const competitionScoresheet = (candidateId, competition) => {
  if (!competition) return { scoresheet: null, totalScore: 0 };

  const scoresheet = competition?.scoresheet?.find(
    (candidate) => candidate.candidateId === candidateId
  );

  const totalScore = scoresheet?.total || 0;

  return { scoresheet, totalScore };
};
