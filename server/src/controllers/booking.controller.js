// server/src/controllers/booking.controller.js
// ES Module version

import Booking from '../models/Booking.js';
import Flight from '../models/Flight.js';
import Hotel from '../models/Hotel.js';
import Tour from '../models/Tour.js';

/**
 * Create a new booking
 * @route POST /api/bookings
 * @access Private
 */
export const createBooking = async (req, res) => {
  try {
    const {
      itemType,
      itemId,
      firstName,
      lastName,
      email,
      phone,
      checkIn,
      checkOut,
      departureDate,
      returnDate,
      numberOfAdults,
      numberOfChildren,
      specialRequests,
      totalPrice,
    } = req.body;

    // Validate required fields
    if (!itemType || !itemId || !firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Verify the item exists
    let item;
    switch (itemType) {
      case 'flight':
        item = await Flight.findById(itemId);
        break;
      case 'hotel':
        item = await Hotel.findById(itemId);
        break;
      case 'tour':
        item = await Tour.findById(itemId);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid booking type',
        });
    }

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `${itemType} not found`,
      });
    }

    // Create booking
    const booking = await Booking.create({
      user: req.user._id, // From auth middleware
      itemType,
      itemId,
      itemDetails: {
        name: item.name || item.airline,
        image: item.image || item.images?.[0],
        location: item.location || `${item.from} to ${item.to}`,
      },
      customerInfo: {
        firstName,
        lastName,
        email,
        phone,
      },
      travelDetails: {
        checkIn,
        checkOut,
        departureDate,
        returnDate,
        numberOfAdults: numberOfAdults || 1,
        numberOfChildren: numberOfChildren || 0,
      },
      specialRequests,
      pricing: {
        basePrice: item.price || item.pricePerNight,
        totalPrice: totalPrice || item.price || item.pricePerNight,
      },
      status: 'pending',
      paymentStatus: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message,
    });
  }
};

/**
 * Get all bookings for the authenticated user
 * @route GET /api/bookings/user
 * @access Private
 */
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('itemId');

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message,
    });
  }
};

/**
 * Get a specific booking by ID
 * @route GET /api/bookings/:id
 * @access Private
 */
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('itemId');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Check if booking belongs to user (unless admin)
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message,
    });
  }
};

/**
 * Cancel a booking
 * @route PATCH /api/bookings/:id/cancel
 * @access Private
 */
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Check if booking belongs to user
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking',
      });
    }

    // Check if booking can be cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled',
      });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel a completed booking',
      });
    }

    booking.status = 'cancelled';
    booking.cancelledAt = new Date();
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking,
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling booking',
      error: error.message,
    });
  }
};

/**
 * Update booking status (Admin only)
 * @route PATCH /api/bookings/:id/status
 * @access Private/Admin
 */
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
      });
    }

    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      data: booking,
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating booking status',
      error: error.message,
    });
  }
};

/**
 * Get all bookings (Admin only)
 * @route GET /api/bookings
 * @access Private/Admin
 */
export const getAllBookings = async (req, res) => {
  try {
    const { status, itemType, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) query.status = status;
    if (itemType) query.itemType = itemType;

    const bookings = await Booking.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
      .populate('itemId');

    const count = await Booking.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: bookings,
    });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message,
    });
  }
};