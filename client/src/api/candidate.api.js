import axios from 'axios';

// QUERIES

export async function getAllCandidatesByEvent({ eventId: id }) {
  const response = await axios.get(`/api/candidate/event/${id}`);
  return response.data;
}

export async function getAllCandidatesByEventWithMajorCompetitions({
  eventId: id,
}) {
  const response = await axios.get(
    `/api/candidate/event/major-competitions/${id}`
  );
  return response.data;
}

// MUTATIONS

export async function addCandidate({ candidateObj, isNew }) {
  let response;

  if (isNew) {
    response = await axios.post('/api/candidate/add', candidateObj);
  } else {
    response = await axios.put('/api/candidate/update', candidateObj);
  }

  return response.data;
}

export async function deleteCandidate({ id }) {
  const response = await axios.delete(`/api/candidate/${id}`);
  return response.data;
}
