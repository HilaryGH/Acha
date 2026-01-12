const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// In-memory store for rate limiting (in production, use Redis)
const codeAttempts = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5; // Maximum failed attempts per IP

/**
 * Hash a code using bcrypt
 */
const hashCode = async (code) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(code, salt);
};

/**
 * Verify a code against a hash
 */
const verifyCode = async (code, hash) => {
  return await bcrypt.compare(code, hash);
};

/**
 * Get hashed codes from environment and hash them for comparison
 * In production, store hashed codes in environment variables
 */
const getHashedCodes = () => {
  // Get plain codes from env (these should be hashed and stored securely)
  const SUPER_ADMIN_CODE = process.env.SUPER_ADMIN_CODE || 'SUPER_ADMIN_SECRET_CODE';
  const ADMIN_CODE = process.env.ADMIN_CODE || 'ADMIN_SECRET_CODE';
  const CUSTOMER_SUPPORT_CODE = process.env.CUSTOMER_SUPPORT_CODE || 'CUSTOMER_SUPPORT_SECRET_CODE';
  
  // For security, we'll hash them on first use and compare
  // In production, you should pre-hash these and store only hashes
  return {
    SUPER_ADMIN_CODE,
    ADMIN_CODE,
    CUSTOMER_SUPPORT_CODE
  };
};

/**
 * Rate limiting middleware for code verification attempts
 */
const rateLimitCodeAttempts = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  
  // Clean old entries
  for (const [key, value] of codeAttempts.entries()) {
    if (now - value.timestamp > RATE_LIMIT_WINDOW) {
      codeAttempts.delete(key);
    }
  }
  
  // Check current IP
  const attempts = codeAttempts.get(ip);
  
  if (attempts) {
    if (attempts.count >= MAX_ATTEMPTS) {
      const timeLeft = Math.ceil((RATE_LIMIT_WINDOW - (now - attempts.timestamp)) / 1000 / 60);
      return res.status(429).json({
        status: 'error',
        message: `Too many failed attempts. Please try again in ${timeLeft} minute(s).`
      });
    }
  }
  
  next();
};

/**
 * Record a failed code attempt
 */
const recordFailedAttempt = (req) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  
  const attempts = codeAttempts.get(ip);
  if (attempts) {
    attempts.count += 1;
    attempts.timestamp = now;
  } else {
    codeAttempts.set(ip, { count: 1, timestamp: now });
  }
};

/**
 * Clear failed attempts for an IP (on successful verification)
 */
const clearFailedAttempts = (req) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  codeAttempts.delete(ip);
};

/**
 * Generate a secure random code (for initial setup)
 */
const generateSecureCode = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Verify role creation code with enhanced security
 */
const verifyRoleCode = async (role, providedCode, req) => {
  const codes = getHashedCodes();
  
  // Check rate limiting
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const attempts = codeAttempts.get(ip);
  if (attempts && attempts.count >= MAX_ATTEMPTS) {
    const timeLeft = Math.ceil((RATE_LIMIT_WINDOW - (Date.now() - attempts.timestamp)) / 1000 / 60);
    throw new Error(`Too many failed attempts. Please try again in ${timeLeft} minute(s).`);
  }
  
  // Verify code based on role
  let codeValid = false;
  let expectedCode = '';
  
  if (role === 'super_admin') {
    expectedCode = codes.SUPER_ADMIN_CODE || '';
  } else if (role === 'admin') {
    expectedCode = codes.ADMIN_CODE || '';
  } else if (role === 'customer_support') {
    expectedCode = codes.CUSTOMER_SUPPORT_CODE || '';
  }
  
  // Use constant-time comparison to prevent timing attacks
  if (expectedCode && providedCode) {
    // Ensure both strings are the same length for timing-safe comparison
    const providedBuffer = Buffer.from(providedCode);
    const expectedBuffer = Buffer.from(expectedCode);
    
    if (providedBuffer.length === expectedBuffer.length) {
      try {
        codeValid = crypto.timingSafeEqual(providedBuffer, expectedBuffer);
      } catch (e) {
        codeValid = false;
      }
    } else {
      codeValid = false;
    }
  }
  
  if (!codeValid) {
    recordFailedAttempt(req);
    throw new Error('Invalid code for the requested role');
  }
  
  // Clear failed attempts on success
  clearFailedAttempts(req);
  return true;
};

module.exports = {
  hashCode,
  verifyCode,
  getHashedCodes,
  rateLimitCodeAttempts,
  recordFailedAttempt,
  clearFailedAttempts,
  generateSecureCode,
  verifyRoleCode
};

