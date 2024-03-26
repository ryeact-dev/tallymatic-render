import axios from 'axios';

// QUERIES

// export async function getAllCandidatesByEvent({ eventId: id }) {
//   const response = await axios.get(`/api/scoresheet/event/${id}`);
//   return response.data;
// }

export async function getCompetitionScoresheetByJudge({ compId, userId }) {
  const response = await axios.post(
    `/api/scoresheet/judge?compId=${compId}&userId=${userId}`
  );
  return response.data;
}
export async function getCompetitionScoresheetByCompetition({
  compId,
  eventId,
}) {
  const response = await axios.post(
    `/api/scoresheet/competition?compId=${compId}&eventId=${eventId}`
  );
  return response.data;
}

// MUTATIONS

export async function addCandidateScore({ scoresheetObj, isNew }) {
  let response;

  if (isNew) {
    response = await axios.post('/api/scoresheet/add', scoresheetObj);
  } else {
    response = await axios.put('/api/scoresheet/update', scoresheetObj);
  }

  return response.data;
}

export async function submitFinalScores({ competitionObj }) {
  const response = await axios.post(
    `/api/scoresheet/submit-scores`,
    competitionObj
  );
  return response.data;
}

export async function deleteCandidate({ id }) {
  const response = await axios.delete(`/api/scoresheet/${id}`);
  return response.data;
}
