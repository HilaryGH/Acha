const User = require('../models/User');
const AuditLog = require('../models/AuditLog');
const { generateToken } = require('../middleware/auth');
const { verifyRoleCode } = require('../middleware/security');

/**
 * Register a new user with enhanced security
 * - Restricted roles (super_admin, admin, customer_support) require special codes
 * - Only super_admin can create admin and customer_support roles
 * - Only super_admin can create other super_admin roles (with code)
 * - All role creations are logged for audit
 */
const register = async (req, res) => {
  try {
    const { name, email, password, phone, role, department, code } = req.body;
    const creatorRole = req.user?.role;
    const creatorId = req.user?.id;
    const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
    const userAgent = req.get('user-agent') || 'unknown';
    
    // Define restricted roles that require codes
    const restrictedRoles = ['super_admin', 'admin', 'customer_support'];
    const requestedRole = role || 'customer_support';
    
    // Security Layer 1: Role-based restrictions
    // Only super_admin can create admin, customer_support, or other super_admin
    if (restrictedRoles.includes(requestedRole)) {
      if (creatorRole !== 'super_admin') {
        // Log failed attempt
        await AuditLog.create({
          action: 'code_verification_failed',
          performedBy: creatorId,
          details: {
            attemptedRole: requestedRole,
            reason: 'Insufficient permissions - only super_admin can create restricted roles'
          },
          ipAddress,
          userAgent,
          status: 'failed',
          errorMessage: 'Only super_admin can create restricted roles'
        });
        
        return res.status(403).json({
          status: 'error',
          message: 'Only super_admin can create users with restricted roles (super_admin, admin, customer_support)'
        });
      }
      
      // Security Layer 2: Code verification required
      if (!code) {
        await AuditLog.create({
          action: 'code_verification_failed',
          performedBy: creatorId,
          details: {
            attemptedRole: requestedRole,
            reason: 'Code not provided'
          },
          ipAddress,
          userAgent,
          status: 'failed',
          errorMessage: 'Code required for restricted role'
        });
        
        return res.status(403).json({
          status: 'error',
          message: `A special code is required to create a user with role: ${requestedRole}`
        });
      }
      
      // Security Layer 3: Verify code with enhanced security (rate limiting, timing-safe comparison)
      try {
        await verifyRoleCode(requestedRole, code, req);
        
        // Log successful code verification
        await AuditLog.create({
          action: 'code_verification_success',
          performedBy: creatorId,
          details: {
            role: requestedRole
          },
          ipAddress,
          userAgent,
          status: 'success'
        });
      } catch (codeError) {
        // Log failed code verification
        await AuditLog.create({
          action: 'code_verification_failed',
          performedBy: creatorId,
          details: {
            attemptedRole: requestedRole,
            reason: 'Invalid code'
          },
          ipAddress,
          userAgent,
          status: 'failed',
          errorMessage: codeError.message
        });
        
        return res.status(403).json({
          status: 'error',
          message: codeError.message || 'Invalid code for the requested role'
        });
      }
    } else {
      // For non-restricted roles (marketing_team), any authenticated user can create
      // But log it for audit
      await AuditLog.create({
        action: 'user_created',
        performedBy: creatorId,
        details: {
          role: requestedRole,
          email: email?.toLowerCase()
        },
        ipAddress,
        userAgent,
        status: 'success'
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User with this email already exists'
      });
    }
    
    // Create new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      role: requestedRole,
      department,
      status: 'active'
    });
    
    await user.save();
    
    // Security Layer 4: Audit log for successful user creation
    await AuditLog.create({
      action: 'user_created',
      performedBy: creatorId,
      targetUser: user._id,
      details: {
        role: user.role,
        email: user.email,
        name: user.name,
        department: user.department
      },
      ipAddress,
      userAgent,
      status: 'success'
    });
    
    // Generate token
    const token = generateToken(user._id);
    
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          department: user.department,
          status: user.status,
          createdAt: user.createdAt
        },
        token
      }
    });
  } catch (error) {
    // Log error
    const creatorId = req.user?.id;
    const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
    const userAgent = req.get('user-agent') || 'unknown';
    
    if (creatorId) {
      await AuditLog.create({
        action: 'user_created',
        performedBy: creatorId,
        details: {
          error: error.message
        },
        ipAddress,
        userAgent,
        status: 'failed',
        errorMessage: error.message
      }).catch(() => {}); // Don't fail if audit log fails
    }
    
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to register user'
    });
  }
};

