import express from 'express'
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword
} from '../controllers/auth.controller.js'
import { protect } from '../middlewares/auth.middleware.js'
import { registerValidator, loginValidator } from '../utils/validators.js'

const router = express.Router()

// Public routes
router.post('/register', registerValidator, register)
router.post('/login', loginValidator, login)

// Protected routes
router.get('/me', protect, getMe)
router.put('/profile', protect, updateProfile)
router.put('/change-password', protect, changePassword)

export default router