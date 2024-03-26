export function getFinalistsCount(majorCompetitions, name) {
  const competitionIndex = majorCompetitions.findIndex(
    (competition) => competition.name === name
  );
  const count =
    majorCompetitions[competitionIndex + 1]?.finalists ||
    majorCompetitions[competitionIndex]?.finalists;

  return count;
}
