import api from './api.js';

export async function getWorkouts(filters = {}) {
  const { data } = await api.get('/workouts', { params: filters });
  return data.data;
}

export async function getWorkout(id) {
  const { data } = await api.get(`/workouts/${id}`);
  return data.data;
}

export async function createWorkout(payload) {
  const { data } = await api.post('/workouts', payload);
  return data.data;
}

export async function updateWorkout(id, payload) {
  const { data } = await api.patch(`/workouts/${id}`, payload);
  return data.data;
}

export async function deleteWorkout(id) {
  await api.delete(`/workouts/${id}`);
}
