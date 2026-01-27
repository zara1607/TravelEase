import api from '../../lib/api'
import { API_ENDPOINTS } from '../../lib/constants'

/**
 * Get hotel details by ID
 * @param {string} hotelId - Hotel ID
 * @returns {Promise} - Hotel details
 */
export const getHotelById = async (hotelId) => {
  const response = await api.get(`${API_ENDPOINTS.HOTEL_DETAILS}/${hotelId}`)
  return response.data
}

/**
 * Search hotels
 * @param {Object} searchParams - Search parameters
 * @returns {Promise} - Hotel search results
 */
export const searchHotels = async (searchParams) => {
  const response = await api.get(API_ENDPOINTS.SEARCH_HOTELS, { params: searchParams })
  return response.data
}