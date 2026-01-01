const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  whatsapp: {
    type: String,
    trim: true
  },
  telegram: {
    type: String,
    trim: true
  },
  
  // Location Information
  currentCity: {
    type: String,
    required: [true, 'Current city is required'],
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  
  // Financial Information
  bankAccount: {
    type: String,
    required: [true, 'Bank account is required'],
    trim: true
  },
  
  // Attached Documents
  idDocument: {
    type: String, // URL or file path for ID/Driving licence/Passport
    default: null
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected', 'active', 'inactive'],
    default: 'pending'
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update the updatedAt field before saving
buyerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Buyer', buyerSchema);




