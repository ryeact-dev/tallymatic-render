import axios from 'axios';

// QUERIES
export async function getCurrentUser() {
  const response = await axios.get(`/api/user/current-user`);
  return response.data;
}

export async function getJudgeStatus({ userId: id }) {
  const response = await axios.get(`/api/user/judge-status/${id}`);
  return response.data;
}

export async function getAdminAndManagerUsers() {
  const response = await axios.get('/api/user/admin-managers');
  return response.data;
}

export async function getJudgesAndTabulators() {
  const response = await axios.get('/api/user/judges-tabulators');
  return response.data;
}

// MUTATIONS

export async function loginUser({ loginData }) {
  const response = await axios.post('/api/user/login', loginData);
  return response.data;
}

export async function logoutUser() {
  const response = await axios.post('/api/user/logout');
  return response.data;
}

export async function addUser({ userData, isNew }) {
  let response;

  if (isNew) {
    response = await axios.post('/api/user/add', userData);
  } else {
    response = await axios.put('/api/user/update', userData);
  }

  return response.data;
}

export async function deleteUser({ id }) {
  const response = await axios.delete(`/api/user/delete/${id}`);
  return response.data;
}

export async function resetPassword({ userData }) {
  const response = await axios.put(`/api/user/reset-password`, userData);
  return response.data;
}
