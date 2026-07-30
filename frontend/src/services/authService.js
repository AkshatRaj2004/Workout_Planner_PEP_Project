import api from './api.js';

export async function signup(payload) {
  const { data } = await api.post('/user/signup', payload);
  return data;
}

export async function login(payload) {
  const { data } = await api.post('/user/login', payload);
  return data;
}
