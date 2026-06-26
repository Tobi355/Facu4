import API from '../api/axios';

export const getAllClasses = async () => {
  const { data } = await API.get('/classes');
  return data.classes;
};

export const getAdminClasses = async () => {
  const { data } = await API.get('/classes/admin');
  return data.classes;
};

export const getClassById = async (id) => {
  const { data } = await API.get(`/classes/${id}`);
  return data.class;
};

export const createClass = async (classData) => {
  const { data } = await API.post('/classes', classData);
  return data.class;
};

export const updateClass = async (id, classData) => {
  const { data } = await API.put(`/classes/${id}`, classData);
  return data.class;
};

export const deleteClass = async (id) => {
  await API.delete(`/classes/${id}`);
};
