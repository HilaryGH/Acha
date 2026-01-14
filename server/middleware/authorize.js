/**
 * Middleware to authorize users based on roles
 * @param {...string} roles - Roles allowed to access the route
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    // Check if user is authenticated (should be set by authenticate middleware)
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required.'
      });
    }
    
    // Check if user's role is in the allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: `Access denied. Required role: ${roles.join(' or ')}. Your role: ${req.user.role}`
      });
    }
    
    next();
  };
};

/**
 * Middleware to check if user is super admin
 */
const isSuperAdmin = authorize('super_admin');

/**
 * Middleware to check if user is admin or super admin
 */
const isAdmin = authorize('super_admin', 'admin');

/**
 * Middleware to check if user is marketing team or above
 */
const isMarketingTeam = authorize('super_admin', 'admin', 'marketing_team');

/**
 * Middleware to check if user is customer support or above
 */
const isCustomerSupport = authorize('super_admin', 'admin', 'marketing_team', 'customer_support');

module.exports = {
  authorize,
  isSuperAdmin,
  isAdmin,
  isMarketingTeam,
  isCustomerSupport
};




