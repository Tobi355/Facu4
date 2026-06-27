import API from '../api/axios';

export const getMyReservations = async () => {
  const { data } = await API.get('/reservations');
  return data.reservations;
};

export const getAllReservations = async () => {
  const { data } = await API.get('/reservations/admin/all');
  return data.reservations;
};

export const createReservation = async (classId, date) => {
  const { data } = await API.post('/reservations', { classId, date });
  return data.reservation;
};

export const updateReservation = async (id, updates) => {
  const { data } = await API.put(`/reservations/${id}`, updates);
  return data.reservation;
};

export const deleteReservation = async (id) => {
  await API.delete(`/reservations/${id}`);
};

export const cancelReservation = deleteReservation;
