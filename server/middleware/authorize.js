/**
 * Middleware to check if user has admin or super_admin role
 * Note: authenticate middleware must be used before this middleware
 */
const isAdmin = (req, res, next) => {
  // Check if user is authenticated (should be set by authenticate middleware)
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      message: 'Authentication required. Please login first.'
    });
  }

  // Check if user has admin or super_admin role
  if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied. Admin privileges required.'
    });
  }

  next();
};

/**
 * Middleware to check if user has super_admin role
 * Note: authenticate middleware must be used before this middleware
 */
const isSuperAdmin = (req, res, next) => {
  // Check if user is authenticated (should be set by authenticate middleware)
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      message: 'Authentication required. Please login first.'
    });
  }

  // Check if user has super_admin role
  if (req.user.role !== 'super_admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied. Super admin privileges required.'
    });
  }

  next();
};

/**
 * Middleware factory to authorize specific roles
 * Usage: authorize('super_admin', 'admin', 'marketing_team')
 * Note: authenticate middleware must be used before this middleware
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user is authenticated (should be set by authenticate middleware)
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required. Please login first.'
      });
    }

    // Check if user's role is in the allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: `Access denied. Required roles: ${allowedRoles.join(', ')}`
      });
    }

    next();
  };
};

module.exports = {
  isAdmin,
  isSuperAdmin,
  authorize
};
