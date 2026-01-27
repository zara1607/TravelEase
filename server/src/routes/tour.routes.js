import express from 'express'
import {
  searchTours,
  getTourById,
  getAllTours,
  getFeaturedTours
} from '../controllers/tour.controller.js'
import { searchValidator, idValidator } from '../utils/validators.js'

const router = express.Router()

router.get('/search', searchValidator, searchTours)
router.get('/featured', getFeaturedTours)
router.get('/', getAllTours)
router.get('/:id', idValidator, getTourById)

export default router