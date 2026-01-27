import express from 'express'
import {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
  getAllBookings
} from '../controllers/booking.controller.js'
import { protect } from '../middlewares/auth.middleware.js'
import { authorize } from '../middlewares/role.middleware.js'
import { createBookingValidator, idValidator } from '../utils/validators.js'

const router = express.Router()

// All routes are protected
router.use(protect)

router.post('/', createBookingValidator, createBooking)
router.get('/user', getUserBookings)
router.get('/:id', idValidator, getBookingById)
router.delete('/:id', idValidator, cancelBooking)

// Admin only
router.get('/', authorize('admin'), getAllBookings)

export default router