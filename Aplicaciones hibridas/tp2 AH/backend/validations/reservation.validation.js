const { body } = require('express-validator');

const createReservationValidation = [
  body('classId')
    .notEmpty().withMessage('Class ID is required')
    .isMongoId().withMessage('Invalid class ID'),
  body('date')
    .notEmpty().withMessage('Date is required')
    .isISO8601().withMessage('Invalid date format'),
];

const updateReservationValidation = [
  body('date')
    .optional()
    .isISO8601().withMessage('Invalid date format'),
  body('status')
    .optional()
    .isIn(['confirmed', 'cancelled']).withMessage('Status must be confirmed or cancelled'),
];

module.exports = { createReservationValidation, updateReservationValidation };
