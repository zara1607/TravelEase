import Hotel from '../models/Hotel.js'

/**
 * @desc    Search hotels
 * @route   GET /api/hotels/search
 * @access  Public
 */
export const searchHotels = async (req, res) => {
  try {
    const {
      destination,
      checkIn,
      checkOut,
      guests,
      minPrice,
      maxPrice,
      rating,
      page = 1,
      limit = 20
    } = req.query

    // Build query
    const query = { status: 'active' }

    if (destination) {
      query.$or = [
        { city: { $regex: destination, $options: 'i' } },
        { location: { $regex: destination, $options: 'i' } },
        { name: { $regex: destination, $options: 'i' } }
      ]
    }

    if (minPrice || maxPrice) {
      query.pricePerNight = {}
      if (minPrice) query.pricePerNight.$gte = parseFloat(minPrice)
      if (maxPrice) query.pricePerNight.$lte = parseFloat(maxPrice)
    }

    if (rating) {
      query.rating = { $gte: parseFloat(rating) }
    }

    if (guests) {
      query['rooms.available'] = { $gte: parseInt(guests) }
    }

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    const hotels = await Hotel.find(query)
      .sort({ featured: -1, rating: -1, pricePerNight: 1 })
      .skip(skip)
      .limit(parseInt(limit))

    const total = await Hotel.countDocuments(query)

    res.json({
      success: true,
      count: hotels.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: hotels
    })

  } catch (error) {
    console.error('Search hotels error:', error)
    res.status(500).json({
      success: false,
      message: 'Error searching hotels',
      error: error.message
    })
  }
}

/**
 * @desc    Get hotel by ID
 * @route   GET /api/hotels/:id
 * @access  Public
 */
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id)

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      })
    }

    res.json({
      success: true,
      data: hotel
    })

  } catch (error) {
    console.error('Get hotel error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching hotel',
      error: error.message
    })
  }
}

/**
 * @desc    Get all hotels
 * @route   GET /api/hotels
 * @access  Public
 */
export const getAllHotels = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const hotels = await Hotel.find({ status: 'active' })
      .sort({ featured: -1, rating: -1 })
      .skip(skip)
      .limit(parseInt(limit))

    const total = await Hotel.countDocuments({ status: 'active' })

    res.json({
      success: true,
      count: hotels.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: hotels
    })

  } catch (error) {
    console.error('Get all hotels error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching hotels',
      error: error.message
    })
  }
}

/**
 * @desc    Get featured hotels
 * @route   GET /api/hotels/featured
 * @access  Public
 */
export const getFeaturedHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({ status: 'active', featured: true })
      .sort({ rating: -1 })
      .limit(6)

    res.json({
      success: true,
      count: hotels.length,
      data: hotels
    })

  } catch (error) {
    console.error('Get featured hotels error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching featured hotels',
      error: error.message
    })
  }
}

export default {
  searchHotels,
  getHotelById,
  getAllHotels,
  getFeaturedHotels
}