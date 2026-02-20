// server/src/routes/auth.routes.js
import express from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword
} from '../controllers/auth.controller.js';

import { protect } from '../middlewares/auth.middleware.js';

// Optional validators (if you have them implemented in utils/validators.js)
import { registerValidator, loginValidator } from '../utils/validators.js';

const router = express.Router();

// ─────────────────────────────────────────────────────────────
// Public routes (no authentication required)
// ─────────────────────────────────────────────────────────────
router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);

// ─────────────────────────────────────────────────────────────
// Protected routes (require valid JWT via protect middleware)
// ─────────────────────────────────────────────────────────────
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

// Alternative style with .route() chaining (optional - you can use either)
// router
//   .route('/register')
//   .post(registerValidator, register);

// router
//   .route('/login')
//   .post(loginValidator, login);

// router
//   .route('/me')
//   .get(protect, getMe);

// router
//   .route('/profile')
//   .put(protect, updateProfile);

// router
//   .route('/change-password')
//   .put(protect, changePassword);

export default router;