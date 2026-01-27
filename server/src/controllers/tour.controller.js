import Tour from '../models/Tour.js'

/**
 * @desc    Search tour packages
 * @route   GET /api/tours/search
 * @access  Public
 */
export const searchTours = async (req, res) => {
  try {
    const {
      destination,
      category,
      difficulty,
      minPrice,
      maxPrice,
      rating,
      page = 1,
      limit = 20
    } = req.query

    // Build query
    const query = { status: 'active', availableSlots: { $gt: 0 } }

    if (destination) {
      query.destination = { $regex: destination, $options: 'i' }
    }

    if (category) {
      query.category = category
    }

    if (difficulty) {
      query.difficulty = difficulty
    }

    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = parseFloat(minPrice)
      if (maxPrice) query.price.$lte = parseFloat(maxPrice)
    }

    if (rating) {
      query.rating = { $gte: parseFloat(rating) }
    }

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    const tours = await Tour.find(query)
      .sort({ featured: -1, rating: -1, price: 1 })
      .skip(skip)
      .limit(parseInt(limit))

    const total = await Tour.countDocuments(query)

    res.json({
      success: true,
      count: tours.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: tours
    })

  } catch (error) {
    console.error('Search tours error:', error)
    res.status(500).json({
      success: false,
      message: 'Error searching tours',
      error: error.message
    })
  }
}

/**
 * @desc    Get tour by ID
 * @route   GET /api/tours/:id
 * @access  Public
 */
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour package not found'
      })
    }

    res.json({
      success: true,
      data: tour
    })

  } catch (error) {
    console.error('Get tour error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching tour',
      error: error.message
    })
  }
}

/**
 * @desc    Get all tours
 * @route   GET /api/tours
 * @access  Public
 */
export const getAllTours = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const tours = await Tour.find({ status: 'active' })
      .sort({ featured: -1, rating: -1 })
      .skip(skip)
      .limit(parseInt(limit))

    const total = await Tour.countDocuments({ status: 'active' })

    res.json({
      success: true,
      count: tours.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: tours
    })

  } catch (error) {
    console.error('Get all tours error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching tours',
      error: error.message
    })
  }
}

/**
 * @desc    Get featured tours
 * @route   GET /api/tours/featured
 * @access  Public
 */
export const getFeaturedTours = async (req, res) => {
  try {
    const tours = await Tour.find({ status: 'active', featured: true })
      .sort({ rating: -1 })
      .limit(6)

    res.json({
      success: true,
      count: tours.length,
      data: tours
    })

  } catch (error) {
    console.error('Get featured tours error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching featured tours',
      error: error.message
    })
  }
}

export default {
  searchTours,
  getTourById,
  getAllTours,
  getFeaturedTours
}