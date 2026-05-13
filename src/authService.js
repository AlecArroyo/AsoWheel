import api from './api';

export const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', data.token);
  localStorage.setItem('email', email);
  return data;
};

export const register = async (email, password) => {
  const { data } = await api.post('/auth/register', { email, password });
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
};

export const getUserEmail = () => {
  return localStorage.getItem('email') || '';
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};