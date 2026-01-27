import api from '../../lib/api'
import { API_ENDPOINTS } from '../../lib/constants'

/**
 * Get flight details by ID
 * @param {string} flightId - Flight ID
 * @returns {Promise} - Flight details
 */
export const getFlightById = async (flightId) => {
  const response = await api.get(`${API_ENDPOINTS.FLIGHT_DETAILS}/${flightId}`)
  return response.data
}

/**
 * Search flights
 * @param {Object} searchParams - Search parameters
 * @returns {Promise} - Flight search results
 */
export const searchFlights = async (searchParams) => {
  const response = await api.get(API_ENDPOINTS.SEARCH_FLIGHTS, { params: searchParams })
  return response.data
}