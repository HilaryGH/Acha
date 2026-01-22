const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

/**
 * Script to create a super admin user
 * Run this once to create the first super admin account
 * Usage: node server/utils/seedSuperAdmin.js
 */

const createSuperAdmin = async () => {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/acha';
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if super admin already exists
    const existingSuperAdmin = await User.findOne({ role: 'super_admin' });
    if (existingSuperAdmin) {
      console.log('Super admin already exists:', existingSuperAdmin.email);
      await mongoose.connection.close();
      return;
    }

    // Create super admin
    const superAdmin = new User({
      name: process.env.SUPER_ADMIN_NAME || 'Super Admin',
      email: process.env.SUPER_ADMIN_EMAIL || 'admin@achadelivery.com',
      password: process.env.SUPER_ADMIN_PASSWORD || 'admin123456',
      phone: process.env.SUPER_ADMIN_PHONE || '',
      role: 'super_admin',
      department: 'Administration',
      status: 'active'
    });

    await superAdmin.save();
    console.log('✅ Super admin created successfully!');
    console.log('Email:', superAdmin.email);
    console.log('Password:', process.env.SUPER_ADMIN_PASSWORD || 'admin123456');
    console.log('\n⚠️  Please change the default password after first login!');
    console.log('\nTo set custom credentials, use environment variables:');
    console.log('SUPER_ADMIN_NAME=Your Name');
    console.log('SUPER_ADMIN_EMAIL=your.email@example.com');
    console.log('SUPER_ADMIN_PASSWORD=YourSecurePassword');
    console.log('SUPER_ADMIN_PHONE=+251XXXXXXXXX');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error creating super admin:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the script
createSuperAdmin();











