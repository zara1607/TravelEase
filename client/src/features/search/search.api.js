import api from '../../lib/api'
import { API_ENDPOINTS } from '../../lib/constants'

/**
 * Search for flights, hotels, or packages
 * @param {string} type - Type of search (flights, hotels, packages)
 * @param {Object} params - Search parameters
 * @returns {Promise} - Search results
 */
export const search = async (type, params) => {
  let endpoint
  
  switch (type) {
    case 'flights':
      endpoint = API_ENDPOINTS.SEARCH_FLIGHTS
      break
    case 'hotels':
      endpoint = API_ENDPOINTS.SEARCH_HOTELS
      break
    case 'packages':
      endpoint = API_ENDPOINTS.SEARCH_PACKAGES
      break
    default:
      endpoint = API_ENDPOINTS.SEARCH_FLIGHTS
  }

  try {
    const response = await api.get(endpoint, { params })
    return response.data
  } catch (error) {
    console.error('Search error:', error)
    // Return empty data structure on error
    return { data: [], count: 0, total: 0 }
  }
}