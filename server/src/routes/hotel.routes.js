import express from 'express'
import {
  searchHotels,
  getHotelById,
  getAllHotels,
  getFeaturedHotels
} from '../controllers/hotel.controller.js'
import { searchValidator, idValidator } from '../utils/validators.js'

const router = express.Router()

router.get('/search', searchValidator, searchHotels)
router.get('/featured', getFeaturedHotels)
router.get('/', getAllHotels)
router.get('/:id', idValidator, getHotelById)

export default router