import express from 'express'
import {
  getDashboardStats,
  getAllUsers,
  createFlight,
  updateFlight,
  deleteFlight,
  createHotel,
  createTour
} from '../controllers/admin.controller.js'
import { protect } from '../middlewares/auth.middleware.js'
import { authorize } from '../middlewares/role.middleware.js'
import { idValidator } from '../utils/validators.js'

const router = express.Router()

// All admin routes require authentication and admin role
router.use(protect, authorize('admin'))

// Dashboard
router.get('/stats', getDashboardStats)

// Users
router.get('/users', getAllUsers)

// Flights
router.post('/flights', createFlight)
router.put('/flights/:id', idValidator, updateFlight)
router.delete('/flights/:id', idValidator, deleteFlight)

// Hotels
router.post('/hotels', createHotel)

// Tours
router.post('/tours', createTour)

export default router