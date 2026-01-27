import api from '../../lib/api'
import { API_ENDPOINTS } from '../../lib/constants'

/**
 * Login user
 * @param {Object} credentials - User credentials { email, password }
 * @returns {Promise} - Response with user data and token
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post(API_ENDPOINTS.LOGIN, credentials)
    return response.data
  } catch (error) {
    console.error('Login API Error:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Register new user
 * @param {Object} userData - User data { name, email, phone, password }
 * @returns {Promise} - Response with user data and token
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post(API_ENDPOINTS.REGISTER, userData)
    return response.data
  } catch (error) {
    console.error('Register API Error:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Logout user
 * @returns {Promise} - Logout response
 */
export const logoutUser = async () => {
  const response = await api.post(API_ENDPOINTS.LOGOUT)
  return response.data
}

/**
 * Get current user details
 * @returns {Promise} - User data
 */
export const getCurrentUser = async () => {
  const response = await api.get(API_ENDPOINTS.ME)
  return response.data
}

/**
 * Update user profile
 * @param {Object} userData - Updated user data
 * @returns {Promise} - Updated user data
 */
export const updateProfile = async (userData) => {
  const response = await api.put(API_ENDPOINTS.UPDATE_PROFILE, userData)
  return response.data
}

/**
 * Change user password
 * @param {Object} passwords - { currentPassword, newPassword }
 * @returns {Promise} - Success response
 */
export const changePassword = async (passwords) => {
  const response = await api.put(API_ENDPOINTS.CHANGE_PASSWORD, passwords)
  return response.data
}