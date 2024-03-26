import axios from 'axios';

// QUERIES

export async function getAllCompetitionsByEvent({ eventId: id }) {
  const response = await axios.get(`/api/competition/event/${id}`);
  return response.data;
}

export async function getActiveCompetition({ eventId }) {
  const response = await axios.get(`/api/competition/active/${eventId}`);
  return response.data;
}

export async function getMinorCompetitions({ eventId }) {
  const response = await axios.get(
    `/api/competition/minor-competitions?eventId=${eventId}`
  );
  return response.data;
}

export async function getMajorCompetitions({ eventId }) {
  const response = await axios.get(
    `/api/competition/major-competitions?eventId=${eventId}`
  );
  return response.data;
}

export async function getSingleCompetition({ id, userId }) {
  const response = await axios.post(`/api/competition/single`, { id, userId });
  return response.data;
}

// MUTATIONS

export async function addCompetition({ newCompetitionObj, isNew }) {
  let response;

  if (isNew) {
    response = await axios.post('/api/competition/add', newCompetitionObj);
  } else {
    response = await axios.put('/api/competition/update', newCompetitionObj);
  }

  return response.data;
}

export async function compStatusUpdate({ competitionObj }) {
  const response = await axios.put('/api/competition/status', competitionObj);
  return response.data;
}

export async function addCompetitionFinalist({ competitionObj }) {
  const response = await axios.put(
    '/api/competition/add-finalist',
    competitionObj
  );
  return response.data;
}

export async function removeCompetitionFinalist({ competitionObj }) {
  const response = await axios.put(
    '/api/competition/remove-finalist',
    competitionObj
  );
  return response.data;
}

export async function compDelete({ id }) {
  const response = await axios.delete(`/api/competition/${id}`);
  return response.data;
}
