const classService = require('../services/class.service');

const getAll = async (req, res, next) => {
  try {
    const classes = await classService.getAll({ isActive: true });
    res.json({ success: true, classes });
  } catch (error) {
    next(error);
  }
};

const getAllAdmin = async (req, res, next) => {
  try {
    const classes = await classService.getAll();
    res.json({ success: true, classes });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const cls = await classService.getById(req.params.id);
    res.json({ success: true, class: cls });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const cls = await classService.create(req.body);
    res.status(201).json({ success: true, class: cls });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const cls = await classService.update(req.params.id, req.body);
    res.json({ success: true, class: cls });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await classService.remove(req.params.id);
    res.json({ success: true, message: 'Class deleted.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getAllAdmin, getById, create, update, remove };
