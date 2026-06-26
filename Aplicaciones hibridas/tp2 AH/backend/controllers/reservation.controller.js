const reservationService = require('../services/reservation.service');

const getMyReservations = async (req, res, next) => {
  try {
    const reservations = await reservationService.getUserReservations(req.user._id);
    res.json({ success: true, reservations });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const reservations = await reservationService.getAllReservations();
    res.json({ success: true, reservations });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { classId, date } = req.body;
    const reservation = await reservationService.create(req.user._id, classId, date);
    res.status(201).json({ success: true, reservation });
  } catch (error) {
    next(error);
  }
};

const cancel = async (req, res, next) => {
  try {
    const reservation = await reservationService.cancel(req.params.id, req.user._id);
    res.json({ success: true, reservation });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const userId = isAdmin ? null : req.user._id;
    const reservation = await reservationService.update(req.params.id, userId, req.body);
    res.json({ success: true, reservation });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyReservations, getAll, create, cancel, update };
