const { Router } = require('express');
const controller = require('../controllers/user.controller');
const authenticate = require('../middlewares/auth.middleware');
const authorizeAdmin = require('../middlewares/admin.middleware');

const router = Router();

router.use(authenticate, authorizeAdmin);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
