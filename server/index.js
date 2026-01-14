const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Trust proxy for accurate IP addresses (if behind reverse proxy)
app.set('trust proxy', 1);

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint (should be before other routes)
app.get('/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  const mongoStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  const isHealthy = mongoStatus === 1; // 1 = connected
  
  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'healthy' : 'unhealthy',
    server: 'running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: {
      status: mongoStates[mongoStatus] || 'unknown',
      connected: mongoStatus === 1
    },
    environment: process.env.NODE_ENV || 'development'
  });
});

// Simple status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Routes
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/buyers', require('./routes/buyerRoutes'));
app.use('/api/senders', require('./routes/senderRoutes'));
app.use('/api/receivers', require('./routes/receiverRoutes'));
app.use('/api/travellers', require('./routes/travellerRoutes'));
app.use('/api/partners', require('./routes/partnerRoutes'));
app.use('/api/women-initiatives', require('./routes/womenInitiativeRoutes'));
app.use('/api/premium', require('./routes/premiumRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/audit', require('./routes/auditRoutes'));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/acha';
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Something went wrong!'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
