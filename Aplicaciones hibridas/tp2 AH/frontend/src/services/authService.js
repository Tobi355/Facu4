import API from '../api/axios';

export const login = async (email, password) => {
  const { data } = await API.post('/auth/login', { email, password });
  return data;
};

export const register = async (name, email, password, phone) => {
  const { data } = await API.post('/auth/register', { name, email, password, phone });
  return data;
};

export const getProfile = async () => {
  const { data } = await API.get('/auth/profile');
  return data;
};

export const updateProfile = async (updates) => {
  const { data } = await API.put('/auth/profile', updates);
  return data;
};
