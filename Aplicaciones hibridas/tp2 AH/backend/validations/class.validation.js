const { body } = require('express-validator');

const createClassValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Class name is required')
    .isLength({ max: 80 }).withMessage('Name must not exceed 80 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 500 }).withMessage('Description must not exceed 500 characters'),
  body('instructor')
    .trim()
    .notEmpty().withMessage('Instructor is required'),
  body('schedule')
    .isArray({ min: 1 }).withMessage('At least one schedule entry is required'),
  body('schedule.*.day')
    .isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
    .withMessage('Invalid day'),
  body('schedule.*.startTime')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Invalid start time (HH:mm)'),
  body('schedule.*.endTime')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Invalid end time (HH:mm)'),
  body('duration')
    .isInt({ min: 15, max: 180 }).withMessage('Duration must be 15-180 minutes'),
  body('capacity')
    .isInt({ min: 1, max: 50 }).withMessage('Capacity must be 1-50'),
  body('price')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('image')
    .optional({ values: 'falsy' })
    .trim(),
];

const updateClassValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ max: 80 }).withMessage('Name must not exceed 80 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description must not exceed 500 characters'),
  body('instructor')
    .optional()
    .trim(),
  body('schedule')
    .optional()
    .isArray({ min: 1 }).withMessage('At least one schedule entry is required'),
  body('schedule.*.day')
    .optional()
    .isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
    .withMessage('Invalid day'),
  body('schedule.*.startTime')
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Invalid start time (HH:mm)'),
  body('schedule.*.endTime')
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Invalid end time (HH:mm)'),
  body('duration')
    .optional()
    .isInt({ min: 15, max: 180 }).withMessage('Duration must be 15-180 minutes'),
  body('capacity')
    .optional()
    .isInt({ min: 1, max: 50 }).withMessage('Capacity must be 1-50'),
  body('price')
    .optional()
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
  body('image')
    .optional({ values: 'falsy' })
    .trim(),
];

module.exports = { createClassValidation, updateClassValidation };
