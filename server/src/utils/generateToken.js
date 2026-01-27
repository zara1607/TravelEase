import jwt from 'jsonwebtoken'
import config from '../config/env.js'

/**
 * Generate JWT token
 * @param {string} userId - User ID
 * @returns {string} JWT token
 */
export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    config.jwtSecret,
    { expiresIn: config.jwtExpire }
  )
}

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @returns {object} Decoded token
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret)
  } catch (error) {
    throw new Error('Invalid token')
  }
}

export default generateToken