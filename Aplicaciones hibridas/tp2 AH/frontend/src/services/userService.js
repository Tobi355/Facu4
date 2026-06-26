import API from '../api/axios';

export const getUsers = async () => {
  const { data } = await API.get('/users');
  return data.users;
};

export const getUserById = async (id) => {
  const { data } = await API.get(`/users/${id}`);
  return data.user;
};

export const updateUser = async (id, updates) => {
  const { data } = await API.put(`/users/${id}`, updates);
  return data.user;
};

export const deleteUser = async (id) => {
  await API.delete(`/users/${id}`);
};
