const Class = require('../models/Class');
const AppError = require('../utils/error');

const getAll = async (filters = {}) => {
  const query = {};
  if (filters.isActive !== undefined) query.isActive = filters.isActive;
  return Class.find(query).sort({ createdAt: -1 });
};

const getById = async (id) => {
  const cls = await Class.findById(id);
  if (!cls) throw new AppError('Class not found.', 404);
  return cls;
};

const create = async (data) => {
  return Class.create(data);
};

const update = async (id, data) => {
  const cls = await Class.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!cls) throw new AppError('Class not found.', 404);
  return cls;
};

const remove = async (id) => {
  const cls = await Class.findByIdAndDelete(id);
  if (!cls) throw new AppError('Class not found.', 404);

  // Cancelar todas las reservas confirmadas y decrementar count
  const Reservation = require('../models/Reservation');
  const reservations = await Reservation.find({
    class: id,
    status: 'confirmed',
  });

  // Usar updateOne para cada reserva para que los pre-hooks se ejecuten
  for (const reservation of reservations) {
    reservation.status = 'cancelled';
    await reservation.save(); // Esto dispara el pre-hook
  }

  return cls;
};

module.exports = { getAll, getById, create, update, remove };
