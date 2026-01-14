const mongoose = require('mongoose');
const generateUniqueId = require('../utils/generateUniqueId');

const womenInitiativeSchema = new mongoose.Schema({
  // Unique ID
  uniqueId: {
    type: String,
    unique: true,
    sparse: true
  },
  // Basic Information
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [18, 'Age must be at least 18']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true
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
  location: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  // Attached Documents
  idDocument: {
    type: String, // URL or file path for ID/Driving Licence/Passport
    default: null
  },
  profilePhoto: {
    type: String, // URL or file path for Profile Photo
    default: null
  },
  certificates: {
    type: String, // URL or file path for Certificates
    default: null
  },
  // Status
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'approved', 'rejected'],
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

// Update the updatedAt field before saving and generate unique ID
womenInitiativeSchema.pre('save', async function() {
  this.updatedAt = Date.now();
  
  // Generate unique ID if it doesn't exist
  if (!this.uniqueId) {
    try {
      this.uniqueId = await generateUniqueId(this.constructor);
    } catch (error) {
      throw error;
    }
  }
});

module.exports = mongoose.model('WomenInitiative', womenInitiativeSchema);





