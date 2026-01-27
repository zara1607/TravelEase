import { verifyToken } from '../utils/generateToken.js'
import User from '../models/User.js'

/**
 * Protect routes - verify JWT token
 */
export const protect = async (req, res, next) => {
  try {
    let token

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route. Please login.'
      })
    }

    try {
      // Verify token
      const decoded = verifyToken(token)

      // Get user from token
      const user = await User.findById(decoded.id).select('-password')

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        })
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'User account is inactive'
        })
      }

      // Attach user to request
      req.user = user
      next()

    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Invalid token.'
      })
    }

  } catch (error) {
    console.error('Auth middleware error:', error)
    return res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    })
  }
}

export default protect