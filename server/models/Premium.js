const mongoose = require('mongoose');
const generateUniqueId = require('../utils/generateUniqueId');

const premiumSchema = new mongoose.Schema({
  // Unique ID
  uniqueId: {
    type: String,
    unique: true,
    sparse: true
  },
  
  // Category
  category: {
    type: String,
    enum: ['delivery-partners', 'corporate-clients'],
    required: [true, 'Category is required']
  },
  
  // Delivery Partner Type (if category is delivery-partners)
  deliveryPartnerType: {
    type: String,
    enum: ['cycle-riders', 'e-bike-riders', 'motorcycle-riders'],
    required: function() {
      return this.category === 'delivery-partners';
    }
  },
  
  // Subscription Type
  subscriptionType: {
    type: String,
    enum: ['monthly', 'annual'],
    required: [true, 'Subscription type is required']
  },
  
  // Pricing (calculated based on category and subscription type)
  price: {
    type: Number,
    required: true
  },
  
  // Basic Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
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
    required: [true, 'Phone number is required'],
    trim: true
  },
  whatsapp: {
    type: String,
    trim: true
  },
  
  // Company Information (for Corporate Clients)
  companyName: {
    type: String,
    trim: true,
    required: function() {
      return this.category === 'corporate-clients';
    }
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
    type: String, // URL or file path
    default: null
  },
  license: {
    type: String, // URL or file path
    default: null
  },
  tradeRegistration: {
    type: String, // URL or file path (for Corporate Clients)
    default: null
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'active', 'expired', 'cancelled'],
    default: 'pending'
  },
  
  // Subscription dates
  subscriptionStartDate: {
    type: Date
  },
  subscriptionEndDate: {
    type: Date
  },
  
  // Payment information
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentDate: {
    type: Date
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

// Calculate price before saving
premiumSchema.pre('save', async function(next) {
  this.updatedAt = Date.now();
  
  // Pricing structure
  const pricing = {
    'cycle-riders': { monthly: 200, annual: 1500 },
    'e-bike-riders': { monthly: 300, annual: 2500 },
    'motorcycle-riders': { monthly: 400, annual: 3000 },
    'corporate-clients': { monthly: 2000, annual: 10000 }
  };
  
  // Calculate price
  if (this.category === 'corporate-clients') {
    this.price = pricing['corporate-clients'][this.subscriptionType];
  } else if (this.deliveryPartnerType) {
    this.price = pricing[this.deliveryPartnerType]?.[this.subscriptionType] || 0;
  }
  
  // Generate unique ID if it doesn't exist
  if (!this.uniqueId) {
    try {
      this.uniqueId = await generateUniqueId(this.constructor);
    } catch (error) {
      return next(error);
    }
  }
  
  next();
});

module.exports = mongoose.model('Premium', premiumSchema);

