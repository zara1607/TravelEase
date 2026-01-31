// server/src/middlewares/role.middleware.js
// Middleware to check user roles

/**
 * Middleware to check if user is admin
 */
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.',
    });
  }
};

/**
 * Middleware to check if user has specific role
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${roles.join(' or ')}`,
      });
    }

    next();
  };
};

/**
 * Middleware to check if user is authenticated and is either admin or the resource owner
 */
export const adminOrOwner = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user._id.toString() === req.params.userId)) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Not authorized to access this resource.',
    });
  }
};