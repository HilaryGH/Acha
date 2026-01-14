const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  getAllUsers,
  getUserById,
  updateUser,
  changePassword,
  deleteUser
} = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const { isSuperAdmin, isAdmin, authorize } = require('../middleware/authorize');
const { rateLimitCodeAttempts } = require('../middleware/security');

// Public routes
router.post('/login', login);
// Register new user (public registration - no authentication required)
// Note: rateLimitCodeAttempts removed temporarily to debug - can be added back later
router.post('/register', register);

// Protected routes - require authentication
router.use(authenticate); // All routes below require authentication

// Get current user profile
router.get('/me', getMe);

// Get all users (admin and super_admin only)
router.get('/', isAdmin, getAllUsers);

// Get user by ID (admin and super_admin only)
router.get('/:id', isAdmin, getUserById);

// Update user
router.put('/:id', updateUser); // Users can update themselves, admins can update anyone

// Change password
router.put('/:id/password', changePassword);

// Delete user (super_admin only)
router.delete('/:id', isSuperAdmin, deleteUser);

module.exports = router;

