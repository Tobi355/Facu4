const { Router } = require('express');
const controller = require('../controllers/reservation.controller');
const authenticate = require('../middlewares/auth.middleware');
const authorizeAdmin = require('../middlewares/admin.middleware');
const validate = require('../middlewares/validate.middleware');
const { createReservationValidation, updateReservationValidation } = require('../validations/reservation.validation');

const router = Router();

router.use(authenticate);

router.get('/admin/all', authorizeAdmin, controller.getAll);
router.get('/', controller.getMyReservations);
router.post('/', createReservationValidation, validate, controller.create);
router.put('/:id', updateReservationValidation, validate, controller.update);
router.delete('/:id', controller.cancel);

module.exports = router;
