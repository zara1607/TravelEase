import { body, param, query, validationResult } from 'express-validator'

/**
 * Middleware to handle validation errors
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    })
  }
  next()
}

// Auth validators
export const registerValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validate
]

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required'),
  validate
]

// Booking validators
export const createBookingValidator = [
  body('type')
    .notEmpty().withMessage('Booking type is required')
    .isIn(['flight', 'hotel', 'package']).withMessage('Invalid booking type'),
  body('itemId')
    .notEmpty().withMessage('Item ID is required')
    .isMongoId().withMessage('Invalid item ID'),
  body('passengerDetails.name')
    .trim()
    .notEmpty().withMessage('Passenger name is required'),
  body('passengerDetails.email')
    .trim()
    .notEmpty().withMessage('Passenger email is required')
    .isEmail().withMessage('Invalid email'),
  body('passengerDetails.phone')
    .trim()
    .notEmpty().withMessage('Phone number is required'),
  body('totalPrice')
    .notEmpty().withMessage('Total price is required')
    .isFloat({ min: 0 }).withMessage('Total price must be a positive number'),
  validate
]

// Search validators
export const searchValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  validate
]

// ID validator
export const idValidator = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
  validate
]

export default {
  validate,
  registerValidator,
  loginValidator,
  createBookingValidator,
  searchValidator,
  idValidator
}