import Booking from '../models/Booking.js'
import Flight from '../models/Flight.js'
import Hotel from '../models/Hotel.js'
import Tour from '../models/Tour.js'

/**
 * @desc    Create new booking
 * @route   POST /api/bookings
 * @access  Private
 */
export const createBooking = async (req, res) => {
  try {
    const {
      type,
      itemId,
      passengerDetails,
      travelDate,
      guests,
      specialRequests,
      totalPrice,
      paymentMethod
    } = req.body

    // Get item details based on type
    let item
    if (type === 'flight') {
      item = await Flight.findById(itemId)
    } else if (type === 'hotel') {
      item = await Hotel.findById(itemId)
    } else if (type === 'package') {
      item = await Tour.findById(itemId)
    }

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `${type.charAt(0).toUpperCase() + type.slice(1)} not found`
      })
    }

    // Check availability
    if (type === 'flight' && item.availableSeats < (guests || 1)) {
      return res.status(400).json({
        success: false,
        message: 'Not enough available seats'
      })
    }

    if (type === 'hotel' && item.rooms.available < (guests || 1)) {
      return res.status(400).json({
        success: false,
        message: 'Not enough available rooms'
      })
    }

    if (type === 'package' && item.availableSlots < (guests || 1)) {
      return res.status(400).json({
        success: false,
        message: 'Not enough available slots'
      })
    }

    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      type,
      itemId,
      itemDetails: item.toObject(),
      passengerDetails,
      travelDate,
      guests: guests || 1,
      specialRequests,
      totalPrice,
      paymentMethod,
      paymentStatus: 'completed', // Simplified - in production, integrate with payment gateway
      status: 'confirmed'
    })

    // Update availability
    if (type === 'flight') {
      await Flight.findByIdAndUpdate(itemId, {
        $inc: { availableSeats: -(guests || 1) }
      })
    } else if (type === 'hotel') {
      await Hotel.findByIdAndUpdate(itemId, {
        $inc: { 'rooms.available': -(guests || 1) }
      })
    } else if (type === 'package') {
      await Tour.findByIdAndUpdate(itemId, {
        $inc: { availableSlots: -(guests || 1) }
      })
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    })

  } catch (error) {
    console.error('Create booking error:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    })
  }
}

/**
 * @desc    Get user bookings
 * @route   GET /api/bookings/user
 * @access  Private
 */
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('user', 'name email')

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    })

  } catch (error) {
    console.error('Get user bookings error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    })
  }
}

/**
 * @desc    Get booking by ID
 * @route   GET /api/bookings/:id
 * @access  Private
 */
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      })
    }

    // Check if booking belongs to user (unless admin)
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking'
      })
    }

    res.json({
      success: true,
      data: booking
    })

  } catch (error) {
    console.error('Get booking error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message
    })
  }
}

/**
 * @desc    Cancel booking
 * @route   DELETE /api/bookings/:id
 * @access  Private
 */
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      })
    }

    // Check if booking belongs to user (unless admin)
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      })
    }

    // Check if booking can be cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      })
    }

    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel completed booking'
      })
    }

    // Update booking status
    booking.status = 'cancelled'
    booking.cancelledAt = new Date()
    booking.cancellationReason = req.body.reason || 'User requested cancellation'
    await booking.save()

    // Restore availability
    const { type, itemId, guests } = booking
    
    if (type === 'flight') {
      await Flight.findByIdAndUpdate(itemId, {
        $inc: { availableSeats: guests }
      })
    } else if (type === 'hotel') {
      await Hotel.findByIdAndUpdate(itemId, {
        $inc: { 'rooms.available': guests }
      })
    } else if (type === 'package') {
      await Tour.findByIdAndUpdate(itemId, {
        $inc: { availableSlots: guests }
      })
    }

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    })

  } catch (error) {
    console.error('Cancel booking error:', error)
    res.status(500).json({
      success: false,
      message: 'Error cancelling booking',
      error: error.message
    })
  }
}

/**
 * @desc    Get all bookings (Admin)
 * @route   GET /api/bookings
 * @access  Private/Admin
 */
export const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query

    const query = {}
    if (status) query.status = status

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const bookings = await Booking.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))

    const total = await Booking.countDocuments(query)

    res.json({
      success: true,
      count: bookings.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: bookings
    })

  } catch (error) {
    console.error('Get all bookings error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    })
  }
}

export default {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
  getAllBookings
}