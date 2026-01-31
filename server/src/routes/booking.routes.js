// server/src/routes/booking.routes.js
// ES Module version

import express from 'express';
import {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
  updateBookingStatus,
  getAllBookings,
} from '../controllers/booking.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { admin } from '../middlewares/role.middleware.js';

const router = express.Router();

// Protected routes (require authentication)
router.use(protect);

// User routes
router.post('/', createBooking);
router.get('/user', getUserBookings);
router.get('/:id', getBookingById);
router.patch('/:id/cancel', cancelBooking);

// Admin routes
router.get('/', admin, getAllBookings);
router.patch('/:id/status', admin, updateBookingStatus);

export default router;