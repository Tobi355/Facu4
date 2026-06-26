const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');
const Class = require('../models/Class');
const AppError = require('../utils/error');

const getUserReservations = async (userId) => {
  return Reservation.find({ user: userId })
    .populate('class')
    .sort({ date: -1 });
};

const getAllReservations = async () => {
  return Reservation.find()
    .populate('user', 'name email')
    .populate('class')
    .sort({ createdAt: -1 });
};

const create = async (userId, classId, date) => {
  const cls = await Class.findById(classId);
  if (!cls) throw new AppError('Class not found.', 404);
  if (!cls.isActive) throw new AppError('Class is no longer active.', 400);

  if (cls.enrolledCount >= cls.capacity) {
    throw new AppError('Class is full.', 400);
  }

  const existing = await Reservation.findOne({
    user: userId,
    class: classId,
    date: new Date(date),
    status: 'confirmed',
  });
  if (existing) {
    throw new AppError('You already have a reservation for this class on this date.', 409);
  }

  const reservation = await Reservation.create({
    user: userId,
    class: classId,
    date: new Date(date),
  });

  return reservation.populate('class');
};

const cancel = async (reservationId, userId) => {
  const reservation = await Reservation.findOne({
    _id: reservationId,
    user: userId,
    status: 'confirmed',
  });
  if (!reservation) throw new AppError('Reservation not found or already cancelled.', 404);

  reservation.status = 'cancelled';
  await reservation.save();

  return reservation;
};

const update = async (reservationId, userId, updates) => {
  let query = { _id: reservationId };
  if (userId) {
    query.user = userId;
  }

  const reservation = await Reservation.findOne(query);
  if (!reservation) throw new AppError('Reservation not found.', 404);

  if (updates.date) {
    const cls = await Class.findById(reservation.class);
    if (!cls) throw new AppError('Class not found.', 404);

    const existing = await Reservation.findOne({
      _id: { $ne: reservationId },
      user: reservation.user,
      class: reservation.class,
      date: new Date(updates.date),
      status: 'confirmed',
    });
    if (existing) {
      throw new AppError('You already have a reservation for this class on this date.', 409);
    }
    reservation.date = new Date(updates.date);
  }

  if (updates.status && updates.status === 'cancelled' && reservation.status === 'confirmed') {
    reservation.status = 'cancelled';
    const ClassModel = mongoose.model('Class');
    await ClassModel.findByIdAndUpdate(reservation.class, { $inc: { enrolledCount: -1 } });
  } else if (updates.status) {
    reservation.status = updates.status;
  }

  await reservation.save();
  return (await reservation.populate('class')).populate('user', 'name email');
};

module.exports = { getUserReservations, getAllReservations, create, cancel, update };
