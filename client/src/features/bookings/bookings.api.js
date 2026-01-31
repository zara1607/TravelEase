// src/features/bookings/bookings.api.js
// API functions for handling bookings

import api from '../../lib/api';

/**
 * Create a new booking
 * @param {Object} bookingData - The booking information
 * @returns {Promise} - The booking response
 */
export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get all bookings for the current user
 * @returns {Promise} - Array of bookings
 */
export const getUserBookings = async () => {
  try {
    const response = await api.get('/bookings/user');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get a specific booking by ID
 * @param {string} bookingId - The booking ID
 * @returns {Promise} - The booking details
 */
export const getBookingById = async (bookingId) => {
  try {
    const response = await api.get(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Cancel a booking
 * @param {string} bookingId - The booking ID to cancel
 * @returns {Promise} - The cancellation response
 */
export const cancelBooking = async (bookingId) => {
  try {
    const response = await api.patch(`/bookings/${bookingId}/cancel`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update booking status
 * @param {string} bookingId - The booking ID
 * @param {string} status - New status
 * @returns {Promise} - The updated booking
 */
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await api.patch(`/bookings/${bookingId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};