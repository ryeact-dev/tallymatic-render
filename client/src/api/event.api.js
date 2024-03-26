import { ToastNotification } from '@/common/toast/Toast';
import axios from 'axios';

// Queries

export async function getAllEvents() {
  const response = await axios.get('/api/event');
  return response.data;
}

// Mutations

// export async function loginUser({ loginData }) {
//   const response = await axios.post('/api/user/login-user', loginData);

//   if (response.statusText !== 'OK') {
//     ToastNotification('error', 'Login error check connection.');
//   }

//   return response.data;
// }

// export async function addUser({ userData }) {
//   const response = await axios.post('/api/user/add-user', userData);

//   if (response.statusText !== 'OK') {
//     ToastNotification('error', 'Add user error check connection.');
//   }

//   return response.data;
// }
