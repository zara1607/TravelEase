import api from '../../lib/api'
import { API_ENDPOINTS } from '../../lib/constants'

/**
 * Create a new booking
 * @param {Object} bookingData - Booking details
 * @returns {Promise} - Created booking
 */
export const createBooking = async (bookingData) => {
  const response = await api.post(API_ENDPOINTS.CREATE_BOOKING, bookingData)
  return response.data
}

/**
 * Get user's bookings
 * @returns {Promise} - List of user bookings
 */
export const getUserBookings = async () => {
  const response = await api.get(API_ENDPOINTS.USER_BOOKINGS)
  return response.data
}

/**
 * Get booking details by ID
 * @param {string} bookingId - Booking ID
 * @returns {Promise} - Booking details
 */
export const getBookingById = async (bookingId) => {
  const response = await api.get(`${API_ENDPOINTS.BOOKING_DETAILS}/${bookingId}`)
  return response.data
}

/**
 * Cancel a booking
 * @param {string} bookingId - Booking ID
 * @returns {Promise} - Cancellation response
 */
export const cancelBooking = async (bookingId) => {
  const response = await api.delete(`${API_ENDPOINTS.CANCEL_BOOKING}/${bookingId}`)
  return response.data
}