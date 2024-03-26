export const aggregatedScoresheetByJudges = (scoresheet, judges) => {
  const result = judges.map((judge) => {
    const filteredScoresheetByJudgeId = scoresheet.filter(
      (score) => score.userId === judge.id
    );

    const candidateScores = [];
    filteredScoresheetByJudgeId.forEach((item) => {
      if (
        !candidateScores.some(
          (candidate) => candidate.name === item.candidate.fullName
        )
      ) {
        const score = filteredScoresheetByJudgeId.find(
          (score) => score.candidate.fullName === item.candidate.fullName
        );
        candidateScores.push({
          name: item.candidate.fullName,
          number: item.candidate.number,
          total: score.total,
          rank: score.rank,
          scores: score.scores,
          judge: judge.judgeNumber,
        });
        candidateScores.sort((a, b) => a.number - b.number);
      }
    });

    return { candidateScores };
  });

  const candidates = [];
  scoresheet.forEach((item) => {
    if (
      !candidates.some(
        (candidate) => candidate.name === item.candidate.fullName
      )
    ) {
      candidates.push({
        name: item.candidate.fullName,
        number: item.candidate.number,
        photo: item.candidate.photo,
        course: item.candidate.course,
      });
      candidates.sort((a, b) => a.number - b.number);
    }
  });

  // Sorting that starts from 1 not 0
  const judgeScores = result.sort((a, b) => {
    if (a.candidateScores.length === 0) return 0; // place 'a' at the end if total_rank is 0
    if (b.candidateScores.length === 0) return 0; // place 'b' at the end if total_rank is 0
    return a.candidateScores[0].judge - b.candidateScores[0].judge; // normal comparison for non-zero total_ranks
  });

  return { candidates, judgeScores };
};
