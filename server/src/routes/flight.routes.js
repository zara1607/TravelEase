import express from 'express'
import {
  searchFlights,
  getFlightById,
  getAllFlights
} from '../controllers/flight.controller.js'
import { searchValidator, idValidator } from '../utils/validators.js'

const router = express.Router()

router.get('/search', searchValidator, searchFlights)
router.get('/', getAllFlights)
router.get('/:id', idValidator, getFlightById)

export default router