/**
 * Login user
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password'
      });
    }
    
    // Find user and include password
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }
    
    // Check if user is active
    if (user.status !== 'active') {
      return res.status(403).json({
        status: 'error',
        message: 'Your account is not active. Please contact administrator.'
      });
    }
    
    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }
    
    // Update last login
    user.lastLogin = Date.now();
    await user.save();
    
    // Generate token
    const token = generateToken(user._id);
    
    res.json({
      status: 'success',
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          department: user.department,
          status: user.status,
          lastLogin: user.lastLogin
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Login failed'
    });
  }
};

/**
 * Get current user profile
 */
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to get user profile'
    });
  }
};

/**
 * Get all users (only admins can access)
 */
const getAllUsers = async (req, res) => {
  try {
    const { role, status, search } = req.query;
    
    // Build query
    const query = {};
    if (role) query.role = role;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const users = await User.find(query).select('-password').sort({ createdAt: -1 });
    
    res.json({
      status: 'success',
      count: users.length,
      data: {
        users
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to get users'
    });
  }
};

/**
 * Get user by ID
 */
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    
    res.json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to get user'
    });
  }
};

/**
 * Update user (users can update themselves, admins can update anyone)
 */
const updateUser = async (req, res) => {
  try {
    const { name, phone, department, status, role } = req.body;
    const userId = req.params.id;
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    
    // Check permissions
    // Users can only update themselves unless they are admin/super_admin
    if (req.user.role !== 'super_admin' && req.user.role !== 'admin') {
      if (req.user.id.toString() !== userId) {
        return res.status(403).json({
          status: 'error',
          message: 'You can only update your own profile'
        });
      }
      // Regular users cannot change their role or status
      if (role || status) {
        return res.status(403).json({
          status: 'error',
          message: 'You cannot change your role or status'
        });
      }
    }
    
    // Only super_admin can change roles
    if (role && req.user.role !== 'super_admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Only super admin can change user roles'
      });
    }
    
    // Update user
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (department) user.department = department;
    if (status && (req.user.role === 'super_admin' || req.user.role === 'admin')) {
      user.status = status;
    }
    if (role && req.user.role === 'super_admin') {
      user.role = role;
    }
    
    user.updatedAt = Date.now();
    await user.save();
    
    res.json({
      status: 'success',
      message: 'User updated successfully',
      data: {
        user
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to update user'
    });
  }
};

/**
 * Change password
 */
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.params.id;
    
    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide current password and new password'
      });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({
        status: 'error',
        message: 'New password must be at least 6 characters long'
      });
    }
    
    // Check permissions
    if (req.user.role !== 'super_admin' && req.user.role !== 'admin') {
      if (req.user.id.toString() !== userId) {
        return res.status(403).json({
          status: 'error',
          message: 'You can only change your own password'
        });
      }
    }
    
    // Get user with password
    const user = await User.findById(userId).select('+password');
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    
    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Current password is incorrect'
      });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    res.json({
      status: 'success',
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to change password'
    });
  }
};

/**
 * Delete user (only super_admin)
 */
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Prevent deleting yourself
    if (req.user.id.toString() === userId) {
      return res.status(400).json({
        status: 'error',
        message: 'You cannot delete your own account'
      });
    }
    
    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    
    res.json({
      status: 'success',
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to delete user'
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  getAllUsers,
  getUserById,
  updateUser,
  changePassword,
  deleteUser
};

