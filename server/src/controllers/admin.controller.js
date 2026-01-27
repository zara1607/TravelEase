import User from '../models/User.js'
import Booking from '../models/Booking.js'
import Flight from '../models/Flight.js'
import Hotel from '../models/Hotel.js'
import Tour from '../models/Tour.js'

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/admin/stats
 * @access  Private/Admin
 */
export const getDashboardStats = async (req, res) => {
  try {
    // Get counts
    const totalUsers = await User.countDocuments()
    const totalBookings = await Booking.countDocuments()
    const totalFlights = await Flight.countDocuments()
    const totalHotels = await Hotel.countDocuments()
    const totalTours = await Tour.countDocuments()

    // Get revenue
    const revenueData = await Booking.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ])
    const totalRevenue = revenueData[0]?.total || 0

    // Get recent bookings
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name email')

    // Get booking stats by status
    const bookingsByStatus = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ])

    res.json({
      success: true,
      data: {
        totalUsers,
        totalBookings,
        totalFlights,
        totalHotels,
        totalTours,
        totalRevenue,
        recentBookings,
        bookingsByStatus
      }
    })

  } catch (error) {
    console.error('Get dashboard stats error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message
    })
  }
}

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))

    const total = await User.countDocuments()

    res.json({
      success: true,
      count: users.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: users
    })

  } catch (error) {
    console.error('Get all users error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    })
  }
}

/**
 * @desc    Create flight
 * @route   POST /api/admin/flights
 * @access  Private/Admin
 */
export const createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Flight created successfully',
      data: flight
    })

  } catch (error) {
    console.error('Create flight error:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating flight',
      error: error.message
    })
  }
}

/**
 * @desc    Update flight
 * @route   PUT /api/admin/flights/:id
 * @access  Private/Admin
 */
export const updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: 'Flight not found'
      })
    }

    res.json({
      success: true,
      message: 'Flight updated successfully',
      data: flight
    })

  } catch (error) {
    console.error('Update flight error:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating flight',
      error: error.message
    })
  }
}

/**
 * @desc    Delete flight
 * @route   DELETE /api/admin/flights/:id
 * @access  Private/Admin
 */
export const deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id)

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: 'Flight not found'
      })
    }

    res.json({
      success: true,
      message: 'Flight deleted successfully'
    })

  } catch (error) {
    console.error('Delete flight error:', error)
    res.status(500).json({
      success: false,
      message: 'Error deleting flight',
      error: error.message
    })
  }
}

/**
 * @desc    Create hotel
 * @route   POST /api/admin/hotels
 * @access  Private/Admin
 */
export const createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Hotel created successfully',
      data: hotel
    })

  } catch (error) {
    console.error('Create hotel error:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating hotel',
      error: error.message
    })
  }
}

/**
 * @desc    Create tour package
 * @route   POST /api/admin/tours
 * @access  Private/Admin
 */
export const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Tour package created successfully',
      data: tour
    })

  } catch (error) {
    console.error('Create tour error:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating tour package',
      error: error.message
    })
  }
}

export default {
  getDashboardStats,
  getAllUsers,
  createFlight,
  updateFlight,
  deleteFlight,
  createHotel,
  createTour
}