import Flight from '../models/Flight.js'

/**
 * @desc    Search flights
 * @route   GET /api/flights/search
 * @access  Public
 */
export const searchFlights = async (req, res) => {
  try {
    const {
      from,
      to,
      checkIn,
      guests,
      class: flightClass,
      stops,
      page = 1,
      limit = 20
    } = req.query

    // Build query
    const query = { status: 'active' }

    if (from) {
      query['departure.city'] = { $regex: from, $options: 'i' }
    }

    if (to) {
      query['arrival.city'] = { $regex: to, $options: 'i' }
    }

    if (checkIn) {
      const searchDate = new Date(checkIn)
      const nextDay = new Date(searchDate)
      nextDay.setDate(nextDay.getDate() + 1)
      
      query['departure.time'] = {
        $gte: searchDate,
        $lt: nextDay
      }
    }

    if (flightClass) {
      query.class = flightClass
    }

    if (stops !== undefined) {
      query.stops = parseInt(stops)
    }

    if (guests) {
      query.availableSeats = { $gte: parseInt(guests) }
    }

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    const flights = await Flight.find(query)
      .sort({ 'departure.time': 1, price: 1 })
      .skip(skip)
      .limit(parseInt(limit))

    const total = await Flight.countDocuments(query)

    res.json({
      success: true,
      count: flights.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: flights
    })

  } catch (error) {
    console.error('Search flights error:', error)
    res.status(500).json({
      success: false,
      message: 'Error searching flights',
      error: error.message
    })
  }
}

/**
 * @desc    Get flight by ID
 * @route   GET /api/flights/:id
 * @access  Public
 */
export const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id)

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: 'Flight not found'
      })
    }

    res.json({
      success: true,
      data: flight
    })

  } catch (error) {
    console.error('Get flight error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching flight',
      error: error.message
    })
  }
}

/**
 * @desc    Get all flights
 * @route   GET /api/flights
 * @access  Public
 */
export const getAllFlights = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const flights = await Flight.find({ status: 'active' })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))

    const total = await Flight.countDocuments({ status: 'active' })

    res.json({
      success: true,
      count: flights.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: flights
    })

  } catch (error) {
    console.error('Get all flights error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching flights',
      error: error.message
    })
  }
}

export default {
  searchFlights,
  getFlightById,
  getAllFlights
}