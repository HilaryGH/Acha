# User Roles System Documentation

## Overview
This system implements a **secure role-based access control (RBAC)** system with four user roles:
- **super_admin**: Full system access, can manage all users and settings
- **admin**: Can manage users (except super_admin) and access admin features
- **marketing_team**: Access to marketing-related features and data
- **customer_support**: Access to customer support features and data

## 🔒 Security Features

The system includes multiple layers of security:

1. **Role-Based Restrictions**: Only `super_admin` can create restricted roles (`super_admin`, `admin`, `customer_support`)
2. **Code Verification**: Restricted roles require special codes stored in environment variables
3. **Rate Limiting**: Prevents brute force attacks (max 5 attempts per 15 minutes per IP)
4. **Timing-Safe Comparison**: Prevents timing attacks on code verification
5. **Audit Logging**: All role creation attempts and successes are logged
6. **IP Tracking**: All actions are tracked with IP addresses for security monitoring

## Setup

### 1. Generate Secure Codes
First, generate secure random codes:
```bash
node server/utils/generateSecureCodes.js
```

This will output secure codes that you should copy to your `.env` file.

### 2. Environment Variables
Add these to your `.env` file:
```env
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
MONGODB_URI=mongodb://localhost:27017/acha

# Role Creation Codes (Required for creating restricted roles)
# Generate these using: node server/utils/generateSecureCodes.js
SUPER_ADMIN_CODE=your-super-admin-secret-code-64-chars-hex
ADMIN_CODE=your-admin-secret-code-64-chars-hex
CUSTOMER_SUPPORT_CODE=your-customer-support-secret-code-64-chars-hex
```

**Security Notes**:
- These codes should be long, random, and unique (64+ characters recommended)
- Never commit these codes to version control
- Use different codes for development and production
- The `marketing_team` role does not require a code, but only `super_admin` can create restricted roles

### 2. Create Super Admin
Run the seed script to create the first super admin:
```bash
node server/utils/seedSuperAdmin.js
```

Or set custom credentials via environment variables:
```env
SUPER_ADMIN_NAME=Your Name
SUPER_ADMIN_EMAIL=admin@achadelivery.com
SUPER_ADMIN_PASSWORD=YourSecurePassword
SUPER_ADMIN_PHONE=+251XXXXXXXXX
```

Default credentials (if not set):
- Email: `admin@achadelivery.com`
- Password: `admin123456`

## API Endpoints

### Public Routes

#### POST `/api/users/login`
Login and get JWT token
```json
{
  "email": "admin@achadelivery.com",
  "password": "password123"
}
```

Response:
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "name": "...",
      "email": "...",
      "role": "super_admin",
      ...
    },
    "token": "jwt-token-here"
  }
}
```

### Protected Routes (Require Authentication)

All protected routes require the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

#### POST `/api/users/register` (All Authenticated Users)
Register a new user. 

**⚠️ Security Restrictions:**
- Only `super_admin` can create `super_admin`, `admin`, or `customer_support` roles
- Creating restricted roles requires a special code
- Rate limiting: Max 5 failed attempts per 15 minutes per IP
- All attempts are logged for audit

**For restricted roles (super_admin, admin, customer_support) - Super Admin Only:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+251XXXXXXXXX",
  "role": "customer_support",
  "department": "Support",
  "code": "your-customer-support-secret-code-from-env"
}
```

