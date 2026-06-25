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

  const Reservation = require('../models/Reservation');
  await Reservation.updateMany(
    { class: id, status: 'confirmed' },
    { status: 'cancelled' },
  );

  return cls;
};

module.exports = { getAll, getById, create, update, remove };
