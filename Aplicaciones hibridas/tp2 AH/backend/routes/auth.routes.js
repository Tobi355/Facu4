const { Router } = require('express');
const controller = require('../controllers/auth.controller');
const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { registerValidation, loginValidation, updateProfileValidation } = require('../validations/auth.validation');

const router = Router();

router.post('/register', registerValidation, validate, controller.register);
router.post('/login', loginValidation, validate, controller.login);
router.get('/profile', authenticate, controller.getProfile);
router.put('/profile', authenticate, updateProfileValidation, validate, controller.updateProfile);

module.exports = router;