**For marketing_team (any authenticated user can create):**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "phone": "+251XXXXXXXXX",
  "role": "marketing_team",
  "department": "Marketing"
}
```

**Error Responses:**
- If not super_admin trying to create restricted role: `403 - Only super_admin can create users with restricted roles`
- If code is missing: `403 - A special code is required to create a user with role: <role>`
- If code is invalid: `403 - Invalid code for the requested role`
- If rate limited: `429 - Too many failed attempts. Please try again in X minute(s)`

#### GET `/api/users/me`
Get current user profile

#### GET `/api/users` (Admin Only)
Get all users
Query parameters:
- `role`: Filter by role (super_admin, admin, marketing_team, customer_support)
- `status`: Filter by status (active, inactive, suspended)
- `search`: Search by name or email

#### GET `/api/users/:id` (Admin Only)
Get user by ID

#### PUT `/api/users/:id`
Update user (users can update themselves, admins can update anyone)
```json
{
  "name": "Updated Name",
  "phone": "+251XXXXXXXXX",
  "department": "Marketing",
  "status": "active",
  "role": "marketing_team"
}
```

Note: Only super_admin can change roles. Only admins can change status.

#### PUT `/api/users/:id/password`
Change password
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

#### DELETE `/api/users/:id` (Super Admin Only)
Delete a user

## Role Permissions

### Super Admin
- Full system access
- Can create/update/delete all users
- Can change any user's role
- Can change any user's status
- Can access all endpoints

### Admin
- Can view all users
- Can update any user (except super_admin)
- Cannot change user roles
- Can change user status
- Cannot delete users

### Marketing Team
- Can view their own profile
- Can update their own profile
- Cannot view other users
- Cannot change role or status

### Customer Support
- Can view their own profile
- Can update their own profile
- Cannot view other users
- Cannot change role or status

## Usage Examples

### Example: Login and Get Token
```javascript
const response = await fetch('http://localhost:5000/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'admin@achadelivery.com',
    password: 'admin123456'
  })
});

const data = await response.json();
const token = data.data.token;
```

### Example: Create New User (Super Admin)
```javascript
const response = await fetch('http://localhost:5000/api/users/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: 'Marketing Manager',
    email: 'marketing@achadelivery.com',
    password: 'securepassword123',
    phone: '+251911000000',
    role: 'marketing_team',
    department: 'Marketing'
  })
});
```

### Example: Get All Users (Admin)
```javascript
const response = await fetch('http://localhost:5000/api/users', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const data = await response.json();
console.log(data.data.users);
```

## Middleware Usage

### Protect Routes with Authentication
```javascript
const { authenticate } = require('./middleware/auth');
router.get('/protected-route', authenticate, yourController);
```

### Protect Routes with Role Authorization
```javascript
const { authenticate } = require('./middleware/auth');
const { isAdmin, isSuperAdmin, authorize } = require('./middleware/authorize');

// Only admins and super_admins
router.get('/admin-route', authenticate, isAdmin, yourController);

// Only super_admin
router.delete('/delete-route', authenticate, isSuperAdmin, yourController);

// Custom roles
router.get('/marketing-route', authenticate, authorize('super_admin', 'admin', 'marketing_team'), yourController);
```

## Audit Logging

All role creation attempts are logged for security auditing. Admins can view audit logs:

#### GET `/api/audit` (Admin Only)
Get audit logs with filters:
```
GET /api/audit?action=user_created&status=success&limit=50&page=1
```

Query parameters:
- `action`: Filter by action (user_created, code_verification_failed, etc.)
- `performedBy`: Filter by user ID who performed the action
- `targetUser`: Filter by target user ID
- `status`: Filter by status (success, failed)
- `startDate`: Start date (ISO format)
- `endDate`: End date (ISO format)
- `limit`: Number of results (default: 100)
- `page`: Page number (default: 1)

#### GET `/api/audit/:id` (Admin Only)
Get specific audit log by ID

## Security Notes

1. **JWT Secret**: Always use a strong, random JWT secret in production
2. **Password**: Passwords are hashed using bcrypt with salt rounds of 12
3. **Token Expiration**: Default is 7 days, configurable via `JWT_EXPIRES_IN`
4. **Password Requirements**: Minimum 6 characters
5. **Account Status**: Users with status other than 'active' cannot login
6. **Role Creation Codes**: 
   - Use long, random codes (64+ characters)
   - Store in environment variables only
   - Never commit to version control
   - Use different codes for dev/prod
7. **Rate Limiting**: 5 attempts per 15 minutes per IP to prevent brute force
8. **Timing-Safe Comparison**: Code verification uses constant-time comparison to prevent timing attacks
9. **Audit Logging**: All role creation attempts are logged with IP addresses and user agents
10. **Role Restrictions**: Only super_admin can create restricted roles, even with correct codes

## User Model Schema

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, min 6 chars, hashed),
  phone: String (optional),
  role: String (enum: ['super_admin', 'admin', 'marketing_team', 'customer_support']),
  status: String (enum: ['active', 'inactive', 'suspended'], default: 'active'),
  department: String (optional),
  lastLogin: Date (optional),
  createdAt: Date,
  updatedAt: Date
}
```

