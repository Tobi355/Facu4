const { Router } = require('express');
const controller = require('../controllers/class.controller');
const authenticate = require('../middlewares/auth.middleware');
const authorizeAdmin = require('../middlewares/admin.middleware');
const validate = require('../middlewares/validate.middleware');
const { createClassValidation, updateClassValidation } = require('../validations/class.validation');

const router = Router();

// Rutas específicas primero (antes de :id)
router.get('/admin', authenticate, authorizeAdmin, controller.getAllAdmin);

// Rutas generales después
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', authenticate, authorizeAdmin, createClassValidation, validate, controller.create);
router.put('/:id', authenticate, authorizeAdmin, updateClassValidation, validate, controller.update);
router.delete('/:id', authenticate, authorizeAdmin, controller.remove);

module.exports = router;
